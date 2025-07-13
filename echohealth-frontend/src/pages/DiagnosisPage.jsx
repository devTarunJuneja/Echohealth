import React, { useState, useRef, useEffect } from 'react'
import Layout from '../components/layout'
import {
  Upload,
  Mic,
  Download,
  AlertCircle,
  CheckCircle,
  Loader2,
  StopCircle,
} from 'lucide-react'
import axios from 'axios'
import './DiagnosisPage.css'

export default function DiagnosisPage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [pdfBlob, setPdfBlob] = useState(null)
  const [error, setError] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  const fileInputRef = useRef(null)

  // Recording state
  const [isRecording, setIsRecording] = useState(false)
  const [audioChunks, setAudioChunks] = useState([])
  const [audioBlob, setAudioBlob] = useState(null)
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const audioPlayerRef = useRef(null)

  // Initialize MediaRecorder
  useEffect(() => {
    if (!navigator.mediaDevices) return
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream)
        recorder.ondataavailable = (e) =>
          setAudioChunks((c) => [...c, e.data])
        recorder.onstop = () => {
          const blob = new Blob(audioChunks, { type: 'audio/webm' })
          setAudioBlob(blob)
          setAudioChunks([])
        }
        setMediaRecorder(recorder)
      })
      .catch(() => {})
  }, [audioChunks])

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('audio/')) {
      setSelectedFile(file)
      setError(null)
      setPdfBlob(null)
      setAudioBlob(null)
    } else {
      setError('Please select a valid audio file.')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files[0])
  }
  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }
  const handleFileChange = (e) => handleFileSelect(e.target.files[0])

  const resetAll = () => {
    setSelectedFile(null)
    setAudioBlob(null)
    setPdfBlob(null)
    setError(null)
    fileInputRef.current.value = ''
  }

  const uploadToApi = async (blob) => {
    setIsUploading(true)
    setError(null)
    setPdfBlob(null)

    try {
      const formData = new FormData()
      formData.append('file', blob)
      const resp = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/predict/`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' }, responseType: 'blob' }
      )
      setPdfBlob(resp.data)
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Analysis failed.')
    } finally {
      setIsUploading(false)
    }
  }

  const startRecording = () => {
    resetAll()
    setIsRecording(true)
    mediaRecorder && mediaRecorder.start()
  }
  const stopRecording = () => {
    mediaRecorder && mediaRecorder.stop()
    setIsRecording(false)
  }

  const handleAnalyze = () => {
    if (audioBlob) uploadToApi(audioBlob)
    else if (selectedFile) uploadToApi(selectedFile)
    else setError('Please upload or record audio first.')
  }

  const handleDownload = () => {
    if (!pdfBlob) return
    const url = URL.createObjectURL(pdfBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'voice_diagnosis_report.pdf'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <Layout>
      <div className="diagnosis-page">
        <main className="diagnosis-main">
          <header className="diagnosis-header">
            <h1>Voice Diagnosis</h1>
            <p>Upload a voice recording or record using your microphone</p>
          </header>

          <div
            className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
            onClick={() => fileInputRef.current.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
            />

            {selectedFile ? (
              <div className="file-selected">
                <CheckCircle className="icon" />
                <div className="filename">{selectedFile.name}</div>
                <div className="filesize">
                  {(selectedFile.size / 1024 ** 2).toFixed(2)} MB
                </div>
                <button
                  className="btn-reset"
                  onClick={(e) => {
                    e.stopPropagation()
                    resetAll()
                  }}
                >
                  Choose Different File
                </button>
              </div>
            ) : (
              <div className="upload-prompt">
                <Upload className="icon" />
                <div className="upload-title">Upload your voice recording</div>
                <div className="upload-text">
                  Drag & drop a WAV or MP3 file here, or click to browse
                </div>
                <button
                  className="btn-select"
                  onClick={(e) => {
                    e.stopPropagation()
                    fileInputRef.current.click()
                  }}
                >
                  Select File
                </button>
              </div>
            )}
          </div>

          <div className="divider">
            <hr />
            <span>OR</span>
          </div>

          <div className="recording-zone">
            {!audioBlob && !isRecording && (
              <button className="record-button" onClick={startRecording}>
                <Mic /> <span>Start Voice Recording</span>
              </button>
            )}
            {isRecording && (
              <button className="record-button recording" onClick={stopRecording}>
                <StopCircle /> <span>Stop Recording</span>
              </button>
            )}
            {audioBlob && (
              <div className="audio-preview">
                <audio
                  ref={audioPlayerRef}
                  controls
                  src={URL.createObjectURL(audioBlob)}
                  className="audio-player"
                />
                <button className="btn-reset" onClick={resetAll}>
                  Rerecord
                </button>
              </div>
            )}
          </div>

          <div className="analyze-zone">
            <button
              className="btn-analyze"
              disabled={isUploading || (!selectedFile && !audioBlob)}
              onClick={handleAnalyze}
            >
              {isUploading ? (
                <Loader2 className="icon spin" />
              ) : (
                <Mic className="icon" />
              )}
              <span>{isUploading ? 'Analyzing...' : 'Analyze Voice'}</span>
            </button>
          </div>

          {error && (
            <div className="error-message">
              <AlertCircle className="icon" />
              <span>{error}</span>
            </div>
          )}

          {pdfBlob && (
            <div className="download-card">
              <h2>Download Report</h2>
              <button className="btn-download" onClick={handleDownload}>
                <Download className="icon" /> <span>Download PDF</span>
              </button>
              <p>Your diagnosis report is ready. Click above to download.</p>
            </div>
          )}
        </main>

        <aside className="diagnosis-sidebar">
          <h2>About Voice Analysis</h2>
          <p>
            Our advanced AI algorithm analyzes your voice for potential
            pathologies and health concerns based on acoustic measurements.
          </p>
          <h3>For best results:</h3>
          <ul>
            <li>Record in a quiet environment</li>
            <li>Keep the microphone 6–8 inches from your mouth</li>
            <li>Speak at your normal volume and pace</li>
            <li>Recordings should be 10–30 seconds long</li>
          </ul>
          <div className="example-box">
            <em>Hindi:</em> “नील कमल गहरे पानी में खिलता है और मधुर सुगंध फैलाता है।”<br/>
            <em>English:</em> “The farmer sowed seeds in the fields with care and patience.”
          </div>
        </aside>
      </div>
    </Layout>
  )
}
