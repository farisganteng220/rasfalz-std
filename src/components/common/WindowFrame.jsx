import React from 'react';
import { useOS } from '../../context/OSContext';
import { useAudio } from '../../context/AudioContext';
import { ArrowLeft, X, Home, Search, RefreshCw } from 'lucide-react';
import { DecorativeBackground } from './DecorativeBackground';

export const WindowFrame = ({
  title,
  icon: Icon,
  children,
  badgeText = "Rasfalz OS",
  onClose,
  decorScheme = 'mixed',
}) => {
  const { isMobile, closeApp, windowState, setWindowState } = useOS();
  const { playSoundEffect } = useAudio();

  const handleClose = () => {
    playSoundEffect('click');
    if (onClose) onClose();
    else closeApp();
  };

  const toggleMaximize = () => {
    setWindowState(prev => (prev === 'maximized' ? 'normal' : 'maximized'));
  };

  if (isMobile) {
    return (
      <div className="mobile-standalone-page page-fade-in">
        <DecorativeBackground variant="subtle" scheme={decorScheme} cols={6} rows={6} opacity={0.55} />
        
        {/* Modern Sticky Mobile Header */}
        <header className="mobile-page-header">
          <div className="mobile-header-left">
            <button
              className="mobile-header-btn btn-press"
              onClick={handleClose}
              aria-label="Kembali ke Beranda"
              title="Kembali"
            >
              <ArrowLeft size={19} />
            </button>
          </div>

          <div className="mobile-header-center">
            {Icon && (
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '8px',
                  background: 'var(--btn-orange-bg, #D46200)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  flexShrink: 0,
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                }}
              >
                <Icon size={14} />
              </div>
            )}
            <h1 className="mobile-page-title">{title}</h1>
          </div>

          <div className="mobile-header-right" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              className="mobile-header-btn btn-press"
              onClick={() => {
                playSoundEffect('click');
                closeApp();
              }}
              aria-label="Beranda"
              title="Kembali ke Beranda"
            >
              <Home size={18} />
            </button>
          </div>
        </header>

        <main style={{ padding: '16px 14px 28px 14px', position: 'relative', zIndex: 1 }}>
          {children}
        </main>
      </div>
    );
  }

  const isMaximized = windowState === 'maximized';

  return (
    <div
      className="os-window-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="os-window window-zoom-in"
        style={{
          width: isMaximized ? '98vw' : '92vw',
          maxWidth: isMaximized ? '100%' : '1240px',
          height: isMaximized ? '96vh' : '88vh',
          transition: 'all var(--transition-normal)',
        }}
      >
        <div className="os-window-header">
          <div className="os-window-controls">
            <button className="window-btn window-btn-close" title="Tutup Jendela" onClick={handleClose} />
            <button className="window-btn window-btn-min" title="Kecilkan Jendela" onClick={handleClose} />
            <button className="window-btn window-btn-max" title={isMaximized ? 'Pulihkan Jendela' : 'Perbesar Jendela'} onClick={toggleMaximize} />
          </div>
          <div className="os-window-title">
            {Icon && (
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '7px',
                  background: 'var(--btn-blue-bg, #0045B8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  flexShrink: 0,
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                }}
              >
                <Icon size={13} />
              </div>
            )}
            <span>{title}</span>
            <span className="badge badge-glass" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>{badgeText}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button onClick={() => window.location.reload()} style={{ color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }} title="Muat Ulang">
              <RefreshCw size={14} />
            </button>
            <button onClick={handleClose} style={{ color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }} title="Tutup">
              <X size={16} />
            </button>
          </div>
        </div>
        <div className="os-window-body" style={{ position: 'relative' }}>
          <DecorativeBackground variant="subtle" scheme={decorScheme} cols={10} rows={7} opacity={0.5} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WindowFrame;
