import React from 'react';
import { Search, Mic, Camera, Sparkles } from 'lucide-react';
import { useOS } from '../../context/OSContext';

export const GoogleSearchPill = () => {
  const { setSearchModalOpen, openApp } = useOS();

  return (
    <div
      className="android-search-pill btn-press"
      onClick={() => setSearchModalOpen(true)}
      style={{ cursor: 'pointer' }}
    >
      <div className="search-pill-left">
        {/* Google 'G' stylized logo with vibrant gradient */}
        <div className="search-g-logo">
          G
        </div>
        <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
          Cari karya, tools, musik...
        </span>
      </div>

      <div className="search-pill-icons">
        <button
          className="search-action-icon-btn"
          aria-label="Cari Suara"
          title="Pencarian Cepat"
          onClick={(e) => {
            e.stopPropagation();
            setSearchModalOpen(true);
          }}
        >
          <Mic size={16} style={{ color: 'var(--color-blue)' }} />
        </button>

        <button
          className="search-action-icon-btn"
          aria-label="Buka Kamera Kreatif"
          title="Kamera Photo Booth"
          onClick={(e) => {
            e.stopPropagation();
            openApp('camera');
          }}
        >
          <Camera size={16} style={{ color: 'var(--color-orange)' }} />
        </button>
      </div>
    </div>
  );
};

export default GoogleSearchPill;
