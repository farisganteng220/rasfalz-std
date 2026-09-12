import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { APP_REGISTRY } from '../desktop/AppLauncherModal';
import { Search, X, Sparkles, LayoutGrid } from 'lucide-react';

// Helper function to produce a single-color gradient with slightly darkened base
const getSingleColorShadedGradient = (hex, darkenAmount = 24) => {
  if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) {
    return hex || '#FF9C0F';
  }
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) cleanHex = cleanHex.split('').map(c => c + c).join('');
  const num = parseInt(cleanHex, 16);
  if (isNaN(num)) return hex;
  const r = (num >> 16);
  const g = ((num >> 8) & 0x00ff);
  const b = (num & 0x0000ff);

  const factor = (100 - darkenAmount) / 100;
  const darkR = Math.max(0, Math.min(255, Math.round(r * factor)));
  const darkG = Math.max(0, Math.min(255, Math.round(g * factor)));
  const darkB = Math.max(0, Math.min(255, Math.round(b * factor)));

  const darkHex = `#${((1 << 24) + (darkR << 16) + (darkG << 8) + darkB).toString(16).slice(1)}`;
  return `linear-gradient(160deg, ${hex} 0%, ${darkHex} 100%)`;
};

export const MobileAppDrawerModal = ({ isOpen, onClose }) => {
  const { openApp } = useOS();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!isOpen) return null;

  const categories = ['All', 'Works', 'Store', 'Services', 'Media', 'System', 'Social', 'Creator'];

  const filteredApps = APP_REGISTRY.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mobile-drawer-overlay" onClick={onClose}>
      <div className="mobile-drawer-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Handle Bar */}
        <div className="mobile-drawer-handle" />

        {/* Header & Title */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '10px',
                background: getSingleColorShadedGradient('#FF9C0F', 30),
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LayoutGrid size={16} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                App Drawer & Tools
              </h3>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>
                {APP_REGISTRY.length} Aplikasi & Pusat Layanan
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="mobile-header-btn"
            style={{ width: '34px', height: '34px', borderRadius: '10px' }}
            aria-label="Tutup App Drawer"
          >
            <X size={17} />
          </button>
        </div>

        {/* Search Input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-surface)',
            border: '2px solid var(--border-medium)',
            borderRadius: '14px',
            padding: '8px 12px',
            marginBottom: '12px',
          }}
        >
          <Search size={16} className="text-orange" />
          <input
            type="text"
            placeholder="Cari aplikasi atau fitur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '0.86rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-primary)',
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '2px',
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="android-category-tabs" style={{ marginBottom: '14px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`android-cat-pill ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat === 'All' ? 'Semua App' : cat}
            </button>
          ))}
        </div>

        {/* Apps List Grid */}
        <div
          style={{
            overflowY: 'auto',
            maxHeight: '48vh',
            paddingRight: '2px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px 8px',
          }}
        >
          {filteredApps.map((app) => {
            const Icon = app.icon;
            const shadedBg = getSingleColorShadedGradient(app.color, 30);

            return (
              <div
                key={app.id}
                className="android-app-item btn-press"
                onClick={() => {
                  openApp(app.id);
                  onClose();
                }}
              >
                <div
                  className="android-app-icon-squircle"
                  style={{
                    background: shadedBg,
                    color: '#FFFFFF',
                  }}
                >
                  <Icon size={24} />
                </div>
                <span className="android-app-label">{app.name}</span>
              </div>
            );
          })}
        </div>

        {filteredApps.length === 0 && (
          <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Tidak ada aplikasi yang cocok dengan kata kunci "{searchTerm}".
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileAppDrawerModal;
