import React, { useEffect, useState, useCallback } from 'react';
import { X, ZoomIn, ZoomOut, ExternalLink, ChevronLeft, ChevronRight, Maximize } from 'lucide-react';

export const Lightbox = ({
  isOpen,
  image,
  title,
  caption,
  onClose,
  items = [],
  currentIndex = -1,
  onNavigate = null,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  // Reset zoom when navigating between items
  useEffect(() => {
    setIsZoomed(false);
  }, [currentIndex, image]);

  // Handle keyboard navigation (Escape, ArrowLeft, ArrowRight)
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onNavigate && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && onNavigate && currentIndex < items.length - 1) {
        onNavigate(currentIndex + 1);
      }
    },
    [onClose, onNavigate, currentIndex, items.length]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !image) return null;

  const hasPrev = onNavigate && currentIndex > 0;
  const hasNext = onNavigate && currentIndex < items.length - 1;

  return (
    <div
      className="animate-fade-in"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(25, 25, 25, 0.95)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        boxSizing: 'border-box',
        userSelect: 'none',
        overflow: 'hidden',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* ────────────────────────────────────────────
          1. TOP CONTROLS BAR
      ──────────────────────────────────────────── */}
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          zIndex: 20,
          marginBottom: '10px',
        }}
      >
        {/* Left: Counter & Title Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
          {items.length > 1 && currentIndex >= 0 && (
            <span
              className="badge badge-orange"
              style={{
                fontSize: '0.75rem',
                padding: '5px 12px',
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {currentIndex + 1} / {items.length}
            </span>
          )}
          {title && (
            <span
              style={{
                color: '#fff',
                fontSize: '0.92rem',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '400px',
                display: 'none', // Shown on desktop via media query or clean design
              }}
            >
              {title}
            </span>
          )}
        </div>

        {/* Right: Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="btn btn-glass btn-sm hover-lift"
            style={{
              color: '#fff',
              padding: '6px 12px',
              borderRadius: 'var(--radius-pill)',
              background: isZoomed ? 'var(--color-orange)' : 'rgba(255,255,255,0.1)',
              border: isZoomed ? '2px solid var(--color-orange)' : '2px solid rgba(255,255,255,0.15)',
              fontSize: '0.78rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
            title={isZoomed ? 'Reset Ukuran (Fit)' : 'Zoom In Detail'}
          >
            {isZoomed ? <ZoomOut size={15} /> : <ZoomIn size={15} />}
            <span>{isZoomed ? 'Fit Screen' : 'Zoom'}</span>
          </button>

          <a
            href={image}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-glass btn-sm hover-lift"
            style={{
              color: '#fff',
              padding: '6px 12px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(255,255,255,0.1)',
              border: '2px solid rgba(255,255,255,0.15)',
              fontSize: '0.78rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
            }}
            title="Buka Gambar Resolusi Asli"
          >
            <ExternalLink size={14} />
            <span>Full Res</span>
          </a>

          <button
            onClick={onClose}
            className="btn btn-primary-orange btn-sm hover-lift"
            style={{
              width: '36px',
              height: '36px',
              padding: 0,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(255,156,15,0.4)',
            }}
            title="Tutup (Esc)"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          2. MAIN IMAGE VIEWPORT (AUTO FITS 100% PRECISE)
      ──────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          width: '100%',
          minHeight: 0,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 10px',
          boxSizing: 'border-box',
          overflow: isZoomed ? 'auto' : 'hidden',
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget && !isZoomed) onClose();
        }}
      >
        {/* Navigation Arrows */}
        {hasPrev && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(currentIndex - 1);
            }}
            className="hover-lift btn-press"
            style={{
              position: 'absolute',
              left: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(16, 14, 18, 0.82)',
              backdropFilter: 'blur(12px)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              color: '#fff',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 15,
              boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
              transition: 'all 0.2s ease',
            }}
            title="Foto Sebelumnya (Panah Kiri)"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {hasNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(currentIndex + 1);
            }}
            className="hover-lift btn-press"
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(16, 14, 18, 0.82)',
              backdropFilter: 'blur(12px)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              color: '#fff',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 15,
              boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
              transition: 'all 0.2s ease',
            }}
            title="Foto Selanjutnya (Panah Kanan)"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Center Image Element (Strictly fitted within boundaries) */}
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: isZoomed ? 'auto' : 'hidden',
          }}
        >
          <img
            src={image}
            alt={title || 'Visual Preview'}
            onClick={() => setIsZoomed(!isZoomed)}
            className="animate-scale-in"
            style={{
              maxWidth: isZoomed ? 'none' : '100%',
              maxHeight: isZoomed ? 'none' : '100%',
              width: isZoomed ? 'auto' : 'auto',
              height: isZoomed ? 'auto' : 'auto',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 24px 70px rgba(0,0,0,0.9)',
              border: '2px solid rgba(255,255,255,0.15)',
              cursor: isZoomed ? 'zoom-out' : 'zoom-in',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: isZoomed ? 'scale(1.4)' : 'none',
              transformOrigin: 'center center',
              margin: 'auto',
            }}
          />
        </div>
      </div>

      {/* ────────────────────────────────────────────
          3. BOTTOM TITLE & CAPTION BAR
      ──────────────────────────────────────────── */}
      {(title || caption) && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexShrink: 0,
            zIndex: 20,
            marginTop: '12px',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              background: 'rgba(16, 14, 18, 0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '8px 24px',
              borderRadius: 'var(--radius-pill)',
              border: '2px solid rgba(255, 156, 15, 0.35)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
              maxWidth: '90%',
              pointerEvents: 'auto',
            }}
          >
            {title && (
              <h3
                style={{
                  color: '#fff',
                  fontSize: '0.98rem',
                  fontWeight: 900,
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {title}
              </h3>
            )}
            {caption && (
              <p
                style={{
                  color: 'var(--color-orange)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  margin: title ? '3px 0 0 0' : 0,
                  lineHeight: 1.3,
                }}
              >
                {caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Lightbox;

