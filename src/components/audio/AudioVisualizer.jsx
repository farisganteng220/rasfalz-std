import React from 'react';
import { useAudio } from '../../context/AudioContext';

export const AudioVisualizer = ({ barCount = 12, height = 24 }) => {
  const { isPlaying, audioFrequencies } = useAudio();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '3px',
        height: `${height}px`,
      }}
    >
      {Array.from({ length: barCount }).map((_, index) => {
        const val = audioFrequencies[index % audioFrequencies.length] || 15;
        const barHeight = isPlaying ? Math.max(4, (val / 100) * height) : 4;

        return (
          <div
            key={index}
            style={{
              width: '3px',
              height: `${barHeight}px`,
              borderRadius: '2px',
              background: index % 2 === 0 ? 'var(--color-orange)' : 'var(--color-blue)',
              transition: 'height 0.12s ease-in-out',
            }}
          />
        );
      })}
    </div>
  );
};
