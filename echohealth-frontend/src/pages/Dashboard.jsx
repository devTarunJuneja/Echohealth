// src/Pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { FiFileText, FiActivity, FiCalendar, FiMic, FiMapPin } from 'react-icons/fi';
import { FaRobot, FaDumbbell } from 'react-icons/fa';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // replace with real fetch from your backend
    const mock = {
      jitter: 2.34, hnr: 11.05, voicedRatio: 75.12,
      f1: 500, f2: 1500, f3: 2500
    };
    setData(mock);
  }, []);

  if (!data) return null;

  const barData = {
    labels: ['Jitter','HNR','Voiced Ratio'],
    datasets: [{
      label: 'Latest',
      data: [data.jitter, data.hnr, data.voicedRatio],
      backgroundColor: ['#4ade80','#60a5fa','#fbbf24'],
      borderColor:     ['#22c55e','#3b82f6','#f59e0b'],
      borderWidth: 1
    }]
  };
  const pieData = {
    labels: ['F1','F2','F3'],
    datasets: [{ data: [data.f1,data.f2,data.f3], hoverOffset: 4 }]
  };

  return (
    <Layout>
      <Navbar />

      {/* Hero */}
      <div className="dashboard-hero">
        <div className="hero-content">
          <h1>Your Voice. Our Insights.</h1>
          <p>Diagnose, chat, and strengthen your vocal health — all in one place.</p>
          <button onClick={() => window.location.href='/diagnosis'} className="hero-btn">
            Start Diagnosis
          </button>
        </div>
      </div>

      <div className="dashboard-container">
        {/* Stats */}
        <header className="dashboard-header">
          <h2>Welcome, USER</h2>
          <p>Monitor your voice health and access personalized resources</p>
        </header>
        <div className="stats-cards">
          {[
            { icon: FiFileText,  title: 'Total Analyses',     value: 5,   color: 'green' },
            { icon: FiActivity,  title: 'Exercise Sessions',  value: 10,  color: 'blue'  },
            { icon: FaRobot,     title: 'AI Conversations',   value: 3,   color: 'purple'},
            { icon: FiCalendar,  title: 'Days Active',        value: 7,   color: 'orange'}
          ].map(({icon:Icon,title,value,color})=>(
            <div key={title} className="stat-card">
              <Icon className={`stat-icon ${color}`} />
              <div className="stat-info">
                <h3>{title}</h3><p>{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <section className="quick-actions">
          {[
            { icon: FiMic,      title: 'Voice Diagnosis', text: 'Upload recording' },
            { icon: FaRobot,    title: 'EchoBuddy AI',    text: 'Chat with AI'  },
            { icon: FaDumbbell, title: 'Voice Exercises', text: 'Guided routines' },
            { icon: FiMapPin,   title: 'Find Specialists',text: 'Nearby therapists'}
          ].map(({icon:Icon,title,text})=>(
            <div key={title} className="quick-action-card">
              <Icon className="quick-icon accent" />
              <div><h4>{title}</h4><p>{text}</p></div>
            </div>
          ))}
        </section>

        {/* Charts */}
        <section className="voice-overview">
          <h2>Your latest voice analysis results</h2>
          <div className="charts-container">
            <div className="chart"><Bar data={barData} options={{ maintainAspectRatio:false }} /></div>
            <div className="chart"><Pie data={pieData} options={{ maintainAspectRatio:false }} /></div>
          </div>
        </section>

        {/* Indicators */}
        <section className="voice-indicators">
          {[
            ['Mean F0 (Pitch)','136.37 Hz – Normal Range'],
            ['Jitter','1.72% – Elevated'],
            ['Shimmer','11.95% – Elevated'],
            ['HNR','11.05 – Good Ratio']
          ].map(([label,val])=>(
            <div key={label} className="indicator-card">
              <h4>{label}</h4><p>{val}</p>
            </div>
          ))}
        </section>

        {/* New Analysis */}
        <div className="new-analysis-container">
          <button className="new-analysis-btn">Run New Analysis</button>
        </div>
      </div>
    </Layout>
  );
}
