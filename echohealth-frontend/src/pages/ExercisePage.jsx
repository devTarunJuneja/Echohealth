// src/pages/Exercises.jsx
import React, { useState } from 'react';
import Layout from '../components/layout';
import './Exercises.css';

const tabs = [
  'All Exercises',
  'Breathing',
  'Warm-up',
  'Strengthening',
  'Clarity',
  'Resonance',
];

const videos = [
  {
    id: 'SEdCYhnStrk',    // Top Breathing Exercises to Improve Your Singing Voice :contentReference[oaicite:0]{index=0}
    title: 'Top Breathing Exercises to Improve Your Singing Voice',
    description: 'Dr. Dan’s best breathing drills for singers.',
    duration: '5:03',
    difficulty: 'All Levels',
    category: 'Breathing',
  },
  {
    id: '9-1Padxsmio',    // How To Warm Up Your Voice (Justin Stoney) :contentReference[oaicite:1]{index=1}
    title: 'How To Warm Up Your Voice',
    description: 'Justin Stoney’s complete 5-minute warm-up routine.',
    duration: '5:10',
    difficulty: 'Beginner',
    category: 'Warm-up',
  },
  {
    id: 's6tefJAsskw',    // 10 Minute Vocal Strength Workout NO TALKING :contentReference[oaicite:2]{index=2}
    title: '10 Minute Vocal Strength Workout (No Talking)',
    description: 'A fun, tough routine to build vocal power.',
    duration: '10:00',
    difficulty: 'Intermediate',
    category: 'Strengthening',
  },
  {
    id: '6aBumRJqzMc',    // Clarity & Diction + Mouth Exercises :contentReference[oaicite:3]{index=3}
    title: 'Clarity & Diction + Mouth Exercises',
    description: 'Drills to sharpen your articulation and projection.',
    duration: '4:20',
    difficulty: 'All Levels',
    category: 'Clarity',
  },
  {
    id: '9tIeMkEeJRo',    // Daily Vocal Resonance Exercises For Singers :contentReference[oaicite:4]{index=4}
    title: 'Daily Vocal Resonance Exercises for Singers',
    description: 'Five resonance drills to make your tone shine.',
    duration: '3:45',
    difficulty: 'Beginner',
    category: 'Resonance',
  },
];

export default function Exercises() {
  const [activeTab, setActiveTab] = useState('All Exercises');
  const filtered = activeTab === 'All Exercises'
    ? videos
    : videos.filter(v => v.category === activeTab);

  return (
    <Layout>
      <div className="ex-container">
        <h1 className="ex-title">Voice Exercises</h1>
        <p className="ex-subtitle">
          Follow guided exercises to improve your vocal health and technique
        </p>

        <ul className="tabs">
          {tabs.map(tab => (
            <li
              key={tab}
              className={`tab${tab === activeTab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>

        <div className="video-grid">
          {filtered.map((vid, i) => (
            <div key={i} className="card">
              <div className="video-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${vid.id}`}
                  title={vid.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <span className="duration">{vid.duration}</span>
              </div>
              <div className="card-body">
                <h3>{vid.title}</h3>
                <p className="desc">{vid.description}</p>
                <div className="meta">
                  <span><strong>Difficulty:</strong> {vid.difficulty}</span>
                  <span><strong>Category:</strong> {vid.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
