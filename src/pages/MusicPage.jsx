import React, { useState } from 'react';
import { useAudio } from '../context/AudioContext';
import { useOS } from '../context/OSContext';
import { WindowFrame } from '../components/common/WindowFrame';
import { AudioVisualizer } from '../components/audio/AudioVisualizer';
import {
  Music,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Radio,
  Sparkles,
  ListMusic,
  Heart,
  Shuffle,
  Repeat,
  Disc3,
  Waves,
  ChevronRight,
} from 'lucide-react';

export const MusicPage = () => {
  const { isMobile } = useOS();
  const {
    playlist,
    currentTrack,
    currentTrackIndex,
    isPlaying,
    togglePlay,
    playNext,
    playPrev,
    selectTrack,
    progress,
    setProgress,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    currentTime,
    duration,
    formatTime,
    isYTReady,
  } = useAudio();

  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('player'); // 'player' | 'playlist'

  // ==============================================
  // MOBILE VIEW: Android Pixel Full-Screen Player
  // ==============================================
  if (isMobile) {
    return (
      <WindowFrame title="Rasfalz Studio Music" icon={Music} badgeText="Pixel Media Player">
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, gap: '0' }}>

          {/* Tab Switcher */}
          <div
            style={{
              display: 'flex',
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-pill)',
              border: '2px solid var(--border-medium)',
              padding: '3px',
              margin: '0 0 20px 0',
              gap: '2px',
            }}
          >
            {[{ key: 'player', label: '▶ Now Playing' }, { key: 'playlist', label: `☰ Playlist (${playlist.length})` }].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="btn-press"
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: activeTab === tab.key ? 'var(--color-orange)' : 'transparent',
                  color: activeTab === tab.key ? '#fff' : 'var(--text-muted)',
                  border: 'none',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'player' ? (
            /* ── Mobile Now Playing Panel ── */
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '22px',
                padding: '0 4px 12px',
                animation: 'fadeIn 0.3s ease',
              }}
            >
              {/* Album Art */}
              <div
                style={{
                  position: 'relative',
                  width: 'min(260px, 80vw)',
                  aspectRatio: '1/1',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                  border: '3px solid rgba(255,156,15,0.4)',
                  transition: 'box-shadow 0.6s ease',
                  flexShrink: 0,
                }}
              >
                <img
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: isPlaying && !isMuted ? 'scale(1.07)' : 'scale(1)',
                    transition: 'transform 0.6s ease',
                  }}
                />
                {/* Spinning disc overlay when playing */}
                {isPlaying && !isMuted && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.12) 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </div>

              {/* Track Info */}
              <div style={{ textAlign: 'center', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '8px' }}>
                  <span className="badge badge-orange" style={{ fontSize: '0.66rem' }}>
                    <Radio size={10} />
                    {isYTReady && isPlaying && !isMuted ? 'Streaming' : 'Rasfalz Studio'}
                  </span>
                  {isMuted && (
                    <span style={{ fontSize: '0.66rem', padding: '2px 7px', background: 'rgba(239,68,68,0.15)', color: '#EF4444', border: '2px solid rgba(239,68,68,0.4)', borderRadius: '99px', fontWeight: 700 }}>
                      MUTED
                    </span>
                  )}
                </div>
                <h2 style={{ fontSize: '1.35rem', margin: '0 0 4px', fontWeight: 900, letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '0 4px' }}>
                  {currentTrack.title}
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-orange)', fontWeight: 700, margin: '0 0 2px' }}>
                  {currentTrack.artist}
                </p>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{currentTrack.album}</span>
              </div>

              {/* Visualizer */}
              <div style={{ height: '28px', display: 'flex', alignItems: 'center' }}>
                <AudioVisualizer barCount={20} height={26} />
              </div>

              {/* Progress Bar */}
              <div style={{ width: '100%' }}>
                <div
                  style={{
                    width: '100%',
                    height: '5px',
                    background: 'var(--border-medium)',
                    borderRadius: '99px',
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setProgress(((e.clientX - rect.left) / rect.width) * 100);
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #FF9C0F, #FF5E3A)',
                      borderRadius: '99px',
                      transition: 'width 0.2s linear',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.72rem', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>
                  <span>{formatTime(currentTime)}</span>
                  <span>{duration > 0 ? formatTime(duration) : currentTrack.duration}</span>
                </div>
              </div>

              {/* Controls Row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', width: '100%' }}>
                <button
                  onClick={() => setIsLiked(p => !p)}
                  style={{ color: isLiked ? '#EF4444' : 'var(--text-muted)', cursor: 'pointer', padding: '6px', background: 'none', border: 'none' }}
                >
                  <Heart size={22} fill={isLiked ? '#EF4444' : 'none'} />
                </button>

                <button
                  onClick={playPrev}
                  className="btn-press"
                  style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-surface)', border: '2px solid var(--border-medium)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <SkipBack size={22} />
                </button>

                <button
                  onClick={togglePlay}
                  className="btn-press"
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FF9C0F, #FF5E3A)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                    border: 'none',
                  }}
                >
                  {isPlaying ? <Pause size={30} /> : <Play size={30} style={{ marginLeft: '4px' }} />}
                </button>

                <button
                  onClick={playNext}
                  className="btn-press"
                  style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-surface)', border: '2px solid var(--border-medium)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <SkipForward size={22} />
                </button>

                <button
                  onClick={toggleMute}
                  style={{
                    color: isMuted ? '#EF4444' : 'var(--text-muted)',
                    padding: '6px',
                    borderRadius: '50%',
                    background: isMuted ? 'rgba(239,68,68,0.12)' : 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                </button>
              </div>

              {/* Volume Slider */}
              <div style={{ width: '100%', maxWidth: '280px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Volume2 size={15} style={{ color: 'var(--color-orange)', flexShrink: 0 }} />
                <input
                  type="range"
                  min="0" max="1" step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-orange)', cursor: 'pointer' }}
                />
              </div>
            </div>
          ) : (
            /* ── Mobile Playlist ── */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {playlist.map((track, idx) => {
                const isCurrent = currentTrackIndex === idx;
                return (
                  <div
                    key={track.id}
                    onClick={() => { selectTrack(idx); setActiveTab('player'); }}
                    className="glass-card btn-press"
                    style={{
                      padding: '11px 14px',
                      borderRadius: 'var(--radius-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: isCurrent ? 'var(--color-orange-subtle)' : 'var(--bg-surface)',
                      border: `2px solid ${isCurrent ? 'var(--color-orange)' : 'var(--border-medium)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.18s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <img
                          src={track.cover}
                          alt={track.title}
                          style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover', display: 'block' }}
                        />
                        {isCurrent && (
                          <div style={{
                            position: 'absolute', inset: 0, borderRadius: '10px',
                            background: 'rgba(255,156,15,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            {isPlaying ? <Pause size={14} color="#fff" /> : <Play size={14} color="#fff" style={{ marginLeft: '2px' }} />}
                          </div>
                        )}
                      </div>
                      <div>
                        <p style={{ fontSize: '0.88rem', margin: 0, fontWeight: 700, color: isCurrent ? 'var(--color-orange)' : 'var(--text-primary)' }}>
                          {track.title}
                        </p>
                        <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: 0 }}>{track.artist}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                      {isCurrent && isPlaying && !isMuted && <AudioVisualizer barCount={4} height={14} />}
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{track.duration}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </WindowFrame>
    );
  }

  // ==============================================
  // DESKTOP / TABLET VIEW: Rasfalz Sound Studio
  // ==============================================
  return (
    <WindowFrame title="Rasfalz Sound Studio" icon={Music} badgeText="OS Audio Deck">
      {/* ─── Main 2-Column Layout ─── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '20px',
          minHeight: '520px',
          height: '100%',
        }}
      >
        {/* ═══ LEFT SIDEBAR: Playlist ═══ */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--bg-surface)',
            border: '2px solid var(--border-medium)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
          }}
        >
          {/* Sidebar Header */}
          <div
            style={{
              padding: '18px 18px 14px',
              borderBottom: '2px solid var(--border-medium)',
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
            }}
          >
            <ListMusic size={16} className="text-orange" />
            <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>Playlist</span>
            <span
              style={{
                marginLeft: 'auto',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '2px 8px',
                background: 'var(--color-orange-subtle)',
                color: 'var(--color-orange)',
                borderRadius: '99px',
                border: '2px solid var(--color-orange)',
              }}
            >
              {playlist.length} Track
            </span>
          </div>

          {/* Scrollable Track List */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '10px 10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {playlist.map((track, idx) => {
              const isCurrent = currentTrackIndex === idx;
              return (
                <div
                  key={track.id}
                  onClick={() => selectTrack(idx)}
                  className="btn-press"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '9px 10px',
                    borderRadius: 'var(--radius-md)',
                    background: isCurrent ? 'var(--color-orange-subtle)' : 'transparent',
                    border: `2px solid ${isCurrent ? 'var(--color-orange)' : 'transparent'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {/* Track thumbnail with play indicator */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <img
                      src={track.cover}
                      alt={track.title}
                      style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover', display: 'block' }}
                    />
                    {isCurrent && (
                      <div style={{
                        position: 'absolute', inset: 0, borderRadius: '8px',
                        background: 'rgba(255,156,15,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {isPlaying ? <Pause size={12} color="#fff" /> : <Play size={12} color="#fff" style={{ marginLeft: '1px' }} />}
                      </div>
                    )}
                  </div>

                  {/* Track info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      margin: 0,
                      fontSize: '0.82rem',
                      fontWeight: isCurrent ? 800 : 600,
                      color: isCurrent ? 'var(--color-orange)' : 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {track.title}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {track.artist}
                    </p>
                  </div>

                  {/* Duration / Visualizer */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                    {isCurrent && isPlaying && !isMuted
                      ? <AudioVisualizer barCount={3} height={12} />
                      : <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{track.duration}</span>
                    }
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══ RIGHT PANEL: Now Playing ═══ */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* ── Top: Cover + Info ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '28px',
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
              borderRadius: 'var(--radius-xl)',
              padding: '28px 32px',
              alignItems: 'center',
              flex: '0 0 auto',
            }}
          >
            {/* Cover Art */}
            <div
              style={{
                position: 'relative',
                width: '190px',
                height: '190px',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
                border: '2.5px solid rgba(255,156,15,0.4)',
                transition: 'box-shadow 0.5s ease',
                flexShrink: 0,
              }}
            >
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: isPlaying && !isMuted ? 'scale(1.06)' : 'scale(1)',
                  transition: 'transform 0.6s ease',
                }}
              />
            </div>

            {/* Info + Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: 0 }}>
              {/* Badges */}
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <span className="badge badge-orange">
                  <Radio size={11} />
                  Now Streaming
                </span>
                <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>{currentTrack.album}</span>
                {isMuted && (
                  <span style={{ fontSize: '0.7rem', padding: '2px 8px', background: 'rgba(239,68,68,0.15)', color: '#EF4444', border: '2px solid rgba(239,68,68,0.4)', borderRadius: '99px', fontWeight: 700 }}>
                    MUTED
                  </span>
                )}
              </div>

              {/* Title + Artist */}
              <div>
                <h1 style={{ fontSize: '1.85rem', margin: '0 0 4px', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentTrack.title}
                </h1>
                <p style={{ fontSize: '1rem', color: 'var(--color-orange)', fontWeight: 700, margin: 0 }}>
                  {currentTrack.artist}
                </p>
              </div>

              {/* Visualizer + status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <AudioVisualizer barCount={26} height={30} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', flexShrink: 0 }}>
                  {isPlaying
                    ? (isMuted ? 'Audio Muted' : isYTReady ? 'YouTube Streaming' : 'Connecting...')
                    : 'Paused'}
                </span>
              </div>

              {/* Progress Bar */}
              <div>
                <div
                  style={{
                    width: '100%',
                    height: '5px',
                    background: 'var(--border-medium)',
                    borderRadius: '99px',
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setProgress(((e.clientX - rect.left) / rect.width) * 100);
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #FF9C0F, #FF5E3A)',
                      borderRadius: '99px',
                      transition: 'width 0.3s linear',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', fontSize: '0.72rem', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>
                  <span>{formatTime(currentTime)}</span>
                  <span>{duration > 0 ? formatTime(duration) : currentTrack.duration}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                {/* Like */}
                <button
                  onClick={() => setIsLiked(p => !p)}
                  style={{ color: isLiked ? '#EF4444' : 'var(--text-muted)', cursor: 'pointer', padding: '5px', background: 'none', border: 'none' }}
                >
                  <Heart size={19} fill={isLiked ? '#EF4444' : 'none'} />
                </button>

                {/* Prev */}
                <button
                  onClick={playPrev}
                  className="btn btn-glass btn-sm hover-scale"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', padding: 0 }}
                >
                  <SkipBack size={17} />
                </button>

                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className="btn-press"
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FF9C0F, #FF5E3A)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                    border: 'none',
                  }}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: '3px' }} />}
                </button>

                {/* Next */}
                <button
                  onClick={playNext}
                  className="btn btn-glass btn-sm hover-scale"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', padding: 0 }}
                >
                  <SkipForward size={17} />
                </button>

                {/* Mute + Volume */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                  <button
                    onClick={toggleMute}
                    style={{
                      color: isMuted ? '#EF4444' : 'var(--text-muted)',
                      padding: '5px',
                      borderRadius: 'var(--radius-md)',
                      background: isMuted ? 'rgba(239,68,68,0.12)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                  </button>
                  <input
                    type="range"
                    min="0" max="1" step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    style={{ width: '90px', accentColor: 'var(--color-orange)', cursor: 'pointer' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom: Track Details Card ── */}
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
              borderRadius: 'var(--radius-xl)',
              padding: '20px 24px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* Section header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '10px', borderBottom: '2px solid var(--border-medium)' }}>
              <Disc3 size={15} className="text-orange" />
              <span style={{ fontWeight: 800, fontSize: '0.88rem' }}>Track Info</span>
              <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {currentTrackIndex + 1} / {playlist.length}
              </span>
            </div>

            {/* Info Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 20px' }}>
              {[
                { label: 'Judul', value: currentTrack.title },
                { label: 'Artis', value: currentTrack.artist },
                { label: 'Album', value: currentTrack.album },
                { label: 'Durasi', value: currentTrack.duration },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ margin: '0 0 2px', fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {label}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Status row */}
            <div
              style={{
                marginTop: 'auto',
                padding: '10px 14px',
                background: isPlaying && !isMuted ? 'var(--color-orange-subtle)' : 'var(--bg-elevated, var(--bg-surface))',
                border: `2px solid ${isPlaying && !isMuted ? 'var(--color-orange)' : 'var(--border-medium)'}`,
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Waves size={15} style={{ color: isPlaying && !isMuted ? 'var(--color-orange)' : 'var(--text-muted)' }} />
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: isPlaying && !isMuted ? 'var(--color-orange)' : 'var(--text-muted)' }}>
                {isPlaying
                  ? (isMuted ? '🔇 Audio dimatikan — aktifkan untuk mendengarkan'
                    : isYTReady ? '🎵 Streaming via YouTube Embedded Player'
                    : '⏳ Menghubungkan ke sumber audio...')
                  : '⏸ Player dijeda — tekan ▶ untuk melanjutkan'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};
