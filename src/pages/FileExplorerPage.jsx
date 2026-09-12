import React, { useState, useMemo, useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';
import { WindowFrame } from '../components/common/WindowFrame';
import { useOS } from '../context/OSContext';
import { useAudio } from '../context/AudioContext';
import {
  FolderTree,
  Folder,
  FolderOpen,
  LayoutGrid,
  List,
  Search,
  ChevronRight,
  ExternalLink,
  Eye,
  Sparkles,
  HardDrive,
  Clock,
  CheckCircle2,
  Filter,
  Layers,
  FileText,
  FileCode,
  Film,
  Music,
  Image as ImageIcon,
  Archive,
  Palette,
  X,
  Share2,
  Info,
  Check,
  Tag,
  Cloud,
  FolderSync,
  Briefcase,
} from 'lucide-react';

const iconMap = {
  Palette,
  Music,
  Film,
  Layers,
  Image: ImageIcon,
  ImageIcon,
  FileCode,
  Archive,
  Folder,
  FolderTree,
  Cloud,
  Briefcase,
  FileText,
};

const resolveIcon = (icon) => {
  if (!icon) return Folder;
  if (typeof icon === 'string') {
    return iconMap[icon] || Folder;
  }
  return icon;
};

// Solid Filled Folder Icon (No outline, rich 3D layer depth)
export const SolidFolderIcon = ({ size = 24, color = '#FF9C0F', style = {} }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      {/* Folder Tab & Back Body */}
      <path
        d="M2 5.5C2 4.12 3.12 3 4.5 3H8.2C8.75 3 9.28 3.23 9.66 3.63L11.37 5.37C11.75 5.77 12.28 6 12.83 6H19.5C20.88 6 22 7.12 22 8.5V17.5C22 18.88 20.88 20 19.5 20H4.5C3.12 20 2 18.88 2 17.5V5.5Z"
        fill={color}
      />
      {/* Front Solid Cover Flap */}
      <path
        d="M2 10C2 8.62 3.12 7.5 4.5 7.5H19.5C20.88 7.5 22 8.62 22 10V17.5C22 18.88 20.88 20 19.5 20H4.5C3.12 20 2 18.88 2 17.5V10Z"
        fill="#FFFFFF"
        fillOpacity="0.22"
      />
      {/* Subtle Inner Highlight Line */}
      <path
        d="M2.5 10.5H21.5"
        stroke="#FFFFFF"
        strokeWidth="0.8"
        strokeOpacity="0.35"
      />
    </svg>
  );
};

// ─── Google Drive Folder Data Fallback ───────────────────────────────────────
const fallbackDriveFolders = [
  {
    id: 'fd-portofolio-besmart',
    name: 'Portofolio Magang Be Smart',
    category: 'Portofolio',
    subtitle: 'Portofolio Magang Be Smart',
    description: 'Kumpulan portofolio selama magang di PT. Be Smart Indonesia',
    fileCount: '50+ File',
    updated: '16 April 2025',
    tags: ['Portofolio', 'Be Smart'],
    color: '#FF9C0F',
    preview: 'https://files.catbox.moe/9rpwoo.png',
    driveUrl: 'https://drive.google.com/drive/folders/1PTmhC2xkY2-ko5QHc-1h8xJq1newHFYE?usp=sharing',
    icon: 'Briefcase',
  },
  {
    id: 'fd-portofolio-mediaprint',
    name: 'Portofolio Media Print',
    category: 'Portofolio',
    subtitle: 'Portofolio Media Print',
    description: 'Kumpulan portofolio selama magang di PT. Media Print',
    fileCount: '50+ File',
    updated: '2 Desember 2025',
    tags: ['Portofolio', 'Media Print'],
    color: '#10B981',
    preview: 'https://files.catbox.moe/og8eal.png',
    driveUrl: 'https://drive.google.com/drive/folders/1vwDZYadkaY77k5lCqlebsQrP7awvQlfJ?usp=sharing',
    icon: 'Briefcase',
  },
  {
    id: 'fd-document',
    name: 'Dokumen Tugas Sekolah',
    category: 'Dokumen',
    subtitle: 'Dokumen Tugas Sekolah',
    description: 'Folder berisi dokumen tugas sekolah',
    fileCount: '3 File',
    updated: '5 September 2026',
    tags: ['Dokumen', 'Tugas Sekolah'],
    color: '#FF5E3A',
    preview: 'https://files.catbox.moe/73355w.png',
    driveUrl: 'https://drive.google.com/drive/folders/1nUFLXJdmAPiwzd_aBJTJ0N-mLRP8qz_2?usp=sharing',
    icon: 'FileText',
  },
  {
    id: 'fd-brand',
    name: 'Desain Soesky! dan Pastel!n.',
    category: 'Desain',
    subtitle: 'Kumpulan desain Soesky! dan Pastel!n.',
    description: 'Kumpulan desain Soesky! dan Pastel!n.',
    fileCount: '10+ File',
    updated: '22 Januari 2026',
    tags: ['Desain', 'Soesky!', 'Pastel!n.'],
    color: '#0052F5',
    preview: 'https://files.catbox.moe/9rpwoo.png',
    driveUrl: 'https://drive.google.com/drive/folders/16mKNd2rtsZgYlq_MhXSTExOvcK4Xde1-?usp=sharing',
    icon: 'Palette',
  },
  {
    id: 'fd-intro',
    name: 'Intro Brand A10',
    category: 'Intro Brand',
    subtitle: 'Intro Brand A10',
    description: 'Intro Brand A10 buatan Rasfalz Studio.',
    fileCount: '8 File',
    updated: '18 Januari 2026',
    tags: ['Intro Brand A10-Build', 'A10-Build'],
    color: '#00F2FE',
    preview: 'https://files.catbox.moe/og8eal.png',
    driveUrl: 'https://drive.google.com/drive/folders/1ndA-69qGyN02jb5QEAZ-NozV2crOvy3-?usp=sharing',
    icon: 'Film',
  },
  {
    id: 'fd-assets',
    name: 'Assets Pack',
    category: 'Assets Pack',
    subtitle: 'Kumpulan aset - aset yang sering digunakan.',
    description: 'Kumpulan aset - aset yang sering digunakan.',
    fileCount: '1000+ File',
    updated: '5 September 2026',
    tags: ['Assets Pack', 'Design System', 'Figma', 'Tokens', 'CSS Variables', 'Glassmorphism'],
    color: '#8B5CF6',
    preview: 'https://files.catbox.moe/73355w.png',
    driveUrl: 'https://simp.ly/p/Z0l2Lm',
    icon: 'Archive',
  },
];

// Helper to determine category icon based on category name
const getCategoryIcon = (catName) => {
  const lower = (catName || '').toLowerCase();
  if (lower.includes('portofolio') || lower.includes('portfolio') || lower.includes('magang')) return Briefcase;
  if (lower.includes('dokumen') || lower.includes('doc') || lower.includes('tugas') || lower.includes('sekolah')) return FileText;
  if (lower.includes('desain') || lower.includes('design') || lower.includes('art') || lower.includes('brand')) return Palette;
  if (lower.includes('intro') || lower.includes('video') || lower.includes('anim')) return Film;
  if (lower.includes('asset') || lower.includes('pack') || lower.includes('archive') || lower.includes('bundle') || lower.includes('kit')) return Archive;
  if (lower.includes('audio') || lower.includes('sound') || lower.includes('music') || lower.includes('sfx')) return Music;
  if (lower.includes('photo') || lower.includes('foto') || lower.includes('wallpaper') || lower.includes('gambar')) return ImageIcon;
  if (lower.includes('code') || lower.includes('program') || lower.includes('ui')) return FileCode;
  return Folder;
};

// ────────────────────────────────────────────────────────────────────────────

export const FileExplorerPage = () => {
  const { isMobile, addToast } = useOS();
  const { playSoundEffect } = useAudio();

  const allFolders = siteConfig.googleDriveFolders || fallbackDriveFolders;

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolderModal, setSelectedFolderModal] = useState(null);

  // Dynamic Category Filters directly derived from actual folder categories
  const categoryFilters = useMemo(() => {
    const uniqueCategories = [];
    allFolders.forEach((f) => {
      if (f.category && !uniqueCategories.includes(f.category)) {
        uniqueCategories.push(f.category);
      }
    });

    return [
      { id: 'All', name: 'Semua Folder', icon: FolderTree },
      ...uniqueCategories.map((cat) => ({
        id: cat,
        name: cat,
        icon: getCategoryIcon(cat),
      })),
    ];
  }, [allFolders]);

  // Safety fallback if active category is deleted or filtered out
  useEffect(() => {
    if (selectedCategory !== 'All' && !allFolders.some((f) => f.category === selectedCategory)) {
      setSelectedCategory('All');
    }
  }, [allFolders, selectedCategory]);

  // Open Google Drive folder in a new tab
  const handleOpenDrive = (folder) => {
    playSoundEffect('open');
    window.open(folder.driveUrl, '_blank', 'noopener,noreferrer');
    addToast('Membuka Google Drive', `Folder "${folder.name}" dibuka di Google Drive.`, 'success');
  };

  // Filtered folders matching category and search queries
  const filteredFolders = useMemo(() => {
    return allFolders.filter((folder) => {
      const matchesCategory =
        selectedCategory === 'All' || folder.category === selectedCategory;
      const matchesSearch =
        folder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        folder.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        folder.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (folder.category && folder.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
        folder.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm, allFolders]);

  // Folder icon renderer with color
  const renderFolderIcon = (folder, size = 20) => {
    const Icon = resolveIcon(folder.icon);
    return <Icon size={size} style={{ color: folder.color }} />;
  };

  // ==========================================
  // MOBILE VIEW
  // ==========================================
  if (isMobile) {
    return (
      <WindowFrame title="File Explorer & Drive Hub" icon={Folder} badgeText="Google Drive">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Mobile Search Bar */}
          <div
            className="search-bar"
            style={{
              maxWidth: '100%',
              padding: '10px 16px',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Search size={16} className="text-orange" />
            <input
              type="text"
              placeholder="Cari folder preset, video, SFX..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.86rem',
                width: '100%',
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Mobile Drive Banner */}
          <div
            className="glass-card"
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-xl)',
              background: 'linear-gradient(135deg, rgba(0,82,245,0.15) 0%, rgba(255,156,15,0.1) 100%)',
              border: '2px solid var(--border-medium)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0052F5, #10B981)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Cloud size={22} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '2px' }}>Google Drive Studio</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {allFolders.length} Folder • Klik folder untuk buka di Google Drive
              </div>
            </div>
            <span className="badge badge-category" style={{ fontSize: '0.64rem', padding: '3px 8px', flexShrink: 0 }}>
              Drive
            </span>
          </div>

          {/* Category Filter Chips */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Kategori Folder
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-orange)', fontWeight: 700 }}>
                {filteredFolders.length} Folder
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '4px',
                scrollbarWidth: 'none',
              }}
            >
              {categoryFilters.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const Icon = cat.icon;
                const count =
                  cat.id === 'All'
                    ? allFolders.length
                    : allFolders.filter((f) => f.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      playSoundEffect('click');
                    }}
                    className={`filter-pill ${isSelected ? 'active' : ''}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '7px 14px',
                      fontSize: '0.78rem',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={13} />
                    <span>{cat.name}</span>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: 'var(--radius-pill)',
                        background: isSelected ? 'var(--color-orange)' : 'var(--badge-neutral-bg)',
                        border: isSelected ? '1px solid var(--color-orange)' : '1px solid var(--badge-neutral-border)',
                        color: isSelected ? '#FFFFFF' : 'var(--badge-neutral-text)',
                        marginLeft: '2px',
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Folder List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Daftar Folder ({filteredFolders.length})
              </span>
              <span className="badge badge-category" style={{ fontSize: '0.66rem' }}>
                Google Drive
              </span>
            </div>

            {filteredFolders.length === 0 ? (
              <div
                className="glass-card"
                style={{
                  padding: '32px 16px',
                  textAlign: 'center',
                  borderRadius: 'var(--radius-xl)',
                  background: 'var(--bg-surface)',
                }}
              >
                <SolidFolderIcon size={36} color="var(--text-muted)" style={{ marginBottom: '8px', opacity: 0.5 }} />
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0 }}>
                  Tidak ada folder yang cocok.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {filteredFolders.map((folder) => (
                  <div
                    key={folder.id}
                    onClick={() => setSelectedFolderModal(folder)}
                    className="glass-card btn-press"
                    style={{
                      padding: '12px 14px',
                      borderRadius: '16px',
                      background: 'var(--bg-surface-elevated)',
                      border: '2px solid var(--border-medium)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Folder Thumbnail */}
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        position: 'relative',
                        flexShrink: 0,
                        background: '#000',
                      }}
                    >
                      <img
                        src={folder.preview}
                        alt={folder.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'var(--bg-surface-elevated)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <SolidFolderIcon size={22} color={folder.color} />
                      </div>
                    </div>

                    {/* Folder Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4
                        style={{
                          fontSize: '0.86rem',
                          fontWeight: 800,
                          margin: '0 0 3px 0',
                          color: 'var(--text-primary)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {folder.name}
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        <span style={{ color: folder.color, fontWeight: 700 }}>{folder.fileCount}</span>
                        <span>•</span>
                        <span>{folder.updated}</span>
                      </div>
                    </div>

                    {/* Open Drive Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDrive(folder);
                      }}
                      className="btn btn-primary-orange btn-sm"
                      style={{
                        padding: '6px 10px',
                        fontSize: '0.72rem',
                        borderRadius: 'var(--radius-pill)',
                        flexShrink: 0,
                        gap: '4px',
                      }}
                    >
                      <ExternalLink size={13} />
                      <span>Buka</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Folder Detail Modal */}
        {selectedFolderModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 3500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(16px)',
            }}
            onClick={() => setSelectedFolderModal(null)}
          >
            <div
              className="animate-slide-up"
              style={{
                width: '100%',
                maxWidth: '480px',
                borderRadius: '24px',
                background: 'var(--bg-surface-elevated)',
                border: '2px solid var(--border-medium)',
                overflow: 'hidden',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cover */}
              <div style={{ height: '160px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={selectedFolderModal.preview}
                  alt={selectedFolderModal.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: selectedFolderModal.preview ? 'rgba(0,0,0,0.55)' : 'var(--bg-surface-elevated)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SolidFolderIcon size={56} color={selectedFolderModal.color} style={{ filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.5))' }} />
                </div>
                <button
                  onClick={() => setSelectedFolderModal(null)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    padding: '6px',
                    cursor: 'pointer',
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              <div style={{ padding: '16px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, margin: '0 0 4px 0' }}>
                  {selectedFolderModal.name}
                </h3>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: '0 0 12px 0' }}>
                  {selectedFolderModal.subtitle}
                </p>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: '0 0 14px 0' }}>
                  {selectedFolderModal.description}
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    background: 'var(--bg-surface)',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    marginBottom: '16px',
                    fontSize: '0.76rem',
                  }}
                >
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Jumlah File:</span>
                    <strong style={{ color: selectedFolderModal.color }}>{selectedFolderModal.fileCount}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Diperbarui / Dibuat:</span>
                    <strong>{selectedFolderModal.updated}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setSelectedFolderModal(null)}
                    className="btn btn-glass btn-sm"
                    style={{ flex: 1 }}
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => {
                      handleOpenDrive(selectedFolderModal);
                      setSelectedFolderModal(null);
                    }}
                    className="btn btn-primary-orange btn-sm"
                    style={{ flex: 2, gap: '6px' }}
                  >
                    <ExternalLink size={14} />
                    <span>Buka di Google Drive</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </WindowFrame>
    );
  }

  // ==========================================
  // DESKTOP & TABLET VIEW
  // ==========================================
  return (
    <WindowFrame title="Studio File Explorer — Google Drive" icon={Folder} badgeText="Google Drive">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* ── TOP ACTION BAR ── */}
        <div
          className="glass-card"
          style={{
            padding: '14px 20px',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--bg-surface-elevated)',
            border: '2px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
          }}
        >
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 700 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-orange)' }}>
              <Cloud size={16} />
              <span>Google Drive</span>
            </span>
            <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Rasfalz_Studio</span>
            {selectedCategory !== 'All' && (
              <>
                <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
                <span className="badge badge-category">{selectedCategory}</span>
              </>
            )}
          </div>

          {/* Search + View Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div
              className="search-bar"
              style={{
                padding: '7px 14px',
                width: '260px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--bg-surface)',
                border: '2px solid var(--border-medium)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Search size={15} className="text-orange" />
              <input
                type="text"
                placeholder="Cari folder..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '0.82rem',
                  width: '100%',
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div
              style={{
                display: 'flex',
                background: 'var(--bg-surface)',
                padding: '3px',
                borderRadius: 'var(--radius-pill)',
                border: '2px solid var(--border-medium)',
              }}
            >
              <button
                onClick={() => { setViewMode('grid'); playSoundEffect('click'); }}
                className={`btn-press ${viewMode === 'grid' ? 'badge-orange' : ''}`}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                }}
                title="Tampilan Grid"
              >
                <LayoutGrid size={14} />
                <span>Grid</span>
              </button>

              <button
                onClick={() => { setViewMode('list'); playSoundEffect('click'); }}
                className={`btn-press ${viewMode === 'list' ? 'badge-orange' : ''}`}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                }}
                title="Tampilan Tabel"
              >
                <List size={14} />
                <span>Tabel</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── MAIN WORKSPACE: Sidebar + Folders ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '20px', alignItems: 'start' }}>

          {/* Left Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Category Tree */}
            <div
              className="glass-card"
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-xl)',
                background: 'var(--bg-surface-elevated)',
                border: '2px solid var(--border-medium)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', padding: '0 8px 8px 8px' }}>
                Folder Drive Studio
              </span>

              {categoryFilters.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const Icon = cat.icon;
                const count =
                  cat.id === 'All'
                    ? allFolders.length
                    : allFolders.filter((f) => f.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.id); playSoundEffect('click'); }}
                    className="btn-press"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      background: isSelected ? 'var(--color-orange-subtle)' : 'transparent',
                      border: isSelected ? '2px solid var(--color-orange)' : '2px solid transparent',
                      color: isSelected ? 'var(--color-orange)' : 'var(--text-primary)',
                      fontWeight: isSelected ? 800 : 600,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Icon size={16} className={isSelected ? 'text-orange' : 'text-blue'} />
                      <span>{cat.name}</span>
                    </div>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: 'var(--radius-pill)',
                        background: isSelected ? 'var(--color-orange)' : 'var(--badge-neutral-bg)',
                        border: isSelected ? '1px solid var(--color-orange)' : '1px solid var(--badge-neutral-border)',
                        color: isSelected ? '#FFFFFF' : 'var(--badge-neutral-text)',
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Drive Info Card */}
            <div
              className="glass-card"
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-xl)',
                background: 'linear-gradient(135deg, rgba(0,82,245,0.1) 0%, rgba(16,185,129,0.08) 100%)',
                border: '2px solid rgba(0,82,245,0.25)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <Cloud size={16} style={{ color: '#0052F5' }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 800 }}>Google Drive</span>
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '10px' }}>
                Semua folder terhubung ke Google Drive. Klik folder untuk membuka langsung di Google Drive.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', flexShrink: 0 }} />
                <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 700 }}>Drive Terhubung</span>
              </div>
            </div>
          </div>

          {/* Right: Folder Grid / Table */}
          <div style={{ minHeight: '440px' }}>
            {filteredFolders.length === 0 ? (
              <div
                className="glass-card"
                style={{
                  padding: '60px 20px',
                  textAlign: 'center',
                  borderRadius: 'var(--radius-xl)',
                  background: 'var(--bg-surface-elevated)',
                  border: '2px solid var(--border-medium)',
                }}
              >
                <SolidFolderIcon size={48} color="var(--text-muted)" style={{ marginBottom: '12px', opacity: 0.5 }} />
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
                  Tidak ada folder yang cocok dengan pencarian.
                </p>
              </div>
            ) : viewMode === 'grid' ? (
              /* ── GRID VIEW ── */
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '16px',
                }}
              >
                {filteredFolders.map((folder) => (
                  <div
                    key={folder.id}
                    className="glass-card hover-lift"
                    style={{
                      borderRadius: 'var(--radius-xl)',
                      background: 'var(--bg-surface-elevated)',
                      border: '2px solid var(--border-medium)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: 'var(--shadow-md)',
                      transition: 'all 0.25s ease',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedFolderModal(folder)}
                  >
                    {/* Card Cover */}
                    <div
                      style={{
                        height: '130px',
                        position: 'relative',
                        overflow: 'hidden',
                        background: 'var(--bg-main, #2C2C2C)',
                      }}
                    >
                      <img
                        src={folder.preview}
                        alt={folder.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          opacity: 0.55,
                          transition: 'transform 0.3s ease',
                        }}
                      />
                      {/* Colored overlay gradient */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: `linear-gradient(135deg, ${folder.color}30 0%, rgba(0,0,0,0.4) 100%)`,
                        }}
                      />

                      {/* Folder icon centered */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <SolidFolderIcon
                          size={56}
                          color={folder.color}
                          style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.6))' }}
                        />
                      </div>

                      {/* Category badge */}
                      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                        <span
                          className="badge badge-category"
                          style={{
                            fontSize: '0.62rem',
                            padding: '3px 8px',
                          }}
                        >
                          {folder.category}
                        </span>
                      </div>

                      {/* File count badge */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          background: 'var(--badge-neutral-bg)',
                          border: '1px solid var(--badge-neutral-border)',
                          color: 'var(--badge-neutral-text)',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-pill)',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                        }}
                      >
                        {folder.fileCount}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div
                      style={{
                        padding: '14px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        flex: 1,
                        gap: '10px',
                      }}
                    >
                      <div>
                        <h4
                          style={{
                            fontSize: '0.92rem',
                            fontWeight: 800,
                            margin: '0 0 4px 0',
                            color: 'var(--text-primary)',
                            lineHeight: 1.3,
                          }}
                        >
                          {folder.name}
                        </h4>
                        <p
                          style={{
                            fontSize: '0.72rem',
                            color: 'var(--text-muted)',
                            margin: '0 0 8px 0',
                            fontStyle: 'italic',
                          }}
                        >
                          {folder.subtitle}
                        </p>
                        <p
                          style={{
                            fontSize: '0.76rem',
                            color: 'var(--text-secondary)',
                            margin: '0 0 10px 0',
                            lineHeight: 1.4,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {folder.description}
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                          {folder.tags.slice(0, 2).map((t, idx) => (
                            <span key={idx} className="badge badge-neutral" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderTop: '2px solid var(--border-subtle)',
                          paddingTop: '10px',
                        }}
                      >
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          <span style={{ fontWeight: 700, color: folder.color }}>{folder.fileCount}</span>
                          {' • '}
                          <span>{folder.updated}</span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDrive(folder);
                          }}
                          className="btn btn-primary-orange btn-sm hover-lift"
                          style={{ fontSize: '0.74rem', padding: '5px 12px', fontWeight: 800, gap: '5px' }}
                        >
                          <ExternalLink size={13} />
                          <span>Buka Drive</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* ── TABLE VIEW ── */
              <div
                className="glass-card"
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-xl)',
                  background: 'var(--bg-surface-elevated)',
                  border: '2px solid var(--border-medium)',
                  overflowX: 'auto',
                }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-medium)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '10px 12px' }}>Nama Folder</th>
                      <th style={{ padding: '10px 12px' }}>Kategori</th>
                      <th style={{ padding: '10px 12px' }}>Jumlah File</th>
                      <th style={{ padding: '10px 12px' }}>Tanggal Dibuat / Diperbarui</th>
                      <th style={{ padding: '10px 12px', textAlign: 'right' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFolders.map((folder) => (
                      <tr
                        key={folder.id}
                        onClick={() => setSelectedFolderModal(folder)}
                        className="btn-press"
                        style={{
                          borderBottom: '2px solid var(--border-subtle)',
                          cursor: 'pointer',
                          transition: 'background var(--transition-fast)',
                        }}
                      >
                        <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700 }}>
                          <div
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '10px',
                              background: 'var(--bg-surface-elevated)',
                              border: '2px solid var(--border-medium)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <SolidFolderIcon size={20} color={folder.color} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 800 }}>{folder.name}</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 400 }}>{folder.subtitle}</div>
                          </div>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span
                            className="badge badge-category"
                            style={{
                              fontSize: '0.68rem',
                            }}
                          >
                            {folder.category}
                          </span>
                        </td>
                        <td style={{ padding: '12px', fontWeight: 700, color: folder.color }}>{folder.fileCount}</td>
                        <td style={{ padding: '12px', color: 'var(--text-primary)', fontWeight: 600 }}>{folder.updated}</td>
                        <td style={{ padding: '12px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                            <button
                              onClick={(e) => { e.stopPropagation(); setSelectedFolderModal(folder); }}
                              className="btn btn-glass btn-sm"
                              style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                            >
                              <Eye size={13} />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleOpenDrive(folder); }}
                              className="btn btn-primary-orange btn-sm"
                              style={{ padding: '4px 10px', fontSize: '0.72rem', gap: '4px' }}
                            >
                              <ExternalLink size={13} />
                              <span>Buka Drive</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* ── DESKTOP FOLDER DETAIL MODAL ── */}
        {selectedFolderModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 3500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              backgroundColor: 'rgba(0, 0, 0, 0.82)',
              backdropFilter: 'blur(16px)',
            }}
            onClick={() => setSelectedFolderModal(null)}
          >
            <div
              className="animate-scale-in"
              style={{
                width: '100%',
                maxWidth: '680px',
                borderRadius: '24px',
                background: 'var(--bg-surface-elevated)',
                border: '2px solid var(--border-medium)',
                boxShadow: '0 24px 64px rgba(0, 0, 0, 0.9)',
                overflow: 'hidden',
                position: 'relative',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Cover with large folder icon */}
              <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={selectedFolderModal.preview}
                  alt={selectedFolderModal.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: selectedFolderModal.preview ? 'rgba(0,0,0,0.55)' : 'var(--bg-surface-elevated)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SolidFolderIcon
                    size={84}
                    color={selectedFolderModal.color}
                    style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.6))' }}
                  />
                </div>

                <button
                  onClick={() => setSelectedFolderModal(null)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'rgba(0,0,0,0.65)',
                    border: '2px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    borderRadius: '50%',
                    padding: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={18} />
                </button>

                <div style={{ position: 'absolute', bottom: '16px', left: '16px', display: 'flex', gap: '8px' }}>
                  <span
                    className="badge badge-category"
                  >
                    {selectedFolderModal.category}
                  </span>
                  <span className="badge badge-blue">Google Drive</span>
                </div>
              </div>

              {/* Inspector Content */}
              <div style={{ padding: '24px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                  {selectedFolderModal.name}
                </h2>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: '0 0 12px 0', fontStyle: 'italic' }}>
                  {selectedFolderModal.subtitle}
                </p>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                  {selectedFolderModal.description}
                </p>

                {/* Metadata Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    background: 'var(--bg-surface)',
                    padding: '14px 16px',
                    borderRadius: '16px',
                    border: '2px solid var(--border-subtle)',
                    marginBottom: '18px',
                    fontSize: '0.8rem',
                  }}
                >
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>Jumlah File:</span>
                    <strong style={{ color: selectedFolderModal.color }}>{selectedFolderModal.fileCount}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>Tanggal Dibuat / Diperbarui:</span>
                    <strong>{selectedFolderModal.updated}</strong>
                  </div>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  <Tag size={14} className="text-orange" />
                  {selectedFolderModal.tags.map((tag, i) => (
                    <span key={i} className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '2px solid var(--border-medium)',
                    paddingTop: '16px',
                  }}
                >
                  <button
                    onClick={() => setSelectedFolderModal(null)}
                    className="btn btn-glass btn-sm"
                  >
                    Tutup
                  </button>

                  <button
                    onClick={() => {
                      handleOpenDrive(selectedFolderModal);
                      setSelectedFolderModal(null);
                    }}
                    className="btn btn-primary-orange btn-sm hover-lift"
                    style={{ padding: '10px 28px', fontWeight: 800, gap: '8px', fontSize: '0.9rem' }}
                  >
                    <ExternalLink size={16} />
                    <span>Buka di Google Drive</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </WindowFrame>
  );
};

export default FileExplorerPage;
