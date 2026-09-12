import React, { useState, useMemo } from 'react';
import { siteConfig } from '../config/siteConfig';
import { WindowFrame } from '../components/common/WindowFrame';
import { useOS } from '../context/OSContext';
import { useAudio } from '../context/AudioContext';
import { DecorativeBackground } from '../components/common/DecorativeBackground';
import confetti from 'canvas-confetti';
import { WhatsAppIcon } from '../components/common/BrandIcons';
import {
  Store,
  ShoppingBag,
  Sparkles,
  ExternalLink,
  Star,
  Zap,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  HelpCircle,
  ChevronDown,
  ArrowUpRight,
  Search,
  Download,
  CreditCard,
  Package,
  BadgeCheck,
  MessageCircle,
  Filter,
} from 'lucide-react';

/* ────────────────────────────────────────────
   ONLINE SHOP FAQ ACCORDION COMPONENT
──────────────────────────────────────────── */
const OnlineShopFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Bagaimana cara menerima produk digital setelah pembelian di Payhip atau SociaBuzz?',
      a: 'Untuk pembelian produk digital (preset XML, template, project file), tautan unduhan instan akan otomatis muncul di halaman konfirmasi setelah pembayaran berhasil, serta dikirimkan secara otomatis ke alamat email yang Anda masukkan saat checkout.',
    },
    {
      q: 'Apakah preset Alight Motion yang dijual mendukung versi XML dan 5MB?',
      a: 'Ya! Seluruh paket preset Alight Motion resmi dari Rasfalz Studio telah diuji kompatibilitasnya, mencakup file XML standar yang bisa diimpor ke semua versi Alight Motion, serta tautan preset 5MB+ untuk pengguna aplikasi versi membership.',
    },
    {
      q: 'Metode pembayaran apa saja yang didukung di masing-masing toko?',
      a: 'Shopee mendukung ShopeePay, SPayLater, Transfer Bank, Indomaret/Alfamart, dan COD (khusus fisik). SociaBuzz mendukung QRIS Instan (BCA, GoPay, OVO, DANA, LinkAja, SeaBank). Payhip mendukung pembayaran internasional dengan PayPal serta Kartu Debit/Kredit Visa & MasterCard.',
    },
    {
      q: 'Apakah saya bisa memesan produk atau akun premium langsung lewat WhatsApp?',
      a: 'Tentu saja! Jika Anda lebih nyaman bertransaksi langsung via WhatsApp tanpa login akun marketplace, Anda bisa menghubungi admin kami untuk konfirmasi stok, pembayaran via transfer/QRIS, dan pengiriman akun langsung dalam hitungan menit.',
    },
    {
      q: 'Bagaimana jika file yang saya download rusak atau tautannya kedaluwarsa?',
      a: 'Tidak perlu panik! Cukup tunjukkan bukti struk pembayaran atau nomor pesanan Anda ke WhatsApp Admin Rasfalz Studio, dan kami akan mengirimkan ulang link unduhan file master yang baru tanpa biaya tambahan.',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="accordion-item">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              className="accordion-header"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                background: 'var(--bg-surface)',
                border: '2px solid var(--border-medium)',
                borderRadius: isOpen ? '14px 14px 0 0' : '14px',
                cursor: 'pointer',
                textAlign: 'left',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-primary)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <HelpCircle size={18} className="text-orange" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>{faq.q}</span>
              </div>
              <ChevronDown
                size={18}
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                  flexShrink: 0,
                  color: 'var(--text-muted)',
                }}
              />
            </button>
            {isOpen && (
              <div
                className="accordion-content animate-fade-in"
                style={{
                  padding: '14px 18px',
                  background: 'var(--bg-surface-elevated)',
                  borderLeft: '2px solid var(--border-medium)',
                  borderRight: '2px solid var(--border-medium)',
                  borderBottom: '2px solid var(--border-medium)',
                  borderRadius: '0 0 14px 14px',
                  fontSize: '0.84rem',
                  lineHeight: '1.6',
                  color: 'var(--text-secondary)',
                }}
              >
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ────────────────────────────────────────────
   MAIN ONLINE SHOP PAGE COMPONENT
──────────────────────────────────────────── */
export const OnlineShopPage = () => {
  const { addToast, isMobile } = useOS();
  const { playSoundEffect } = useAudio();

  const [selectedFilter, setSelectedFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const filterOptions = ['Semua', 'Shopee (Lokal)', 'Payhip (Global)', 'SociaBuzz (QRIS)'];

  const triggerConfetti = () => {
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.75 },
      colors: ['#FF9C0F', '#EE4D2D', '#2196F3', '#408A71', '#ffffff'],
    });
  };

  const handleCopyShopUrl = (shop) => {
    playSoundEffect?.('click');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shop.url);
      setCopiedId(shop.id);
      addToast('Tautan Disalin! 📋', `Link toko ${shop.name} berhasil disalin ke clipboard.`, 'success');
      setTimeout(() => setCopiedId(null), 2200);
    } else {
      addToast('Tautan Toko', shop.url, 'info');
    }
  };

  const handleVisitStore = (shop) => {
    playSoundEffect?.('click');
    triggerConfetti();
    addToast('Membuka Toko Resmi', `Menghubungkan ke ${shop.name}...`, 'success');
    window.open(shop.url, '_blank');
  };

  const handleWaOrder = () => {
    playSoundEffect?.('click');
    triggerConfetti();
    const waUrl = `https://wa.me/${siteConfig.contact?.whatsappNumber || '6288803293497'}?text=Halo%20Raihan%20(Rasfalz%20Studio)%2C%20saya%20ingin%20membeli%20produk%20digital%20atau%20merchandise%20secara%20langsung.%20Bisa%20info%20katalog%20dan%20stoknya%3F`;
    window.open(waUrl, '_blank');
  };

  // Filtered Shops Logic
  const filteredShops = useMemo(() => {
    return siteConfig.onlineShopPlatforms.filter((shop) => {
      // Filter by chip
      if (selectedFilter === 'Shopee (Lokal)' && shop.id !== 'shop-shopee') return false;
      if (selectedFilter === 'Payhip (Global)' && shop.id !== 'shop-payhip') return false;
      if (selectedFilter === 'SociaBuzz (QRIS)' && shop.id !== 'shop-sociabuzz') return false;

      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = shop.name.toLowerCase().includes(q);
        const matchDesc = shop.description.toLowerCase().includes(q);
        const matchType = shop.type.toLowerCase().includes(q);
        return matchName || matchDesc || matchType;
      }

      return true;
    });
  }, [selectedFilter, searchQuery]);

  // ==========================================
  // MOBILE VIEW
  // ==========================================
  if (isMobile) {
    return (
      <WindowFrame
        title="Toko Online & Marketplace"
        icon={Store}
        badgeText="Rasfalz Studio"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '4px 0 32px 0' }}>

          {/* 1. Mobile Hero Banner */}
          <div
            className="glass-card"
            style={{
              padding: '22px 18px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, var(--bg-surface) 0%, rgba(238, 77, 45, 0.1) 100%)',
              border: '2px solid var(--border-medium)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 6px 22px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: '#EE4D2D',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                boxShadow: '0 4px 16px rgba(238, 77, 45, 0.4)',
              }}
            >
              <ShoppingBag size={26} />
            </div>

            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <span className="badge badge-orange" style={{ fontSize: '0.66rem', padding: '3px 8px' }}>
                  ✦ Official Merchant Hub
                </span>
                <span className="badge badge-green" style={{ fontSize: '0.66rem', padding: '3px 8px' }}>
                  ✓ 100% Produk Terverifikasi
                </span>
              </div>
              <h1 style={{ fontSize: '1.45rem', fontWeight: 900, margin: '2px 0 6px 0', color: 'var(--text-primary)', lineHeight: 1.25 }}>
                Toko Resmi &amp; <span className="text-gradient">Marketplace</span>
              </h1>
              <p style={{ fontSize: '0.80rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                Pusat pembelian preset editing Alight Motion/Capcut/Photoshop/Illustrator, mentahan 3D, akun aplikasi premium, dan produk lainnya.
              </p>
            </div>

            {/* Quick Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginTop: '6px' }}>
              <div style={{ background: 'var(--bg-surface-elevated)', padding: '8px 6px', borderRadius: '10px', border: '1px solid var(--border-medium)' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#EE4D2D' }}>3 Toko</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Shopee, Payhip, SociaBuzz</div>
              </div>
              <div style={{ background: 'var(--bg-surface-elevated)', padding: '8px 6px', borderRadius: '10px', border: '1px solid var(--border-medium)' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#10B981' }}>⭐ 5.0</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Rating Terpercaya</div>
              </div>
              <div style={{ background: 'var(--bg-surface-elevated)', padding: '8px 6px', borderRadius: '10px', border: '1px solid var(--border-medium)' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#2196F3' }}>Instant</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Download Otomatis</div>
              </div>
            </div>
          </div>

          {/* 2. Search & Filter Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                type="text"
                placeholder="Cari toko atau tipe produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  borderRadius: '12px',
                  background: 'var(--bg-surface)',
                  border: '1.5px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  fontSize: '0.82rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* Filter Chips Horizontal Scroll */}
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
              {filterOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedFilter(opt)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '10px',
                    border: selectedFilter === opt ? '2px solid var(--btn-orange-border, #BA5400)' : '1px solid var(--border-medium)',
                    background: selectedFilter === opt ? 'var(--btn-orange-bg, #D46200)' : 'var(--bg-surface)',
                    color: selectedFilter === opt ? '#FFFFFF' : 'var(--text-secondary)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* 3. The 3 Official Marketplace Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Store size={18} className="text-orange" />
                <h2 style={{ fontSize: '1.05rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)' }}>
                  Saluran Toko Resmi
                </h2>
              </div>
              <span className="badge badge-glass" style={{ fontSize: '0.65rem' }}>
                {filteredShops.length} Toko Tersedia
              </span>
            </div>

            {filteredShops.map((shop) => {
              const isShopee = shop.id === 'shop-shopee';
              const isPayhip = shop.id === 'shop-payhip';
              const ratingDisplay = isShopee
                ? '⭐ 5.0 (5+ Sales)'
                : isPayhip
                  ? '⭐ Worldwide Access'
                  : '⭐ Dukungan All QRIS';

              return (
                <div
                  key={shop.id}
                  className="glass-card"
                  style={{
                    padding: '18px 16px',
                    borderRadius: '18px',
                    border: `2px solid ${shop.color}45`,
                    background: 'var(--bg-surface)',
                    boxShadow: `0 6px 20px ${shop.color}15`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Top Color Accent */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: shop.color,
                    }}
                  />

                  {/* Header Row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '14px',
                          background: `${shop.color}18`,
                          color: shop.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `1.5px solid ${shop.color}35`,
                        }}
                      >
                        <ShoppingBag size={22} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.66rem', fontWeight: 800, color: shop.color, textTransform: 'uppercase' }}>
                          {shop.type}
                        </span>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 900, margin: '2px 0 0 0', color: 'var(--text-primary)' }}>
                          {shop.name}
                        </h3>
                      </div>
                    </div>

                    <span
                      className="badge"
                      style={{
                        background: `${shop.color}15`,
                        color: shop.color,
                        border: `1px solid ${shop.color}35`,
                        fontSize: '0.65rem',
                        fontWeight: 800,
                      }}
                    >
                      {shop.itemsCount}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                    {shop.description}
                  </p>

                  {/* Micro Badges */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span className="badge badge-green" style={{ fontSize: '0.62rem', padding: '2px 7px' }}>
                      ✓ {shop.badge}
                    </span>
                    <span className="badge badge-glass" style={{ fontSize: '0.62rem', padding: '2px 7px' }}>
                      {ratingDisplay}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
                    <button
                      type="button"
                      onClick={() => handleVisitStore(shop)}
                      className="btn btn-sm hover-lift"
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        background: shop.color,
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: '0.80rem',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        gap: '6px',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    >
                      <ShoppingBag size={15} />
                      <span>Kunjungi Toko</span>
                      <ArrowUpRight size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopyShopUrl(shop)}
                      className="btn btn-sm btn-glass"
                      style={{ padding: '10px 12px' }}
                      title="Salin Tautan Toko"
                    >
                      {copiedId === shop.id ? (
                        <Check size={15} style={{ color: '#10B981' }} />
                      ) : (
                        <Copy size={15} />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4. Trust Guarantees 4-Grid */}
          <div
            className="glass-card"
            style={{
              padding: '16px',
              borderRadius: '18px',
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} className="text-orange" />
              <h3 style={{ fontSize: '0.96rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)' }}>
                Jaminan Belanja Rasfalz Studio
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {[
                { icon: Zap, title: 'Instant Download', desc: 'Link file otomatis terkirim tanpa antre.' },
                { icon: ShieldCheck, title: '100% Original', desc: 'Aset master 4K terbebas dari malware.' },
                { icon: CreditCard, title: 'Multi Payment', desc: 'QRIS, E-Wallet, ShopeePay & PayPal.' },
                { icon: MessageCircle, title: 'Support Teknis', desc: 'Bantuan instalasi jika file terkendala.' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--bg-surface-elevated)',
                      padding: '10px 8px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-medium)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <Icon size={16} className="text-orange" />
                    <h4 style={{ fontSize: '0.78rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '0.64rem', color: 'var(--text-secondary)', lineHeight: 1.35, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. Direct WhatsApp Order Banner */}
          <div
            className="glass-card"
            style={{
              padding: '16px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.12) 0%, var(--bg-surface) 100%)',
              border: '2px solid rgba(37, 211, 102, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '0.96rem', fontWeight: 900, color: 'var(--text-primary)' }}>
              Lebih Suka Beli Langsung via WhatsApp?
            </div>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
              Hubungi admin kami untuk pembelian cepat tanpa akun marketplace. Pembayaran praktis via QRIS All Bank.
            </p>
            <button
              type="button"
              onClick={handleWaOrder}
              className="btn btn-sm hover-lift"
              style={{
                background: '#25D366',
                color: '#fff',
                fontWeight: 800,
                fontSize: '0.82rem',
                padding: '10px 16px',
                borderRadius: '12px',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
                justifyContent: 'center',
              }}
            >
              <WhatsAppIcon size={18} />
              <span>Pesan Langsung via WhatsApp</span>
            </button>
          </div>

          {/* 6. FAQ Accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircle size={18} className="text-orange" />
              <h3 style={{ fontSize: '1.02rem', margin: 0, fontWeight: 900, color: 'var(--text-primary)' }}>
                Tanya Jawab Seputar Belanja (FAQ)
              </h3>
            </div>
            <OnlineShopFAQ />
          </div>

        </div>
      </WindowFrame>
    );
  }

  // ==========================================
  // DESKTOP & TABLET VIEW
  // ==========================================
  return (
    <WindowFrame
      title="Online Shop & Marketplace Hub"
      icon={Store}
      badgeText="Official Merchant"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '24px' }}>

        {/* 1. HERO BANNER WITH BENTO METRICS */}
        <div
          style={{
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            background: 'var(--bg-surface)',
            border: '2px solid var(--border-medium)',
            padding: '36px 40px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }}
        >
          <DecorativeBackground isMobile={false} scheme="orange" />
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'grid',
              gridTemplateColumns: '1.35fr 1fr',
              gap: '32px',
              alignItems: 'center',
            }}
          >
            {/* Left Column: Title, Badges, Story & Quick CTA */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <span className="badge badge-orange" style={{ fontSize: '0.72rem', padding: '4px 10px' }}>
                  <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
                  Rasfalz Official Merchant Hub
                </span>
                <span
                  className="badge"
                  style={{
                    background: '#C82323',
                    color: '#FFFFFF',
                    border: '1.5px solid #A51B1B',
                    fontSize: '0.72rem',
                    padding: '4px 10px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#EE4D2D',
                      display: 'inline-block',
                    }}
                  />
                  3 Toko Resmi Terverifikasi
                </span>
                <span className="badge badge-glass" style={{ fontSize: '0.72rem', padding: '4px 10px' }}>
                  ✓ Instant Download &amp; Garansi
                </span>
              </div>

              <h1 style={{ fontSize: '2.25rem', fontWeight: 900, margin: '0 0 12px 0', lineHeight: 1.2 }}>
                “Aset Kreatif, Preset &amp;{' '}
                <span className="text-gradient">Produk lainnya.”</span>
              </h1>

              <p style={{ margin: '0 0 22px 0', fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                Dapatkan paket preset editing Alight Motion/CapCut/Canva/Photoshop/Illustrator, mentahan 3D render, akun aplikasi premium, dan produk eksklusif lainnya melalui platform toko terpercaya kami.
              </p>

              {/* Quick Jump Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href="#official-stores"
                  className="btn btn-primary-orange hover-lift"
                  style={{ padding: '10px 18px', fontSize: '0.85rem', gap: '8px' }}
                >
                  <Store size={16} />
                  <span>Jelajahi Toko Resmi</span>
                </a>

                <button
                  type="button"
                  onClick={handleWaOrder}
                  className="btn btn-glass hover-lift"
                  style={{ padding: '10px 16px', fontSize: '0.85rem', gap: '8px' }}
                >
                  <WhatsAppIcon size={16} />
                  <span>Pesan Langsung via WA</span>
                  <ArrowUpRight size={14} />
                </button>

                <a
                  href="#shopping-guide"
                  className="btn btn-glass hover-lift"
                  style={{ padding: '10px 16px', fontSize: '0.85rem', gap: '8px' }}
                >
                  <Package size={16} className="text-orange" />
                  <span>Panduan Cara Belanja</span>
                </a>
              </div>
            </div>

            {/* Right Column: 4 Bento Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {[
                { val: '3 Toko', label: 'Marketplace Resmi', sub: 'Shopee, Payhip, SociaBuzz', color: '#EE4D2D', icon: Store },
                { val: '16+ Items', label: 'Produk Tersedia', sub: 'Preset, 3D Asset & Akun App', color: 'var(--color-orange)', icon: Package },
                { val: '⭐ 5.0', label: 'Rating Kepuasan', sub: 'Ulasan Pembeli Terverifikasi', color: '#10B981', icon: Star },
                { val: 'Instant', label: 'Download Otomatis', sub: 'Kirim Email & Cloud Link', color: '#2196F3', icon: Zap },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="glass-card hover-lift"
                    style={{
                      padding: '16px 18px',
                      borderRadius: '16px',
                      background: 'var(--bg-card)',
                      border: '2px solid var(--border-medium)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '1.45rem', fontWeight: 900, color: stat.color, fontFamily: 'var(--font-display)' }}>
                        {stat.val}
                      </span>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '10px',
                          background: `${stat.color}15`,
                          color: stat.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon size={16} />
                      </div>
                    </div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {stat.label}
                    </div>
                    <div style={{ fontSize: '0.70rem', color: 'var(--text-muted)' }}>
                      {stat.sub}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. THE 3 OFFICIAL STORES BENTO (Shopee, Payhip, SociaBuzz) */}
        <div id="official-stores">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Store size={22} className="text-orange" />
              <div>
                <h2 style={{ fontSize: '1.35rem', margin: 0, fontWeight: 900, color: 'var(--text-primary)' }}>
                  Saluran Toko &amp; Marketplace Resmi
                </h2>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                  Pilih marketplace yang paling mudah dan sesuai metode pembayaran favorit Anda.
                </p>
              </div>
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              {filterOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedFilter(opt)}
                  className="hover-lift"
                  style={{
                    padding: '7px 14px',
                    borderRadius: '10px',
                    border: selectedFilter === opt ? '2px solid var(--btn-orange-border, #BA5400)' : '1.5px solid var(--border-medium)',
                    background: selectedFilter === opt ? 'var(--btn-orange-bg, #D46200)' : 'var(--bg-surface)',
                    color: selectedFilter === opt ? '#FFFFFF' : 'var(--text-secondary)',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
            }}
          >
            {filteredShops.map((shop) => {
              const isShopee = shop.id === 'shop-shopee';
              const isPayhip = shop.id === 'shop-payhip';
              const ratingDisplay = isShopee
                ? '⭐ 5.0 (5+ Sales Terverifikasi)'
                : isPayhip
                  ? '⭐ Global Instant Checkout'
                  : '⭐ Dukungan QRIS All E-Wallet';

              const perks = isShopee
                ? [
                  'Gratis Ongkir & Fitur COD',
                  'Aplikasi Premium & Preset Lengkap',
                  'Transaksi 100% Aman Garansi Shopee',
                ]
                : isPayhip
                  ? [
                    'Download Instan ke Email Tanpa Menunggu',
                    'Pembayaran via PayPal & Kartu Debit/Kredit',
                    'File Master Asli 4K Tanpa Kompresi',
                  ]
                  : [
                    'Scan QRIS All Bank (BCA, Mandiri, GoPay, DANA)',
                    'Tanpa Perlu Kartu Kredit atau Akun Khusus',
                    'Dukungan Komunitas Kreator Lokal',
                  ];

              return (
                <div
                  key={shop.id}
                  className="glass-card hover-lift"
                  style={{
                    padding: '28px 24px',
                    borderRadius: 'var(--radius-xl)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: `2px solid ${shop.color}45`,
                    background: 'var(--bg-surface)',
                    boxShadow: `0 8px 24px ${shop.color}14`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Top Accent Line */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: shop.color,
                    }}
                  />

                  <div>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div
                        style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: '16px',
                          background: `${shop.color}15`,
                          color: shop.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `1.5px solid ${shop.color}35`,
                        }}
                      >
                        <ShoppingBag size={26} />
                      </div>

                      <span
                        className="badge"
                        style={{
                          background: `${shop.color}15`,
                          color: shop.color,
                          border: `1px solid ${shop.color}35`,
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          padding: '3px 10px',
                        }}
                      >
                        {shop.itemsCount}
                      </span>
                    </div>

                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        color: shop.color,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {shop.type}
                    </span>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: '4px 0 6px 0', color: 'var(--text-primary)' }}>
                      {shop.name}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <span className="badge badge-green" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                        ✓ {shop.badge}
                      </span>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                        {ratingDisplay}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 18px 0' }}>
                      {shop.description}
                    </p>

                    {/* Micro-perks */}
                    <div
                      style={{
                        background: 'var(--bg-surface-elevated)',
                        borderRadius: '12px',
                        padding: '10px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        marginBottom: '22px',
                        border: '1px solid var(--border-medium)',
                      }}
                    >
                      {perks.map((perk, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem' }}>
                          <CheckCircle2 size={13} style={{ color: shop.color, flexShrink: 0 }} />
                          <span style={{ color: 'var(--text-primary)' }}>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => handleVisitStore(shop)}
                      className="btn hover-lift"
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        background: shop.color,
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: '0.86rem',
                        padding: '12px 18px',
                        borderRadius: '12px',
                        gap: '8px',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    >
                      <ShoppingBag size={16} />
                      <span>Kunjungi Toko</span>
                      <ArrowUpRight size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopyShopUrl(shop)}
                      className="btn btn-glass hover-lift"
                      style={{ padding: '12px 14px' }}
                      title="Salin Tautan Toko"
                    >
                      {copiedId === shop.id ? (
                        <Check size={16} style={{ color: '#10B981' }} />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. BUYER BENEFITS & GUANRANTEES BENTO (4 Kolom) */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <ShieldCheck size={20} className="text-orange" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)' }}>
              Keuntungan &amp; Jaminan Berbelanja di Rasfalz Studio
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {[
              {
                icon: Zap,
                title: 'Instant Download 24/7',
                desc: 'Tautan file digital dikirimkan otomatis ke email dan dashboard tanpa perlu menunggu verifikasi manual.',
                color: '#2196F3',
              },
              {
                icon: ShieldCheck,
                title: '100% Original & Aman',
                desc: 'Seluruh aset dibuat langsung oleh kreator dan dijamin bebas dari virus, watermark tersembunyi, atau file rusak.',
                color: '#10B981',
              },
              {
                icon: CreditCard,
                title: 'Metode Pembayaran Lengkap',
                desc: 'Mendukung QRIS all bank, GoPay, OVO, DANA, ShopeePay, SPayLater, transfer bank, hingga PayPal internasional.',
                color: '#EE4D2D',
              },
              {
                icon: MessageCircle,
                title: 'Bantuan Garansi File',
                desc: 'Mengalami kendala impor XML atau link kedaluwarsa? Hubungi kami via WhatsApp untuk pengiriman ulang gratis.',
                color: '#8B5CF6',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-card hover-lift"
                  style={{
                    padding: '22px 20px',
                    borderRadius: '16px',
                    background: 'var(--bg-surface)',
                    border: '2px solid var(--border-medium)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: `${item.color}15`,
                      color: item.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h4 style={{ fontSize: '0.96rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. 4-STEP SHOPPING FLOW */}
        <div
          id="shopping-guide"
          className="glass-card hover-lift"
          style={{
            padding: '28px 32px',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--bg-surface)',
            border: '2px solid var(--border-medium)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Package size={20} className="text-orange" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)' }}>
                Alur Cara Berbelanja &amp; Download (4 Langkah)
              </h3>
            </div>
            <span className="badge badge-orange" style={{ fontSize: '0.70rem' }}>Proses Cepat &amp; Praktis</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
            {[
              { step: '01', title: 'Pilih Toko & Produk', desc: 'Buka toko Shopee, Payhip, atau SociaBuzz sesuai metode pembayaran Anda.' },
              { step: '02', title: 'Selesaikan Pembayaran', desc: 'Bayar dengan QRIS, E-Wallet, Kartu, atau transfer bank yang tertera di checkout.' },
              { step: '03', title: 'Terima Akses File', desc: 'Link download instan otomatis terbuka di layar dan dikirim ke alamat email Anda.' },
              { step: '04', title: 'Eksekusi di Editing', desc: 'Impor preset XML atau buka aset di Alight Motion, CapCut, atau tools lainnya.' },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-surface-elevated)',
                  padding: '16px 14px',
                  borderRadius: '14px',
                  border: '1.5px solid var(--border-medium)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 900, color: 'var(--color-orange)', letterSpacing: '0.05em' }}>
                    LANGKAH {item.step}
                  </span>
                  <CheckCircle2 size={15} style={{ color: 'var(--color-orange)' }} />
                </div>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 800, margin: '2px 0 0 0', color: 'var(--text-primary)' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. DIRECT WHATSAPP ORDER BANNER */}
        <div
          className="glass-card hover-lift"
          style={{
            padding: '24px 30px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.12) 0%, var(--bg-surface) 100%)',
            border: '2px solid rgba(37, 211, 102, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '4px' }}>
              Lebih Suka Beli Langsung via WhatsApp?
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              Hubungi admin kami untuk pembelian cepat tanpa akun marketplace. Pembayaran praktis via QRIS All Bank &amp; E-Wallet.
            </p>
          </div>

          <button
            type="button"
            onClick={handleWaOrder}
            className="btn hover-lift"
            style={{
              background: '#25D366',
              color: '#fff',
              fontWeight: 800,
              fontSize: '0.90rem',
              padding: '12px 22px',
              borderRadius: '12px',
              gap: '8px',
              boxShadow: '0 4px 16px rgba(37, 211, 102, 0.35)',
              whiteSpace: 'nowrap',
            }}
          >
            <WhatsAppIcon size={18} />
            <span>Pesan Langsung via WhatsApp</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* 6. FAQ ACCORDION SECTION */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <HelpCircle size={22} className="text-orange" />
            <div>
              <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 900, color: 'var(--text-primary)' }}>
                Tanya Jawab Seputar Belanja &amp; Pembelian (FAQ)
              </h3>
              <p style={{ fontSize: '0.80rem', color: 'var(--text-muted)', margin: 0 }}>
                Pertanyaan yang sering diajukan seputar produk digital, garansi, dan pengiriman.
              </p>
            </div>
          </div>
          <OnlineShopFAQ />
        </div>

      </div>
    </WindowFrame>
  );
};
