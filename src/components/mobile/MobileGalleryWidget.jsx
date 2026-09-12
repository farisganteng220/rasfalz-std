import React from 'react';
import { siteConfig } from '../../config/siteConfig';
import { useOS } from '../../context/OSContext';
import { useAudio } from '../../context/AudioContext';
import {
  Image as ImageIcon,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Eye,
} from 'lucide-react';

export const MobileGalleryWidget = () => {
  const { openApp } = useOS();
  const { playSoundEffect } = useAudio();

  const galleryItems = siteConfig.galleryItems || [];
  const previewItems = galleryItems.slice(0, 6);

  const handleOpenGallery = () => {
    playSoundEffect('open');
    openApp('gallery');
  };

  return (
    <div style={{ padding: '0 16px', marginBottom: '20px' }}>
      <div
        className="glass-card"
        style={{
          padding: '16px',
          borderRadius: '22px',
          background: 'var(--bg-surface-elevated)',
          border: '2px solid var(--border-medium)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {/* Widget Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid var(--border-subtle)',
            paddingBottom: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '11px',
                background: 'linear-gradient(135deg, #8B5CF6 0%, #0052F5 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 3px 10px rgba(139, 92, 246, 0.3)',
              }}
            >
              <ImageIcon size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                Visual Gallery & Artworks
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {galleryItems.length} Koleksi Karya Resolusi Tinggi
              </div>
            </div>
          </div>

          <button
            onClick={handleOpenGallery}
            className="btn-press"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.74rem',
              fontWeight: 800,
              padding: '5px 12px',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--color-orange-subtle)',
              border: '2px solid var(--color-orange)',
              color: 'var(--color-orange)',
              cursor: 'pointer',
            }}
          >
            <span>Lihat Semua</span>
            <ChevronRight size={13} />
          </button>
        </div>

        {/* Horizontal Snap Carousel */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: '4px',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            margin: '0 -4px',
            padding: '0 4px 4px 4px',
          }}
        >
          {previewItems.map((item) => (
            <div
              key={item.id}
              onClick={handleOpenGallery}
              className="btn-press"
              style={{
                scrollSnapAlign: 'start',
                flexShrink: 0,
                width: '180px',
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'var(--bg-surface)',
                border: '2px solid var(--border-medium)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s ease',
              }}
            >
              {/* Image Preview Thumbnail */}
              <div
                style={{
                  height: '120px',
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  background: '#0D0F17',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                  }}
                >
                  <span
                    className="badge badge-category"
                    style={{
                      fontSize: '0.62rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                    }}
                  >
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Card Meta */}
              <div style={{ padding: '9px 12px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <h5
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    margin: 0,
                    color: 'var(--text-primary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {item.title}
                </h5>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.68rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <span
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100px',
                    }}
                  >
                    {item.camera || 'Digital Art'}
                  </span>
                  <span style={{ fontWeight: 800, color: 'var(--color-orange)', flexShrink: 0 }}>
                    {item.date}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* View More Card */}
          <div
            onClick={handleOpenGallery}
            className="btn-press"
            style={{
              scrollSnapAlign: 'start',
              flexShrink: 0,
              width: '130px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(0,82,245,0.1) 0%, rgba(255,156,15,0.12) 100%)',
              border: '2px dashed var(--color-orange)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '16px 10px',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'var(--color-orange)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(255,156,15,0.4)',
              }}
            >
              <ArrowRight size={17} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Buka Galeri
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                +{Math.max(0, galleryItems.length - previewItems.length)} foto lainnya
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileGalleryWidget;
