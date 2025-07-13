// src/pages/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ArrowDownLeft, Mic } from 'lucide-react';
import './LandingPage.css';
import heroVideo from '../assets/echohealth-hero.mp4';

export default function LandingPage() {
  const navigate = useNavigate();

  const scrollToNextSection = () => {
    // If you have additional content below the fold:
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  const startVoiceAnalysis = () => {
    navigate('/diagnosis');
  };

  return (
    <div className="landing-container">
      {/* ─── HERO SECTION ─── */}
      <section className="hero-section">
        {/* 1) Transparent Navbar */}
        <Navbar transparent={true} />

        {/* 2) Background Video */}
        <video
          className="hero-video"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* 3) Dark Overlay */}
        <div className="hero-overlay" />

        {/* 4) Left‑aligned heading + “Start Voice Analysis” */}
        <div className="hero-content">
          <h1 className="hero-title">
            ANALYSE
            <br />
            YOUR VOICE
          </h1>
          <button
            className="hero-button"
            onClick={startVoiceAnalysis}
          >
            <Mic size={20} />
            Start Voice Analysis
          </button>
        </div>

        {/* 5) Bottom‑right diagonal arrow */}
        <button
          onClick={scrollToNextSection}
          className="arrow-button"
        >
          <ArrowDownLeft size={40} />
        </button>

        {/* 6) Bottom‑right tagline */}
        <div className="hero-tagline">
          AI‑Powered Voice Health Diagnostics for Everyone<br></br>
          Empowering Vocal Wellness with Instant AI‑Driven Analysis
         </div>
      </section>

      {/* ─── (Optional: Additional sections below) ─── */}
    </div>
  );
}
