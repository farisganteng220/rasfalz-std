import React, { useState, useEffect, useRef, useCallback } from 'react';
import { siteConfig } from '../../config/siteConfig';
import { useAudio } from '../../context/AudioContext';

const STATUS_STEPS = [
  { threshold: 0, text: 'Memulai sistem Rasfalz Studio...' },
  { threshold: 24, text: 'Memuat modul visual & portofolio kreator...' },
  { threshold: 52, text: 'Menyiapkan workstation OS & audio...' },
  { threshold: 78, text: 'Mengonfigurasi workspace & antarmuka...' },
  { threshold: 96, text: 'Sistem siap! Selamat datang di Rasfalz Studio ✨' },
];

export const InitialBootLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(STATUS_STEPS[0].text);
  const [isExiting, setIsExiting] = useState(false);
  const { playSoundEffect } = useAudio();
  const completedRef = useRef(false);

  const finishBoot = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setProgress(100);
    setStatusText(STATUS_STEPS[STATUS_STEPS.length - 1].text);

    try {
      if (playSoundEffect) {
        playSoundEffect('open');
      }
    } catch {
      // Audio autoplay policy guard
    }

    // Trigger smooth fade out
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 450); // Matches CSS transition duration
    }, 280);
  }, [onComplete, playSoundEffect]);

  // Handle Quick Skip
  const handleSkip = () => {
    finishBoot();
  };

  useEffect(() => {
    // Keyboard listener to skip with Space or Escape
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'Escape' || e.key === 'Enter') {
        finishBoot();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Realistic non-linear progress timer
    let currentPct = 0;
    const interval = setInterval(() => {
      if (completedRef.current) {
        clearInterval(interval);
        return;
      }

      // Step increment calculation
      let increment = 0;
      if (currentPct < 30) {
        increment = Math.floor(Math.random() * 8) + 6; // Quick start
      } else if (currentPct < 70) {
        increment = Math.floor(Math.random() * 6) + 4; // Steady load
      } else if (currentPct < 92) {
        increment = Math.floor(Math.random() * 5) + 3;
      } else {
        increment = Math.floor(Math.random() * 4) + 2;
      }

      currentPct = Math.min(100, currentPct + increment);
      setProgress(currentPct);

      // Update matching status text
      const currentStep = [...STATUS_STEPS].reverse().find((s) => currentPct >= s.threshold);
      if (currentStep) {
        setStatusText(currentStep.text);
      }

      if (currentPct >= 100) {
        clearInterval(interval);
        finishBoot();
      }
    }, 75);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [finishBoot]);

  const logoSrc =
    siteConfig.profile.iconUrl ||
    siteConfig.profile.avatar ||
    siteConfig.profile.logoUrl ||
    'https://files.catbox.moe/7lrmbf.jpeg';

  return (
    <div
      className={`boot-loader-overlay ${isExiting ? 'boot-exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Memuat Rasfalz Studio"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="boot-ambient-glow glow-orange" />
      <div className="boot-ambient-glow glow-blue" />

      {/* Center Boot Content */}
      <div className="boot-content">
        {/* Animated Brand Logo with Dual-Orbit Rings */}
        <div className="boot-logo-wrapper">
          <div className="boot-orbit-ring" />
          <div className="boot-orbit-ring-secondary" />
          <img
            src={logoSrc}
            alt={siteConfig.profile.brandName || 'Rasfalz Studio'}
            className="boot-logo-img"
            onError={(e) => {
              e.currentTarget.src = 'https://files.catbox.moe/7lrmbf.jpeg';
            }}
          />
        </div>

        {/* Brand Title & Tagline */}
        <h1 className="boot-brand-title">{siteConfig.profile.brandName || 'Rasfalz Studio'}</h1>
        <p className="boot-brand-tagline">
          {siteConfig.profile.tagline || 'Creative & Energy'} • Digital Portfolio OS
        </p>

        {/* Progress Bar & Status Text */}
        <div className="boot-progress-section">
          <div className="boot-progress-header">
            <span className="boot-status-msg">{statusText}</span>
            <span className="boot-pct-number">{progress}%</span>
          </div>

          <div className="boot-progress-track">
            <div
              className="boot-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Micro Specs Footer & Skip Action */}
        <div className="boot-meta-footer">
          <div className="boot-system-chip">
            <span className="boot-chip-dot" />
            <span>RASFALZ OS v2.4</span>
          </div>

          <button
            type="button"
            className="boot-skip-btn"
            onClick={handleSkip}
            title="Lewati loading"
            aria-label="Lewati proses loading"
          >
            <span>Lewati</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
