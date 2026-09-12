import React, { useState, useMemo, useDeferredValue } from 'react';
import { siteConfig } from '../config/siteConfig';
import { WindowFrame } from '../components/common/WindowFrame';
import { Lightbox } from '../components/common/Lightbox';
import { useOS } from '../context/OSContext';
import { DecorativeBackground } from '../components/common/DecorativeBackground';
import {
  Image as ImageIcon,
  Eye,
  User,
  Calendar,
  Sparkles,
  Search,
  X,
  LayoutGrid,
  Maximize2,
  Columns,
  Grid,
} from 'lucide-react';

/* ────────────────────────────────────────────
   GALLERY SEARCH BAR COMPONENT
   - Mobile: Rectangle Rounded (12px radius)
   - Desktop: Modern Rounded (14px radius)
──────────────────────────────────────────── */
const GallerySearchBar = React.memo(({ searchTerm, setSearchTerm, isMobile }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        background: 'var(--bg-surface)',
        border: isFocused ? '2px solid var(--color-orange)' : '2px solid var(--border-medium)',
        // RECTANGLE ROUNDED KHUSUS TAMPILAN HP
        borderRadius: isMobile ? '12px' : '14px',
        padding: '0 14px',
        height: isMobile ? '46px' : '48px',
        boxShadow: isFocused
          ? '0 0 0 3px rgba(255,156,15,0.2), 0 4px 18px rgba(0,0,0,0.15)'
          : '0 2px 12px rgba(0,0,0,0.08)',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px',
          flexShrink: 0,
          color: isFocused ? 'var(--color-orange)' : 'var(--text-muted)',
          transition: 'color 0.2s ease',
        }}
      >
        <Search size={18} />
      </div>

      <input
        type="text"
        placeholder="Cari artwork, creator, 3D render, atau kategori..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          fontSize: isMobile ? '0.88rem' : '0.92rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-primary)',
          minWidth: 0,
          padding: '0 12px',
          margin: 0,
          height: '100%',
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px',
          flexShrink: 0,
        }}
      >
        {searchTerm ? (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            style={{
              color: 'var(--text-muted)',
              cursor: 'pointer',
              background: 'rgba(255,255,255,0.08)',
              border: 'none',
              padding: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'all 0.15s ease',
            }}
            title="Hapus pencarian"
          >
            <X size={14} />
          </button>
        ) : (
          <div style={{ width: '24px', height: '24px' }} />
        )}
      </div>
    </div>
  );
});

/* ────────────────────────────────────────────
   MAIN GALLERY PAGE
──────────────────────────────────────────── */
export const GalleryPage = () => {
  const { isMobile } = useOS();
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [layoutMode, setLayoutMode] = useState('masonry'); // 'masonry' | 'grid'
  const [activeLightbox, setActiveLightbox] = useState(null);

  const deferredSearch = useDeferredValue(searchTerm);

  // Kategori disesuaikan secara dinamis dengan kategori yang ada pada galeri gambar
  const categories = useMemo(() => {
    const rawCategories = (siteConfig.galleryItems || [])
      .map((item) => item.category)
      .filter(Boolean);
    const unique = Array.from(new Set(rawCategories));
    return ['Semua', ...unique];
  }, []);

  const filteredGallery = useMemo(() => {
    const term = deferredSearch.trim().toLowerCase();
    return (siteConfig.galleryItems || []).filter((item) => {
      const matchesCategory =
        selectedCategory === 'Semua' ||
        selectedCategory === 'All' ||
        item.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!term) return true;

      return (
        item.title.toLowerCase().includes(term) ||
        (item.creator || item.camera || '').toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.date.toLowerCase().includes(term)
      );
    });
  }, [deferredSearch, selectedCategory]);

  const lightboxIndex = activeLightbox
    ? filteredGallery.findIndex((it) => it.id === activeLightbox.id)
    : -1;

  const handleLightboxNavigate = (newIndex) => {
    if (newIndex >= 0 && newIndex < filteredGallery.length) {
      setActiveLightbox(filteredGallery[newIndex]);
    }
  };

  return (
    <WindowFrame
      title="Visual Gallery & Artworks"
      icon={ImageIcon}
      badgeText="Creative Shots"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '20px' : '28px' }}>
        {/* HERO BANNER */}
        <div
          style={{
            position: 'relative',
            borderRadius: isMobile ? '16px' : '22px',
            overflow: 'hidden',
            background: 'var(--bg-surface)',
            border: '2px solid var(--border-medium)',
            padding: isMobile ? '20px 16px' : '28px 32px',
            boxShadow: '0 4px 28px rgba(0,0,0,0.1)',
            boxSizing: 'border-box',
            width: '100%',
          }}
        >
          <DecorativeBackground isMobile={isMobile} scheme="mixed" />
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: isMobile ? 'flex-start' : 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                  }}
                >
                  <span className="badge badge-orange" style={{ fontSize: '0.68rem' }}>
                    ✦ Visual Archive
                  </span>
                  <span className="badge badge-blue" style={{ fontSize: '0.68rem' }}>
                    High-Res Renders
                  </span>
                </div>

                <h1
                  style={{
                    fontSize: isMobile ? '1.38rem' : '2.1rem',
                    fontWeight: 900,
                    marginBottom: '6px',
                    lineHeight: '1.2',
                  }}
                >
                  Rasfalz <span className="text-gradient">Gallery &amp; Visual Archive</span>
                </h1>

                <p
                  style={{
                    maxWidth: '620px',
                    margin: 0,
                    fontSize: isMobile ? '0.82rem' : '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.5',
                  }}
                >
                  Koleksi desain grafis, fotografi, dan desain poster, gfx, maupun flyer.
                </p>
              </div>

              {/* Quick Counter */}
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  width: isMobile ? '100%' : 'auto',
                }}
              >
                {[
                  { val: siteConfig.galleryItems.length, label: 'Koleksi Foto' },
                  { val: categories.length - 1, label: 'Kategori' },
                ].map((s, idx) => (
                  <div
                    key={idx}
                    style={{
                      flex: isMobile ? 1 : 'initial',
                      minWidth: isMobile ? '0' : '90px',
                      textAlign: 'center',
                      background: 'var(--bg-card)',
                      border: '2px solid var(--border-medium)',
                      borderRadius: isMobile ? '10px' : '12px',
                      padding: '8px 12px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: isMobile ? '1.05rem' : '1.25rem',
                        fontWeight: 900,
                        color: 'var(--color-orange)',
                      }}
                    >
                      {s.val}
                    </div>
                    <div
                      style={{
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        color: 'var(--text-muted)',
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Symmetrical Search Bar (Rectangle Rounded on Mobile) */}
            <div style={{ width: '100%', marginTop: '4px' }}>
              <GallerySearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                isMobile={isMobile}
              />
            </div>
          </div>
        </div>

        {/* CONTROLS: Filter Pills & Layout Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          {/* Categories */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingBottom: '4px',
              flex: '1 1 auto',
            }}
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              const count =
                cat === 'Semua' || cat === 'All'
                  ? siteConfig.galleryItems.length
                  : siteConfig.galleryItems.filter((i) => i.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: isMobile ? '6px 14px' : '7px 16px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: isMobile ? '0.74rem' : '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    fontFamily: 'var(--font-primary)',
                    flexShrink: 0,
                    border: active
                      ? '2px solid var(--btn-orange-border, #BA5400)'
                      : '2px solid var(--border-medium)',
                    background: active
                      ? 'var(--btn-orange-bg, #D46200)'
                      : 'var(--bg-surface)',
                    color: active ? '#fff' : 'var(--text-secondary)',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>{cat}</span>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      opacity: active ? 0.95 : 0.75,
                      background: active ? 'rgba(255,255,255,0.25)' : 'var(--bg-input)',
                      color: active ? '#FFFFFF' : 'var(--text-secondary)',
                      padding: '1px 6px',
                      borderRadius: '10px',
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Layout Mode Switcher (Desktop & Tablet) */}
          {!isMobile && (
            <div
              style={{
                display: 'flex',
                background: 'var(--bg-surface)',
                border: '2px solid var(--border-medium)',
                borderRadius: 'var(--radius-pill)',
                padding: '3px',
              }}
            >
              <button
                onClick={() => setLayoutMode('masonry')}
                className="hover-lift"
                style={{
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  background: layoutMode === 'masonry' ? 'var(--color-orange)' : 'transparent',
                  color: layoutMode === 'masonry' ? '#fff' : 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                }}
                title="Rasio Aspek Dinamis"
              >
                <Columns size={14} />
                <span>Masonry</span>
              </button>

              <button
                onClick={() => setLayoutMode('grid')}
                className="hover-lift"
                style={{
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  background: layoutMode === 'grid' ? 'var(--color-orange)' : 'transparent',
                  color: layoutMode === 'grid' ? '#fff' : 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                }}
                title="Grid Persegi Rata"
              >
                <Grid size={14} />
                <span>Grid</span>
              </button>
            </div>
          )}
        </div>

        {/* GALLERY CARDS CONTAINER */}
        {filteredGallery.length === 0 ? (
          <div
            className="glass-card"
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              borderRadius: 'var(--radius-xl)',
              color: 'var(--text-muted)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <Search size={40} style={{ opacity: 0.4 }} />
            <div>
              <h3 style={{ color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
                Tidak ada foto atau artwork ditemukan
              </h3>
              <p style={{ fontSize: '0.86rem', margin: 0 }}>
                Coba gunakan kata kunci pencarian yang lain atau pilih kategori Semua.
              </p>
            </div>
            {(selectedCategory !== 'Semua' || searchTerm) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('Semua');
                  setSearchTerm('');
                }}
                className="btn btn-primary-orange btn-sm hover-lift"
                style={{ padding: '8px 18px', fontSize: '0.80rem' }}
              >
                Reset Filter &amp; Pencarian
              </button>
            )}
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile
                ? '1fr'
                : 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: isMobile ? '16px' : '22px',
            }}
          >
            {filteredGallery.map((item) => {
              const imageHeight =
                layoutMode === 'grid' || isMobile
                  ? '230px'
                  : item.aspect === 'portrait'
                    ? '340px'
                    : item.aspect === 'square'
                      ? '280px'
                      : '220px';

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveLightbox(item)}
                  className="glass-card hover-lift btn-press"
                  style={{
                    borderRadius: isMobile ? '16px' : 'var(--radius-xl)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: isMobile ? '10px' : '14px',
                    background: 'var(--bg-surface)',
                    border: '2px solid var(--border-medium)',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: imageHeight,
                      borderRadius: isMobile ? '12px' : 'var(--radius-lg)',
                      overflow: 'hidden',
                      marginBottom: '12px',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="hover-scale"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform var(--transition-smooth)',
                      }}
                    />

                    {/* Category Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                      }}
                    >
                      <span className="badge badge-category" style={{ fontSize: '0.65rem' }}>
                        {item.category}
                      </span>
                    </div>

                    {/* Expand Indicator */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        background: 'rgba(12, 10, 14, 0.82)',
                        backdropFilter: 'blur(10px)',
                        color: '#fff',
                        padding: '5px 12px',
                        borderRadius: 'var(--radius-pill)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                        border: '2px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <Maximize2 size={12} />
                      <span>Buka Foto</span>
                    </div>
                  </div>

                  <div style={{ padding: '0 4px 4px 4px' }}>
                    <h3
                      style={{
                        fontSize: isMobile ? '1.02rem' : '1.1rem',
                        fontWeight: 800,
                        marginBottom: '6px',
                        lineHeight: 1.3,
                      }}
                    >
                      {item.title}
                    </h3>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.76rem',
                        color: 'var(--text-muted)',
                        gap: '8px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          minWidth: 0,
                        }}
                      >
                        <User size={13} className="text-orange" style={{ flexShrink: 0 }} />
                        <span
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: isMobile ? '200px' : '220px',
                            fontWeight: 600,
                          }}
                        >
                          {item.creator || item.camera || 'Rasfalz Studio'}
                        </span>
                      </div>
                      <span style={{ flexShrink: 0 }}>{item.date}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Viewer */}
      {activeLightbox && (
        <Lightbox
          isOpen={Boolean(activeLightbox)}
          image={activeLightbox.image}
          title={activeLightbox.title}
          caption={`${activeLightbox.category} • ${activeLightbox.creator || activeLightbox.camera || 'Rasfalz Studio'} • ${activeLightbox.date}`}
          onClose={() => setActiveLightbox(null)}
          items={filteredGallery}
          currentIndex={lightboxIndex}
          onNavigate={handleLightboxNavigate}
        />
      )}
    </WindowFrame>
  );
};
