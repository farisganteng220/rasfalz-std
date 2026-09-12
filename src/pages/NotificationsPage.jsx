import React, { useState } from 'react';
import { WindowFrame } from '../components/common/WindowFrame';
import { useOS } from '../context/OSContext';
import { useAudio } from '../context/AudioContext';
import { DecorativeBackground } from '../components/common/DecorativeBackground';
import {
  Bell,
  Sparkles,
  Flame,
  Briefcase,
  Image as ImageIcon,
  FolderTree,
  CheckCheck,
  Search,
  ChevronRight,
  PlusCircle,
  Check,
  Trash2,
  Clock,
  RotateCcw,
  Eye,
  EyeOff,
  X,
  Layers,
  ArrowRight,
  Info,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const NotificationsPage = () => {
  const {
    isMobile,
    notifications = [],
    unreadNotifCount = 0,
    toggleNotifRead,
    markNotifAsRead,
    deleteNotif,
    markAllNotifsAsRead,
    clearAllNotifs,
    resetNotificationsToDefault,
    triggerSampleNotification,
    addNotification,
    openApp,
  } = useOS();

  const { playSoundEffect } = useAudio();
  const [activeChannel, setActiveChannel] = useState('all'); // 'all' | 'features' | 'portfolio' | 'gallery' | 'files' | 'promo'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUpdate, setSelectedUpdate] = useState(null); // Detail modal

  // 5 Pillars of Announcements & OS Updates
  const updatePillars = [
    {
      id: 'pillar-features',
      channelId: 'features',
      badge: 'Update Fitur OS v2.6',
      badgeColor: 'badge-blue',
      title: 'Pembaruan Fitur: Arcade Gaming Hub, Live Weather & Desktop Music Widget',
      date: '31 Agustus 2026',
      timeAgo: 'Baru saja',
      sender: 'Rasfalz Core OS',
      summary:
        'Sistem operasi Rasfalz Studio merilis rangkaian fitur baru: Game Hub (Tic-Tac-Toe vs AI & Snake Retro dengan pengatur kecepatan), modul cuaca live di widget jam, pemutar musik playlist lengkap, dan dock rectangle rounded.',
      description:
        'Pembaruan versi 2.6 berfokus pada interaktivitas dan kenyamanan navigasi OS. Pengguna kini dapat menikmati mini-game arkade klasik langsung di dalam sistem, memantau prakiraan cuaca 3 hari ke depan, mendengarkan kurasi Lo-Fi dengan vinyl turntable, serta mengakses Pusat Notifikasi terpadu.',
      icon: Sparkles,
      iconColor: '#0052F5',
      cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
      actionLabel: 'Buka Arcade Game Hub ↗',
      actionApp: 'games',
      highlights: [
        'Mini-game Tic-Tac-Toe dengan mode vs Smart AI & 2 Player pass & play lokal',
        'Snake Arcade retro dengan kontrol kecepatan (Lambat, Normal, Cepat) & skor',
        'Prediksi cuaca real-time & ramalan 3 hari ke depan berbasis geolokasi Open-Meteo',
        'Widget musik desktop terintegrasi dengan daftar playlist lagu tanpa minimize',
        'Bentuk dock desktop dan mobile disesuaikan menjadi rectangle rounded 20px',
      ],
    },
    {
      id: 'pillar-portfolio',
      channelId: 'portfolio',
      badge: 'Update Portofolio 2026',
      badgeColor: 'badge-purple',
      title: 'Rilis Proyek Baru: 3D Blender Commercial & Cinematic High-Speed Reels',
      date: '30 Agustus 2026',
      timeAgo: '1 hari lalu',
      sender: 'Showcase Studio',
      summary:
        'Penambahan karya komersial terbaru dalam portofolio, mencakup studi kasus 3D Cyberpunk, video komersial brand fashion streetwear, dan motion graphic bumpers.',
      description:
        'Katalog portofolio Rasfalz Studio telah diperbarui dengan proyek klien nyata dan studi kasus desain terkini tahun 2026. Setiap item kini dilengkapi detail software (Blender, Premiere Pro, After Effects), video player terintegrasi, dan sorotan konsep visual.',
      icon: Briefcase,
      iconColor: '#8B5CF6',
      cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      actionLabel: 'Jelajahi Portofolio Lengkap ↗',
      actionApp: 'portfolio',
      highlights: [
        'Proyek 3D Cyberpunk Visual Identity & Product Stinger',
        'Cinematic Streetwear Video Commercial Highlight Reel 4K',
        'Motion Graphic Title Sequences & Animated Twitch/YouTube Overlay',
        'Filter portofolio instan: Motion Design, Video Editing, 3D Art, Graphic Design',
      ],
    },
    {
      id: 'pillar-gallery',
      channelId: 'gallery',
      badge: 'Gallery 4K Update',
      badgeColor: 'badge-orange',
      title: 'Koleksi Baru: Wallpaper 4K & Retouching Foto High-End di Gallery',
      date: '29 Agustus 2026',
      timeAgo: '2 hari lalu',
      sender: 'Visual Gallery',
      summary:
        'Aplikasi Gallery diperkaya dengan 12+ wallpaper resolusi 4K, manipulasi foto konsep cyberpunk, dan retouching kecantikan dengan fitur Lightbox Fullscreen.',
      description:
        'Galeri visual kini menyediakan koleksi seni digital resolusi ultra-tinggi yang dapat diunduh atau dipratinjau dalam mode Lightbox interaktif dengan fitur zoom in/out dan navigasi slide keyboard.',
      icon: ImageIcon,
      iconColor: '#FF9C0F',
      cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      actionLabel: 'Buka Galeri Gambar ↗',
      actionApp: 'gallery',
      highlights: [
        '12 Foto retouching fashion & kecantikan resolusi tinggi',
        'Artwork konsep Cyberpunk & Neon Cityscapes 4K Ultra HD',
        'Dukungan Lightbox Fullscreen interaktif dengan transisi mulus',
        'Pencarian gambar berdasarkan tag dan kategori seni',
      ],
    },
    {
      id: 'pillar-files',
      channelId: 'files',
      badge: 'File Explorer Update',
      badgeColor: 'badge-green',
      title: 'Free Aset Pack: Preset LUTs Cinematic & Sound FX Pack di File Explorer',
      date: '28 Agustus 2026',
      timeAgo: '3 hari lalu',
      sender: 'Asset Library',
      summary:
        'Template proyek Premiere Pro, preset motion After Effects, dan paket sound effect Whoosh/Hit studio gratis kini dapat diakses dan diunduh di File Explorer.',
      description:
        'Bagi rekan kreator dan editor video, Rasfalz Studio membagikan paket aset gratis berlisensi komersial di aplikasi File Explorer. File tersusun rapi dalam struktur folder aset terorganisir.',
      icon: FolderTree,
      iconColor: '#10B981',
      cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
      actionLabel: 'Buka File Explorer & Unduh ↗',
      actionApp: 'files',
      highlights: [
        '5 Preset LUTs Cinematic (.cube) untuk Premiere Pro, DaVinci Resolve & CapCut',
        '10 Sound FX Whoosh, Hit, Riser & Ambient berkategori studio master',
        'Template After Effects Typography Title Pack siap pakai',
        'Struktur folder file master yang bersih dan mudah dinavigasi',
      ],
    },
    {
      id: 'pillar-promo',
      channelId: 'promo',
      badge: 'Promo & Diskon Update',
      badgeColor: 'badge-orange',
      title: 'Flash Sale 30% Video Editing & Pembaruan Harga Aplikasi Editing Murah',
      date: '27 Agustus 2026',
      timeAgo: '4 hari lalu',
      sender: 'Store & Commission',
      summary:
        'Dapatkan diskon komisi 30% untuk pembuatan video reels & commercial. Update harga lisensi Alight Motion (Rp 6.000), CapCut Pro, Canva, dan Ibis Paint.',
      description:
        'Program promo komisi bulan ini membuka slot diskon 30% untuk pemesanan jasa video editing dan motion graphics. Selain itu, toko aplikasi Premium Apps menyediakan akun lisensi software editing resmi dengan garansi anti-reset.',
      icon: Flame,
      iconColor: '#FF9C0F',
      cover: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80',
      actionLabel: 'Ambil Promo Jasa Komisi ↗',
      actionApp: 'commission',
      highlights: [
        'Diskon 30% jasa video editing Reels, TikTok & YouTube Commercial',
        'Gratis 1x revisi sound design & cinematic color grading',
        'Alight Motion 1 Tahun garansi penuh: Rp 6.000',
        'CapCut Pro Full Template & Cloud: Rp 12.000',
      ],
    },
  ];

  const channels = [
    { id: 'all', label: 'Semua Notifikasi', icon: Bell, count: notifications.length + updatePillars.length },
    { id: 'features', label: 'Update Fitur OS', icon: Sparkles, count: 1 },
    { id: 'portfolio', label: 'Update Portofolio', icon: Briefcase, count: 1 },
    { id: 'gallery', label: 'Update Gallery 4K', icon: ImageIcon, count: 1 },
    { id: 'files', label: 'Update File Explorer', icon: FolderTree, count: 1 },
    { id: 'promo', label: 'Promo & Diskon', icon: Flame, count: 1 },
  ];

  const filteredPillars = updatePillars.filter((item) => {
    const matchChannel = activeChannel === 'all' || item.channelId === activeChannel;
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchChannel && matchSearch;
  });

  const filteredNotifs = notifications.filter((item) => {
    const matchChannel =
      activeChannel === 'all' ||
      (activeChannel === 'features' && (item.type === 'update' || item.type === 'system')) ||
      (activeChannel === 'portfolio' && item.type === 'portfolio') ||
      (activeChannel === 'promo' && item.type === 'promo') ||
      (activeChannel === 'gallery' && item.category?.toLowerCase().includes('gallery')) ||
      (activeChannel === 'files' && item.category?.toLowerCase().includes('file'));

    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase());

    return matchChannel && matchSearch;
  });

  // ==========================================
  // MOBILE VIEW: Android 16 Material You Notification Shade
  // ==========================================
  if (isMobile) {
    return (
      <WindowFrame title="Pusat Notifikasi OS" icon={Bell} badgeText={`${unreadNotifCount} Baru`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Android Notification Shade Header */}
          <div
            className="glass-card"
            style={{
              padding: '16px',
              borderRadius: '20px',
              background: 'var(--bg-surface-elevated)',
              border: '2px solid var(--border-medium)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #FF5E3A 0%, #FF9C0F 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Bell size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '0.94rem', fontWeight: 900, margin: 0 }}>Pusat Notifikasi</h3>
                <span style={{ fontSize: '0.72rem', color: unreadNotifCount > 0 ? 'var(--color-orange)' : 'var(--text-muted)', fontWeight: 700 }}>
                  {unreadNotifCount > 0 ? `${unreadNotifCount} pesan belum dibaca` : 'Semua pesan telah dibaca'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              {unreadNotifCount > 0 && (
                <button
                  onClick={() => {
                    playSoundEffect('click');
                    markAllNotifsAsRead();
                  }}
                  className="btn btn-glass btn-sm"
                  style={{ fontSize: '0.72rem', padding: '6px 10px', borderRadius: 'var(--radius-pill)', gap: '4px' }}
                  title="Tandai Semua Dibaca"
                >
                  <CheckCheck size={13} className="text-green" />
                  <span>Baca Semua</span>
                </button>
              )}
              <button
                onClick={() => {
                  playSoundEffect('click');
                  triggerSampleNotification();
                }}
                className="btn btn-primary-orange btn-sm"
                style={{ fontSize: '0.72rem', padding: '6px 10px', borderRadius: 'var(--radius-pill)', gap: '4px' }}
                title="Kirim Notifikasi Simulasi"
              >
                <PlusCircle size={13} />
                <span>Tes</span>
              </button>
            </div>
          </div>

          {/* Category Filter Chips (Horizontal Swipe) */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '4px',
              scrollbarWidth: 'none',
            }}
          >
            {channels.map((ch) => {
              const Icon = ch.icon;
              const isSelected = activeChannel === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setActiveChannel(ch.id);
                    playSoundEffect('click');
                  }}
                  className={`filter-pill ${isSelected ? 'active' : ''}`}
                  style={{
                    padding: '7px 14px',
                    fontSize: '0.76rem',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    gap: '6px',
                  }}
                >
                  <Icon size={13} />
                  <span>{ch.label}</span>
                </button>
              );
            })}
          </div>

          {/* Android Notification Feed Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Pemberitahuan Sistem ({filteredNotifs.length})
            </span>

            {filteredNotifs.length === 0 ? (
              <div
                className="glass-card"
                style={{
                  padding: '24px 16px',
                  textAlign: 'center',
                  borderRadius: '16px',
                  background: 'var(--bg-surface)',
                }}
              >
                <Bell size={28} style={{ color: 'var(--text-muted)', marginBottom: '6px' }} />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                  Tidak ada notifikasi sistem pada kategori ini.
                </p>
              </div>
            ) : (
              filteredNotifs.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markNotifAsRead(n.id)}
                  className="glass-card btn-press"
                  style={{
                    padding: '14px',
                    borderRadius: '18px',
                    background: n.read ? 'var(--bg-surface-elevated)' : 'var(--color-orange-subtle)',
                    border: n.read ? '2px solid var(--border-medium)' : '2px solid var(--color-orange)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          background: n.type === 'promo' ? '#FF9C0F' : n.type === 'portfolio' ? '#0052F5' : '#10B981',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {n.type === 'promo' ? <Flame size={14} /> : n.type === 'portfolio' ? <Briefcase size={14} /> : <Sparkles size={14} />}
                      </div>
                      <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {n.category || 'Sistem'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{n.time}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotif(n.id);
                        }}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: n.read ? 700 : 900, margin: '0 0 3px 0', color: 'var(--text-primary)' }}>
                      {n.title}
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                      {n.message}
                    </p>
                  </div>

                  {n.targetApp && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '4px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markNotifAsRead(n.id);
                          openApp(n.targetApp);
                        }}
                        className="btn btn-primary-orange btn-sm"
                        style={{ fontSize: '0.72rem', padding: '4px 12px', borderRadius: 'var(--radius-pill)', gap: '4px' }}
                      >
                        <span>{n.actionLabel || 'Buka'} ↗</span>
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Official Update Pillars Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Log Update & Informasi Resmi ({filteredPillars.length})
            </span>

            {filteredPillars.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedUpdate(p)}
                className="glass-card btn-press"
                style={{
                  padding: '14px',
                  borderRadius: '18px',
                  background: 'var(--bg-surface-elevated)',
                  border: '2px solid var(--border-medium)',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={p.cover}
                  alt={p.title}
                  style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className={`badge ${p.badgeColor}`} style={{ fontSize: '0.62rem', padding: '1px 6px', marginBottom: '4px' }}>
                    {p.badge}
                  </span>
                  <h4
                    style={{
                      fontSize: '0.84rem',
                      fontWeight: 800,
                      margin: '2px 0 2px 0',
                      color: 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {p.title}
                  </h4>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{p.date} • Klik untuk baca</span>
                </div>
                <ChevronRight size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Detail Modal */}
        {selectedUpdate && (
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
            onClick={() => setSelectedUpdate(null)}
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
              <div style={{ height: '160px', position: 'relative', overflow: 'hidden' }}>
                <img src={selectedUpdate.cover} alt={selectedUpdate.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button
                  onClick={() => setSelectedUpdate(null)}
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
                <span className={`badge ${selectedUpdate.badgeColor}`} style={{ fontSize: '0.68rem', marginBottom: '8px' }}>
                  {selectedUpdate.badge}
                </span>
                <h3 style={{ fontSize: '1rem', fontWeight: 900, margin: '6px 0', color: 'var(--text-primary)' }}>
                  {selectedUpdate.title}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 14px 0' }}>
                  {selectedUpdate.description}
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setSelectedUpdate(null)} className="btn btn-glass btn-sm" style={{ flex: 1 }}>
                    Tutup
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUpdate(null);
                      openApp(selectedUpdate.actionApp);
                    }}
                    className="btn btn-primary-orange btn-sm"
                    style={{ flex: 2 }}
                  >
                    {selectedUpdate.actionLabel}
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
  // DESKTOP & TABLET VIEW: Modern Action Center Dual-Pane Layout
  // ==========================================
  return (
    <WindowFrame title="Pusat Notifikasi & Action Center OS" icon={Bell} badgeText={`Notifikasi: ${unreadNotifCount} Baru`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* ── TOP HERO BAR: Search & Real-time Action Center Summary ── */}
        <div
          className="glass-card"
          style={{
            padding: '16px 24px',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #FF5E3A 0%, #FF9C0F 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <Bell size={24} />
              {unreadNotifCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-3px',
                    right: '-3px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#EF4444',
                    border: '2px solid var(--bg-surface)',
                  }}
                />
              )}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)' }}>
                  Pusat Notifikasi & Informasi Pembaruan
                </h2>
                <span className={unreadNotifCount > 0 ? 'badge badge-orange' : 'badge badge-green'} style={{ fontSize: '0.72rem' }}>
                  {unreadNotifCount > 0 ? `${unreadNotifCount} Pesan Baru` : 'Semua Terbaca'}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                Log resmi update Fitur OS, Portofolio, Galeri Foto 4K, Aset File Explorer, dan Promo Komisi.
              </p>
            </div>
          </div>

          {/* Live Search Bar */}
          <div
            className="search-bar"
            style={{
              padding: '8px 16px',
              width: '280px',
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
              placeholder="Cari notifikasi & warta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.82rem',
                width: '100%',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* ── MAIN WORKSPACE: Dual Pane (Left Sidebar Nav + Right Feed) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '270px 1fr', gap: '20px', alignItems: 'start' }}>

          {/* Left Panel: Category Filter Channels & OS Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Channels List Card */}
            <div
              className="glass-card"
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-xl)',
                background: 'var(--bg-surface-elevated)',
                border: '2px solid var(--border-medium)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', padding: '0 8px 6px 8px' }}>
                Kategori Saluran
              </span>

              {channels.map((ch) => {
                const Icon = ch.icon;
                const isSelected = activeChannel === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setActiveChannel(ch.id);
                      playSoundEffect('click');
                    }}
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
                      <span>{ch.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick OS Action Buttons Card */}
            <div
              className="glass-card"
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-xl)',
                background: 'var(--bg-surface)',
                border: '2px solid var(--border-medium)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Tindakan Sistem
              </span>

              <button
                onClick={() => {
                  playSoundEffect('click');
                  triggerSampleNotification();
                }}
                className="btn btn-primary-orange btn-sm"
                style={{ width: '100%', justifyContent: 'center', gap: '6px', fontSize: '0.78rem' }}
                title="Kirim notifikasi simulasi untuk uji coba sistem"
              >
                <PlusCircle size={14} />
                <span>Simulasi Notif Masuk</span>
              </button>

              <button
                onClick={() => {
                  playSoundEffect('click');
                  markAllNotifsAsRead();
                }}
                disabled={unreadNotifCount === 0}
                className="btn btn-glass btn-sm"
                style={{ width: '100%', justifyContent: 'center', gap: '6px', fontSize: '0.78rem' }}
              >
                <CheckCheck size={14} className="text-green" />
                <span>Tandai Semua Dibaca</span>
              </button>

              <button
                onClick={() => {
                  playSoundEffect('click');
                  resetNotificationsToDefault();
                }}
                className="btn btn-glass btn-sm"
                style={{ width: '100%', justifyContent: 'center', gap: '6px', fontSize: '0.78rem' }}
              >
                <RotateCcw size={14} />
                <span>Pulihkan Log Standar</span>
              </button>
            </div>
          </div>

          {/* Right Panel: Notifications Feed & Update Pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Active System Notifications Section */}
            {filteredNotifs.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    Pemberitahuan Sistem ({filteredNotifs.length})
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {filteredNotifs.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotifAsRead(n.id)}
                      className="glass-card hover-lift"
                      style={{
                        padding: '14px 18px',
                        borderRadius: '16px',
                        background: n.read ? 'var(--bg-surface-elevated)' : 'var(--color-orange-subtle)',
                        border: n.read ? '2px solid var(--border-medium)' : '2px solid var(--color-orange)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '14px',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '10px',
                            background: n.type === 'promo' ? '#FF9C0F' : n.type === 'portfolio' ? '#0052F5' : '#10B981',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {n.type === 'promo' ? <Flame size={18} /> : n.type === 'portfolio' ? <Briefcase size={18} /> : <Sparkles size={18} />}
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                            <span className="badge badge-neutral" style={{ fontSize: '0.64rem', padding: '1px 6px' }}>
                              {n.category || 'Sistem'}
                            </span>
                            {!n.read && (
                              <span
                                style={{
                                  background: '#EF4444',
                                  color: '#FFFFFF',
                                  fontSize: '0.62rem',
                                  fontWeight: 800,
                                  padding: '1px 6px',
                                  borderRadius: 'var(--radius-pill)',
                                }}
                              >
                                Baru
                              </span>
                            )}
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>• {n.time}</span>
                          </div>

                          <h4 style={{ fontSize: '0.94rem', fontWeight: n.read ? 700 : 900, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                            {n.title}
                          </h4>

                          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                            {n.message}
                          </p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        {n.targetApp && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markNotifAsRead(n.id);
                              openApp(n.targetApp);
                            }}
                            className="btn btn-primary-orange btn-sm"
                            style={{ fontSize: '0.74rem', padding: '5px 14px', gap: '4px' }}
                          >
                            <span>{n.actionLabel || 'Buka'} ↗</span>
                          </button>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleNotifRead(n.id);
                          }}
                          className="btn btn-glass btn-sm"
                          style={{ padding: '6px 8px', fontSize: '0.72rem' }}
                          title={n.read ? 'Tandai Belum Dibaca' : 'Tandai Dibaca'}
                        >
                          {n.read ? <EyeOff size={13} /> : <Eye size={13} />}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotif(n.id);
                          }}
                          className="btn btn-glass btn-sm"
                          style={{ padding: '6px 8px', color: '#EF4444' }}
                          title="Hapus Notifikasi"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Official Update Pillars Feed Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Rangkuman Update Resmi & Pengumuman ({filteredPillars.length})
              </span>

              {filteredPillars.map((p) => (
                <div
                  key={p.id}
                  className="glass-card hover-lift"
                  style={{
                    borderRadius: '20px',
                    border: '2px solid var(--border-medium)',
                    background: 'var(--bg-surface-elevated)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'row',
                    boxShadow: 'var(--shadow-md)',
                  }}
                >
                  <div
                    style={{ width: '280px', minHeight: '200px', position: 'relative', overflow: 'hidden', cursor: 'pointer', flexShrink: 0 }}
                    onClick={() => setSelectedUpdate(p)}
                  >
                    <img src={p.cover} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                      <span className={`badge ${p.badgeColor}`} style={{ fontSize: '0.68rem' }}>{p.badge}</span>
                    </div>
                  </div>

                  <div style={{ padding: '20px 24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '0.76rem', color: 'var(--color-orange)', fontWeight: 800 }}>{p.sender}</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.date} • {p.timeAgo}</span>
                      </div>

                      <h3
                        onClick={() => setSelectedUpdate(p)}
                        style={{ fontSize: '1.15rem', fontWeight: 900, margin: '0 0 8px 0', color: 'var(--text-primary)', cursor: 'pointer', lineHeight: 1.35 }}
                      >
                        {p.title}
                      </h3>

                      <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 12px 0' }}>
                        {p.summary}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '2px solid var(--border-subtle)', paddingTop: '12px' }}>
                      <button onClick={() => setSelectedUpdate(p)} className="btn btn-glass btn-sm" style={{ fontSize: '0.76rem', gap: '4px' }}>
                        <Info size={13} className="text-orange" />
                        <span>Baca Rincian</span>
                      </button>

                      <button
                        onClick={() => openApp(p.actionApp)}
                        className="btn btn-primary-orange btn-sm hover-lift"
                        style={{ fontSize: '0.78rem', padding: '6px 16px', fontWeight: 800, gap: '4px' }}
                      >
                        <span>{p.actionLabel}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── DESKTOP DETAIL MODAL ── */}
        {selectedUpdate && (
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
            onClick={() => setSelectedUpdate(null)}
          >
            <div
              className="animate-scale-in"
              style={{
                width: '100%',
                maxWidth: '720px',
                maxHeight: '90vh',
                borderRadius: '24px',
                background: 'var(--bg-surface-elevated)',
                border: '2px solid var(--border-medium)',
                overflow: 'hidden',
                boxShadow: '0 24px 64px rgba(0, 0, 0, 0.9)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                <img src={selectedUpdate.cover} alt={selectedUpdate.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button
                  onClick={() => setSelectedUpdate(null)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'rgba(0,0,0,0.65)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    padding: '8px',
                    cursor: 'pointer',
                  }}
                >
                  <X size={18} />
                </button>
                <div style={{ position: 'absolute', bottom: '16px', left: '16px' }}>
                  <span className={`badge ${selectedUpdate.badgeColor}`}>{selectedUpdate.badge}</span>
                </div>
              </div>

              <div style={{ padding: '24px', overflowY: 'auto', maxHeight: 'calc(90vh - 220px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--color-orange)', fontWeight: 800 }}>{selectedUpdate.sender}</span>
                  <span>•</span>
                  <span>{selectedUpdate.date}</span>
                </div>

                <h2 style={{ fontSize: '1.3rem', fontWeight: 900, margin: '0 0 12px 0', color: 'var(--text-primary)' }}>
                  {selectedUpdate.title}
                </h2>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                  {selectedUpdate.description}
                </p>

                {/* Highlights */}
                <div
                  style={{
                    background: 'var(--bg-surface)',
                    padding: '16px',
                    borderRadius: '16px',
                    border: '2px solid var(--border-subtle)',
                    marginBottom: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <span style={{ fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-orange)' }}>
                    Poin Utama Pembaruan:
                  </span>
                  {selectedUpdate.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      <Check size={14} className="text-orange" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '2px solid var(--border-medium)', paddingTop: '16px' }}>
                  <button onClick={() => setSelectedUpdate(null)} className="btn btn-glass btn-sm">
                    Tutup
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUpdate(null);
                      openApp(selectedUpdate.actionApp);
                    }}
                    className="btn btn-primary-orange btn-sm hover-lift"
                    style={{ padding: '8px 24px', fontWeight: 800 }}
                  >
                    {selectedUpdate.actionLabel}
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

export default NotificationsPage;
