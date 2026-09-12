import React, { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import { useOS } from '../../context/OSContext';
import { AudioVisualizer } from './AudioVisualizer';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Disc3, Maximize2, ChevronDown, ChevronUp } from 'lucide-react';
import { DecorativeBackground } from '../common/DecorativeBackground';

export const FloatingMusicPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    playNext,
    playPrev,
    progress,
    volume,
    setVolume,
    isMuted,
    toggleMute,
  } = useAudio();
  const { openApp, isMobile } = useOS();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isMobile) return null; // Mobile has its dedicated widget and Android music app

  return (
    <div
      className="animate-slide-up"
      style={{
        position: 'fixed',
        bottom: '84px',
        right: '24px',
        zIndex: 400,
        background: 'var(--bg-surface-elevated)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '2px solid var(--border-medium)',
        borderRadius: isCollapsed ? 'var(--radius-pill)' : 'var(--radius-xl)',
        padding: isCollapsed ? '8px 14px' : '16px 20px',
        width: isCollapsed ? 'auto' : '320px',
        transition: 'all var(--transition-normal)',
        overflow: 'hidden',
      }}
    >
      {!isCollapsed && <DecorativeBackground variant="micro" scheme="orange" cols={6} rows={4} opacity={0.55} />}
      {isCollapsed ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={togglePlay}
            className="btn-press"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--color-orange)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: '2px' }} />}
          </button>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, maxWidth: '140px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentTrack.title}
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{currentTrack.artist}</span>
          </div>
          <AudioVisualizer barCount={6} height={16} />
          <button
            onClick={toggleMute}
            style={{ color: isMuted ? 'var(--color-orange)' : 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
          <button
            onClick={() => setIsCollapsed(false)}
            style={{ color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <ChevronUp size={16} />
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Header Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-orange" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                Synth OS Audio
              </span>
              <AudioVisualizer barCount={8} height={14} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={() => openApp('music')}
                title="Open Full Music Station"
                style={{ color: 'var(--text-muted)', cursor: 'pointer', padding: '3px' }}
                className="hover-scale"
              >
                <Maximize2 size={14} />
              </button>
              <button
                onClick={() => setIsCollapsed(true)}
                title="Minimize Player"
                style={{ color: 'var(--text-muted)', cursor: 'pointer', padding: '3px' }}
              >
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* Track Info Card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: isPlaying ? 'rotate(360deg)' : 'none',
                  transition: 'transform 10s linear infinite',
                }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{ fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {currentTrack.title}
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                {currentTrack.artist}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                flex: 1,
                height: '4px',
                background: 'var(--border-medium)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: 'var(--color-orange)',
                  transition: 'width 0.3s linear',
                }}
              />
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>
              {currentTrack.duration}
            </span>
          </div>

          {/* Player Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={toggleMute}
              style={{
                color: isMuted ? 'var(--color-orange)' : 'var(--text-muted)',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: 'var(--radius-md)',
                background: isMuted ? 'var(--color-orange-subtle)' : 'transparent',
              }}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={playPrev}
                style={{ color: 'var(--text-primary)', cursor: 'pointer' }}
                className="hover-scale"
              >
                <SkipBack size={16} />
              </button>

              <button
                onClick={togglePlay}
                className="btn-press"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'var(--color-orange)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
              </button>

              <button
                onClick={playNext}
                style={{ color: 'var(--text-primary)', cursor: 'pointer' }}
                className="hover-scale"
              >
                <SkipForward size={16} />
              </button>
            </div>

            <span style={{ width: '16px' }} />
          </div>
        </div>
      )}
    </div>
  );
};
