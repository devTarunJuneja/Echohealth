import React, { useState, useRef, useEffect } from 'react'
import Layout from '../components/layout'
import { Send, Bot, User, Loader } from 'lucide-react'
import axios from 'axios'

const EchoBuddy = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm EchoBuddy, your AI voice health assistant. I'm here to help you with voice-related questions, provide tips for vocal health, and guide you through exercises. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Call Gemini API
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyDlGh4kq5UnHvuu1dtpy6ts0QTEtcVo22Q`,
        {
          contents: [
            {
              parts: [
                {
                  text: `You are EchoBuddy, a helpful AI assistant specialized in voice health and speech therapy. 
                  You provide information about voice disorders, vocal exercises, and general voice health tips.
                  Keep responses concise, helpful, and encouraging. Always remind users to consult healthcare professionals for serious concerns.
                  
                  User question: ${inputMessage}`
                }
              ]
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )

      const botResponse = {
        id: Date.now() + 1,
        text: response.data.candidates[0].content.parts[0].text,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      console.error('Error calling Gemini API:', error)
      
      const errorResponse = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment. In the meantime, remember to stay hydrated and avoid straining your voice!",
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const quickQuestions = [
    "What exercises can help with vocal strain?",
    "How can I improve my voice quality?",
    "What are common voice disorders?",
    "Tips for vocal hygiene?",
    "How to warm up my voice?"
  ]

  const handleQuickQuestion = (question) => {
    setInputMessage(question)
    inputRef.current?.focus()
  }

  return (
    <Layout>
      <div style={{ height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '1rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            EchoBuddy AI Assistant
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.125rem' }}>
            Your personal voice health companion
          </p>
        </div>

        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Messages Area */}
          <div 
            style={{ 
              flex: 1, 
              padding: '1.5rem', 
              overflowY: 'auto',
              borderBottom: '1px solid #e2e8f0'
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '1rem'
                }}
              >
                <div
                  style={{
                    maxWidth: '70%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    flexDirection: message.sender === 'user' ? 'row-reverse' : 'row'
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: message.sender === 'user' ? '#3b82f6' : '#8b5cf6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {message.sender === 'user' ? (
                      <User size={16} color="white" />
                    ) : (
                      <Bot size={16} color="white" />
                    )}
                  </div>
                  
                  <div>
                    <div
                      style={{
                        backgroundColor: message.sender === 'user' ? '#3b82f6' : '#f1f5f9',
                        color: message.sender === 'user' ? 'white' : '#1e293b',
                        padding: '0.75rem 1rem',
                        borderRadius: '1rem',
                        borderTopLeftRadius: message.sender === 'user' ? '1rem' : '0.25rem',
                        borderTopRightRadius: message.sender === 'user' ? '0.25rem' : '1rem',
                        wordWrap: 'break-word',
                        lineHeight: 1.5
                      }}
                    >
                      {message.text}
                    </div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        color: '#64748b',
                        marginTop: '0.25rem',
                        textAlign: message.sender === 'user' ? 'right' : 'left'
                      }}
                    >
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#8b5cf6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Bot size={16} color="white" />
                  </div>
                  <div
                    style={{
                      backgroundColor: '#f1f5f9',
                      padding: '0.75rem 1rem',
                      borderRadius: '1rem',
                      borderTopLeftRadius: '0.25rem'
                    }}
                  >
                    <Loader size={16} className="animate-spin" style={{ color: '#64748b' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
              Quick questions:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="btn btn-secondary"
                  style={{ 
                    fontSize: '0.875rem', 
                    padding: '0.375rem 0.75rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about voice health..."
                  rows={1}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    resize: 'none',
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                    minHeight: '2.5rem',
                    maxHeight: '8rem'
                  }}
                  onInput={(e) => {
                    e.target.style.height = 'auto'
                    e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px'
                  }}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="btn btn-primary"
                style={{
                  padding: '0.75rem',
                  minWidth: '3rem',
                  height: '3rem',
                  opacity: (!inputMessage.trim() || isLoading) ? 0.5 : 1,
                  cursor: (!inputMessage.trim() || isLoading) ? 'not-allowed' : 'pointer'
                }}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default EchoBuddy