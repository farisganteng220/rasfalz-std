import React, { useState, useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';
import { useOS } from '../context/OSContext';
import { useAudio } from '../context/AudioContext';
import { WindowFrame } from '../components/common/WindowFrame';
import {
  Newspaper,
  Calendar,
  Clock,
  Tag,
  Search,
  ExternalLink,
  Sparkles,
  Share2,
  Bookmark,
  ArrowRight,
  Flame,
  Zap,
  CheckCircle2,
  ChevronRight,
  Filter,
  Send,
  MessageSquare,
  Activity,
  BookOpen,
  X,
} from 'lucide-react';
import {
  calculateEstimatedReadTime,
  getArticleReadActivity,
  formatReadingDuration,
  formatTimeAgo,
  getAllReadActivityStats,
} from '../utils/readingTime';

export const NewsPage = () => {
  const { isMobile, openNews, addToast } = useOS();
  const { playSoundEffect } = useAudio();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [subInput, setSubInput] = useState('');

  const newsList = siteConfig.newsItems || [];

  // Reactive reading activity tracking state
  const [readActivityMap, setReadActivityMap] = useState(() => {
    return getAllReadActivityStats(newsList).activities;
  });

  useEffect(() => {
    const updateStats = () => {
      setReadActivityMap(getAllReadActivityStats(newsList).activities);
    };

    window.addEventListener('rasfalz-read-activity-updated', updateStats);
    window.addEventListener('storage', updateStats);
    return () => {
      window.removeEventListener('rasfalz-read-activity-updated', updateStats);
      window.removeEventListener('storage', updateStats);
    };
  }, [newsList]);

  const latestNewsItem = newsList.find(item => item.isLatest) || newsList[0];

  const matchesNewsCategory = (item, catId) => {
    if (!catId || catId === 'Semua') return true;
    const target = catId.toLowerCase();
    const itemCat = (item.category || '').toLowerCase();
    const itemBadge = (item.badge || '').toLowerCase();

    if (target === 'islatest' || target === 'terbaru' || target === 'latest') {
      return Boolean(item.isLatest);
    }
    if (target === 'update' || target === 'pembaruan') {
      return itemCat === 'update' || itemCat === 'pembaruan' || itemBadge.includes('update') || itemBadge.includes('feature');
    }
    if (target === 'news' || target === 'berita') {
      return itemCat === 'news' || itemCat === 'berita' || itemBadge.includes('welcome');
    }
    if (target === 'promo' || target === 'promosi') {
      return itemCat === 'promo' || itemCat === 'promosi' || itemBadge.includes('promo') || itemBadge.includes('harga');
    }
    if (target === 'koleksi' || target === 'portofolio') {
      return itemCat === 'koleksi' || itemCat === 'portofolio' || itemBadge.includes('portofolio');
    }
    return itemCat === target || itemBadge.includes(target);
  };

  const categories = [
    { id: 'Semua', label: 'Semua Berita', icon: Newspaper },
    { id: 'isLatest', label: 'Terbaru', icon: Flame },
    { id: 'Update', label: 'Update Fitur', icon: Zap },
    { id: 'News', label: 'Berita Studio', icon: BookOpen },
    { id: 'Promo', label: 'Promo Diskon', icon: Flame },
    { id: 'Koleksi', label: 'Koleksi Karya', icon: Sparkles },
  ];

  const filteredNews = newsList.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.content && item.content.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = matchesNewsCategory(item, selectedCategory);
    return matchesSearch && matchesCat;
  });

  const handleBookmark = (id, e) => {
    e.stopPropagation();
    setBookmarkedIds(prev => {
      const isBookmarked = prev.includes(id);
      if (isBookmarked) {
        addToast('Dihapus dari Simpanan', 'Artikel telah dihapus dari daftar simpanan.', 'info');
        return prev.filter(item => item !== id);
      } else {
        addToast('Disimpan', 'Artikel berhasil disimpan ke bookmark Anda!', 'success');
        return [...prev, id];
      }
    });
  };

  const handleShare = (item, e) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin);
      addToast('Tautan Disalin', `Tautan "${item.title}" siap dibagikan!`, 'info');
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!subInput.trim()) return;
    setEmailSubscribed(true);
    addToast('Berhasil Berlangganan', 'Anda akan menerima pemberitahuan update dan promo studio!', 'success');
    setSubInput('');
  };

  // ==========================================
  // MOBILE VIEW: Redesigned & Tailored for Mobile
  // ==========================================
  if (isMobile) {
    return (
      <WindowFrame title="Berita dan Update" icon={Newspaper} badgeText="Rasfalz Studio">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '4px 0 28px 0' }}>

          {/* 1. Mobile Top Stats & Digest Header */}
          <div
            className="glass-card"
            style={{
              padding: '16px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, var(--bg-surface) 0%, rgba(255, 156, 15, 0.06) 100%)',
              border: '2px solid var(--border-medium)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="badge badge-orange" style={{ fontSize: '0.66rem', padding: '3px 8px' }}>
                  STUDIO PRESS
                </span>
                {Object.keys(readActivityMap).length > 0 && (
                  <span className="badge badge-green" style={{ fontSize: '0.64rem', padding: '2px 6px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <CheckCircle2 size={11} />
                    <span>{Object.keys(readActivityMap).length} Selesai</span>
                  </span>
                )}
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                {newsList.length} Artikel Warta
              </span>
            </div>

            <div>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 900, margin: '0 0 4px 0', color: 'var(--text-primary)', lineHeight: 1.25 }}>
                <span className="text-gradient">Berita</span> &amp; Promo <span className="text-gradient">Rasfalz Studio</span>
              </h1>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                Rilis fitur terbaru, berita proyek resmi, serta promo diskon komisi kreatif.
              </p>
            </div>

            {/* Quick Search Input */}
            <div
              className="search-bar"
              style={{
                width: '100%',
                maxWidth: '100%',
                padding: '8px 14px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--bg-surface-elevated)',
                border: '2px solid var(--border-medium)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '4px',
              }}
            >
              <Search size={15} className="text-orange" />
              <input
                type="text"
                placeholder="Cari berita, promo, update..."
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
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* 2. Breaking Ticker Strip (Mobile Ticker) */}
          {latestNewsItem && (
            <div
              onClick={() => openNews(latestNewsItem)}
              className="btn-press"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(255, 156, 15, 0.12) 0%, var(--bg-surface) 100%)',
                border: '2px solid var(--color-orange)',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
              }}
            >
              <span
                className="badge badge-orange"
                style={{
                  fontSize: '0.64rem',
                  padding: '2px 8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                <Flame size={11} />
                <span>TERKINI</span>
              </span>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  flex: 1,
                }}
              >
                {latestNewsItem.title}
              </span>
              <ChevronRight size={15} className="text-orange" style={{ flexShrink: 0 }} />
            </div>
          )}

          {/* 3. Horizontal Category Swipe Bar */}
          <div>
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
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                const count =
                  cat.id === 'Semua'
                    ? newsList.length
                    : newsList.filter(i => matchesNewsCategory(i, cat.id)).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
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
                    <span>{cat.label}</span>
                    <span style={{ opacity: 0.75, fontSize: '0.7rem' }}>({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Featured Spotlight Card (If Latest News matches filter and no search) */}
          {latestNewsItem && !searchTerm && (selectedCategory === 'Semua' || selectedCategory === 'isLatest' || selectedCategory === 'Terbaru') && (
            <div
              onClick={() => openNews(latestNewsItem)}
              className="glass-card btn-press"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                background: 'var(--bg-surface)',
                border: '2px solid var(--color-orange)',
                boxShadow: 'var(--shadow-md)',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              {/* Cover Image with gradient overlay */}
              <div style={{ height: '175px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={latestNewsItem.image}
                  alt={latestNewsItem.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '12px',
                  }}
                >
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span className="badge badge-orange animate-pulse" style={{ fontSize: '0.64rem', padding: '2px 8px', fontWeight: 800 }}>
                      <Flame size={11} />
                      <span>Terkini • {latestNewsItem.badge || 'Terkini'}</span>
                    </span>
                    <span className="badge badge-category" style={{ fontSize: '0.64rem', padding: '2px 8px' }}>
                      {latestNewsItem.category}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#FFFFFF', fontSize: '0.74rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} color="#FF9C0F" />
                      {latestNewsItem.date}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} />
                      Est. {calculateEstimatedReadTime(latestNewsItem)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h3 style={{ fontSize: '1.02rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                  {latestNewsItem.title}
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {latestNewsItem.summary}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '2px solid var(--border-subtle)', paddingTop: '10px', marginTop: '4px' }}>
                  <span style={{ fontSize: '0.76rem', color: 'var(--color-orange)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Baca Sekarang <ChevronRight size={14} />
                  </span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={(e) => handleShare(latestNewsItem, e)}
                      className="btn btn-glass btn-sm"
                      style={{ padding: '4px 8px' }}
                      title="Bagikan Tautan"
                    >
                      <Share2 size={13} />
                    </button>
                    <button
                      onClick={(e) => handleBookmark(latestNewsItem.id, e)}
                      className="btn btn-glass btn-sm"
                      style={{ padding: '4px 8px', color: bookmarkedIds.includes(latestNewsItem.id) ? 'var(--color-orange)' : 'var(--text-primary)' }}
                      title="Simpan Bookmark"
                    >
                      <Bookmark size={13} fill={bookmarkedIds.includes(latestNewsItem.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. Mobile Articles List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Daftar Artikel ({filteredNews.length})
              </span>
              <span className="badge badge-category" style={{ fontSize: '0.64rem' }}>
                {selectedCategory}
              </span>
            </div>

            {filteredNews.length === 0 ? (
              <div
                className="glass-card"
                style={{
                  padding: '32px 16px',
                  textAlign: 'center',
                  borderRadius: '16px',
                  background: 'var(--bg-surface)',
                }}
              >
                <Newspaper size={36} className="text-orange" style={{ margin: '0 auto 8px auto', opacity: 0.6 }} />
                <h4 style={{ fontSize: '0.96rem', margin: '0 0 4px 0' }}>Tidak ada artikel yang cocok</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 12px 0' }}>
                  Coba kata kunci pencarian lain atau pilih kategori Semua.
                </p>
                <button
                  onClick={() => { setSearchTerm(''); setSelectedCategory('Semua'); }}
                  className="btn btn-primary-orange btn-sm"
                  style={{ fontSize: '0.78rem' }}
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              filteredNews.map((item) => {
                const isBookmarked = bookmarkedIds.includes(item.id);
                const isLatestCard = Boolean(item.isLatest);

                return (
                  <div
                    key={item.id}
                    onClick={() => openNews(item)}
                    className="glass-card btn-press"
                    style={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      background: 'var(--bg-surface)',
                      border: isLatestCard ? '2px solid var(--color-orange)' : '2px solid var(--border-medium)',
                      boxShadow: isLatestCard ? 'var(--shadow-sm)' : 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Top Row: Thumbnail + Title */}
                    <div style={{ display: 'flex', gap: '12px', padding: '12px' }}>
                      <div
                        style={{
                          width: '90px',
                          height: '90px',
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
                        {isLatestCard && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '4px',
                              left: '4px',
                            }}
                          >
                            <span
                              className="badge badge-orange"
                              style={{
                                fontSize: '0.56rem',
                                padding: '1px 5px',
                                fontWeight: 800,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '2px',
                              }}
                            >
                              <Flame size={8} />
                              <span>isLatest</span>
                            </span>
                          </div>
                        )}
                      </div>

                      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', flexWrap: 'wrap' }}>
                            <span className="badge badge-category" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                              {item.category}
                            </span>
                            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                              {item.date}
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

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Clock size={11} />
                            <span>{calculateEstimatedReadTime(item)}</span>
                          </span>

                          {readActivityMap[item.id]?.duration > 0 ? (
                            <span
                              className="badge badge-orange"
                              style={{ fontSize: '0.58rem', padding: '1px 5px' }}
                            >
                              ✓ Selesai
                            </span>
                          ) : (
                            <span
                              className="badge badge-neutral"
                              style={{ fontSize: '0.58rem', padding: '1px 5px', opacity: 0.7 }}
                            >
                              Belum dibaca
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        background: 'var(--bg-surface-elevated)',
                        borderTop: '2px solid var(--border-subtle)',
                      }}
                    >
                      <span style={{ fontSize: '0.74rem', color: 'var(--color-orange)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '3px' }}>
                        Baca Artikel <ChevronRight size={13} />
                      </span>

                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button
                          onClick={(e) => handleShare(item, e)}
                          className="btn btn-glass btn-sm"
                          style={{ padding: '3px 7px', fontSize: '0.7rem' }}
                          title="Bagikan Tautan"
                        >
                          <Share2 size={12} />
                        </button>
                        <button
                          onClick={(e) => handleBookmark(item.id, e)}
                          className="btn btn-glass btn-sm"
                          style={{ padding: '3px 7px', color: isBookmarked ? 'var(--color-orange)' : 'var(--text-primary)' }}
                          title="Simpan Bookmark"
                        >
                          <Bookmark size={12} fill={isBookmarked ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* 6. Mobile Newsletter Box */}
          <div
            className="glass-card"
            style={{
              padding: '18px 16px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, var(--color-orange-subtle) 0%, var(--bg-surface) 100%)',
              border: '2px solid var(--color-orange)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <Sparkles size={16} className="text-orange" />
                <h4 style={{ fontSize: '1.02rem', margin: 0, fontWeight: 800, color: 'var(--text-primary)' }}>
                  Dapatkan Berita Kilat &amp; Promo
                </h4>
              </div>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                Langganan notifikasi berita untuk update diskon komisi dan rilis aset studio.
              </p>
            </div>

            {emailSubscribed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontWeight: 800, fontSize: '0.8rem' }}>
                <CheckCircle2 size={16} />
                <span>Terdaftar dalam prioritas studio!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="email"
                  placeholder="Email Anda..."
                  value={subInput}
                  onChange={(e) => setSubInput(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-pill)',
                    border: '2px solid var(--border-medium)',
                    background: 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                    fontSize: '0.8rem',
                    outline: 'none',
                    minWidth: 0,
                  }}
                />
                <button type="submit" className="btn btn-primary-orange btn-sm" style={{ padding: '8px 14px', fontSize: '0.78rem', flexShrink: 0 }}>
                  <Send size={13} />
                  <span>Kirim</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </WindowFrame>
    );
  }

  return (
    <WindowFrame title="Berita & Pengumuman Studio" icon={Newspaper} badgeText="Studio News Hub v2.5">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Top Header Banner */}
        <div
          className="glass-card"
          style={{
            padding: '24px 28px',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--bg-surface)',
            border: '2px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <span className="badge badge-orange">RASFALZ PRESS</span>
              <span className="badge badge-blue">Official Updates</span>
              {Object.keys(readActivityMap).length > 0 && (
                <span className="badge badge-green" style={{ fontSize: '0.68rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={12} />
                  <span>{Object.keys(readActivityMap).length} Dibaca ({formatReadingDuration(Object.values(readActivityMap).reduce((acc, curr) => acc + curr.duration, 0))})</span>
                </span>
              )}
            </div>
            <h1 style={{ fontSize: '1.8rem', margin: '0 0 6px 0', color: 'var(--text-primary)' }}>
              Berita & Promo Eksklusif
            </h1>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', margin: 0, maxWidth: '600px', lineHeight: 1.5 }}>
              Pusat informasi resmi seputar diskon komisi, rilis portofolio terbaru, fitur sistem operasi, dan informasi lainnya.
            </p>
          </div>
        </div>

        {/* Breaking News Ticker Strip */}
        {latestNewsItem && (
          <div
            onClick={() => openNews(latestNewsItem)}
            className="glass-card btn-press hover-lift"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 18px',
              borderRadius: 'var(--radius-pill)',
              background: 'linear-gradient(90deg, rgba(255, 156, 15, 0.14) 0%, var(--bg-surface) 100%)',
              border: '1.5px solid var(--color-orange)',
              cursor: 'pointer',
              gap: '14px',
              flexWrap: 'wrap',
            }}
            title="Klik untuk membuka warta terbaru"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden', minWidth: 0 }}>
              <span
                className="badge badge-orange animate-pulse"
                style={{
                  fontSize: '0.70rem',
                  padding: '3px 9px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: 800,
                  flexShrink: 0,
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <Flame size={12} />
                <span>TERBARU</span>
              </span>
              <span
                style={{
                  fontSize: '0.86rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {latestNewsItem.title}
              </span>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', flexShrink: 0 }}>
                • {latestNewsItem.date}
              </span>
            </div>

            <span
              style={{
                fontSize: '0.80rem',
                color: 'var(--color-orange)',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0,
                marginLeft: 'auto',
              }}
            >
              <span>Baca Berita</span>
              <ArrowRight size={14} />
            </span>
          </div>
        )}

        {/* Latest News Hero Spotlight Card (Visible when not actively filtering specific searches) */}
        {latestNewsItem && !searchTerm && (selectedCategory === 'Semua' || selectedCategory === 'isLatest' || selectedCategory === 'Terbaru') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} className="text-orange" />
                <h2 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 800, color: 'var(--text-primary)' }}>
                  Sorotan Berita Paling Baru
                </h2>
              </div>
              <span className="badge badge-orange" style={{ fontSize: '0.68rem', padding: '2px 8px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Flame size={11} />
                <span>Headline Utama</span>
              </span>
            </div>

            <div
              onClick={() => openNews(latestNewsItem)}
              className="glass-card btn-press hover-lift"
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                background: 'linear-gradient(135deg, var(--bg-surface) 0%, rgba(255, 156, 15, 0.08) 100%)',
                border: '2px solid var(--color-orange)',
                boxShadow: 'var(--shadow-md)',
                cursor: 'pointer',
                transition: 'all var(--transition-normal)',
              }}
            >
              {/* Cover Banner */}
              <div style={{ position: 'relative', minHeight: '260px', overflow: 'hidden' }}>
                <img
                  src={latestNewsItem.image}
                  alt={latestNewsItem.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform var(--transition-normal)',
                  }}
                  className="hover-zoom"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '16px',
                  }}
                >
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span
                      className="badge badge-orange"
                      style={{
                        fontSize: '0.72rem',
                        padding: '4px 10px',
                        fontWeight: 800,
                        boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Flame size={12} />
                      <span>isLatest • {latestNewsItem.badge || 'Terkini'}</span>
                    </span>
                    <span
                      className="badge badge-category"
                      style={{
                        fontSize: '0.72rem',
                        padding: '4px 10px',
                      }}
                    >
                      {latestNewsItem.category}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#FFFFFF', fontSize: '0.80rem', textShadow: '0 1px 3px rgba(0,0,0,0.8)', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} color="#FF9C0F" />
                      {latestNewsItem.date}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} />
                      Est. {calculateEstimatedReadTime(latestNewsItem)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Details */}
              <div
                style={{
                  padding: '24px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontSize: '0.70rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--color-orange)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Sparkles size={12} />
                      KABAR TERKINI
                    </span>
                    {readActivityMap[latestNewsItem.id]?.duration > 0 && (
                      <span className="badge badge-green" style={{ fontSize: '0.64rem', padding: '2px 6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={10} />
                        <span>Sudah Dibaca ({formatReadingDuration(readActivityMap[latestNewsItem.id].duration)})</span>
                      </span>
                    )}
                  </div>

                  <h3
                    style={{
                      fontSize: 'clamp(1.2rem, 2.2vw, 1.55rem)',
                      fontWeight: 800,
                      lineHeight: 1.3,
                      margin: '0 0 10px 0',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {latestNewsItem.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {latestNewsItem.summary}
                  </p>
                </div>

                {/* Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '2px solid var(--border-medium)',
                    paddingTop: '16px',
                    marginTop: '8px',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openNews(latestNewsItem);
                    }}
                    className="btn btn-primary-orange btn-sm hover-lift"
                    style={{ padding: '8px 18px', fontSize: '0.84rem' }}
                  >
                    <span>Baca Berita Terbaru</span>
                    <ArrowRight size={14} />
                  </button>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={(e) => handleShare(latestNewsItem, e)}
                      className="btn btn-glass btn-sm"
                      style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                      title="Bagikan Warta Ini"
                    >
                      <Share2 size={13} />
                      <span>Bagikan</span>
                    </button>
                    <button
                      onClick={(e) => handleBookmark(latestNewsItem.id, e)}
                      className="btn btn-glass btn-sm"
                      style={{
                        padding: '6px 12px',
                        fontSize: '0.78rem',
                        color: bookmarkedIds.includes(latestNewsItem.id) ? 'var(--color-orange)' : 'var(--text-primary)',
                      }}
                      title="Simpan ke Bookmark"
                    >
                      <Bookmark size={13} fill={bookmarkedIds.includes(latestNewsItem.id) ? 'currentColor' : 'none'} />
                      <span>{bookmarkedIds.includes(latestNewsItem.id) ? 'Tersimpan' : 'Simpan'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar & Category Filter Pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
            <div className="search-bar" style={{ maxWidth: '420px' }}>
              <Search size={16} className="text-orange" />
              <input
                type="text"
                placeholder="Cari artikel, promo, atau update..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map(cat => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`filter-pill ${isActive ? 'active' : ''}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', fontSize: '0.82rem' }}
                  >
                    <Icon size={14} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div>
          {filteredNews.length === 0 ? (
            <div
              className="glass-card"
              style={{
                padding: '48px 24px',
                textAlign: 'center',
                borderRadius: 'var(--radius-xl)',
              }}
            >
              <Newspaper size={40} className="text-orange" style={{ margin: '0 auto 12px auto', opacity: 0.7 }} />
              <h3 style={{ fontSize: '1.2rem', margin: '0 0 6px 0' }}>Tidak ada artikel yang cocok</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
                Coba gunakan kata kunci pencarian lain atau pilih kategori Semua.
              </p>
              <button onClick={() => { setSearchTerm(''); setSelectedCategory('Semua'); }} className="btn btn-primary-orange btn-sm">
                Reset Filter
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '18px' }}>
              {filteredNews.map(item => {
                const isBookmarked = bookmarkedIds.includes(item.id);
                const isLatestCard = item.id === latestNewsItem?.id || item.isLatest;
                return (
                  <div
                    key={item.id}
                    onClick={() => openNews(item)}
                    className="glass-card btn-press hover-lift"
                    style={{
                      borderRadius: 'var(--radius-xl)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'var(--bg-surface)',
                      border: isLatestCard ? '2px solid var(--color-orange)' : '2px solid var(--border-medium)',
                      boxShadow: isLatestCard ? 'var(--shadow-sm)' : 'none',
                      cursor: 'pointer',
                      transition: 'all var(--transition-normal)',
                      position: 'relative',
                    }}
                  >
                    {/* Cover Thumbnail */}
                    <div style={{ height: '180px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform var(--transition-normal)',
                        }}
                        className="hover-zoom"
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          display: 'flex',
                          gap: '6px',
                        }}
                      >
                        <span className={`badge ${item.badgeType === 'blue' ? 'badge-blue' : 'badge-orange'}`} style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                          {item.badge}
                        </span>
                        <span className="badge badge-category" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                          {item.category}
                        </span>
                      </div>

                      {isLatestCard && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                          }}
                        >
                          <span
                            className="badge badge-orange animate-pulse"
                            style={{
                              fontSize: '0.68rem',
                              padding: '2px 8px',
                              fontWeight: 800,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
                            }}
                          >
                            <Flame size={11} />
                            <span>isLatest</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '14px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '8px', flexWrap: 'wrap' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar size={13} className="text-orange" />
                            {item.date}
                          </span>
                          <span>•</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={13} />
                            Est. {calculateEstimatedReadTime(item)}
                          </span>
                          {item.isLatest && (
                            <span
                              className="badge badge-orange"
                              style={{
                                fontSize: '0.62rem',
                                padding: '1px 6px',
                                fontWeight: 800,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                              }}
                            >
                              <Flame size={9} />
                              <span>isLatest</span>
                            </span>
                          )}
                          {readActivityMap[item.id]?.duration > 0 ? (
                            <span
                              className="badge badge-orange"
                              style={{ fontSize: '0.62rem', padding: '2px 6px', marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                              title={`Terakhir dibaca: ${formatTimeAgo(readActivityMap[item.id].lastReadAt)}`}
                            >
                              <Activity size={10} />
                              <span>{formatReadingDuration(readActivityMap[item.id].duration)}</span>
                              {readActivityMap[item.id].lastReadAt && (
                                <span style={{ opacity: 0.75 }}>• {formatTimeAgo(readActivityMap[item.id].lastReadAt)}</span>
                              )}
                            </span>
                          ) : (
                            <span className="badge badge-neutral" style={{ fontSize: '0.60rem', padding: '1px 5px', marginLeft: 'auto' }}>
                              Belum dibaca
                            </span>
                          )}
                        </div>

                        <h3 style={{ fontSize: '1.08rem', fontWeight: 800, margin: '0 0 8px 0', lineHeight: 1.35, color: 'var(--text-primary)' }}>
                          {item.title}
                        </h3>

                        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                          {item.summary}
                        </p>
                      </div>

                      {/* Card Bottom Actions */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '2px solid var(--border-medium)', paddingTop: '12px' }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--color-orange)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          Baca Artikel <ChevronRight size={14} />
                        </span>

                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            onClick={(e) => handleShare(item, e)}
                            className="btn btn-glass btn-sm"
                            style={{ padding: '4px 8px' }}
                            title="Bagikan Tautan"
                          >
                            <Share2 size={13} />
                          </button>
                          <button
                            onClick={(e) => handleBookmark(item.id, e)}
                            className="btn btn-glass btn-sm"
                            style={{ padding: '4px 8px', color: isBookmarked ? 'var(--color-orange)' : 'var(--text-primary)' }}
                            title="Simpan Bookmark"
                          >
                            <Bookmark size={13} fill={isBookmarked ? 'currentColor' : 'none'} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Newsletter / Studio Alert Subscription Box */}
        <div
          className="glass-card"
          style={{
            padding: '28px 32px',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, var(--color-orange-subtle) 0%, var(--bg-surface) 100%)',
            border: '2px solid var(--color-orange)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Sparkles size={18} className="text-orange" />
              <h3 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--text-primary)' }}>
                Ingin Dapat Info Terbaru dan Promo Dari Kami?
              </h3>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, maxWidth: '520px', lineHeight: 1.45 }}>
              Daftarkan email Anda untuk menerima pemberitahuan otomatis seputar promo kilat, update fitur website, dan informasi lainnya.
            </p>
          </div>

          {emailSubscribed ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontWeight: 800, fontSize: '0.9rem' }}>
              <CheckCircle2 size={20} />
              <span>Terima kasih! Anda sudah terdaftar dalam daftar prioritas kami.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', maxWidth: '400px', width: '100%' }}>
              <input
                type="email"
                placeholder="Masukkan email Anda..."
                value={subInput}
                onChange={(e) => setSubInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-pill)',
                  border: '2px solid var(--border-medium)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  outline: 'none',
                  minWidth: '180px',
                }}
              />
              <button type="submit" className="btn btn-primary-orange btn-sm hover-lift" style={{ padding: '10px 18px' }}>
                <Send size={14} />
                <span>Langganan</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </WindowFrame>
  );
};

export default NewsPage;
