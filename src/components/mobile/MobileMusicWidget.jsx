import React from 'react';
import { useAudio } from '../../context/AudioContext';
import { useOS } from '../../context/OSContext';
import { Play, Pause, SkipForward, Music, Radio, Sparkles } from 'lucide-react';

export const MobileMusicWidget = () => {
  const { currentTrack, isPlaying, togglePlay, playNext, progress } = useAudio();
  const { openApp } = useOS();

  if (!currentTrack) return null;

  return (
    <div className="mobile-music-mini-widget btn-press">
      <div className="mobile-music-widget-main">
        {/* Album / Vinyl Cover that spins when playing */}
        <div
          className="mobile-music-vinyl-cover"
          onClick={() => openApp('music')}
          style={{ cursor: 'pointer' }}
          title="Buka Pemutar Musik"
        >
          {currentTrack.cover ? (
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              className={`vinyl-record-disc ${isPlaying ? 'vinyl-playing-spin' : ''}`}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(145deg, #FF9C0F 0%, #B84700 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
              }}
            >
              <Music size={18} />
            </div>
          )}
        </div>

        {/* Track Title and Artist */}
        <div
          className="mobile-music-track-info"
          onClick={() => openApp('music')}
          style={{ cursor: 'pointer' }}
        >
          <div className="mobile-music-title">
            {currentTrack.title || 'Studio Lo-Fi Vibes'}
          </div>
          <div className="mobile-music-artist">
            <Radio size={11} className={isPlaying ? 'animate-pulse' : ''} />
            <span>{currentTrack.artist || 'Rasfalz Studio Audio'}</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="mobile-music-controls">
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="mobile-music-ctrl-btn primary"
            aria-label={isPlaying ? 'Pause Musik' : 'Putar Musik'}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" style={{ marginLeft: '2px' }} />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              playNext();
            }}
            className="mobile-music-ctrl-btn"
            aria-label="Lagu Selanjutnya"
            title="Next Track"
          >
            <SkipForward size={16} />
          </button>
        </div>
      </div>

      {/* Progress Track Bar */}
      <div
        className="mobile-music-progress-bar-track"
        onClick={() => openApp('music')}
        style={{ cursor: 'pointer' }}
      >
        <div
          className="mobile-music-progress-fill"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
};

export default MobileMusicWidget;
