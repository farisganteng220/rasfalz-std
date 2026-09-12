import React, { useState, useMemo } from 'react';
import { siteConfig } from '../config/siteConfig';
import { WindowFrame } from '../components/common/WindowFrame';
import { useOS } from '../context/OSContext';
import confetti from 'canvas-confetti';
import {
  ShoppingBag,
  Sparkles,
  Check,
  Star,
  ExternalLink,
  ShieldCheck,
  Zap,
  Info,
  X,
  CreditCard,
  Search,
  CheckCircle2,
  Clock,
  Layers,
  MessageCircle,
  HelpCircle,
  Tag,
  ArrowRight,
  ChevronRight,
  SlidersHorizontal,
  KeyRound,
  CheckCheck,
  PhoneCall,
  Laptop,
  Smartphone,
  Flame,
  Award,
} from 'lucide-react';

export const PremiumAppsPage = () => {
  const { addToast, isMobile } = useOS();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [activeModalApp, setActiveModalApp] = useState(null);

  // Category list based on actual creative app inventory
  const categories = [
    { id: 'All', label: 'Semua Aplikasi', icon: '🌟', count: 4 },
    { id: 'Video & Motion', label: 'Video & Motion', icon: '🎬', count: 2 },
    { id: 'Graphic & Design', label: 'Graphic & Design', icon: '🎨', count: 2 },
    { id: '1-year', label: 'Paket 1 Tahun', icon: '⏱️', count: 2 },
  ];

  // Filtering & Sorting
  const filteredApps = useMemo(() => {
    return siteConfig.premiumApps
      .filter((app) => {
        const matchesCategory =
          selectedCategory === 'All' ||
          app.category === selectedCategory ||
          (selectedCategory === '1-year' && app.duration?.includes('1 Tahun'));

        const matchesSearch =
          !searchQuery.trim() ||
          app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (app.subCategory && app.subCategory.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'lowest-price') {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, ''), 10) || 0;
          const priceB = parseInt(b.price.replace(/[^0-9]/g, ''), 10) || 0;
          return priceA - priceB;
        }
        if (sortBy === 'rating') {
          return parseFloat(b.rating || 0) - parseFloat(a.rating || 0);
        }
        // Default: popular / original order
        return 0;
      });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleBuyClick = (app) => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Fallback if canvas-confetti fails
    }
    addToast('Direct Checkout', `Mengalihkan pesanan untuk ${app.name} ke WhatsApp...`, 'success');
    window.open(app.buyUrl, '_blank');
  };

  // =========================================================================
  // 1. DEDICATED MOBILE LAYOUT: Mobile App Store Cyber-Glass Experience
  // =========================================================================
  if (isMobile) {
    return (
      <WindowFrame title="Premium Apps Store" icon={ShoppingBag} badgeText="Mobile Store v4.2">
        <style>{`
          .mobile-store-container {
            display: flex;
            flex-direction: column;
            gap: 16px;
            padding-bottom: 24px;
          }

          /* Horizontal Category Scroll */
          .mobile-category-scroll {
            display: flex;
            gap: 8px;
            overflow-x: auto;
            padding-bottom: 4px;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }
          .mobile-category-scroll::-webkit-scrollbar {
            display: none;
          }

          .mobile-cat-pill {
            display: flex;
            align-items: center;
            gap: 6px;
            white-space: nowrap;
            padding: 8px 14px;
            border-radius: var(--radius-pill);
            background: var(--bg-surface);
            border: 1.5px solid var(--border-medium);
            color: var(--text-secondary);
            font-size: 0.78rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            flex-shrink: 0;
          }
          .mobile-cat-pill.active {
            background: var(--btn-orange-bg);
            color: #FFFFFF;
            border-color: var(--btn-orange-bg);
            box-shadow: 0 4px 14px rgba(255, 156, 15, 0.35);
          }

          /* Mobile App Card */
          .mobile-app-card {
            border-radius: var(--radius-xl);
            background: var(--bg-surface);
            border: 2px solid var(--border-medium);
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 14px;
            position: relative;
            overflow: hidden;
            box-shadow: var(--shadow-sm);
          }
          .mobile-app-card:active {
            border-color: var(--color-orange);
          }

          /* Mobile OS Window Pop-Up */
          @keyframes mobileWindowPop {
            0% {
              transform: scale(0.92) translateY(14px);
              opacity: 0;
            }
            100% {
              transform: scale(1) translateY(0);
              opacity: 1;
            }
          }
          .mobile-os-window {
            animation: mobileWindowPop 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>

        <div className="mobile-store-container">
          {/* A. MOBILE HERO & STATUS HEADER */}
          <div
            className="glass-card"
            style={{
              padding: '16px 18px',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#047857',
                  border: '1px solid #065F46',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-pill)',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                  }}
                />
                <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#FFFFFF' }}>
                  Fast Response WhatsApp
                </span>
              </div>

              <span
                style={{
                  fontSize: '0.66rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  background: 'var(--btn-orange-bg, #D46200)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--btn-orange-border, #BA5400)',
                }}
              >
                Marketplace v4.2
              </span>
            </div>

            <h1
              style={{
                fontSize: '1.35rem',
                fontWeight: 900,
                margin: '0 0 4px 0',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Katalog Aplikasi Premium
            </h1>
            <p
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.45,
                margin: '0 0 14px 0',
              }}
            >
              Akun resmi bergaransi replace penuh untuk video editing, motion graphics, dan desain grafis.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '8px',
              }}
            >
              {[
                { icon: '⚡', label: 'Aktivasi < 5 Menit' },
                { icon: '🛡️', label: 'Garansi Replace' },
                { icon: '🏷️', label: 'Diskon s/d 96%' },
                { icon: '💎', label: 'Legal & Terpercaya' },
              ].map((badge, bIdx) => (
                <div
                  key={bIdx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}
                >
                  <span>{badge.icon}</span>
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* B. SEARCH & FILTER DECK */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--bg-surface)',
                border: '2px solid var(--border-medium)',
              }}
            >
              <Search size={16} style={{ color: 'var(--color-orange)', flexShrink: 0 }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari CapCut, Canva, Alight Motion..."
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '0.84rem',
                  width: '100%',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    padding: '2px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="mobile-category-scroll">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`mobile-cat-pill ${isActive ? 'active' : ''}`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 4px',
              }}
            >
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                Menampilkan {filteredApps.length} Aplikasi
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <SlidersHorizontal size={13} style={{ color: 'var(--text-muted)' }} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-pill)',
                    background: 'var(--bg-surface)',
                    border: '1.5px solid var(--border-medium)',
                    color: 'var(--text-primary)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    outline: 'none',
                  }}
                >
                  <option value="popular">Terpopuler</option>
                  <option value="lowest-price">Termurah</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* C. MOBILE APP CARDS LIST */}
          {filteredApps.length === 0 ? (
            <div
              className="glass-card"
              style={{
                padding: '32px 20px',
                borderRadius: 'var(--radius-xl)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <HelpCircle size={36} className="text-orange" />
              <h3 style={{ margin: 0, fontSize: '1.05rem' }}>Aplikasi Tidak Ditemukan</h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Tidak ada aplikasi yang cocok dengan "{searchQuery}". Coba kata kunci lainnya.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="btn btn-primary-orange btn-sm"
                style={{ marginTop: '6px' }}
              >
                Reset Pencarian
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {filteredApps.map((app) => (
                <div key={app.id} className="mobile-app-card">
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        position: 'relative',
                        width: '68px',
                        height: '68px',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        flexShrink: 0,
                        border: '1.5px solid var(--border-medium)',
                        background: 'var(--bg-surface-elevated)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                      }}
                    >
                      <img
                        src={app.thumbnail}
                        alt={app.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                        <span
                          style={{
                            fontSize: '0.64rem',
                            fontWeight: 800,
                            color: 'var(--color-blue)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {app.subCategory || app.category}
                        </span>
                        <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>•</span>
                        <span
                          style={{
                            fontSize: '0.64rem',
                            fontWeight: 800,
                            color: 'var(--text-muted)',
                          }}
                        >
                          {app.duration}
                        </span>
                      </div>

                      <h2
                        style={{
                          fontSize: '1.12rem',
                          fontWeight: 900,
                          margin: '0 0 4px 0',
                          color: 'var(--text-primary)',
                          lineHeight: 1.25,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {app.name}
                        </span>
                        <CheckCircle2 size={15} style={{ color: 'var(--color-blue)', flexShrink: 0 }} />
                      </h2>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem' }}>
                        <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>
                          ⭐ {app.rating}
                        </span>
                        <span style={{ color: 'var(--text-muted)' }}>({app.downloads} terjual)</span>
                      </div>
                    </div>

                    {app.discount && (
                      <div
                        style={{
                          background: 'var(--btn-orange-bg)',
                          color: '#FFFFFF',
                          padding: '3px 7px',
                          borderRadius: 'var(--radius-pill)',
                          fontSize: '0.65rem',
                          fontWeight: 900,
                          flexShrink: 0,
                          boxShadow: 'var(--shadow-sm)',
                        }}
                      >
                        -{app.discount}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-surface-elevated)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <KeyRound size={12} className="text-orange" />
                      {app.accountType || 'Akun Resmi'}
                    </span>

                    <span
                      style={{
                        fontSize: '0.66rem',
                        fontWeight: 800,
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-pill)',
                        background: '#047857',
                        border: '1px solid #065F46',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FFFFFF' }} />
                      {app.status || 'Ready'}
                    </span>
                  </div>

                  <div
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-lg)',
                      background: 'var(--bg-surface-elevated)',
                      border: '1.5px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--color-orange)', lineHeight: 1 }}>
                        {app.price}
                      </span>
                      {app.originalPrice && (
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                          {app.originalPrice}
                        </span>
                      )}
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: 'auto', fontWeight: 700 }}>
                        /{app.duration || 'akun'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingTop: '4px', borderTop: '1px solid var(--border-subtle)' }}>
                      {app.features.slice(0, 2).map((feat, fIdx) => (
                        <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem' }}>
                          <Check size={13} className="text-orange" style={{ flexShrink: 0 }} />
                          <span style={{ color: 'var(--text-secondary)', lineHeight: 1.3 }}>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleBuyClick(app)}
                      className="btn btn-primary-orange btn-sm btn-press"
                      style={{
                        flex: 1.3,
                        justifyContent: 'center',
                        gap: '6px',
                        fontSize: '0.84rem',
                        padding: '11px',
                        fontWeight: 800,
                      }}
                    >
                      <Zap size={15} />
                      <span>Order via WA</span>
                    </button>

                    <button
                      onClick={() => setActiveModalApp(app)}
                      className="btn btn-glass btn-sm btn-press"
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        gap: '6px',
                        fontSize: '0.8rem',
                        padding: '11px',
                        fontWeight: 700,
                      }}
                    >
                      <Info size={15} />
                      <span>Spek & Fitur</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* D. MOBILE HOW TO ORDER (3 LANGKAH CEPAT) */}
          <div
            className="glass-card"
            style={{
              padding: '16px 18px',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingBag size={17} className="text-orange" />
                <h3 style={{ fontSize: '0.98rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                  Alur Pemesanan (3 Langkah)
                </h3>
              </div>
              <span className="badge badge-orange" style={{ fontSize: '0.64rem' }}>
                Panduan
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                {
                  step: '01',
                  title: 'Pilih Aplikasi',
                  desc: 'Tentukan software sesuai kebutuhan editing Anda.',
                  accent: 'var(--color-orange)',
                },
                {
                  step: '02',
                  title: 'Order via WhatsApp',
                  desc: 'Klik tombol order, pesan otomatis terformat rapi.',
                  accent: 'var(--color-blue)',
                },
                {
                  step: '03',
                  title: 'Akun Aktif < 5 Menit',
                  desc: 'Setelah pembayaran terkonfirmasi, data akun langsung dikirim.',
                  accent: '#22C55E',
                },
              ].map((s, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 900,
                      color: s.accent,
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      border: `1px solid ${s.accent}40`,
                    }}
                  >
                    {s.step}
                  </span>
                  <div>
                    <h4 style={{ fontSize: '0.84rem', fontWeight: 800, margin: '0 0 2px 0', color: 'var(--text-primary)' }}>
                      {s.title}
                    </h4>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.35 }}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* E. MOBILE GUARANTEE & PAYMENT METHODS STRIP */}
          <div
            className="glass-card"
            style={{
              padding: '14px 16px',
              borderRadius: 'var(--radius-xl)',
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(0, 82, 245, 0.08))',
              border: '1.5px solid rgba(34, 197, 94, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="#22C55E" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.76rem', color: 'var(--text-primary)', lineHeight: 1.35 }}>
                <strong>Garansi Rasfalz Studio:</strong> Jika terjadi kendala login atau akses selama durasi sewa, kami replace akun baru gratis.
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 700 }}>
                Metode Pembayaran Resmi:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {['QRIS Instant', 'DANA', 'GoPay', 'OVO', 'ShopeePay', 'Bank Transfer'].map((pay, pIdx) => (
                  <span
                    key={pIdx}
                    style={{
                      fontSize: '0.64rem',
                      fontWeight: 700,
                      padding: '2px 7px',
                      borderRadius: 'var(--radius-pill)',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {pay}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* F. MOBILE CUSTOM INQUIRY CONSULTATION */}
          <div
            style={{
              padding: '14px',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Butuh Software Lain?
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Tanyakan ketersediaan aplikasi ke CS
              </div>
            </div>

            <a
              href="https://wa.me/6288803293497?text=Halo%20Rasfalz%20Studio%2C%20saya%20ingin%20tanya%20ketersediaan%20aplikasi%20premium%20lainnya."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glass btn-sm btn-press"
              style={{ fontSize: '0.76rem', padding: '8px 12px', gap: '6px', flexShrink: 0 }}
            >
              <PhoneCall size={13} className="text-orange" />
              <span>Chat CS</span>
            </a>
          </div>
        </div>

        {/* G. MOBILE OS WINDOW POP-UP / JENDELA */}
        {activeModalApp && (
          <div
            className="animate-fade-in"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(10, 10, 10, 0.82)',
              backdropFilter: 'blur(16px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveModalApp(null);
            }}
          >
            <div
              className="mobile-os-window glass-card"
              style={{
                width: '100%',
                maxWidth: '430px',
                maxHeight: '85vh',
                background: 'var(--bg-surface)',
                border: '2px solid var(--border-medium)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-dock)',
              }}
            >
              {/* OS Window Titlebar Header */}
              <div
                style={{
                  padding: '12px 16px',
                  background: 'var(--bg-surface-elevated)',
                  borderBottom: '2px solid var(--border-medium)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexShrink: 0,
                }}
              >
                {/* 3-Dot Window Controls + Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F56', display: 'inline-block' }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27C93F', display: 'inline-block' }} />
                  </div>
                  <span style={{ color: 'var(--border-medium)', fontSize: '0.8rem' }}>|</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                    <Info size={14} className="text-orange" style={{ flexShrink: 0 }} />
                    <span
                      style={{
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Spek & Fitur: {activeModalApp.name}
                    </span>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setActiveModalApp(null)}
                  className="btn-press"
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'var(--bg-surface)',
                    border: '1.5px solid var(--border-medium)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  <X size={15} />
                </button>
              </div>

              {/* Scrollable Window Body */}
              <div
                style={{
                  padding: '16px 18px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  flex: 1,
                }}
              >
                {/* App Main Header Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={activeModalApp.thumbnail}
                    alt={activeModalApp.name}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '16px',
                      objectFit: 'cover',
                      border: '2px solid var(--border-medium)',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px', flexWrap: 'wrap' }}>
                      <span className="badge badge-orange" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                        {activeModalApp.duration || '1 Tahun'}
                      </span>
                      <span
                        className="badge badge-green"
                        style={{
                          fontSize: '0.62rem',
                          padding: '1px 6px',
                        }}
                      >
                        {activeModalApp.status || 'Stok Ready'}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.18rem', fontWeight: 900, margin: '2px 0', color: 'var(--text-primary)', lineHeight: 1.25 }}>
                      {activeModalApp.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-orange)' }}>
                        {activeModalApp.price}
                      </span>
                      {activeModalApp.originalPrice && (
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                          {activeModalApp.originalPrice}
                        </span>
                      )}
                      {activeModalApp.discount && (
                        <span className="badge badge-orange" style={{ fontSize: '0.6rem', padding: '1px 5px' }}>
                          -{activeModalApp.discount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Account Type Banner */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.74rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <KeyRound size={13} className="text-orange" />
                  <span><strong>Tipe Akun:</strong> {activeModalApp.accountType || 'Akun Resmi'}</span>
                </div>

                {/* Description */}
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {activeModalApp.description}
                </p>

                {/* Full Features Checklist */}
                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--bg-surface-elevated)',
                    border: '1.5px solid var(--border-subtle)',
                  }}
                >
                  <h4 style={{ fontSize: '0.84rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
                    Fitur & Keunggulan Lengkap:
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {activeModalApp.features.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.74rem' }}>
                        <CheckCircle2 size={14} className="text-orange" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ color: 'var(--text-primary)', lineHeight: 1.4 }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Replace Guarantee Callout */}
                <div
                  style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(0, 82, 245, 0.08))',
                    border: '1.5px solid rgba(34, 197, 94, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <ShieldCheck size={18} color="#22C55E" style={{ flexShrink: 0 }} />
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-primary)', lineHeight: 1.35 }}>
                    <strong>Garansi Rasfalz Studio:</strong> Garansi replace baru jika ada kendala login atau akses selama durasi sewa aktif.
                  </div>
                </div>
              </div>

              {/* Window Sticky Footer Bar */}
              <div
                style={{
                  padding: '12px 16px',
                  background: 'var(--bg-surface-elevated)',
                  borderTop: '2px solid var(--border-medium)',
                  display: 'flex',
                  gap: '8px',
                  flexShrink: 0,
                }}
              >
                <button
                  onClick={() => {
                    handleBuyClick(activeModalApp);
                    setActiveModalApp(null);
                  }}
                  className="btn btn-primary-orange btn-sm btn-press"
                  style={{
                    flex: 1.4,
                    padding: '11px',
                    fontSize: '0.84rem',
                    justifyContent: 'center',
                    gap: '6px',
                    fontWeight: 800,
                  }}
                >
                  <Zap size={15} />
                  <span>Order via WA ({activeModalApp.price})</span>
                </button>

                <button
                  onClick={() => setActiveModalApp(null)}
                  className="btn btn-glass btn-sm btn-press"
                  style={{
                    flex: 0.8,
                    padding: '11px',
                    fontSize: '0.82rem',
                    justifyContent: 'center',
                  }}
                >
                  <span>Tutup</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </WindowFrame>
    );
  }

  // =========================================================================
  // 2. DEDICATED DESKTOP & TABLET LAYOUT: Cyber-Glass Studio Marketplace Command Center
  // =========================================================================
  return (
    <WindowFrame title="Premium Apps Store" icon={ShoppingBag} badgeText="Marketplace Command Center v4.2">
      <style>{`
        .desktop-store-wrapper {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding-bottom: 32px;
        }

        /* Hero Stage Bento Layout */
        .desktop-hero-bento {
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
          gap: 20px;
          align-items: stretch;
        }

        .desktop-spotlight-card {
          position: relative;
          overflow: hidden;
          padding: 28px 32px;
          border-radius: var(--radius-xl);
          background: var(--bg-surface);
          border: 2px solid var(--border-medium);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: var(--shadow-md);
        }

        .desktop-trust-hub {
          padding: 24px 26px;
          border-radius: var(--radius-xl);
          background: var(--bg-surface);
          border: 2px solid var(--border-medium);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 16px;
          box-shadow: var(--shadow-md);
        }

        /* Control Deck & Filter Tabs */
        .desktop-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          padding: 14px 20px;
          border-radius: var(--radius-xl);
          background: var(--bg-surface);
          border: 2px solid var(--border-medium);
        }

        .desktop-category-tabs {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .desktop-tab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: var(--radius-pill);
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1.5px solid var(--border-medium);
          background: var(--bg-surface-elevated);
          color: var(--text-secondary);
        }
        .desktop-tab-btn:hover {
          border-color: var(--color-orange);
          color: var(--text-primary);
        }
        .desktop-tab-btn.active {
          background: var(--btn-orange-bg);
          border-color: var(--btn-orange-bg);
          color: #FFFFFF;
          box-shadow: 0 4px 14px rgba(255, 156, 15, 0.32);
        }

        .desktop-search-deck {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          max-width: 440px;
          justify-content: flex-end;
        }

        .desktop-search-input-box {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          border-radius: var(--radius-pill);
          background: var(--bg-surface-elevated);
          border: 1.5px solid var(--border-medium);
          width: 100%;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .desktop-search-input-box:focus-within {
          border-color: var(--color-orange);
          box-shadow: 0 0 0 3px rgba(255, 156, 15, 0.18);
        }
        .desktop-search-input-box input {
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-size: 0.86rem;
          width: 100%;
        }

        /* Products Grid */
        .desktop-products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
          gap: 22px;
        }

        /* High-Craft Product Card */
        .desktop-card-craft {
          border-radius: var(--radius-xl);
          background: var(--bg-surface);
          border: 2px solid var(--border-medium);
          padding: 22px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, box-shadow 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .desktop-card-craft:hover {
          transform: translateY(-4px);
          border-color: var(--color-orange);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.25);
        }
        .desktop-card-craft:hover .card-banner-img {
          transform: scale(1.06);
        }

        .card-banner-img {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Order Roadmap & Trust Bento Grid */
        .desktop-roadmap-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        /* Tablet Responsive Rules */
        @media (max-width: 1080px) {
          .desktop-hero-bento {
            grid-template-columns: 1fr;
          }
          .desktop-products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 860px) {
          .desktop-roadmap-grid {
            grid-template-columns: 1fr;
          }
          .desktop-controls-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .desktop-search-deck {
            max-width: 100%;
          }
        }
      `}</style>

      <div className="desktop-store-wrapper">
        {/* =========================================================================
            STAGE 1: HERO SPOTLIGHT & STUDIO TRUST BENTO (DESKTOP / TABLET)
        ========================================================================= */}
        <div className="desktop-hero-bento">
          {/* Card Left: Spotlight Creator Apps Showcase */}
          <div className="desktop-spotlight-card hover-lift">
            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Top Tag Row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    className="badge badge-orange"
                    style={{
                      fontSize: '0.74rem',
                      padding: '4px 10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Flame size={13} />
                    <span>Promo Creator Suite 2026</span>
                  </span>
                  <span
                    className="badge badge-green"
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                    }}
                  >
                    ● 100% Legal & Bergaransi
                  </span>
                </div>

                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  ⭐ 4.9+ (200+ Pesanan Berhasil)
                </span>
              </div>

              {/* Spotlight Title & Story */}
              <h1
                style={{
                  fontSize: '2rem',
                  fontWeight: 900,
                  margin: '0 0 10px 0',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.22,
                }}
              >
                Aplikasi Kreatif Premium —{' '}
                <span style={{ color: 'var(--color-orange)' }}>Hemat Hingga 96%</span>
              </h1>

              <p
                style={{
                  fontSize: '0.94rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.62,
                  margin: '0 0 20px 0',
                  maxWidth: '680px',
                }}
              >
                Tingkatkan alur kerja editing video, motion graphics, dan ilustrasi digital dengan akun resmi tanpa watermark, membuka seluruh fitur AI, ekspor 4K 60FPS, serta proteksi garansi replace penuh dari Rasfalz Studio.
              </p>

              {/* 4 Feature Tags Row */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {[
                  '🚀 Ekspor Resolusi 4K & 60 FPS',
                  '🔓 Buka 1000+ Efek, Font & Preset',
                  '⚡ Aktivasi Akun Instan < 5 Menit',
                  '🛡️ Garansi Replace Selama Masa Aktif',
                ].map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-pill)',
                      background: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <CheckCircle2 size={13} className="text-orange" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Spotlight Callouts */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px',
                paddingTop: '16px',
                borderTop: '1.5px solid var(--border-subtle)',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 156, 15, 0.15)',
                    border: '1.5px solid rgba(255, 156, 15, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-orange)',
                  }}
                >
                  <Zap size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Mulai dari Rp 6.000 / Tahun
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Alight Motion, CapCut, Canva, Ibis Paint
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/6288803293497?text=Halo%20Rasfalz%20Studio%2C%20saya%20tertarik%20dengan%20promo%20aplikasi%20premium."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary-orange btn-sm btn-press"
                style={{ padding: '10px 18px', fontSize: '0.86rem', gap: '8px', fontWeight: 800 }}
              >
                <Zap size={16} />
                <span>Order via WhatsApp Cepat</span>
              </a>
            </div>
          </div>

          {/* Card Right: Studio Guarantee & Telemetry Hub */}
          <div className="desktop-trust-hub hover-lift">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={20} className="text-orange" />
                  <h3 style={{ fontSize: '1.12rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                    Jaminan Kualitas Studio
                  </h3>
                </div>
                <span className="badge badge-blue" style={{ fontSize: '0.68rem' }}>
                  Verified Store
                </span>
              </div>

              {/* 4 Point Telemetry List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  {
                    title: '100% Legal & Aman Digunakan',
                    desc: 'Akses resmi, bebas banned, dan aman untuk pembuatan konten komersial maupun pribadi.',
                    icon: ShieldCheck,
                    color: '#22C55E',
                  },
                  {
                    title: 'Garansi Replace Penuh',
                    desc: 'Jika terjadi kendala login atau akses selama durasi sewa, kami ganti akun baru tanpa biaya tambahan.',
                    icon: Check,
                    color: 'var(--color-orange)',
                  },
                  {
                    title: 'Pengiriman Kilat (< 5 Menit)',
                    desc: 'Konfirmasi bukti pembayaran langsung diproses oleh admin WhatsApp tanpa antrean panjang.',
                    icon: Zap,
                    color: '#F59E0B',
                  },
                  {
                    title: 'Dukungan Multi-Device',
                    desc: 'Kompatibel untuk smartphone Android, iOS iPhone/iPad, dan akses Web/PC sesuai aplikasi.',
                    icon: Laptop,
                    color: 'var(--color-blue)',
                  },
                ].map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-lg)',
                        background: 'var(--bg-surface-elevated)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: 'var(--radius-sm)',
                          background: `${item.color}15`,
                          border: `1.5px solid ${item.color}35`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: item.color,
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        <IconComp size={15} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2px' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom Request Footer */}
            <div
              style={{
                paddingTop: '12px',
                borderTop: '1.5px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Butuh software di luar katalog?
              </div>
              <a
                href="https://wa.me/6288803293497?text=Halo%20Rasfalz%20Studio%2C%20saya%20ingin%20tanya%20ketersediaan%20aplikasi%20premium%20lainnya."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-glass btn-sm btn-press"
                style={{ fontSize: '0.76rem', gap: '6px', padding: '6px 12px' }}
              >
                <MessageCircle size={14} className="text-orange" />
                <span>Konsultasi WA</span>
              </a>
            </div>
          </div>
        </div>

        {/* =========================================================================
            STAGE 2: DESKTOP CONTROL DECK (FILTER TABS, SEARCH & SORTING)
        ========================================================================= */}
        <div className="desktop-controls-bar">
          {/* Category Tabs with Counters */}
          <div className="desktop-category-tabs">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`desktop-tab-btn ${isActive ? 'active' : ''}`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      padding: '1px 6px',
                      borderRadius: 'var(--radius-pill)',
                      background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'var(--bg-surface)',
                      border: isActive ? 'none' : '1px solid var(--border-medium)',
                      fontWeight: 800,
                    }}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input & Sort Selector */}
          <div className="desktop-search-deck">
            <div className="desktop-search-input-box">
              <Search size={16} className="text-orange" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari aplikasi atau fitur (CapCut, Canva...)"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}
                >
                  <X size={15} />
                </button>
              ) : (
                <span
                  style={{
                    fontSize: '0.66rem',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border-medium)',
                    padding: '1px 5px',
                    borderRadius: '4px',
                    fontWeight: 700,
                  }}
                >
                  Ctrl+K
                </span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="btn-glass"
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1.5px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  outline: 'none',
                  cursor: 'pointer',
                  background: 'var(--bg-surface-elevated)',
                }}
              >
                <option value="popular">Terpopuler</option>
                <option value="lowest-price">Harga Termurah</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>
          </div>
        </div>

        {/* =========================================================================
            STAGE 3: HIGH-CRAFT PRODUCT CARDS GRID
        ========================================================================= */}
        {filteredApps.length === 0 ? (
          <div
            className="glass-card"
            style={{
              padding: '48px 24px',
              borderRadius: 'var(--radius-xl)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <HelpCircle size={44} className="text-orange" />
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Aplikasi Tidak Ditemukan</h3>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Tidak ada aplikasi yang cocok dengan kata kunci "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="btn btn-primary-orange btn-sm"
              style={{ marginTop: '8px' }}
            >
              Reset Filter & Pencarian
            </button>
          </div>
        ) : (
          <div className="desktop-products-grid">
            {filteredApps.map((app) => (
              <div key={app.id} className="desktop-card-craft">
                <div>
                  {/* Thumbnail Hero Media Box */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '190px',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      marginBottom: '16px',
                      border: '1.5px solid var(--border-medium)',
                      background: 'var(--bg-surface-elevated)',
                    }}
                  >
                    <img
                      src={app.thumbnail}
                      alt={app.name}
                      className="card-banner-img"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />

                    {/* Top Floating Badges */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        display: 'flex',
                        gap: '6px',
                        flexWrap: 'wrap',
                        zIndex: 2,
                      }}
                    >
                      <span
                        className="badge"
                        style={{
                          background: app.badgeColor || '#408175',
                          color: '#FFFFFF',
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
                        }}
                      >
                        {app.badge}
                      </span>
                      <span
                        className="badge"
                        style={{
                          background: 'rgba(20, 20, 20, 0.88)',
                          backdropFilter: 'blur(8px)',
                          color: '#22C55E',
                          fontSize: '0.66rem',
                          fontWeight: 800,
                          border: '1px solid rgba(34, 197, 94, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E' }} />
                        {app.status || 'Stok Ready'}
                      </span>
                    </div>

                    {/* Top Right Discount Tag */}
                    {app.discount && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          background: 'var(--btn-orange-bg)',
                          color: '#FFFFFF',
                          padding: '4px 9px',
                          borderRadius: 'var(--radius-pill)',
                          fontSize: '0.68rem',
                          fontWeight: 900,
                          boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
                          zIndex: 2,
                        }}
                      >
                        Hemat {app.discount}
                      </div>
                    )}

                    {/* Bottom Floating Bar */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        right: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        zIndex: 2,
                      }}
                    >
                      <span
                        style={{
                          background: 'rgba(15, 15, 15, 0.85)',
                          backdropFilter: 'blur(10px)',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-pill)',
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          color: '#FFFFFF',
                          border: '1px solid rgba(255, 255, 255, 0.18)',
                        }}
                      >
                        ⏱ {app.duration || '1 Tahun'}
                      </span>
                      <span
                        style={{
                          background: 'rgba(15, 15, 15, 0.85)',
                          backdropFilter: 'blur(10px)',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-pill)',
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          color: '#FFFFFF',
                          border: '1px solid rgba(255, 255, 255, 0.18)',
                        }}
                      >
                        ⭐ {app.rating} ({app.downloads})
                      </span>
                    </div>
                  </div>

                  {/* Category & Account Type Meta */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        color: 'var(--color-blue)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {app.subCategory || app.category}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>•</span>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <KeyRound size={12} className="text-orange" />
                      {app.accountType || 'Akun Resmi'}
                    </span>
                  </div>

                  {/* App Title */}
                  <h2
                    style={{
                      fontSize: '1.24rem',
                      fontWeight: 900,
                      margin: '0 0 10px 0',
                      color: 'var(--text-primary)',
                      lineHeight: 1.25,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span>{app.name}</span>
                    <CheckCircle2 size={16} style={{ color: 'var(--color-blue)', flexShrink: 0 }} />
                  </h2>

                  {/* Interactive Price Box */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '10px',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-lg)',
                      background: 'var(--bg-surface-elevated)',
                      border: '1.5px solid var(--border-subtle)',
                      marginBottom: '12px',
                    }}
                  >
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-orange)', lineHeight: 1 }}>
                      {app.price}
                    </div>
                    {app.originalPrice && (
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        {app.originalPrice}
                      </div>
                    )}
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: 'auto', fontWeight: 700 }}>
                      /{app.duration || 'akun'}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.55,
                      margin: '0 0 16px 0',
                    }}
                  >
                    {app.description}
                  </p>

                  {/* Feature Matrix Checklist */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                    {app.features.slice(0, 4).map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.78rem' }}>
                        <CheckCircle2 size={15} className="text-orange" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ color: 'var(--text-primary)', lineHeight: 1.4 }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Dual Actions */}
                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                    borderTop: '2px solid var(--border-medium)',
                    paddingTop: '16px',
                  }}
                >
                  <button
                    onClick={() => handleBuyClick(app)}
                    className="btn btn-primary-orange btn-sm btn-press"
                    style={{
                      flex: 1.25,
                      justifyContent: 'center',
                      gap: '7px',
                      fontSize: '0.86rem',
                      padding: '11px 14px',
                      fontWeight: 800,
                    }}
                  >
                    <Zap size={15} />
                    <span>Order via WA</span>
                  </button>

                  <button
                    onClick={() => setActiveModalApp(app)}
                    className="btn btn-glass btn-sm btn-press"
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      gap: '6px',
                      fontSize: '0.82rem',
                      padding: '11px 12px',
                      fontWeight: 700,
                    }}
                  >
                    <Info size={15} />
                    <span>Detail Spek</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =========================================================================
            STAGE 4: 3-STEP ORDER ROADMAP & TRUSTED PAYMENTS BENTO
        ========================================================================= */}
        <div
          className="glass-card"
          style={{
            padding: '28px 32px',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--bg-surface)',
            border: '2px solid var(--border-medium)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 156, 15, 0.15)',
                  border: '1.5px solid rgba(255, 156, 15, 0.35)',
                  color: 'var(--color-orange)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShoppingBag size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.24rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)' }}>
                  Alur Pemesanan Cepat & Terverifikasi (3 Langkah)
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Proses otomatis, aman, bergaransi resmi, dan didampingi customer support
                </span>
              </div>
            </div>

            <span className="badge badge-orange" style={{ fontSize: '0.74rem' }}>
              Panduan Pembelian
            </span>
          </div>

          <div className="desktop-roadmap-grid">
            {[
              {
                step: '01',
                title: 'Pilih Software & Durasi',
                desc: 'Tentukan aplikasi editing yang Anda butuhkan (Alight Motion, CapCut, Canva, Ibis Paint) sesuai preferensi 1 Tahun atau 1 Bulan.',
                accent: 'var(--color-orange)',
                bg: 'rgba(255, 156, 15, 0.12)',
              },
              {
                step: '02',
                title: 'Format Pesanan di WhatsApp',
                desc: 'Klik tombol "Order via WA". Pesan pemesanan otomatis terisi rapi. Pilih metode transfer resmi (QRIS, E-Wallet, atau Bank).',
                accent: 'var(--color-blue)',
                bg: 'rgba(0, 82, 245, 0.12)',
              },
              {
                step: '03',
                title: 'Akun Dikirim & Siap Pakai',
                desc: 'Setelah pembayaran terverifikasi, data login langsung dikirimkan dalam kurun waktu kurang dari 5 menit beserta panduan aktivasi.',
                accent: '#22C55E',
                bg: 'rgba(34, 197, 94, 0.12)',
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="glass-card hover-lift"
                style={{
                  padding: '20px 22px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-surface-elevated)',
                  border: '1.5px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 900,
                      color: step.accent,
                      background: step.bg,
                      padding: '2px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${step.accent}35`,
                    }}
                  >
                    {step.step}
                  </span>
                  <ArrowRight size={16} style={{ color: 'var(--text-muted)' }} />
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: '4px 0 0 0', color: 'var(--text-primary)' }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Supported Official Payment Strip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px',
              marginTop: '22px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <CreditCard size={17} className="text-orange" />
              <span style={{ fontWeight: 700 }}>Metode Pembayaran Resmi Studio:</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['QRIS Instant (Semua Bank)', 'GoPay', 'OVO', 'DANA', 'ShopeePay', 'BCA / Mandiri / BRI'].map((pay, pIdx) => (
                <span
                  key={pIdx}
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-pill)',
                    background: 'var(--bg-surface-elevated)',
                    border: '1.5px solid var(--border-medium)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {pay}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          STAGE 5: INTERACTIVE DUAL-PANE MODAL (DESKTOP & TABLET)
      ========================================================================= */}
      {activeModalApp && (
        <div
          className="animate-fade-in"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 10, 10, 0.8)',
            backdropFilter: 'blur(18px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModalApp(null);
          }}
        >
          <div
            className="animate-scale-in glass-card"
            style={{
              width: '92vw',
              maxWidth: '780px',
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
              borderRadius: 'var(--radius-xl)',
              padding: '28px',
              boxShadow: 'var(--shadow-dock)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              maxHeight: '92vh',
              overflowY: 'auto',
            }}
          >
            {/* Modal Header Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span className="badge" style={{ background: activeModalApp.badgeColor || '#408175', color: '#FFF' }}>
                  {activeModalApp.badge}
                </span>
                <span className="badge badge-orange">{activeModalApp.duration || '1 Tahun'}</span>
                <span
                  className="badge badge-green"
                >
                  {activeModalApp.status || 'Stok Ready'}
                </span>
              </div>
              <button
                onClick={() => setActiveModalApp(null)}
                className="btn-press"
                style={{
                  background: 'var(--bg-surface-elevated)',
                  border: '1.5px solid var(--border-medium)',
                  borderRadius: '50%',
                  width: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Dual Column Layout: Left Visual & Order, Right Full Specs */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '260px 1fr',
                gap: '24px',
              }}
            >
              {/* Left Column: Visual, Pricing & CTA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div
                  style={{
                    width: '100%',
                    height: '180px',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    border: '2px solid var(--border-medium)',
                  }}
                >
                  <img
                    src={activeModalApp.thumbnail}
                    alt={activeModalApp.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                    Harga Spesial Studio:
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '4px 0' }}>
                    <span style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--color-orange)' }}>
                      {activeModalApp.price}
                    </span>
                    {activeModalApp.originalPrice && (
                      <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        {activeModalApp.originalPrice}
                      </span>
                    )}
                  </div>
                  {activeModalApp.discount && (
                    <span className="badge badge-orange" style={{ fontSize: '0.68rem' }}>
                      Hemat {activeModalApp.discount}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => {
                    handleBuyClick(activeModalApp);
                    setActiveModalApp(null);
                  }}
                  className="btn btn-primary-orange btn-press"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '0.92rem',
                    justifyContent: 'center',
                    gap: '8px',
                    fontWeight: 800,
                  }}
                >
                  <Zap size={18} />
                  <span>Order via WA Sekarang</span>
                </button>
              </div>

              {/* Right Column: App Title, Specs & Guarantee */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-blue)', textTransform: 'uppercase' }}>
                    {activeModalApp.subCategory || activeModalApp.category} • {activeModalApp.accountType}
                  </span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, margin: '4px 0 6px 0', color: 'var(--text-primary)' }}>
                    {activeModalApp.name}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                    {activeModalApp.description}
                  </p>
                </div>

                {/* Features Matrix Checklist */}
                <div
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--bg-surface-elevated)',
                    border: '1.5px solid var(--border-subtle)',
                  }}
                >
                  <h4 style={{ fontSize: '0.94rem', fontWeight: 800, margin: '0 0 10px 0', color: 'var(--text-primary)' }}>
                    Fitur & Keunggulan Lengkap:
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {activeModalApp.features.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem' }}>
                        <CheckCircle2 size={16} className="text-orange" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ color: 'var(--text-primary)', lineHeight: 1.4 }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guarantee Callout */}
                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(0, 82, 245, 0.08))',
                    border: '1.5px solid rgba(34, 197, 94, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <ShieldCheck size={20} color="#22C55E" style={{ flexShrink: 0 }} />
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                    <strong>Garansi Rasfalz Studio:</strong> Jika terjadi kendala login atau akses selama durasi langganan, kami siap bantu replace akun secara gratis.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </WindowFrame>
  );
};
