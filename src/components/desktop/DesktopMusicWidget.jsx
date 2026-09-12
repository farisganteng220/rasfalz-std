import React from 'react';
import { useAudio } from '../../context/AudioContext';
import { useOS } from '../../context/OSContext';
import { AudioVisualizer } from '../audio/AudioVisualizer';
import { siteConfig } from '../../config/siteConfig';
import { DecorativeBackground } from '../common/DecorativeBackground';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Music,
  Maximize2,
  Disc3,
  ListMusic,
  Radio,
  Sparkles,
} from 'lucide-react';

export const DesktopMusicWidget = () => {
  const {
    playlist = siteConfig.playlist,
    currentTrack,
    currentTrackIndex = 0,
    isPlaying,
    togglePlay,
    playNext,
    playPrev,
    selectTrack,
    progress = 0,
    volume = 0.5,
    setVolume,
    isMuted,
    toggleMute,
  } = useAudio();
  const { openApp } = useOS();

  const activeTrack = currentTrack || playlist[currentTrackIndex] || playlist[0] || {
    id: 1,
    title: 'Visual Identity Suite',
    artist: 'Rasfalz Soundlab',
    cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    duration: '3:45',
  };

  return (
    <div
      className="os-widget hover-lift"
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '18px 20px',
        borderRadius: 'var(--radius-xl)',
        background: 'var(--bg-surface-elevated)',
        border: '2px solid var(--border-medium)',
        boxShadow: 'var(--shadow-window)',
        minHeight: '430px',
      }}
    >
      <DecorativeBackground variant="micro" scheme="orange" cols={8} rows={6} opacity={0.35} />

      {/* Widget Header */}
      <div
        className="os-widget-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
          paddingBottom: '12px',
          borderBottom: '2px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-orange-subtle)',
              border: '2px solid var(--color-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-orange)',
            }}
          >
            <Music size={16} />
          </div>
          <div>
            <h3 style={{ fontSize: '0.96rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
              Music Player
            </h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Lo-Fi & Creative Beats</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AudioVisualizer barCount={5} height={14} />
          <button
            onClick={() => openApp('music')}
            className="btn-glass btn-sm hover-lift"
            style={{
              fontSize: '0.76rem',
              padding: '4px 12px',
              borderRadius: 'var(--radius-pill)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: 700,
            }}
            title="Buka Aplikasi Musik Layar Penuh"
          >
            <span>Buka Musik</span>
            <Maximize2 size={12} />
          </button>
        </div>
      </div>

      {/* Hero Now Playing Showcase (Vinyl + Info) */}
      <div
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid var(--border-medium)',
          padding: '16px',
          marginBottom: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Stylized Vinyl Disc with Grooves */}
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #1a1a24 0%, #0d0d14 70%, #050508 100%)',
              border: '2px solid rgba(255, 156, 15, 0.4)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            {/* Spinning Album Center */}
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                overflow: 'hidden',
                position: 'relative',
                animation: isPlaying ? 'spin 8s linear infinite' : 'none',
                boxShadow: '0 0 8px rgba(0,0,0,0.7)',
              }}
            >
              <img
                src={activeTrack.cover}
                alt={activeTrack.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#0D0D12',
                  border: '2px solid #FF9C0F',
                }}
              />
            </div>
          </div>

          {/* Track Details */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span
                className="badge badge-orange"
                style={{ fontSize: '0.72rem', padding: '2px 8px', letterSpacing: '0.04em' }}
              >
                {isPlaying ? 'Diputar' : 'Dijeda'}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {activeTrack.album || 'Rasfalz Radio'}
              </span>
            </div>

            <h4
              style={{
                fontSize: '1rem',
                fontWeight: 800,
                margin: '2px 0',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: 'var(--text-primary)',
              }}
            >
              {activeTrack.title}
            </h4>

            <p
              style={{
                fontSize: '0.82rem',
                color: 'var(--color-orange)',
                fontWeight: 600,
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {activeTrack.artist}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              flex: 1,
              height: '6px',
              background: 'var(--bg-input)',
              borderRadius: 'var(--radius-pill)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #FF9C0F 0%, #FFBD2E 100%)',
                transition: 'width 0.3s linear',
              }}
            />
          </div>
          <span
            style={{
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              fontVariantNumeric: 'tabular-nums',
              fontWeight: 700,
            }}
          >
            {activeTrack.duration}
          </span>
        </div>

        {/* Controls Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Volume Control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={toggleMute}
              className="btn-press"
              style={{
                color: isMuted ? 'var(--color-orange)' : 'var(--text-muted)',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: 'var(--radius-sm)',
                background: isMuted ? 'var(--color-orange-subtle)' : 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              style={{ width: '65px', accentColor: 'var(--color-orange)', cursor: 'pointer' }}
            />
          </div>

          {/* Primary Playback Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={playPrev}
              className="btn-press hover-scale"
              style={{
                color: 'var(--text-primary)',
                cursor: 'pointer',
                background: 'transparent',
                border: 'none',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Lagu Sebelumnya"
            >
              <SkipBack size={18} />
            </button>

            <button
              onClick={togglePlay}
              className="btn-press"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'var(--btn-orange-bg)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--btn-orange-shadow)',
                border: '2px solid var(--btn-orange-border)',
                transition: 'transform 0.15s ease',
              }}
              title={isPlaying ? 'Jeda Lagu' : 'Putar Lagu'}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '3px' }} />}
            </button>

            <button
              onClick={playNext}
              className="btn-press hover-scale"
              style={{
                color: 'var(--text-primary)',
                cursor: 'pointer',
                background: 'transparent',
                border: 'none',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Lagu Selanjutnya"
            >
              <SkipForward size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Studio Playlist */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ListMusic size={15} className="text-orange" />
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
              Playlist Studio ({playlist.length})
            </span>
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Klik untuk putar</span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            maxHeight: '145px',
            overflowY: 'auto',
            paddingRight: '2px',
          }}
        >
          {playlist.map((track, idx) => {
            const isCurrent = activeTrack.id === track.id;
            return (
              <div
                key={track.id || idx}
                onClick={() => selectTrack(idx)}
                className="btn-press"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  background: isCurrent ? 'var(--color-orange-subtle)' : 'var(--bg-surface)',
                  border: isCurrent ? '2px solid var(--color-orange)' : '2px solid var(--border-medium)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: isCurrent ? 'var(--color-orange)' : 'var(--bg-card)',
                      color: isCurrent ? '#FFFFFF' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    {isCurrent && isPlaying ? '▶' : idx + 1}
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: '0.84rem',
                        fontWeight: isCurrent ? 800 : 600,
                        color: isCurrent ? 'var(--color-orange)' : 'var(--text-primary)',
                        margin: 0,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {track.title}
                    </p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>
                      {track.artist}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  {isCurrent && isPlaying && <AudioVisualizer barCount={3} height={10} />}
                  <span
                    style={{
                      fontSize: '0.72rem',
                      color: isCurrent ? 'var(--color-orange)' : 'var(--text-muted)',
                      fontVariantNumeric: 'tabular-nums',
                      fontWeight: 600,
                    }}
                  >
                    {track.duration}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DesktopMusicWidget;
