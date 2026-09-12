import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { WindowFrame } from '../components/common/WindowFrame';
import { useOS } from '../context/OSContext';
import { useAudio } from '../context/AudioContext';
import { DecorativeBackground } from '../components/common/DecorativeBackground';
import confetti from 'canvas-confetti';
import {
  HeartHandshake,
  Coffee,
  Heart,
  Sparkles,
  ExternalLink,
  QrCode,
  CheckCircle2,
  Copy,
  Check,
  X,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  Server,
  Cpu,
  Tv,
  ArrowUpRight,
  Gift,
  MessageCircle,
  Download,
  Zap,
  BadgeCheck,
  Compass,
} from 'lucide-react';

/* ────────────────────────────────────────────
   QRIS SCANNER MODAL COMPONENT
──────────────────────────────────────────── */
const QrisModal = ({ isOpen, onClose, onConfirmWa }) => {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const qrisImageUrl = 'https://files.catbox.moe/0wygml.jpeg';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(qrisImageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'var(--bg-surface)',
          border: '2px solid var(--color-orange)',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'var(--color-orange-subtle)',
                color: 'var(--color-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <QrCode size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)' }}>
                QRIS Pembayaran Resmi
              </h3>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: 0 }}>
                Scan via GoPay, OVO, Dana, BCA, ShopeePay, dll.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn btn-glass btn-sm"
            style={{ width: '32px', height: '32px', padding: 0, borderRadius: '50%' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* QR Code Container */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid var(--border-medium)',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <img
            src={qrisImageUrl}
            alt="QRIS Rasfalz Studio"
            style={{
              width: '100%',
              maxHeight: '280px',
              objectFit: 'contain',
              borderRadius: '8px',
            }}
          />
        </div>

        {/* Payment Supported Badges */}
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['BCA', 'GOPAY', 'OVO', 'DANA', 'SHOPEEPAY', 'LINKAJA', 'SEABANK', 'BANK JAGO'].map((pay, i) => (
            <span
              key={i}
              className="badge"
              style={{
                fontSize: '0.62rem',
                padding: '2px 6px',
                background: 'var(--bg-surface-elevated)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-medium)',
                fontWeight: 700,
              }}
            >
              {pay}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <a
              href={qrisImageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary-orange btn-sm hover-lift"
              style={{ flex: 1, justifyContent: 'center', padding: '10px 14px', fontSize: '0.82rem', gap: '6px' }}
            >
              <ExternalLink size={14} />
              <span>Buka Gambar Asli</span>
            </a>
            <button
              type="button"
              onClick={handleCopyLink}
              className="btn btn-glass btn-sm"
              style={{ padding: '10px 14px', fontSize: '0.82rem', gap: '6px' }}
            >
              {copied ? <Check size={14} style={{ color: '#10B981' }} /> : <Copy size={14} />}
              <span>{copied ? 'Tersalin' : 'Salin Link'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onConfirmWa}
            className="btn btn-glass btn-sm"
            style={{ width: '100%', justifyContent: 'center', padding: '9px', fontSize: '0.80rem', gap: '6px' }}
          >
            <MessageCircle size={14} className="text-orange" />
            <span>Kirim Bukti Donasi ke WhatsApp Admin</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────
   DONATION FAQ COMPONENT
──────────────────────────────────────────── */
const DonationFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Metode pembayaran apa saja yang bisa digunakan untuk donasi?',
      a: 'Anda dapat berdonasi menggunakan QRIS (semua m-Banking dan e-Wallet seperti GoPay, OVO, Dana, ShopeePay, LinkAja, BCA, Mandiri, Jago, SeaBank), Saweria, SociaBuzz, maupun Trakteer.id.',
    },
    {
      q: 'Apakah ada batasan minimal untuk berdonasi?',
      a: 'Tidak ada batasan minimal yang mengikat! Melalui QRIS, Anda bisa memberikan dukungan mulai dari Rp 1.000 seikhlasnya. Melalui Trakteer mulai dari Rp 3.000 (1 Boba Ice). Dukungan sekecil apa pun sangat berarti.',
    },
    {
      q: 'Ke mana saja dana donasi yang terkumpul akan dialokasikan?',
      a: 'Dana donasi difokuskan 100% untuk biaya operasional server hosting aset mentahan 3D gratis, langganan software creative profesional (Alight Motion, Adobe Suite, Figma), biaya riset tutorial baru, dan maintenance website OS Rasfalz Studio.',
    },
    {
      q: 'Apakah saya wajib berdonasi untuk mendownload preset dan mentahan?',
      a: 'Sama sekali tidak! Semua materi preset, mentahan 3D di Telegram, dan video tutorial di YouTube tetap 100% gratis untuk seluruh kreator. Donasi bersifat sukarela sebagai bentuk apresiasi bagi yang ingin mendukung keberlanjutan karya Raihan.',
    },
    {
      q: 'Bagaimana cara konfirmasi setelah melakukan donasi?',
      a: 'Setelah melakukan donasi, Anda dapat mengirimkan screenshot bukti transfer ke WhatsApp admin kami. Kami akan memberikan special supporter shoutout & badge apresiasi!',
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
   MAIN DONATION PAGE
──────────────────────────────────────────── */
export const DonationPage = () => {
  const { addToast, isMobile } = useOS();
  const { playSoundEffect } = useAudio();
  const [qrisModalOpen, setQrisModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyDonationUrl = (platform) => {
    playSoundEffect?.('click');
    navigator.clipboard.writeText(platform.url);
    setCopiedId(platform.id);
    addToast('Tautan Disalin! 📋', `Tautan ${platform.name} berhasil disalin ke clipboard.`, 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#FF9C0F', '#25D366', '#229ED9', '#be1e2d', '#FF5E3A'],
    });
  };

  const handleSupportClick = (platform) => {
    playSoundEffect?.('click');
    triggerConfetti();

    if (platform.id === 'don-qris') {
      setQrisModalOpen(true);
      return;
    }

    addToast('Terima Kasih Banyak! ❤️', `Membuka halaman ${platform.name}...`, 'success');
    window.open(platform.url, '_blank');
  };

  const handleConfirmWa = () => {
    const waUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=Halo%20Raihan%2C%20saya%20telah%20mengirimkan%20donasi%20apresiasi%20untuk%20Rasfalz%20Studio.%20Berikut%20bukti%20transfernya%20ya.%20Terima%20kasih!`;
    window.open(waUrl, '_blank');
  };

  // ==========================================
  // MOBILE VIEW
  // ==========================================
  if (isMobile) {
    return (
      <WindowFrame
        title="Dukungan & Donasi"
        icon={HeartHandshake}
        badgeText="Rasfalz Studio"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '4px 0 28px 0' }}>

          {/* 1. Mobile Hero Banner */}
          <div
            className="glass-card"
            style={{
              padding: '20px 16px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, var(--bg-surface) 0%, rgba(255, 156, 15, 0.12) 100%)',
              border: '2px solid var(--border-medium)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--color-orange)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <Heart size={24} fill="currentColor" />
            </div>

            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <span className="badge badge-orange" style={{ fontSize: '0.64rem', padding: '2px 8px' }}>
                  ✦ Appreciation Hub
                </span>
                <span className="badge badge-green" style={{ fontSize: '0.64rem', padding: '2px 8px' }}>
                  ✓ 100% Aman &amp; Terverifikasi
                </span>
              </div>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 900, margin: '4px 0 6px 0', color: 'var(--text-primary)', lineHeight: 1.25 }}>
                Dukung Karya &amp; <span className="text-gradient">Kreativitas</span>
              </h1>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                Setiap secangkir kopi dan donasi yang Anda berikan sangat berarti untuk menjaga server preset gratis, software riset, dan tutorial komunitas tetap hidup.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginTop: '4px' }}>
              {[
                { val: '4 Platform', label: 'Metode Donasi' },
                { val: 'Rp 1.000', label: 'Bebas Minimal' },
                { val: '100% Transparan', label: 'Alokasi Dana' },
              ].map((s, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-surface-elevated)',
                    border: '1.5px solid var(--border-medium)',
                    borderRadius: '12px',
                    padding: '8px 4px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.84rem', fontWeight: 900, color: 'var(--color-orange)' }}>
                    {s.val}
                  </div>
                  <div style={{ fontSize: '0.58rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Mobile QRIS Universal Spotlight Element */}
          <div
            className="glass-card"
            style={{
              padding: '18px 16px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, var(--bg-surface) 0%, rgba(33, 150, 243, 0.08) 100%)',
              border: '2px solid rgba(33, 150, 243, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: '0 6px 20px rgba(33, 150, 243, 0.12)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
              <span
                className="badge badge-blue"
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  padding: '3px 8px',
                }}
              >
                ⚡ REKOMENDASI TERCEPAT
              </span>
              <span className="badge badge-green" style={{ fontSize: '0.64rem', padding: '3px 8px' }}>
                ✓ 0% Biaya Admin
              </span>
            </div>

            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 900, margin: '2px 0 4px 0', color: 'var(--text-primary)', lineHeight: 1.3 }}>
                Scan QRIS Universal
              </h2>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                Scan langsung dari aplikasi perbankan atau dompet digital favorit Anda. Bebas nominal seikhlasnya (mulai Rp 1.000).
              </p>
            </div>

            {/* Interactive QRIS Thumbnail */}
            <div
              onClick={() => {
                playSoundEffect?.('click');
                triggerConfetti();
                setQrisModalOpen(true);
              }}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '14px',
                border: '2px solid rgba(33, 150, 243, 0.3)',
                boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                textAlign: 'center',
              }}
              className="btn-press"
            >
              <div style={{ width: '100%', maxHeight: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img
                  src="https://files.catbox.moe/0wygml.jpeg"
                  alt="QRIS Rasfalz Studio"
                  style={{
                    width: '100%',
                    maxHeight: '170px',
                    objectFit: 'contain',
                    borderRadius: '8px',
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: '#2196F3',
                }}
              >
                <QrCode size={14} />
                <span>Ketuk untuk Perbesar &amp; Scan Barcode</span>
              </div>
            </div>

            {/* Supported Banks Badges */}
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {['BCA', 'GOPAY', 'OVO', 'DANA', 'SHOPEEPAY', 'LINKAJA', 'SEABANK', 'BANK JAGO', 'MANDIRI'].map((bank, i) => (
                <span
                  key={i}
                  className="badge"
                  style={{
                    fontSize: '0.62rem',
                    padding: '2px 7px',
                    background: 'var(--bg-surface-elevated)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-medium)',
                    fontWeight: 700,
                  }}
                >
                  {bank}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => {
                  playSoundEffect?.('click');
                  triggerConfetti();
                  setQrisModalOpen(true);
                }}
                className="btn btn-sm hover-lift"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  background: '#1565C0',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '0.80rem',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  gap: '6px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <QrCode size={15} />
                <span>Buka QRIS Full</span>
              </button>

              <button
                type="button"
                onClick={() => handleCopyDonationUrl({ name: 'QRIS', url: 'https://files.catbox.moe/0wygml.jpeg', id: 'm-don-qris' })}
                className="btn btn-sm btn-glass"
                style={{ padding: '10px 12px' }}
                title="Salin Link Gambar QRIS"
              >
                {copiedId === 'm-don-qris' ? (
                  <Check size={15} style={{ color: '#10B981' }} />
                ) : (
                  <Copy size={15} />
                )}
              </button>

              <a
                href="https://files.catbox.moe/0wygml.jpeg"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-glass"
                style={{ padding: '10px 12px' }}
                title="Buka Gambar Asli"
              >
                <ExternalLink size={15} />
              </a>
            </div>
          </div>

          {/* 3. Donation Platforms Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 2px' }}>
              <Gift size={16} className="text-orange" />
              <h2 style={{ fontSize: '1.05rem', margin: 0, fontWeight: 900, color: 'var(--text-primary)' }}>
                Pilihan Saluran Donasi
              </h2>
            </div>

            {siteConfig.donations.map((platform) => {
              const isQris = platform.id === 'don-qris';
              return (
                <div
                  key={platform.id}
                  className="glass-card btn-press"
                  style={{
                    borderRadius: '18px',
                    padding: '16px',
                    background: 'var(--bg-surface)',
                    border: `2px solid ${platform.color}45`,
                    boxShadow: `0 4px 18px ${platform.color}15`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '12px',
                          background: `${platform.color}20`,
                          color: platform.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `1.5px solid ${platform.color}40`,
                        }}
                      >
                        {isQris ? <QrCode size={22} /> : <Coffee size={20} />}
                      </div>
                      <div>
                        <span
                          className="badge"
                          style={{
                            background: `${platform.color}15`,
                            color: platform.color,
                            fontSize: '0.62rem',
                            padding: '1px 6px',
                            fontWeight: 800,
                            border: `1px solid ${platform.color}35`,
                          }}
                        >
                          {platform.name}
                        </span>
                        <h3 style={{ fontSize: '1.02rem', fontWeight: 900, margin: '2px 0 0 0', color: 'var(--text-primary)' }}>
                          {platform.logoText}
                        </h3>
                      </div>
                    </div>

                    <span className="badge badge-glass" style={{ fontSize: '0.64rem', padding: '3px 8px' }}>
                      {platform.unit}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                    {platform.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleSupportClick(platform)}
                    className="btn btn-sm hover-lift"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      background: platform.color,
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: '0.82rem',
                      padding: '10px 14px',
                      gap: '8px',
                      boxShadow: 'var(--shadow-sm)',
                      marginTop: '2px',
                    }}
                  >
                    {isQris ? <QrCode size={15} /> : <Coffee size={15} />}
                    <span>{isQris ? 'Buka QR Code QRIS' : platform.buttonText}</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* 4. Transparency & Allocation Cards */}
          <div
            className="glass-card"
            style={{
              padding: '18px 16px',
              borderRadius: '20px',
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} className="text-orange" />
              <div>
                <h3 style={{ fontSize: '1.02rem', margin: 0, fontWeight: 900, color: 'var(--text-primary)' }}>
                  Alokasi Penggunaan Dana
                </h3>
                <p style={{ fontSize: '0.70rem', color: 'var(--text-muted)', margin: 0 }}>
                  Dukungan Anda disalurkan secara transparan untuk ekosistem kreatif.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { icon: Server, title: 'Server & Cloud', desc: 'Hosting mentahan 3D & preset gratis tanpa limit.' },
                { icon: Cpu, title: 'Software Lisensi', desc: 'Langganan resmi Alight Motion, Adobe, & Figma.' },
                { icon: Tv, title: 'Produksi Tutorial', desc: 'Riset materi edukasi & konten AMV/GFX mingguan.' },
                { icon: Coffee, title: 'Booster Kreator', desc: 'Bantuan stamina begadang & apresiasi karya.' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--bg-surface-elevated)',
                      padding: '10px',
                      borderRadius: '12px',
                      border: '1.5px solid var(--border-medium)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <Icon size={16} className="text-orange" />
                    <h4 style={{ fontSize: '0.78rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '0.66rem', color: 'var(--text-secondary)', lineHeight: 1.35, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. Mobile FAQ Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircle size={18} className="text-orange" />
              <h3 style={{ fontSize: '1.05rem', margin: 0, fontWeight: 900, color: 'var(--text-primary)' }}>
                Tanya Jawab Donasi (FAQ)
              </h3>
            </div>
            <DonationFAQ />
          </div>

          {/* 6. Admin WhatsApp Confirmation Banner */}
          <div
            style={{
              padding: '16px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(255, 156, 15, 0.12) 0%, var(--bg-surface) 100%)',
              border: '2px solid var(--color-orange)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div>
              <span className="badge badge-orange" style={{ fontSize: '0.62rem', padding: '2px 8px', marginBottom: '4px', display: 'inline-block' }}>
                KONFIRMASI DONASI
              </span>
              <h4 style={{ fontSize: '0.94rem', fontWeight: 800, margin: '2px 0', color: 'var(--text-primary)' }}>
                Kirim Bukti untuk Shoutout VIP Supporter
              </h4>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                Sudah berdonasi via QRIS, Trakteer, atau Saweria? Kirim screenshot bukti transfer ke WhatsApp Raihan untuk dicatat dalam Hall of Fame Supporter!
              </p>
            </div>
            <button
              type="button"
              onClick={handleConfirmWa}
              className="btn btn-primary-orange btn-sm"
              style={{ width: '100%', justifyContent: 'center', padding: '9px 12px', fontSize: '0.80rem', gap: '6px' }}
            >
              <MessageCircle size={15} />
              <span>Konfirmasi via WhatsApp</span>
            </button>
          </div>

        </div>

        {/* QRIS Modal */}
        <QrisModal
          isOpen={qrisModalOpen}
          onClose={() => setQrisModalOpen(false)}
          onConfirmWa={handleConfirmWa}
        />
      </WindowFrame>
    );
  }

  // ==========================================
  // DESKTOP & TABLET VIEW
  // ==========================================
  return (
    <WindowFrame
      title="Support Creator & Donations"
      icon={HeartHandshake}
      badgeText="Official Appreciation Hub"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '24px' }}>

        {/* 1. HERO BANNER */}
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
                  Rasfalz Appreciation Hub
                </span>
                <span
                  className="badge badge-green"
                  style={{
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
                      background: '#FFFFFF',
                      display: 'inline-block',
                    }}
                  />
                  4 Saluran Donasi Terverifikasi
                </span>
                <span className="badge badge-glass" style={{ fontSize: '0.72rem', padding: '4px 10px' }}>
                  ✓ Bebas Minimum &amp; Sukarela
                </span>
              </div>

              <h1 style={{ fontSize: '2.25rem', fontWeight: 900, margin: '0 0 12px 0', lineHeight: 1.2 }}>
                “Dukungan Anda Menghidupkan{' '}
                <span className="text-gradient">Karya &amp; Ekosistem Kreatif.”</span>
              </h1>

              <p style={{ margin: '0 0 22px 0', fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                Setiap traktir boba, kopi, maupun donasi sukarela yang Anda titipkan sangat berarti untuk membiayai server cloud penyimpanan mentahan 3D/AMV gratis tanpa batas, riset video tutorial, dan pemeliharaan lisensi perangkat lunak.
              </p>

              {/* Quick Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href="#donation-platforms"
                  className="btn btn-primary-orange hover-lift"
                  style={{ padding: '10px 18px', fontSize: '0.85rem', gap: '8px' }}
                >
                  <Gift size={16} />
                  <span>Pilih Saluran Donasi</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    playSoundEffect?.('click');
                    triggerConfetti();
                    setQrisModalOpen(true);
                  }}
                  className="btn btn-glass hover-lift"
                  style={{ padding: '10px 16px', fontSize: '0.85rem', gap: '8px' }}
                >
                  <QrCode size={16} className="text-orange" />
                  <span>Scan QRIS Instan</span>
                </button>
                <button
                  type="button"
                  onClick={handleConfirmWa}
                  className="btn btn-glass hover-lift"
                  style={{ padding: '10px 16px', fontSize: '0.85rem', gap: '8px' }}
                >
                  <MessageCircle size={16} />
                  <span>Konfirmasi WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Right Column: 4 Bento Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {[
                { val: '4 Saluran', label: 'Saluran Donasi Resmi', sub: 'Trakteer, Saweria, SociaBuzz, QRIS', color: 'var(--color-orange)', icon: Gift },
                { val: 'Rp 1.000', label: 'Bebas Minimum QRIS', sub: 'Scan All Bank & E-Wallet', color: '#2196F3', icon: QrCode },
                { val: '100%', label: 'Alokasi Transparan', sub: 'Server, Riset & Lisensi', color: '#10B981', icon: ShieldCheck },
                { val: 'VIP Badge', label: 'Apresiasi Supporter', sub: 'Shoutout & Hall of Fame', color: '#be1e2d', icon: Heart },
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

        {/* 2. QRIS SPOTLIGHT SHOWCASE BENTO */}
        <div
          className="glass-card hover-lift"
          style={{
            padding: '28px 32px',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, var(--bg-surface) 0%, rgba(33, 150, 243, 0.06) 100%)',
            border: '2px solid rgba(33, 150, 243, 0.35)',
            boxShadow: '0 8px 30px rgba(33, 150, 243, 0.08)',
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: '28px',
            alignItems: 'center',
          }}
        >
          {/* QRIS Info Left */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                className="badge badge-blue"
                style={{
                  fontSize: '0.70rem',
                  fontWeight: 800,
                  padding: '3px 10px',
                }}
              >
                ⚡ REKOMENDASI TERCEPAT &amp; BEBAS POTONGAN
              </span>
              <span className="badge badge-green" style={{ fontSize: '0.70rem' }}>
                ✓ 0% Biaya Admin
              </span>
            </div>

            <h2 style={{ fontSize: '1.45rem', fontWeight: 900, margin: '6px 0 8px 0', color: 'var(--text-primary)' }}>
              Scan QRIS Universal — Langsung dari Ponsel Anda
            </h2>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 16px 0' }}>
              Metode pembayaran instan paling fleksibel. Cukup buka aplikasi perbankan atau dompet digital favorit Anda, arahkan kamera ke kode QRIS, dan masukkan nominal donasi seikhlasnya (mulai dari Rp 1.000).
            </p>

            {/* Supported Banks Badges */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {['BCA', 'GOPAY', 'OVO', 'DANA', 'SHOPEEPAY', 'LINKAJA', 'SEABANK', 'BANK JAGO', 'MANDIRI', 'BRI'].map((bank, i) => (
                <span
                  key={i}
                  className="badge"
                  style={{
                    fontSize: '0.66rem',
                    padding: '3px 8px',
                    background: 'var(--bg-surface-elevated)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-medium)',
                    fontWeight: 700,
                  }}
                >
                  {bank}
                </span>
              ))}
            </div>

            {/* QRIS Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => {
                  playSoundEffect?.('click');
                  triggerConfetti();
                  setQrisModalOpen(true);
                }}
                className="btn hover-lift"
                style={{
                  background: '#1565C0',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '0.86rem',
                  padding: '11px 20px',
                  borderRadius: '12px',
                  gap: '8px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <QrCode size={17} />
                <span>Buka &amp; Perbesar QRIS</span>
              </button>

              <a
                href="https://files.catbox.moe/0wygml.jpeg"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-glass hover-lift"
                style={{ padding: '11px 16px', fontSize: '0.84rem', gap: '6px' }}
                title="Buka Gambar Asli"
              >
                <ExternalLink size={15} />
                <span>Buka Gambar</span>
              </a>

              <button
                type="button"
                onClick={() => handleCopyDonationUrl({ name: 'QRIS', url: 'https://files.catbox.moe/0wygml.jpeg', id: 'don-qris' })}
                className="btn btn-glass hover-lift"
                style={{ padding: '11px 16px', fontSize: '0.84rem', gap: '6px' }}
                title="Salin Tautan Gambar QRIS"
              >
                {copiedId === 'don-qris' ? (
                  <>
                    <Check size={15} style={{ color: '#10B981' }} />
                    <span style={{ color: '#10B981', fontWeight: 800 }}>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy size={15} />
                    <span>Salin Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* QRIS Image Thumbnail Right */}
          <div
            onClick={() => {
              playSoundEffect?.('click');
              triggerConfetti();
              setQrisModalOpen(true);
            }}
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '16px',
              border: '2px solid rgba(33, 150, 243, 0.35)',
              boxShadow: '0 10px 28px rgba(0,0,0,0.12)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            className="hover-lift"
          >
            <div style={{ width: '100%', maxHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img
                src="https://files.catbox.moe/0wygml.jpeg"
                alt="QRIS Rasfalz Studio"
                style={{
                  width: '100%',
                  maxHeight: '190px',
                  objectFit: 'contain',
                  borderRadius: '10px',
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.76rem',
                fontWeight: 800,
                color: '#2196F3',
              }}
            >
              <QrCode size={14} />
              <span>Klik untuk Perbesar QRIS</span>
            </div>
          </div>
        </div>

        {/* 3. THE 4 OFFICIAL DONATION PLATFORMS GRID */}
        <div id="donation-platforms">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Gift size={22} className="text-orange" />
              <div>
                <h2 style={{ fontSize: '1.35rem', margin: 0, fontWeight: 900, color: 'var(--text-primary)' }}>
                  Saluran Resmi Donasi &amp; Dukungan
                </h2>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                  Pilih platform donasi yang paling nyaman untuk Anda. Seluruh saluran resmi di bawah ini terverifikasi.
                </p>
              </div>
            </div>

            <span className="badge badge-orange" style={{ fontSize: '0.72rem' }}>
              ✨ 4 Opsi Pembayaran Resmi
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {siteConfig.donations.map((platform) => {
              const isQris = platform.id === 'don-qris';
              return (
                <div
                  key={platform.id}
                  className="glass-card hover-lift"
                  style={{
                    padding: '26px 24px',
                    borderRadius: 'var(--radius-xl)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: `2px solid ${platform.color}45`,
                    background: 'var(--bg-surface)',
                    boxShadow: `0 8px 24px ${platform.color}14`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Subtle top accent line */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: platform.color,
                    }}
                  />

                  <div>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '14px',
                          background: `${platform.color}15`,
                          color: platform.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `1.5px solid ${platform.color}35`,
                          boxShadow: `0 4px 14px ${platform.color}25`,
                        }}
                      >
                        {isQris ? <QrCode size={24} /> : <Coffee size={22} />}
                      </div>

                      <span
                        className="badge"
                        style={{
                          background: `${platform.color}15`,
                          color: platform.color,
                          border: `1px solid ${platform.color}35`,
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          padding: '3px 10px',
                        }}
                      >
                        {platform.unit}
                      </span>
                    </div>

                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {platform.name}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 900, margin: '4px 0 6px 0', color: 'var(--text-primary)' }}>
                      {platform.logoText}
                    </h3>

                    <p style={{ fontSize: '0.80rem', color: platform.color, fontWeight: 800, margin: '0 0 10px 0' }}>
                      ✦ {platform.tagline}
                    </p>

                    <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 18px 0' }}>
                      {platform.description}
                    </p>

                    {/* Feature micro-perks */}
                    <div
                      style={{
                        background: 'var(--bg-surface-elevated)',
                        borderRadius: '12px',
                        padding: '10px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        marginBottom: '20px',
                        border: '1px solid var(--border-medium)',
                      }}
                    >
                      {[
                        isQris
                          ? 'Nominal bebas seikhlasnya (mulai Rp 1.000)'
                          : platform.id === 'don-trakteer'
                          ? 'Mulai 1 Boba Ice (Rp 3.000) & Reward'
                          : platform.id === 'don-saweria'
                          ? 'Live Notifikasi Alert & Dukungan Instan'
                          : 'Tribe & Dukungan Kreator Indonesia',
                        'Mendukung All E-Wallet & Bank Transfer',
                        '100% Aman & Terverifikasi Langsung ke Kreator',
                      ].map((perk, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem' }}>
                          <CheckCircle2 size={13} style={{ color: platform.color, flexShrink: 0 }} />
                          <span style={{ color: 'var(--text-primary)' }}>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => handleSupportClick(platform)}
                      className="btn hover-lift"
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        background: platform.color,
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: '0.86rem',
                        padding: '12px 18px',
                        borderRadius: '12px',
                        gap: '8px',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    >
                      {isQris ? <QrCode size={16} /> : <Coffee size={16} />}
                      <span>{isQris ? 'Lihat & Scan QRIS' : platform.buttonText}</span>
                      <ArrowUpRight size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopyDonationUrl(platform)}
                      className="btn btn-glass hover-lift"
                      style={{ padding: '12px 14px' }}
                      title="Salin Tautan Donasi"
                    >
                      {copiedId === platform.id ? (
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

        {/* 4. ALLOCATION TRANSPARENCY SECTION (4 Bento Pillars) */}
        <div
          className="glass-card"
          style={{
            padding: '32px 36px',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--bg-surface)',
            border: '2px solid var(--border-medium)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'var(--color-orange-subtle)',
                  color: 'var(--color-orange)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid rgba(255, 156, 15, 0.3)',
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.35rem', margin: 0, fontWeight: 900, color: 'var(--text-primary)' }}>
                  Komitmen Transparansi Alokasi Donasi
                </h2>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                  Seluruh dana yang terkumpul dialokasikan secara transparan demi keberlanjutan ekosistem kreatif Rasfalz Studio.
                </p>
              </div>
            </div>

            <span className="badge badge-orange" style={{ fontSize: '0.72rem' }}>
              ✓ 100% Kemanfaatan Kreator
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {[
              {
                icon: Server,
                title: 'Server & Cloud Hosting',
                desc: 'Membiayai penyimpanan arsip mentahan 3D dan preset Alight Motion 4K agar dapat diakses gratis selamanya tanpa batasan kuota.',
                color: 'var(--color-orange)',
              },
              {
                icon: Cpu,
                title: 'Lisensi Software Riset',
                desc: 'Langganan software resmi profesional (Adobe Creative Cloud, Alight Motion, CapCut Pro) untuk riset materi pengeditan terkini.',
                color: '#2196F3',
              },
              {
                icon: Tv,
                title: 'Produksi Konten Tutorial',
                desc: 'Membantu waktu dan tenaga produksi tutorial motion graphic & video editing komprehensif di YouTube & media sosial.',
                color: '#10B981',
              },
              {
                icon: Coffee,
                title: 'Apresiasi & Stamina Kreator',
                desc: 'Menjaga semangat Raihan tetap membara untuk terus konsisten berkarya dan membina komunitas kreatif visual.',
                color: '#be1e2d',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="hover-lift"
                  style={{
                    background: 'var(--bg-surface-elevated)',
                    padding: '22px 20px',
                    borderRadius: '16px',
                    border: '2px solid var(--border-medium)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: `${item.color}15`,
                      color: item.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. FAQ SECTION */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <HelpCircle size={22} className="text-orange" />
            <h2 style={{ fontSize: '1.35rem', margin: 0, fontWeight: 900 }}>
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
          </div>
          <DonationFAQ />
        </div>

        {/* 6. HALL OF FAME VIP SUPPORTER CONFIRMATION BANNER */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            padding: '28px 34px',
            background: 'linear-gradient(135deg, rgba(255, 156, 15, 0.12) 0%, var(--bg-surface) 100%)',
            borderRadius: 'var(--radius-xl)',
            border: '2px solid var(--color-orange)',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-orange" style={{ fontSize: '0.68rem', padding: '3px 8px' }}>
                HALL OF FAME VIP SUPPORTER
              </span>
              <span className="badge badge-glass" style={{ fontSize: '0.68rem', padding: '3px 8px' }}>
                ⭐ Personal Shoutout
              </span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, margin: '4px 0 6px 0', color: 'var(--text-primary)' }}>
              Sudah Berdonasi? Kirimkan Bukti untuk Shoutout Apresiasi!
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
              Setiap donatur berhak mendapatkan ucapan terima kasih personal dan pencatatan nama di daftar Hall of Fame VIP Supporter Rasfalz Studio. Kirim bukti screenshot ke WhatsApp Raihan.
            </p>
          </div>

          <button
            type="button"
            onClick={handleConfirmWa}
            className="btn btn-primary-orange hover-lift"
            style={{ padding: '12px 24px', fontSize: '0.90rem', gap: '8px' }}
          >
            <MessageCircle size={18} />
            <span>Kirim Bukti ke WhatsApp</span>
          </button>
        </div>

      </div>

      {/* QRIS Modal */}
      <QrisModal
        isOpen={qrisModalOpen}
        onClose={() => setQrisModalOpen(false)}
        onConfirmWa={handleConfirmWa}
      />
    </WindowFrame>
  );
};
