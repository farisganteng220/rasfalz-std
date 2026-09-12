import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useOS } from '../../context/OSContext';
import {
  Sliders,
  Type,
  Eye,
  RotateCcw,
  X,
  Volume2,
  BookOpen,
  Contrast,
  Activity,
  MousePointer,
  ExternalLink,
} from 'lucide-react';

export const AccessibilityModal = ({ isOpen, onClose }) => {
  const {
    settings,
    setFontSize,
    setHighContrast,
    setDyslexicFont,
    setReducedMotion,
    setHighlightLinks,
    setLargeCursor,
    applyPreset,
    resetSettings,
  } = useAccessibility();

  const { openApp, addToast } = useOS();

  if (!isOpen) return null;

  return (
    <div
      className="mobile-drawer-overlay"
      onClick={onClose}
      style={{ zIndex: 1100 }}
    >
      <div
        className="mobile-drawer-sheet animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '540px', margin: '0 auto', width: '100%', maxHeight: '82vh' }}
      >
        <div className="mobile-drawer-handle" />

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '12px',
                background: 'linear-gradient(145deg, #0052F5 0%, #002D8A 100%)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Eye size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Pengaturan Aksesibilitas
              </h3>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: 0 }}>
                Kustomisasi kenyamanan visual & interaksi instan
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="mobile-header-btn"
            style={{ width: '34px', height: '34px', borderRadius: '10px' }}
            aria-label="Tutup Aksesibilitas"
          >
            <X size={17} />
          </button>
        </div>

        {/* Quick Toggles List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '56vh', paddingRight: '2px' }}>
          {/* Font Size Quick Row */}
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '14px',
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
            }}
          >
            <div style={{ fontSize: '0.82rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
              Ukuran Teks
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
              {[
                { label: '100%', val: '100' },
                { label: '112%', val: '112' },
                { label: '125%', val: '125' },
                { label: '140%', val: '140' },
              ].map(f => (
                <button
                  key={f.val}
                  onClick={() => setFontSize(f.val)}
                  className={`btn-press ${settings.fontSize === f.val ? 'badge-orange' : 'badge-glass'}`}
                  style={{
                    padding: '6px 4px',
                    borderRadius: '8px',
                    border: `2px solid ${settings.fontSize === f.val ? 'var(--color-orange)' : 'var(--border-subtle)'}`,
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* High Contrast */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: '14px',
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
            }}
          >
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 800 }}>Kontras Tinggi</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Meningkatkan ketegasan warna & teks</div>
            </div>
            <button
              onClick={() => setHighContrast(!settings.highContrast)}
              className={`btn btn-sm ${settings.highContrast ? 'btn-primary-orange' : 'btn-glass'}`}
              style={{ minWidth: '70px', padding: '4px 10px', fontSize: '0.72rem' }}
            >
              {settings.highContrast ? 'Aktif' : 'Nonaktif'}
            </button>
          </div>

          {/* Dyslexic Font */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: '14px',
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
            }}
          >
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 800 }}>Font Ramah Disleksia</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Font yang lebih mudah dieja & dibaca</div>
            </div>
            <button
              onClick={() => setDyslexicFont(!settings.dyslexicFont)}
              className={`btn btn-sm ${settings.dyslexicFont ? 'btn-primary-orange' : 'btn-glass'}`}
              style={{ minWidth: '70px', padding: '4px 10px', fontSize: '0.72rem' }}
            >
              {settings.dyslexicFont ? 'Aktif' : 'Nonaktif'}
            </button>
          </div>

          {/* Reduced Motion */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: '14px',
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
            }}
          >
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 800 }}>Kurangi Animasi</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Hentikan putaran dan animasi gerak</div>
            </div>
            <button
              onClick={() => setReducedMotion(!settings.reducedMotion)}
              className={`btn btn-sm ${settings.reducedMotion ? 'btn-primary-orange' : 'btn-glass'}`}
              style={{ minWidth: '70px', padding: '4px 10px', fontSize: '0.72rem' }}
            >
              {settings.reducedMotion ? 'Aktif' : 'Nonaktif'}
            </button>
          </div>

          {/* Highlight Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: '14px',
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
            }}
          >
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 800 }}>Sorot Semua Tautan</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Garis bawah tebal pada link & tombol</div>
            </div>
            <button
              onClick={() => setHighlightLinks(!settings.highlightLinks)}
              className={`btn btn-sm ${settings.highlightLinks ? 'btn-primary-orange' : 'btn-glass'}`}
              style={{ minWidth: '70px', padding: '4px 10px', fontSize: '0.72rem' }}
            >
              {settings.highlightLinks ? 'Aktif' : 'Nonaktif'}
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '14px', paddingTop: '12px', borderTop: '2px solid var(--border-subtle)' }}>
          <button
            onClick={() => {
              onClose();
              openApp('accessibility');
            }}
            className="btn btn-primary-blue btn-sm"
            style={{ flex: 1, padding: '9px 12px', fontSize: '0.8rem', fontWeight: 700 }}
          >
            <ExternalLink size={14} />
            <span>Pusat Aksesibilitas Lengkap</span>
          </button>

          <button
            onClick={() => {
              resetSettings();
              addToast('Reset Berhasil', 'Pengaturan aksesibilitas kembali normal.', 'info');
            }}
            className="btn btn-glass btn-sm"
            style={{ padding: '9px 12px', fontSize: '0.8rem' }}
            title="Reset Pengaturan"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityModal;
