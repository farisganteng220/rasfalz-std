import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { siteConfig } from '../config/siteConfig';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [playlist] = useState(siteConfig.playlist);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState(true);
  const [audioFrequencies, setAudioFrequencies] = useState([20, 45, 70, 90, 110, 80, 60, 40, 25]);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isYTReady, setIsYTReady] = useState(false);

  const ytPlayerRef = useRef(null);
  const ytContainerRef = useRef(null);
  const progressTimerRef = useRef(null);
  const visualizerTimerRef = useRef(null);
  const isPlayingRef = useRef(false);
  const volumeRef = useRef(0.5);
  const isMutedRef = useRef(false);

  const currentTrack = playlist[currentTrackIndex] || playlist[0];

  // ─── Keep refs in sync ────────────────────────────────────────────────────
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { volumeRef.current = volume; }, [volume]);
  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);

  // ─── Create hidden YouTube player container on mount ─────────────────────
  useEffect(() => {
    if (!document.getElementById('yt-hidden-player-container')) {
      const div = document.createElement('div');
      div.id = 'yt-hidden-player-container';
      div.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;left:-9999px;top:-9999px;overflow:hidden;z-index:-1;';
      const inner = document.createElement('div');
      inner.id = 'yt-hidden-player';
      div.appendChild(inner);
      document.body.appendChild(div);
      ytContainerRef.current = inner;
    } else {
      ytContainerRef.current = document.getElementById('yt-hidden-player');
    }
  }, []);

  // ─── Initialize YouTube IFrame Player ────────────────────────────────────
  const initYTPlayer = useCallback((videoId) => {
    if (ytPlayerRef.current) {
      try {
        ytPlayerRef.current.destroy();
      } catch { /* ignore */ }
      ytPlayerRef.current = null;
    }

    if (!window.YT || !window.YT.Player) {
      // YT API not ready yet — will be initialized via onYouTubeIframeAPIReady
      return;
    }

    const targetVol = isMutedRef.current ? 0 : Math.round(volumeRef.current * 100);

    ytPlayerRef.current = new window.YT.Player('yt-hidden-player', {
      height: '1',
      width: '1',
      videoId: videoId,
      playerVars: {
        autoplay: isPlayingRef.current ? 1 : 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        origin: window.location.origin,
      },
      events: {
        onReady: (event) => {
          event.target.setVolume(targetVol);
          if (isPlayingRef.current) {
            event.target.playVideo();
          }
          setIsYTReady(true);
        },
        onStateChange: (event) => {
          // YT.PlayerState.ENDED = 0
          if (event.data === window.YT.PlayerState.ENDED) {
            playNextInternal();
          }
        },
        onError: (event) => {
          console.warn('YouTube player error:', event.data);
        },
      },
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Register global callback for YT API ready ───────────────────────────
  useEffect(() => {
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (previousCallback) previousCallback();
      // Initialize player once API is ready
      initYTPlayer(playlist[0].youtubeId);
    };

    // If YT API already loaded (e.g. hot reload)
    if (window.YT && window.YT.Player) {
      initYTPlayer(playlist[0].youtubeId);
    }

    return () => {
      window.onYouTubeIframeAPIReady = previousCallback;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Internal: advance to next track ─────────────────────────────────────
  const playNextInternal = () => {
    setCurrentTrackIndex(prev => {
      const nextIdx = (prev + 1) % playlist.length;
      setProgress(0);
      setCurrentTime(0);
      loadTrackAtIndex(nextIdx, true);
      return nextIdx;
    });
  };

  // ─── Load track by index ──────────────────────────────────────────────────
  const loadTrackAtIndex = useCallback((index, autoPlay = false) => {
    const track = playlist[index];
    if (!track || !track.youtubeId) return;

    if (ytPlayerRef.current && typeof ytPlayerRef.current.loadVideoById === 'function') {
      if (autoPlay) {
        ytPlayerRef.current.loadVideoById({ videoId: track.youtubeId, startSeconds: 0 });
      } else {
        ytPlayerRef.current.cueVideoById({ videoId: track.youtubeId, startSeconds: 0 });
      }
    } else {
      // Player not ready yet, (re)create it
      // Reset the container ID so YT can create a fresh player
      const container = document.getElementById('yt-hidden-player-container');
      if (container) {
        container.innerHTML = '<div id="yt-hidden-player"></div>';
        ytContainerRef.current = document.getElementById('yt-hidden-player');
      }
      if (autoPlay) isPlayingRef.current = true;
      initYTPlayer(track.youtubeId);
    }
  }, [playlist, initYTPlayer]);

  // ─── Progress & visualizer polling ───────────────────────────────────────
  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = setInterval(() => {
        if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === 'function') {
          try {
            const ct = ytPlayerRef.current.getCurrentTime() || 0;
            const dur = ytPlayerRef.current.getDuration() || 0;
            setCurrentTime(ct);
            setDuration(dur);
            if (dur > 0) {
              setProgress((ct / dur) * 100);
            }
          } catch { /* ignore */ }
        }
      }, 500);

      visualizerTimerRef.current = setInterval(() => {
        if (isMutedRef.current) {
          setAudioFrequencies([5, 5, 5, 5, 5, 5, 5, 5, 5]);
        } else {
          setAudioFrequencies(
            Array.from({ length: 9 }, () => Math.floor(Math.random() * 80) + 20)
          );
        }
      }, 150);
    } else {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (visualizerTimerRef.current) clearInterval(visualizerTimerRef.current);
      setAudioFrequencies([15, 20, 15, 25, 20, 15, 20, 15, 10]);
    }

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (visualizerTimerRef.current) clearInterval(visualizerTimerRef.current);
    };
  }, [isPlaying]);

  // ─── Volume / mute sync to YT player ─────────────────────────────────────
  useEffect(() => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.setVolume === 'function') {
      try {
        const targetVol = isMuted ? 0 : Math.round(volume * 100);
        ytPlayerRef.current.setVolume(targetVol);
        if (isMuted) {
          ytPlayerRef.current.mute();
        } else {
          ytPlayerRef.current.unMute();
        }
      } catch { /* ignore */ }
    }
  }, [isMuted, volume]);

  // ─── Controls ─────────────────────────────────────────────────────────────
  const togglePlay = () => {
    if (!ytPlayerRef.current) return;
    try {
      if (isPlaying) {
        ytPlayerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        ytPlayerRef.current.playVideo();
        setIsPlaying(true);
      }
    } catch { /* ignore */ }
  };

  const playNext = () => {
    const nextIdx = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIdx);
    setProgress(0);
    setCurrentTime(0);
    loadTrackAtIndex(nextIdx, isPlaying);
    if (!isPlaying) setIsPlaying(false);
  };

  const playPrev = () => {
    const prevIdx = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(prevIdx);
    setProgress(0);
    setCurrentTime(0);
    loadTrackAtIndex(prevIdx, isPlaying);
    if (!isPlaying) setIsPlaying(false);
  };

  const selectTrack = (index) => {
    setCurrentTrackIndex(index);
    setProgress(0);
    setCurrentTime(0);
    loadTrackAtIndex(index, true);
    setIsPlaying(true);
  };

  const handleProgressClick = (newPct) => {
    setProgress(newPct);
    if (ytPlayerRef.current && typeof ytPlayerRef.current.getDuration === 'function') {
      try {
        const dur = ytPlayerRef.current.getDuration() || 0;
        if (dur > 0) {
          ytPlayerRef.current.seekTo((newPct / 100) * dur, true);
        }
      } catch { /* ignore */ }
    }
  };

  const toggleMute = () => setIsMuted(prev => !prev);

  const handleVolumeChange = (newVal) => {
    const val = Math.max(0, Math.min(1, newVal));
    setVolumeState(val);
    if (val === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  // ─── Format time helper ───────────────────────────────────────────────────
  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // ─── Minimal Web Audio for UI click sounds only ───────────────────────────
  const uiAudioCtxRef = useRef(null);

  const playSoundEffect = (type = 'click') => {
    if (isMutedRef.current) return;
    try {
      if (!uiAudioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) uiAudioCtxRef.current = new AudioCtx();
      }
      if (!uiAudioCtxRef.current) return;
      if (uiAudioCtxRef.current.state === 'suspended') uiAudioCtxRef.current.resume();

      const ctx = uiAudioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
        gain.gain.setValueAtTime(0.07 * volumeRef.current, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.05);
      } else if (type === 'open') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.12);
        gain.gain.setValueAtTime(0.09 * volumeRef.current, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.12);
      }
    } catch { /* ignore */ }
  };

  // ─── Cleanup on unmount ───────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (visualizerTimerRef.current) clearInterval(visualizerTimerRef.current);
      try { ytPlayerRef.current?.destroy(); } catch { /* ignore */ }
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        playlist,
        currentTrack,
        currentTrackIndex,
        isPlaying,
        volume,
        isMuted,
        progress,
        currentTime,
        duration,
        showMiniPlayer,
        audioFrequencies,
        isYTReady,
        formatTime,
        togglePlay,
        playNext,
        playPrev,
        selectTrack,
        setVolume: handleVolumeChange,
        setIsMuted,
        toggleMute,
        setProgress: handleProgressClick,
        setShowMiniPlayer,
        playSoundEffect,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
