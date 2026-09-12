import React, { useState, useMemo, useDeferredValue } from 'react';
import { siteConfig } from '../config/siteConfig';
import { WindowFrame } from '../components/common/WindowFrame';
import { Lightbox } from '../components/common/Lightbox';
import { InstagramIcon, YoutubeIcon, TikTokIcon } from '../components/common/BrandIcons';
import { useOS } from '../context/OSContext';
import { useAudio } from '../context/AudioContext';
import { DecorativeBackground } from '../components/common/DecorativeBackground';
import {
  Briefcase,
  Search,
  ExternalLink,
  Palette,
  Eye,
  Sparkles,
  X,
  LayoutGrid,
  List,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight,
  SlidersHorizontal,
  Flame,
  FolderTree,
  Folder,
  FolderOpen,
  HardDrive,
  Cloud,
  Image as ImageIcon,
  Film,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';

/* ────────────────────────────────────────────
   PORTFOLIO SEARCH BAR COMPONENT
   - Mobile: Rectangle Rounded (12px radius)
   - Desktop: Modern Rounded (14px radius)
──────────────────────────────────────────── */
const PortfolioSearchBar = React.memo(({ searchTerm, setSearchTerm, isMobile }) => {
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
          ? '0 4px 18px rgba(0,0,0,0.12)'
          : '0 2px 12px rgba(0,0,0,0.06)',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
      }}
    >
      {/* Search Icon */}
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

      {/* Input */}
      <input
        type="text"
        placeholder="Cari karya, tools, software, atau kategori..."
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

      {/* Clear Button */}
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
   PROJECT DETAIL MODAL
──────────────────────────────────────────── */
const ProjectDetailModal = ({ project, onClose, onOpenLightbox, openApp, isMobile }) => {
  if (!project) return null;

  return (
    <div
      className="animate-fade-in"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(25, 25, 25, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 99990,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '12px' : '16px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="animate-scale-in"
        style={{
          background: 'var(--bg-surface)',
          border: '2px solid var(--border-medium)',
          borderRadius: isMobile ? '20px' : 'var(--radius-xl)',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        {/* Top Image Preview */}
        <div style={{ position: 'relative', width: '100%', height: isMobile ? '200px' : '260px', overflow: 'hidden' }}>
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(12,12,14,0.95) 0%, transparent 65%)',
            }}
          />

          <button
            onClick={onClose}
            className="btn btn-glass btn-sm"
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              width: '36px',
              height: '36px',
              padding: 0,
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.6)',
              color: '#fff',
            }}
          >
            <X size={18} />
          </button>

          <button
            onClick={() => onOpenLightbox(project)}
            className="btn btn-primary-orange btn-sm"
            style={{
              position: 'absolute',
              bottom: '14px',
              right: '14px',
              fontSize: '0.78rem',
            }}
          >
            <Eye size={14} />
            <span>Full Image</span>
          </button>

          <div
            style={{
              position: 'absolute',
              bottom: '14px',
              left: '16px',
              display: 'flex',
              gap: '6px',
            }}
          >
            <span className="badge badge-category">{project.category}</span>
            <span className="badge badge-glass">{project.year}</span>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: isMobile ? '16px' : '24px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '8px' }}>
            {project.title}
          </h2>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '16px',
              fontSize: '0.84rem',
              color: 'var(--text-muted)',
              flexWrap: 'wrap',
            }}
          >
            <div>
              Creator: <strong style={{ color: 'var(--text-primary)' }}>{project.creator || project.client || siteConfig.profile.name}</strong>
            </div>
            <div>•</div>
            <div>
              Tahun: <strong style={{ color: 'var(--text-primary)' }}>{project.year}</strong>
            </div>
          </div>

          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: '20px',
            }}
          >
            {project.description}
          </p>

          {/* Tools & Technologies */}
          <div style={{ marginBottom: '24px' }}>
            <h4
              style={{
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                marginBottom: '8px',
              }}
            >
              Software &amp; Tools Digunakan:
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {project.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="badge badge-neutral"
                  style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {project.isAppShortcut && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (openApp) openApp(project.targetApp || 'files');
                }}
                className="btn btn-primary-orange hover-lift"
                style={{
                  flex: '1 1 180px',
                }}
              >
                {project.targetApp === 'gallery' ? <ImageIcon size={16} /> : <FolderTree size={16} />}
                <span>{project.targetApp === 'gallery' ? 'Buka Aplikasi Gallery' : 'Buka File Explorer'}</span>
              </button>
            )}
            {!project.isAppShortcut && (project.category?.toLowerCase().includes('graphic') || project.category?.toLowerCase().includes('design')) && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (openApp) openApp('gallery');
                }}
                className="btn btn-primary-orange hover-lift"
                style={{ flex: '1 1 180px' }}
              >
                <ImageIcon size={16} />
                <span>Lihat Desain di Gallery</span>
              </button>
            )}
            {project.link && (
              <a
                href={project.link}
                target={project.link.startsWith('#') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (project.isAppShortcut && openApp) {
                    e.preventDefault();
                    onClose();
                    openApp(project.targetApp || 'files');
                  }
                }}
                className="btn btn-glass hover-lift"
                style={{ flex: '1 1 180px' }}
              >
                <span>{project.isAppShortcut ? (project.targetApp === 'gallery' ? 'Jelajahi Galeri' : 'Jelajahi Arsip File') : 'Lihat Live Project'}</span>
                <ArrowUpRight size={16} />
              </a>
            )}
            <a
              href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=Halo%20Raihan%2C%20saya%20tertarik%20dengan%20gaya%20desain%20proyek%20${encodeURIComponent(project.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glass hover-lift"
              style={{ flex: '1 1 180px' }}
            >
              <span>Order Desain Mirip Ini</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────
   MAIN PORTFOLIO COMPONENT
──────────────────────────────────────────── */
export const PortfolioPage = () => {
  const { isMobile, openApp } = useOS();
  const { playSoundEffect } = useAudio();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'compact'
  const [activeLightbox, setActiveLightbox] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // Use deferred value for zero-lag typing
  const deferredSearch = useDeferredValue(searchTerm);

  const categories = [
    'All',
    'Motion Graphic',
    'Video Editing',
    'Graphic Design',
  ];

  // Memoized search filtering
  const filteredItems = useMemo(() => {
    const term = deferredSearch.trim().toLowerCase();
    return siteConfig.portfolioItems.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!term) return true;

      return (
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        (item.creator && item.creator.toLowerCase().includes(term)) ||
        (item.client && item.client.toLowerCase().includes(term)) ||
        item.tools.some((t) => t.toLowerCase().includes(term))
      );
    });
  }, [deferredSearch, selectedCategory]);

  // Lightbox navigation helper
  const lightboxIndex = activeLightbox
    ? filteredItems.findIndex((it) => it.id === activeLightbox.id)
    : -1;

  const handleLightboxNavigate = (newIndex) => {
    if (newIndex >= 0 && newIndex < filteredItems.length) {
      setActiveLightbox(filteredItems[newIndex]);
    }
  };

  // ==========================================
  // MOBILE VIEW: Redesigned & Tailored for Mobile
  // ==========================================
  if (isMobile) {
    return (
      <WindowFrame title="Portofolio &amp; Karya" icon={Briefcase} badgeText="Rasfalz Studio">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '4px 0 28px 0' }}>

          {/* 1. Mobile Top Stats & Header Banner */}
          <div
            className="glass-card"
            style={{
              padding: '16px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, var(--bg-surface) 0%, rgba(255, 156, 15, 0.08) 100%)',
              border: '2px solid var(--border-medium)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="badge badge-orange" style={{ fontSize: '0.66rem', padding: '3px 8px' }}>
                  ✦ CREATIVE SHOWCASE
                </span>
                <span className="badge badge-blue" style={{ fontSize: '0.64rem', padding: '2px 7px' }}>
                  10+ Years Exp
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                {siteConfig.portfolioItems.length} Karya Master
              </span>
            </div>

            <div>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 900, margin: '0 0 4px 0', color: 'var(--text-primary)', lineHeight: 1.25 }}>
                Portofolio &amp; <span className="text-gradient">Karya Kreatif</span>
              </h1>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                Koleksi karya terbaik Motion Graphic, Video Editing ritmik, serta Desain Visual resmi Rasfalz Studio.
              </p>
            </div>

            {/* Micro Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '2px' }}>
              {[
                { val: `${siteConfig.portfolioItems.length}`, label: 'Karya Pilihan' },
                { val: '450+', label: 'Proyek Selesai' },
                { val: '100%', label: 'Klien Puas' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-surface-elevated)',
                    border: '1.5px solid var(--border-medium)',
                    borderRadius: '12px',
                    padding: '8px 6px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--color-orange)', lineHeight: 1.1 }}>
                    {stat.val}
                  </div>
                  <div style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--text-muted)', marginTop: '2px' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Search Input */}
            <div
              className="search-bar"
              style={{
                width: '100%',
                maxWidth: '100%',
                padding: '8px 14px',
                borderRadius: '14px',
                background: 'var(--bg-surface-elevated)',
                border: '2px solid var(--border-medium)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '4px',
                boxSizing: 'border-box',
              }}
            >
              <Search size={15} className="text-orange" />
              <input
                type="text"
                placeholder="Cari karya, tools, software..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '0.82rem',
                  width: '100%',
                  fontFamily: 'var(--font-primary)',
                }}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* 2. Horizontal Category Swipe Bar & View Switcher */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '4px',
                scrollbarWidth: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                const count =
                  cat === 'All'
                    ? siteConfig.portfolioItems.length
                    : siteConfig.portfolioItems.filter((i) => i.category === cat).length;
                const Icon =
                  cat === 'All'
                    ? LayoutGrid
                    : cat === 'Motion Graphic'
                    ? Flame
                    : cat === 'Video Editing'
                    ? Film
                    : Palette;

                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      playSoundEffect?.('click');
                    }}
                    className={`filter-pill ${isActive ? 'active' : ''}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '7px 14px',
                      fontSize: '0.78rem',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      borderRadius: 'var(--radius-pill)',
                    }}
                  >
                    <Icon size={13} />
                    <span>{cat === 'All' ? 'Semua Karya' : cat}</span>
                    <span style={{ opacity: 0.8, fontSize: '0.7rem' }}>({count})</span>
                  </button>
                );
              })}
            </div>

            {/* List Header & View Mode Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2px' }}>
              <span style={{ fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Daftar Portofolio ({filteredItems.length})
              </span>

              <div
                style={{
                  display: 'flex',
                  background: 'var(--bg-surface)',
                  border: '1.5px solid var(--border-medium)',
                  borderRadius: 'var(--radius-pill)',
                  padding: '2px',
                  gap: '2px',
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('grid');
                    playSoundEffect?.('click');
                  }}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-pill)',
                    border: 'none',
                    background: viewMode === 'grid' ? 'var(--color-orange)' : 'transparent',
                    color: viewMode === 'grid' ? '#fff' : 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                  }}
                >
                  <LayoutGrid size={12} />
                  <span>Feed</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('compact');
                    playSoundEffect?.('click');
                  }}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-pill)',
                    border: 'none',
                    background: viewMode === 'compact' ? 'var(--color-orange)' : 'transparent',
                    color: viewMode === 'compact' ? '#fff' : 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                  }}
                >
                  <List size={12} />
                  <span>List</span>
                </button>
              </div>
            </div>
          </div>

          {/* 4. Portfolio Items List */}
          {filteredItems.length === 0 ? (
            <div
              className="glass-card"
              style={{
                padding: '36px 16px',
                textAlign: 'center',
                borderRadius: '16px',
                background: 'var(--bg-surface)',
              }}
            >
              <Briefcase size={36} className="text-orange" style={{ margin: '0 auto 8px auto', opacity: 0.6 }} />
              <h4 style={{ fontSize: '0.96rem', margin: '0 0 4px 0' }}>Tidak ada karya yang cocok</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 12px 0' }}>
                Coba kata kunci pencarian lain atau pilih kategori Semua.
              </p>
              <button
                type="button"
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                className="btn btn-primary-orange btn-sm"
                style={{ fontSize: '0.78rem' }}
              >
                Reset Filter
              </button>
            </div>
          ) : viewMode === 'compact' ? (
            /* COMPACT LIST VIEW FOR MOBILE */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedProject(item)}
                  className="glass-card btn-press"
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: 'var(--bg-surface)',
                    border: '2px solid var(--border-medium)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ display: 'flex', gap: '12px', padding: '10px' }}>
                    <div
                      style={{
                        width: '84px',
                        height: '84px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        position: 'relative',
                        flexShrink: 0,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '3px',
                          left: '3px',
                        }}
                      >
                        <span className="badge badge-glass" style={{ fontSize: '0.55rem', padding: '1px 4px' }}>
                          {item.year}
                        </span>
                      </div>
                    </div>

                    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', flexWrap: 'wrap' }}>
                          <span className="badge badge-category" style={{ fontSize: '0.60rem', padding: '1px 6px' }}>
                            {item.category}
                          </span>
                        </div>

                        <h4
                          style={{
                            fontSize: '0.88rem',
                            fontWeight: 800,
                            margin: 0,
                            lineHeight: 1.3,
                            color: 'var(--text-primary)',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {item.title}
                        </h4>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                          {item.tools.slice(0, 2).join(', ')}
                        </span>
                        <span style={{ fontSize: '0.74rem', color: 'var(--color-orange)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '2px' }}>
                          Detail <ChevronRight size={13} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* FEED CARD VIEW FOR MOBILE */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="glass-card btn-press"
                  style={{
                    borderRadius: '18px',
                    overflow: 'hidden',
                    background: 'var(--bg-surface)',
                    border: '2px solid var(--border-medium)',
                    boxShadow: '0 2px 14px rgba(0,0,0,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => setSelectedProject(item)}
                    style={{ height: '180px', width: '100%', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Top Badges */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        display: 'flex',
                        gap: '6px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span className="badge badge-category" style={{ fontSize: '0.64rem', padding: '2px 8px' }}>
                        {item.category}
                      </span>
                      <span className="badge badge-glass" style={{ fontSize: '0.64rem', padding: '2px 8px' }}>
                        {item.year}
                      </span>
                    </div>

                    {/* Quick Preview Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveLightbox(item);
                      }}
                      className="btn btn-primary-orange btn-sm"
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        padding: '4px 10px',
                        fontSize: '0.72rem',
                        borderRadius: 'var(--radius-pill)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                      }}
                      title="Lihat Gambar Penuh"
                    >
                      <Eye size={12} />
                      <span>Preview</span>
                    </button>
                  </div>

                  {/* Body Details */}
                  <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h3
                      onClick={() => setSelectedProject(item)}
                      style={{
                        fontSize: '0.98rem',
                        fontWeight: 800,
                        margin: 0,
                        lineHeight: 1.35,
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--text-secondary)',
                        margin: 0,
                        lineHeight: 1.45,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.description}
                    </p>

                    {/* Tools badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '2px' }}>
                      {item.tools.map((tool, idx) => (
                        <span key={idx} className="badge badge-neutral" style={{ fontSize: '0.64rem', padding: '2px 7px' }}>
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* Card Footer Actions */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '2px solid var(--border-subtle)',
                        paddingTop: '10px',
                        marginTop: '4px',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedProject(item)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          fontSize: '0.76rem',
                          color: 'var(--color-orange)',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                        }}
                      >
                        <span>Lihat Detail</span>
                        <ChevronRight size={14} />
                      </button>

                      <div style={{ display: 'flex', gap: '6px' }}>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-glass btn-sm"
                            style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                            title="Buka Tautan"
                          >
                            <ExternalLink size={12} />
                          </a>
                        )}
                        <a
                          href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=Halo%20Raihan%2C%20saya%20tertarik%20dengan%20proyek%20${encodeURIComponent(item.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary-orange btn-sm"
                          style={{ padding: '4px 10px', fontSize: '0.72rem' }}
                        >
                          <span>Order Serupa</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 5. Mobile Social Media Showcase */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} className="text-orange" />
              <h3 style={{ fontSize: '1.05rem', margin: 0, fontWeight: 800, color: 'var(--text-primary)' }}>
                Social Media Showcase
              </h3>
            </div>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
              Kunjungi sosial media resmi kami untuk melihat reels, tutorial motion graphic, dan update karya terbaru.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                {
                  href: siteConfig.socials.instagram.url,
                  grad: '#E1306C',
                  icon: <InstagramIcon size={18} color="#fff" />,
                  label: 'Instagram Showcase',
                  handle: siteConfig.socials.instagram.handle,
                  badge: 'Kunjungi Instagram ↗',
                  cls: 'badge-orange',
                },
                {
                  href: siteConfig.socials.tiktok.url,
                  grad: '#000000',
                  icon: <TikTokIcon size={18} color="#fff" />,
                  label: 'TikTok Reels & AMV',
                  handle: siteConfig.socials.tiktok.handle,
                  badge: 'Tonton TikTok ↗',
                  cls: 'badge-blue',
                },
                {
                  href: siteConfig.socials.youtube.url,
                  grad: '#FF0000',
                  icon: <YoutubeIcon size={18} color="#fff" />,
                  label: 'YouTube Channel',
                  handle: siteConfig.socials.youtube.handle,
                  badge: 'Tonton Video ↗',
                  cls: 'badge-orange',
                },
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card btn-press"
                  style={{
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    borderRadius: '16px',
                    textDecoration: 'none',
                    background: 'var(--bg-surface)',
                    border: '1.5px solid var(--border-medium)',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: s.grad,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {s.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontSize: '0.86rem', margin: 0, fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {s.label}
                    </h4>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                      {s.handle}
                    </p>
                  </div>
                  <span className={`badge ${s.cls}`} style={{ fontSize: '0.62rem', padding: '3px 8px', flexShrink: 0 }}>
                    {s.badge}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* 6. External Hubs & Shortcuts for Mobile */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Palette size={16} className="text-blue" />
              <h3 style={{ fontSize: '1.05rem', margin: 0, fontWeight: 800, color: 'var(--text-primary)' }}>
                Arsip &amp; Hub Portofolio
              </h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              {siteConfig.externalPortfolios.map((ext) => (
                <div
                  key={ext.id}
                  className="glass-card"
                  style={{
                    padding: '14px 16px',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    background: 'var(--bg-surface)',
                    border: '1.5px solid var(--border-medium)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span
                      className="badge"
                      style={{
                        background: ext.accent === '#FF9C0F' ? '#D46200' : (ext.accent === '#0052F5' ? '#0045B8' : '#047857'),
                        color: '#FFFFFF',
                        fontSize: '0.66rem',
                        border: '1.5px solid rgba(0,0,0,0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      {ext.isInternalApp && (ext.appId === 'gallery' ? <ImageIcon size={11} /> : <FolderTree size={11} />)}
                      <span>{ext.tag}</span>
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{ext.isInternalApp ? '⚡ Buka di OS' : '↗ Eksternal'}</span>
                  </div>
                  <h4 style={{ fontSize: '0.92rem', margin: 0, fontWeight: 800, color: 'var(--text-primary)' }}>
                    {ext.platform}
                  </h4>
                  <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                    {ext.description}
                  </p>

                  {ext.isInternalApp ? (
                    <button
                      type="button"
                      onClick={() => openApp(ext.appId || 'files')}
                      className="btn btn-primary-orange btn-sm hover-lift"
                      style={{ width: '100%', justifyContent: 'center', gap: '6px', fontSize: '0.78rem', marginTop: '4px' }}
                    >
                      {ext.appId === 'gallery' ? <ImageIcon size={13} /> : <FolderTree size={13} />}
                      <span>{ext.appId === 'gallery' ? 'Buka Galeri Foto di OS' : 'Buka File Explorer di OS'}</span>
                    </button>
                  ) : (
                    <a
                      href={ext.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-glass btn-sm"
                      style={{ width: '100%', justifyContent: 'center', gap: '6px', fontSize: '0.78rem', marginTop: '4px' }}
                    >
                      <span>Buka Portofolio Lengkap</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 7. Mobile Commission Banner */}
          <div
            className="glass-card"
            style={{
              padding: '18px 16px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(255, 156, 15, 0.15) 0%, var(--bg-surface) 100%)',
              border: '2px solid var(--color-orange)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginTop: '8px',
            }}
          >
            <div>
              <span className="badge badge-orange" style={{ fontSize: '0.64rem', padding: '2px 8px', marginBottom: '6px', display: 'inline-block' }}>
                🟢 BUKA KOMISI EDITING
              </span>
              <h3 style={{ fontSize: '1.08rem', margin: '4px 0', fontWeight: 800, color: 'var(--text-primary)' }}>
                Tertarik Kolaborasi atau Pesan Jasa Editing?
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                Dapatkan hasil editing video sinematik, motion graphic, dan desain grafis profesional dengan harga bersahabat dan garansi revisi.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => openApp('commission')}
                className="btn btn-primary-orange btn-sm"
                style={{ flex: 1, padding: '9px 14px', fontSize: '0.8rem', justifyContent: 'center' }}
              >
                <span>Lihat Layanan Komisi</span>
              </button>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=Halo%20Raihan%2C%20saya%20ingin%20konsultasi%20jasa%20editing%2Fdesain`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-glass btn-sm"
                style={{ padding: '9px 14px', fontSize: '0.8rem', justifyContent: 'center' }}
              >
                <MessageCircle size={14} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Lightbox Viewer */}
        {activeLightbox && (
          <Lightbox
            isOpen={Boolean(activeLightbox)}
            image={activeLightbox.image}
            title={activeLightbox.title}
            caption={`${activeLightbox.category} • ${activeLightbox.year} • Tools: ${activeLightbox.tools.join(', ')}`}
            onClose={() => setActiveLightbox(null)}
            items={filteredItems}
            currentIndex={lightboxIndex}
            onNavigate={handleLightboxNavigate}
          />
        )}

        {/* Project Detail Modal */}
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onOpenLightbox={(item) => {
              setSelectedProject(null);
              setActiveLightbox(item);
            }}
            openApp={openApp}
            isMobile={true}
          />
        )}
      </WindowFrame>
    );
  }

  return (
    <WindowFrame
      title="Portfolio Master Collection"
      icon={Briefcase}
      badgeText="Curated Works"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '20px' : '28px',
        }}
      >
        {/* HERO SECTION */}
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
                    ✦ Creative Showcase
                  </span>
                  <span className="badge badge-blue" style={{ fontSize: '0.68rem' }}>
                    10+ Years Exp
                  </span>
                </div>
                <h1
                  style={{
                    fontSize: isMobile ? '1.4rem' : '2.1rem',
                    fontWeight: 900,
                    margin: '0 0 6px',
                    lineHeight: 1.2,
                  }}
                >
                  Rasfalz Studio <span className="text-gradient">Portfolio &amp; Projects</span>
                </h1>
                <p
                  style={{
                    maxWidth: '580px',
                    margin: 0,
                    color: 'var(--text-secondary)',
                    fontSize: isMobile ? '0.82rem' : '0.9rem',
                    lineHeight: 1.5,
                  }}
                >
                  Eksplorasi mahakarya motion graphic, video editing sinematik, visual identity, dan kreasi konten digital berkualitas tinggi.
                </p>
              </div>

              {/* Stats Bar */}
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  width: isMobile ? '100%' : 'auto',
                }}
              >
                {[
                  { val: siteConfig.portfolioItems.length, label: 'Karya Master' },
                  { val: '450+', label: 'Proyek Selesai' },
                  { val: '100%', label: 'Klien Puas' },
                ].map((s, idx) => (
                  <div
                    key={idx}
                    style={{
                      flex: isMobile ? 1 : 'initial',
                      minWidth: isMobile ? '0' : '95px',
                      textAlign: 'center',
                      background: 'var(--bg-card)',
                      border: '2px solid var(--border-medium)',
                      borderRadius: isMobile ? '10px' : '12px',
                      padding: '8px 10px',
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
                        whiteSpace: 'nowrap',
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
              <PortfolioSearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                isMobile={isMobile}
              />
            </div>
          </div>
        </div>

        {/* CONTROLS: Categories & View Mode Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          {/* Category Pills */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingBottom: '4px',
              flex: '1 1 auto',
              maxWidth: '100%',
            }}
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              const count =
                cat === 'All'
                  ? siteConfig.portfolioItems.length
                  : siteConfig.portfolioItems.filter((i) => i.category === cat).length;

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
                      ? '2px solid var(--color-orange)'
                      : '2px solid var(--border-medium)',
                    background: active
                      ? 'var(--color-orange)'
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

          {/* View Mode Switcher (Desktop & Tablet) */}
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
                onClick={() => setViewMode('grid')}
                className="hover-lift"
                style={{
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  background: viewMode === 'grid' ? 'var(--color-orange)' : 'transparent',
                  color: viewMode === 'grid' ? '#fff' : 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                }}
                title="Grid Showcase"
              >
                <LayoutGrid size={14} />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className="hover-lift"
                style={{
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  background: viewMode === 'compact' ? 'var(--color-orange)' : 'transparent',
                  color: viewMode === 'compact' ? '#fff' : 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                }}
                title="Compact List"
              >
                <List size={14} />
                <span>Compact</span>
              </button>
            </div>
          )}
        </div>

        {/* PORTFOLIO GRID / LIST VIEW */}
        {filteredItems.length === 0 ? (
          <div
            className="glass-card"
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              borderRadius: 'var(--radius-xl)',
              color: 'var(--text-muted)',
            }}
          >
            <Search size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>
              Tidak ada karya yang cocok
            </h3>
            <p style={{ fontSize: '0.86rem', margin: 0 }}>
              Coba gunakan kata kunci pencarian yang lain atau pilih kategori Semua.
            </p>
          </div>
        ) : viewMode === 'compact' && !isMobile ? (
          /* COMPACT LIST VIEW */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="glass-card hover-lift"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 18px',
                  borderRadius: 'var(--radius-lg)',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '64px',
                      height: '52px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <h4 style={{ fontSize: '0.96rem', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.title}
                      </h4>
                      <span className="badge badge-category" style={{ fontSize: '0.62rem', flexShrink: 0 }}>
                        {item.category}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--text-muted)',
                        margin: 0,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <button
                    onClick={() => setSelectedProject(item)}
                    className="btn btn-glass btn-sm"
                  >
                    <Eye size={13} />
                    <span>Detail</span>
                  </button>
                  <button
                    onClick={() => setActiveLightbox(item)}
                    className="btn btn-primary-orange btn-sm"
                  >
                    <span>Preview</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* STANDARD GRID VIEW (RESPONSIVE) */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile
                ? '1fr'
                : 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: isMobile ? '16px' : '22px',
            }}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="glass-card hover-lift"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: isMobile ? '16px' : 'var(--radius-xl)',
                  overflow: 'hidden',
                  padding: isMobile ? '12px' : '16px',
                  border: '2px solid var(--border-medium)',
                  background: 'var(--bg-surface)',
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: isMobile ? '180px' : '205px',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    marginBottom: '14px',
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
                      transition: 'transform var(--transition-normal)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Top Badges */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      display: 'flex',
                      gap: '5px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span
                      className="badge badge-category"
                      style={{
                        fontSize: '0.65rem',
                      }}
                    >
                      {item.category}
                    </span>
                    <span className="badge badge-glass" style={{ fontSize: '0.65rem' }}>
                      {item.year}
                    </span>
                  </div>

                  {/* Preview Button */}
                  <button
                    onClick={() => setActiveLightbox(item)}
                    className="btn btn-primary-orange btn-sm"
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      padding: '5px 11px',
                      fontSize: '0.74rem',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
                    }}
                    title="Buka Preview Gambar"
                  >
                    <Eye size={13} />
                    <span>Quick View</span>
                  </button>
                </div>

                {/* Content */}
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: isMobile ? '1.02rem' : '1.15rem',
                        fontWeight: 800,
                        marginBottom: '6px',
                        lineHeight: 1.3,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.82rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '12px',
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div>
                    {/* Tools Tags */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '5px',
                        marginBottom: '12px',
                      }}
                    >
                      {item.tools.slice(0, 4).map((t, idx) => (
                        <span
                          key={idx}
                          className="badge badge-neutral"
                          style={{ fontSize: '0.65rem', padding: '3px 8px' }}
                        >
                          {t}
                        </span>
                      ))}
                      {item.tools.length > 4 && (
                        <span
                          className="badge badge-neutral"
                          style={{ fontSize: '0.65rem', padding: '3px 8px' }}
                        >
                          +{item.tools.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Bottom Actions */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '2px solid var(--border-medium)',
                        paddingTop: '10px',
                        gap: '8px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        Creator: <strong style={{ color: 'var(--text-primary)' }}>{item.creator || item.client || siteConfig.profile.name}</strong>
                      </span>

                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <button
                          onClick={() => setSelectedProject(item)}
                          className="btn btn-glass btn-sm"
                          style={{ fontSize: '0.72rem', padding: '4px 10px' }}
                        >
                          <span>Detail</span>
                        </button>

                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary-orange btn-sm"
                            style={{ fontSize: '0.72rem', padding: '4px 10px' }}
                            title="Buka Tautan Luar"
                          >
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SOCIAL MEDIA PORTFOLIO */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '12px',
            }}
          >
            <Sparkles size={18} className="text-orange" />
            <h2 style={{ fontSize: isMobile ? '1.15rem' : '1.35rem', margin: 0 }}>
              Social Media Showcase
            </h2>
          </div>
          <p
            style={{
              marginBottom: '14px',
              fontSize: '0.84rem',
              color: 'var(--text-secondary)',
              maxWidth: '640px',
            }}
          >
            Saksikan proses kreatif, tutorial motion graphic, reels video ritme cepat, dan pembaruan karya terbaru di media sosial resmi kami.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile
                ? '1fr'
                : 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: '12px',
            }}
          >
            {[
              {
                href: siteConfig.socials.instagram.url,
                grad: '#E1306C',
                shadow: 'none',
                icon: <InstagramIcon size={21} color="#fff" />,
                label: 'Instagram Showcase',
                handle: siteConfig.socials.instagram.handle,
                badge: 'Visit Instagram ↗',
                cls: 'badge-orange',
              },
              {
                href: siteConfig.socials.tiktok.url,
                grad: '#000000',
                shadow: 'none',
                icon: <TikTokIcon size={21} color="#fff" />,
                label: 'TikTok Reels',
                handle: siteConfig.socials.tiktok.handle,
                badge: 'Watch TikTok ↗',
                cls: 'badge-blue',
              },
              {
                href: siteConfig.socials.youtube.url,
                grad: '#FF0000',
                shadow: 'none',
                icon: <YoutubeIcon size={21} color="#fff" />,
                label: 'YouTube Channel',
                handle: siteConfig.socials.youtube.handle,
                badge: 'Watch Tutorials ↗',
                cls: 'badge-orange',
              },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card hover-lift"
                style={{
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  borderRadius: 'var(--radius-xl)',
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '13px',
                    background: s.grad,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: 'none',
                  }}
                >
                  {s.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontSize: '0.92rem', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {s.label}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.74rem',
                      color: 'var(--text-muted)',
                      margin: '2px 0 6px 0',
                    }}
                  >
                    {s.handle}
                  </p>
                  <span className={`badge ${s.cls}`} style={{ fontSize: '0.63rem' }}>
                    {s.badge}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* EXTERNAL PORTFOLIO HUBS */}
        <div style={{ marginBottom: isMobile ? '16px' : '4px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '12px',
            }}
          >
            <Palette size={18} className="text-blue" />
            <h2 style={{ fontSize: isMobile ? '1.15rem' : '1.35rem', margin: 0 }}>
              External Portfolio Hubs
            </h2>
          </div>
          <p
            style={{
              marginBottom: '14px',
              fontSize: '0.84rem',
              color: 'var(--text-secondary)',
              maxWidth: '640px',
            }}
          >
            Akses portofolio lengkap, studi kasus, dan galeri desain interaktif kami di platform industri global dan aplikasi File Explorer.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile
                ? '1fr'
                : 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '12px',
            }}
          >
            {siteConfig.externalPortfolios.map((ext) => (
              <div
                key={ext.id}
                className="glass-card hover-lift"
                style={{
                  padding: '18px',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <span
                      className="badge"
                      style={{
                        background: ext.accent === '#FF9C0F' ? '#D46200' : (ext.accent === '#0052F5' ? '#0045B8' : '#047857'),
                        color: '#FFFFFF',
                        fontSize: '0.68rem',
                        border: '1.5px solid rgba(0,0,0,0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      {ext.isInternalApp && (ext.appId === 'gallery' ? <ImageIcon size={11} /> : <FolderTree size={11} />)}
                      <span>{ext.tag}</span>
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>{ext.isInternalApp ? '⚡' : '↗'}</span>
                  </div>
                  <h4 style={{ fontSize: '0.98rem', marginBottom: '6px' }}>
                    {ext.platform}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.45,
                      margin: 0,
                    }}
                  >
                    {ext.description}
                  </p>
                </div>
                {ext.isInternalApp ? (
                  <button
                    type="button"
                    onClick={() => openApp(ext.appId || 'files')}
                    className="btn btn-primary-orange btn-sm hover-lift"
                    style={{
                      width: '100%',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{ext.appId === 'gallery' ? 'Buka Aplikasi Gallery' : 'Buka File Explorer'}</span>
                    {ext.appId === 'gallery' ? <ImageIcon size={13} /> : <FolderTree size={13} />}
                  </button>
                ) : (
                  <a
                    href={ext.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-glass btn-sm"
                    style={{ width: '100%', justifyContent: 'space-between' }}
                  >
                    <span>Buka Portofolio</span>
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Viewer */}
      {activeLightbox && (
        <Lightbox
          isOpen={Boolean(activeLightbox)}
          image={activeLightbox.image}
          title={activeLightbox.title}
          caption={`${activeLightbox.category} • ${activeLightbox.year} • Tools: ${activeLightbox.tools.join(', ')}`}
          onClose={() => setActiveLightbox(null)}
          items={filteredItems}
          currentIndex={lightboxIndex}
          onNavigate={handleLightboxNavigate}
        />
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenLightbox={(item) => {
            setSelectedProject(null);
            setActiveLightbox(item);
          }}
          openApp={openApp}
          isMobile={false}
        />
      )}
    </WindowFrame>
  );
};
