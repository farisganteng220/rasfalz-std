import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { WindowFrame } from '../components/common/WindowFrame';
import { useOS } from '../context/OSContext';
import { useAudio } from '../context/AudioContext';
import { DecorativeBackground } from '../components/common/DecorativeBackground';
import {
  Film,
  Sparkles,
  Clock,
  CheckCircle2,
  Send,
  MessageCircle,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';

/* ────────────────────────────────────────────
   FAQ ACCORDION COMPONENT
──────────────────────────────────────────── */
const CommissionFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Berapa kali revisi yang diberikan untuk setiap order?',
      a: 'Setiap paket commission sudah mencakup garansi revisi minor gratis hingga 3x (seperti koreksi teks/subtitles, penyesuaian warna, tempo musik, atau penggantian aset foto/video). Untuk perubahan konsep total setelah draft final disepakati, akan dikenakan biaya add-on penyesuaian.',
    },
    {
      q: 'Bagaimana cara pengiriman footage dan file materi proyek?',
      a: 'Kalian cukup mengunggah footage rekaman video, file audio, atau aset foto ke Google Drive / Dropbox / WeTransfer, lalu sertakan link folder tersebut saat berkonsultasi langsung via WhatsApp.',
    },
    {
      q: 'Format file apa saja yang akan saya terima?',
      a: 'Untuk video: MP4 4K / 1080p 60fps dengan bitrate tinggi. Untuk foto & grafis: file resolusi penuh PNG, TIFF, JPEG 300 DPI, serta file master PSD / AI dan Preset Alight Motion/Canva jika diminta.',
    },
    {
      q: 'Bagaimana sistem pembayaran dan keamanan transaksi?',
      a: 'Kami menerima pembayaran melalui QRIS, Transfer Bank (SeaBank/Bank Jago), serta e-Wallet (GoPay, OVO, Dana, ShopeePay). Sistem pengerjaan menggunakan pelunasan full di awal atau DP 50% jika projectnya besar.',
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
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <HelpCircle size={18} className="text-orange" style={{ flexShrink: 0 }} />
                <span>{faq.q}</span>
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
            {isOpen && <div className="accordion-content animate-fade-in">{faq.a}</div>}
          </div>
        );
      })}
    </div>
  );
};

/* ────────────────────────────────────────────
   MAIN COMMISSION PAGE
──────────────────────────────────────────── */
export const CommissionPage = () => {
  const { isMobile } = useOS();
  const { playSoundEffect } = useAudio();

  // ==========================================
  // MOBILE VIEW: Redesigned & Tailored for Mobile
  // ==========================================
  if (isMobile) {
    return (
      <WindowFrame
        title="Komisi Editing &amp; Desain"
        icon={Film}
        badgeText="Rasfalz Studio"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', padding: '4px 0 28px 0' }}>

          {/* 1. Mobile Hero Banner */}
          <div
            className="glass-card"
            style={{
              padding: '18px 16px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, var(--bg-surface) 0%, rgba(255, 156, 15, 0.08) 100%)',
              border: '2px solid var(--border-medium)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span className="badge badge-orange" style={{ fontSize: '0.64rem', padding: '3px 8px' }}>
                🟢 BUKA KOMISI EDITING
              </span>
              <span className="badge badge-green" style={{ fontSize: '0.64rem', padding: '3px 8px' }}>
                ✓ 100% Satisfaction Guarantee
              </span>
            </div>

            <div>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 900, margin: '0 0 6px 0', color: 'var(--text-primary)', lineHeight: 1.25 }}>
                Layanan Komisi &amp; <span className="text-gradient">Editing Kreatif</span>
              </h1>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                Tingkatkan engagement konten video motion graphic, poster grafis sosial media, atau video edukasi Anda dengan sentuhan visual sinematik dan ritme dinamis.
              </p>
            </div>

            {/* Micro Feature Highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginTop: '2px' }}>
              {[
                { label: 'Pengerjaan Cepat', sub: '1 - 6 Hari Kerja', icon: Clock },
                { label: 'Garansi Revisi', sub: 'Gratis 3x Minor', icon: CheckCircle2 },
                { label: 'Kualitas Master', sub: '1080p & 4K Full', icon: Sparkles },
              ].map((pill, idx) => {
                const Icon = pill.icon;
                return (
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
                    <Icon size={14} className="text-orange" style={{ margin: '0 auto 2px' }} />
                    <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {pill.label}
                    </div>
                    <div style={{ fontSize: '0.60rem', color: 'var(--text-muted)' }}>
                      {pill.sub}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Action Buttons */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <a
                href="#paket-commission"
                className="btn btn-primary-orange btn-sm hover-lift"
                style={{ flex: 1, justifyContent: 'center', padding: '9px 12px', fontSize: '0.78rem', gap: '6px' }}
              >
                <Film size={14} />
                <span>Pilihan Paket</span>
              </a>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=Halo%20Raihan%2C%20saya%20tertarik%20dengan%20jasa%20commission%20editing%20Rasfalz%20Studio`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-glass btn-sm hover-lift"
                style={{ padding: '9px 12px', fontSize: '0.78rem', justifyContent: 'center', gap: '6px' }}
              >
                <MessageCircle size={14} />
                <span>WhatsApp</span>
              </a>
              <a
                href={siteConfig.contact.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary-blue btn-sm hover-lift"
                style={{ padding: '9px 12px', fontSize: '0.78rem', justifyContent: 'center', gap: '6px' }}
              >
                <Send size={14} />
                <span>Telegram</span>
              </a>
            </div>
          </div>

          {/* 2. Mobile Packages Section */}
          <div id="paket-commission" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} className="text-orange" />
                <h2 style={{ fontSize: '1.08rem', margin: 0, fontWeight: 900, color: 'var(--text-primary)' }}>
                  Pilihan Paket Layanan
                </h2>
              </div>
              <span className="badge badge-category" style={{ fontSize: '0.64rem' }}>
                {siteConfig.commissionServices.length} Paket
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {siteConfig.commissionServices.map((srv) => (
                <div
                  key={srv.id}
                  className="glass-card btn-press"
                  style={{
                    borderRadius: '18px',
                    padding: '16px',
                    background: 'var(--bg-surface)',
                    border: srv.popular ? '2px solid var(--color-orange)' : '2px solid var(--border-medium)',
                    boxShadow: srv.popular ? 'var(--shadow-sm)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    position: 'relative',
                  }}
                >
                    {srv.popular && (
                      <span
                        className="badge badge-orange"
                        style={{
                          position: 'absolute',
                          top: '-10px',
                          right: '16px',
                          fontSize: '0.62rem',
                          padding: '2px 8px',
                        }}
                      >
                        Paling Populer
                      </span>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className="badge badge-category" style={{ fontSize: '0.64rem', padding: '2px 8px' }}>
                        {srv.category}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.70rem', color: 'var(--text-muted)' }}>
                        <Clock size={12} className="text-orange" />
                        <span>{srv.turnaround}</span>
                      </div>
                    </div>

                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 900, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                        {srv.title}
                      </h3>
                      <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--color-orange)', fontFamily: 'var(--font-display)' }}>
                        {srv.startingPrice}
                      </div>
                    </div>

                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                      {srv.description}
                    </p>

                    {/* Inclusions */}
                    <div
                      style={{
                        background: 'var(--bg-surface-elevated)',
                        borderRadius: '12px',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                      }}
                    >
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                        Benefit Termasuk:
                      </span>
                      {srv.inclusions.map((inc, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.74rem' }}>
                          <CheckCircle2 size={13} className="text-orange" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span style={{ color: 'var(--text-primary)', lineHeight: 1.35 }}>{inc}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
                      <a
                        href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=Halo%20Raihan%2C%20saya%20tertarik%20untuk%20order%20commission%20layanan%20${encodeURIComponent(srv.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary-orange btn-sm"
                        style={{ flex: 1, justifyContent: 'center', padding: '9px 14px', fontSize: '0.8rem', gap: '8px' }}
                      >
                        <MessageCircle size={15} />
                        <span>Pesan via WhatsApp</span>
                        <ChevronRight size={14} />
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* 3. Mobile Workflow Step-by-Step */}
          <div
            className="glass-card"
            style={{
              padding: '18px 16px',
              borderRadius: '20px',
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} className="text-blue" />
              <div>
                <h3 style={{ fontSize: '1.05rem', margin: 0, fontWeight: 900, color: 'var(--text-primary)' }}>
                  Alur Kerja &amp; Cara Pemesanan
                </h3>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>
                  Proses cepat, transparan, dan terstruktur dari awal hingga akhir.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { step: '01', title: 'Konsultasi & Brief', desc: 'Diskusikan ide, referensi, & target deadline via WhatsApp.' },
                { step: '02', title: 'Kirim Bahan Materi', desc: 'Unggah rekaman, audio, atau foto ke Google Drive / Dropbox.' },
                { step: '03', title: 'Editing & Draft', desc: 'Preview draft pertama dengan garansi revisi minor gratis 3x.' },
                { step: '04', title: 'Serah Terima File', desc: 'Pengiriman file resolusi tinggi (1080p/4K) siap publikasi.' },
              ].map((flow) => (
                <div
                  key={flow.step}
                  style={{
                    background: 'var(--bg-surface-elevated)',
                    padding: '12px',
                    borderRadius: '14px',
                    border: '1.5px solid var(--border-medium)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--color-orange)', fontFamily: 'var(--font-display)' }}>
                    {flow.step}
                  </div>
                  <h4 style={{ fontSize: '0.82rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', lineHeight: 1.25 }}>
                    {flow.title}
                  </h4>
                  <p style={{ fontSize: '0.70rem', color: 'var(--text-secondary)', lineHeight: 1.35, margin: 0 }}>
                    {flow.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Mobile FAQ Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircle size={18} className="text-orange" />
              <h3 style={{ fontSize: '1.05rem', margin: 0, fontWeight: 900, color: 'var(--text-primary)' }}>
                Tanya Jawab (FAQ)
              </h3>
            </div>
            <CommissionFAQ />
          </div>

          {/* 5. Mobile Guarantee Banner */}
          <div
            style={{
              padding: '16px',
              borderRadius: '16px',
              background: 'var(--color-orange-subtle)',
              border: '2px solid rgba(255, 156, 15, 0.35)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
            }}
          >
            <AlertCircle size={24} className="text-orange" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ fontSize: '0.90rem', fontWeight: 800, margin: '0 0 3px 0', color: 'var(--color-orange)' }}>
                Ketentuan Garansi Kepuasan Klien
              </h4>
              <p style={{ fontSize: '0.76rem', margin: 0, color: 'var(--text-primary)', lineHeight: 1.45 }}>
                Setiap order mencakup garansi revisi minor gratis hingga 3x, backup master file di cloud selama 60 hari, dan jaminan kerahasiaan materi proyek sebelum tanggal rilis Anda.
              </p>
            </div>
          </div>

        </div>
      </WindowFrame>
    );
  }

  return (
    <WindowFrame
      title="Commission Editing & Paid Edit Services"
      icon={Film}
      badgeText="Open for Orders"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '24px' : '36px' }}>
        {/* HERO BANNER */}
        <div
          style={{
            position: 'relative',
            borderRadius: isMobile ? '16px' : '24px',
            overflow: 'hidden',
            background: 'var(--bg-surface)',
            border: '2px solid var(--border-medium)',
            padding: isMobile ? '20px 16px' : '32px',
            boxShadow: '0 6px 28px rgba(0,0,0,0.1)',
          }}
        >
          <DecorativeBackground isMobile={isMobile} scheme="orange" />
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: isMobile ? 'flex-start' : 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '10px',
                  flexWrap: 'wrap',
                }}
              >
                <span className="badge badge-orange" style={{ fontSize: '0.68rem' }}>
                  🟢 Buka 24 Jam Komisi Editing (Tutup tergantung Mood Admin)
                </span>
                <span className="badge badge-green" style={{ fontSize: '0.68rem' }}>
                  ✓ 100% Satisfaction Guarantee
                </span>
              </div>

              <h1
                style={{
                  fontSize: isMobile ? '1.4rem' : '2.1rem',
                  fontWeight: 900,
                  marginBottom: '8px',
                  lineHeight: '1.2',
                }}
              >
                Professional <span className="text-gradient">Editing &amp; Creative Services</span>
              </h1>

              <p
                style={{
                  maxWidth: '650px',
                  margin: 0,
                  fontSize: isMobile ? '0.84rem' : '0.92rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                }}
              >
                Tingkatkan engagement konten video motion graphic, poster grafis sosial media, atau video edukasi Anda dengan sentuhan visual cinematic dan ritme dinamis.
              </p>
            </div>

            {/* Direct Contact CTAs */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', width: isMobile ? '100%' : 'auto' }}>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=Halo%20Raihan%2C%20saya%20tertarik%20dengan%20jasa%20commission%20editing%20Rasfalz%20Studio`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary-orange hover-lift"
                style={{ flex: isMobile ? '1 1 auto' : 'initial', gap: '8px' }}
              >
                <MessageCircle size={17} />
                <span>Order via WhatsApp</span>
              </a>
              <a
                href={siteConfig.contact.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary-blue hover-lift"
                style={{ flex: isMobile ? '1 1 auto' : 'initial', gap: '8px' }}
              >
                <Send size={17} />
                <span>Order via Telegram</span>
              </a>
            </div>
          </div>
        </div>

        {/* SECTION: Commission Packages Grid */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <Sparkles size={22} className="text-orange" />
            <div>
              <h2 style={{ fontSize: isMobile ? '1.18rem' : '1.45rem', margin: 0, fontWeight: 900 }}>
                Pilihan Paket Layanan
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Pilih paket yang paling sesuai dengan kebutuhan proyek visual Anda.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: isMobile ? '16px' : '22px',
            }}
          >
            {siteConfig.commissionServices.map((srv) => (
              <div
                key={srv.id}
                className={`glass-card hover-lift ${srv.popular ? 'border-highlight' : ''}`}
                style={{
                  padding: isMobile ? '20px' : '24px',
                  borderRadius: isMobile ? '16px' : 'var(--radius-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  border: srv.popular
                    ? '2px solid var(--color-orange)'
                    : '2px solid var(--border-medium)',
                  background: 'var(--bg-surface)',
                }}
              >
                {srv.popular && (
                  <span
                    className="badge badge-orange"
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '20px',
                    }}
                  >
                    Paling Populer
                  </span>
                )}

                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <span className="badge badge-glass" style={{ fontSize: '0.72rem' }}>
                      {srv.category}
                    </span>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      <Clock size={13} className="text-orange" />
                      <span>{srv.turnaround}</span>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '6px' }}>
                    {srv.title}
                  </h3>

                  <div
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 900,
                      color: 'var(--color-orange)',
                      marginBottom: '10px',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {srv.startingPrice}
                  </div>

                  <p
                    style={{
                      fontSize: '0.84rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.5',
                      marginBottom: '18px',
                    }}
                  >
                    {srv.description}
                  </p>

                  {/* Inclusions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '22px' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Yang Anda Dapatkan:
                    </span>
                    {srv.inclusions.map((inc, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          fontSize: '0.82rem',
                        }}
                      >
                        <CheckCircle2
                          size={15}
                          className="text-orange"
                          style={{ flexShrink: 0, marginTop: '2px' }}
                        />
                        <span style={{ color: 'var(--text-primary)' }}>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=Halo%20Raihan%2C%20saya%20tertarik%20untuk%20order%20commission%20layanan%20${encodeURIComponent(srv.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary-orange btn-sm hover-lift"
                    style={{ flex: 1, justifyContent: 'center', gap: '8px', padding: '9px 16px', fontSize: '0.82rem' }}
                  >
                    <MessageCircle size={15} />
                    <span>Pesan via WhatsApp</span>
                    <ChevronRight size={15} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: Step-by-Step Cara Pemesanan */}
        <div
          className="glass-card"
          style={{
            padding: isMobile ? '20px 16px' : '28px 32px',
            borderRadius: isMobile ? '16px' : 'var(--radius-xl)',
            background: 'var(--bg-surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <ShieldCheck size={22} className="text-blue" />
            <div>
              <h2 style={{ fontSize: isMobile ? '1.18rem' : '1.35rem', margin: 0, fontWeight: 900 }}>
                Cara Pemesanan &amp; Alur Kerja
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Proses cepat, transparan, dan terstruktur dari awal hingga serah terima file.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '14px',
            }}
          >
            {[
              {
                step: '01',
                title: 'Konsultasi & Brief',
                desc: 'Diskusikan ide, referensi moodboard, target platform, dan deadline pengerjaan via WhatsApp / Telegram.',
              },
              {
                step: '02',
                title: 'Kirim Bahan Materi',
                desc: 'Unggah rekaman video, audio voiceover, foto RAW, atau materi logo ke Google Drive / Dropbox.',
              },
              {
                step: '03',
                title: 'Editing & Draft Review',
                desc: 'Pengerjaan dimulai dengan preview draft pertama. Client berhak mendapatkan revisi minor hingga puas.',
              },
              {
                step: '04',
                title: 'Final Master Delivery',
                desc: 'Pengiriman file resolusi tinggi (1080p/4K/PDF/AI/Vector/Preset) siap publikasi beserta lisensi komersial.',
              },
            ].map((flow) => (
              <div
                key={flow.step}
                style={{
                  background: 'var(--bg-card)',
                  padding: '18px',
                  borderRadius: 'var(--radius-lg)',
                  border: '2px solid var(--border-medium)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-orange)',
                  }}
                >
                  {flow.step}
                </div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 800, margin: 0 }}>
                  {flow.title}
                </h4>
                <p
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.45',
                    margin: 0,
                  }}
                >
                  {flow.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: FAQ & Garansi Kepuasan */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <HelpCircle size={20} className="text-orange" />
            <h2 style={{ fontSize: isMobile ? '1.18rem' : '1.35rem', margin: 0, fontWeight: 900 }}>
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
          </div>

          <CommissionFAQ />
        </div>

        {/* SECTION: Garansi Banner */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: isMobile ? '16px' : '20px 24px',
            background: 'var(--color-orange-subtle)',
            borderRadius: isMobile ? '14px' : 'var(--radius-xl)',
            border: '2px solid rgba(255, 156, 15, 0.35)',
            flexDirection: isMobile ? 'column' : 'row',
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          <AlertCircle size={32} className="text-orange" style={{ flexShrink: 0 }} />
          <div>
            <h4
              style={{
                fontSize: '0.98rem',
                fontWeight: 800,
                margin: '0 0 4px 0',
                color: 'var(--color-orange)',
              }}
            >
              Ketentuan Garansi Kepuasan Klien
            </h4>
            <p
              style={{
                fontSize: '0.84rem',
                margin: 0,
                color: 'var(--text-primary)',
                lineHeight: '1.5',
              }}
            >
              Setiap order mencakup garansi revisi minor gratis hingga 3x, backup master file di cloud selama 60 hari, dan jaminan kerahasiaan materi proyek sebelum tanggal rilis Anda.
            </p>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};
