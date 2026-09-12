import React, { useState } from "react";
import { useAudio } from "../../context/AudioContext";
import { AudioVisualizer } from "./AudioVisualizer";
import { Play, Pause, SkipForward, SkipBack, ChevronDown, X, Music2 } from "lucide-react";

export const MobileFloatingMusicPlayer = () => {
  const {
    currentTrack, isPlaying, togglePlay, playNext, playPrev, progress,
  } = useAudio();

  const [isDismissed, setIsDismissed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  if (isDismissed) return null;

  return (
    <div
      className="animate-slide-up"
      style={{
        position: "fixed",
        bottom: isExpanded ? "116px" : "114px",
        left: "16px",
        right: "16px",
        maxWidth: "380px",
        margin: "0 auto",
        zIndex: 998,
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: "auto",
      }}
    >
      <div
        style={{
          background: "var(--bg-surface-elevated)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: "16px",
          border: "2px solid var(--border-medium)",
          overflow: "hidden",
          transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        }}
      >
        {/* Progress bar */}
        <div style={{ height: "2px", background: "var(--border-medium)" }}>
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "var(--color-orange)",
              transition: "width 0.3s linear",
            }}
          />
        </div>

        {/* Compact pill row */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px" }}>
          {/* Cover art */}
          <div style={{ width: "34px", height: "34px", borderRadius: "8px", overflow: "hidden", flexShrink: 0, border: "2px solid var(--color-orange)" }}>
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", transform: isPlaying ? "rotate(360deg)" : "none", transition: "transform 10s linear infinite" }}
            />
          </div>

          {/* Track info */}
          <div onClick={() => setIsExpanded(!isExpanded)} style={{ flex: 1, minWidth: 0, cursor: "pointer" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {currentTrack.title}
            </div>
            <div style={{ fontSize: "0.66rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
              <Music2 size={10} />
              {currentTrack.artist}
            </div>
          </div>

          {isPlaying && <AudioVisualizer barCount={4} height={13} />}

          <button onClick={playPrev} style={{ color: "var(--text-secondary)", padding: "4px", cursor: "pointer", display: "flex", alignItems: "center" }} title="Previous">
            <SkipBack size={15} />
          </button>

          <button
            onClick={togglePlay}
            className="btn-press"
            style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--color-orange)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: "1px" }} />}
          </button>

          <button onClick={playNext} style={{ color: "var(--text-secondary)", padding: "4px", cursor: "pointer", display: "flex", alignItems: "center" }} title="Next">
            <SkipForward size={15} />
          </button>

          <button onClick={() => setIsDismissed(true)} style={{ color: "var(--text-muted)", padding: "4px", cursor: "pointer", display: "flex", alignItems: "center" }} title="Tutup">
            <X size={14} />
          </button>
        </div>

        {/* Expanded panel */}
        {isExpanded && (
          <div style={{ padding: "4px 16px 14px", display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
            <div style={{ width: "110px", height: "110px", borderRadius: "14px", overflow: "hidden", border: "2px solid var(--color-orange)" }}>
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", transform: isPlaying ? "rotate(360deg)" : "none", transition: "transform 12s linear infinite" }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontWeight: 700, fontSize: "0.9rem", margin: 0 }}>{currentTrack.title}</p>
              <p style={{ fontSize: "0.74rem", color: "var(--text-muted)", margin: "2px 0 0" }}>{currentTrack.artist}</p>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              style={{ color: "var(--text-muted)", cursor: "pointer", padding: "4px 12px", borderRadius: "999px", background: "var(--bg-card)", border: "2px solid var(--border-medium)", display: "flex", alignItems: "center", gap: "4px", fontSize: "0.72rem" }}
            >
              <ChevronDown size={13} />
              <span>Tutup</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
