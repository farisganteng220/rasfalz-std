import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { WindowFrame } from '../components/common/WindowFrame';
import { useOS } from '../context/OSContext';
import { useAudio } from '../context/AudioContext';
import { DecorativeBackground } from '../components/common/DecorativeBackground';
import confetti from 'canvas-confetti';
import {
  InstagramIcon,
  YoutubeIcon,
  TikTokIcon,
  WhatsAppIcon,
  TelegramIcon,
  FacebookIcon,
} from '../components/common/BrandIcons';
import {
  MessageSquare,
  MessageCircle,
  Send,
  Mail,
  Sparkles,
  CheckCircle2,
  Clock,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  HelpCircle,
  ChevronDown,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  PhoneCall,
  Calendar,
  FileText,
  Coffee,
  HeartHandshake,
} from 'lucide-react';

/* ────────────────────────────────────────────
   CONTACT FAQ ACCORDION COMPONENT
──────────────────────────────────────────── */
const ContactFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Berapa lama estimasi waktu respon pesan saya?',
      a: 'Pada jam operasional (09:00 – 22:00 WIB), pesan melalui WhatsApp dan Telegram umumnya dibalas dalam waktu kurang dari 15–30 menit (maksimal 2 jam). Untuk pesan masuk di luar jam kerja atau via email, respon akan diberikan pada pagi hari berikutnya.',
    },
    {
      q: 'Apakah konsultasi konsep dan estimasi harga dikenakan biaya?',
      a: '100% Gratis! Anda bebas berdiskusi mengenai ide, konsep animasi, referensi visual, hingga estimasi biaya dan durasi pengerjaan sebelum memutuskan untuk memesan layanan komisi.',
    },
    {
      q: 'Informasi apa saja yang sebaiknya saya siapkan sebelum menghubungi?',
      a: 'Sangat disarankan menyiapkan: (1) Referensi video/gaya desain yang disukai, (2) Bahan mentahan/aset yang sudah dimiliki (logo, audio, karakter anime/footage), (3) Format rasio yang diinginkan (9:16 vertikal atau 16:9 horizontal), serta (4) Estimasi deadline target penyelesaian.',
    },
    {
      q: 'Apakah Rasfalz Studio menerima pesanan kilat (Fast Track / Rush Order)?',
      a: 'Ya, kami menyediakan slot khusus pengerjaan ekspres (< 24–48 jam) tergantung antrean saat itu. Silakan hubungi langsung via WhatsApp untuk pengecekan slot prioritas kilat.',
    },
    {
      q: 'Metode pembayaran apa saja yang didukung untuk komisi?',
      a: 'Kami menerima pembayaran melalui QRIS Instan (All Bank & E-Wallet seperti BCA, Mandiri, GoPay, OVO, DANA, ShopeePay), Transfer Bank Langsung, serta platform Trakteer / Saweria.',
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
   MAIN CONTACT PAGE COMPONENT
──────────────────────────────────────────── */
export const ContactPage = () => {
  const { addToast, isMobile } = useOS();
  const { playSoundEffect } = useAudio();

  // Copy Feedback State
  const [copiedKey, setCopiedKey] = useState(null);

  const cleanWhatsappNumber = siteConfig.contact?.whatsappNumber || '6288803293497';
  const displayWhatsappNumber = '+62 888-0329-3497';
  const displayTelegramHandle = `@${siteConfig.contact?.telegramUsername || 'alwaysraihan'}`;
  const displayEmail = siteConfig.profile?.email || 'raihanalfarisy354@gmail.com';

  const triggerConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.75 },
      colors: ['#FF9C0F', '#25D366', '#229ED9', '#FFD700', '#ffffff'],
    });
  };

  const copyToClipboard = (text, key, label) => {
    playSoundEffect?.('click');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      addToast('Tersalin!', `${label} berhasil disalin ke clipboard.`, 'success');
      setTimeout(() => setCopiedKey(null), 2200);
    } else {
      addToast('Info Kontak', text, 'info');
    }
  };

  // Social Links List
  const socialList = [
    {
      name: 'Instagram',
      handle: siteConfig.socials?.instagram?.handle || '@rasfalz.std',
      url: siteConfig.socials?.instagram?.url || 'https://instagram.com/rasfalz.std',
      color: '#E1306C',
      icon: InstagramIcon,
      tagline: 'Artworks, Feed Portfolio & Daily Story',
    },
    {
      name: 'TikTok',
      handle: siteConfig.socials?.tiktok?.handle || '@rasfalz.std',
      url: siteConfig.socials?.tiktok?.url || 'https://tiktok.com/@rasfalz.std',
      color: '#00F2FE',
      icon: TikTokIcon,
      tagline: 'Preset AM, Motion Teaser & Short Videos',
    },
    {
      name: 'YouTube',
      handle: siteConfig.socials?.youtube?.handle || 'Raihan (Rasfalz Studio)',
      url: siteConfig.socials?.youtube?.url || 'https://www.youtube.com/@rasfalz-std',
      color: '#FF0000',
      icon: YoutubeIcon,
      tagline: 'Full AMV Projects, Tutorials & Showcases',
    },
    {
      name: 'Telegram Channel',
      handle: '@mentahanraihan3d',
      url: 'https://t.me/mentahanraihan3d',
      color: '#229ED9',
      icon: TelegramIcon,
      tagline: 'Mentahan 3D 4K & Preset Cloud Archive',
    },
    {
      name: 'Facebook',
      handle: 'Raihan Salman Alfarisy',
      url: siteConfig.socials?.facebook?.url || 'https://www.facebook.com/raihan.salmanalfarisy.397',
      color: '#1877F2',
      icon: FacebookIcon,
      tagline: 'Koneksi Komunitas Editor & Update Info',
    },
  ];

  // ==========================================
  // MOBILE VIEW
  // ==========================================
  if (isMobile) {
    return (
      <WindowFrame
        title="Hubungi Kami"
        icon={MessageSquare}
        badgeText="Rasfalz Studio"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '4px 0 32px 0' }}>

          {/* 1. Mobile Hero Card */}
          <div
            className="glass-card"
            style={{
              padding: '22px 18px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, var(--bg-surface) 0%, rgba(255, 156, 15, 0.12) 100%)',
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
                background: 'var(--color-orange)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <MessageSquare size={26} />
            </div>

            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <span className="badge badge-orange" style={{ fontSize: '0.66rem', padding: '3px 8px' }}>
                  ✦ Official Concierge
                </span>
                <span className="badge badge-green" style={{ fontSize: '0.66rem', padding: '3px 8px' }}>
                  🟢 Online GMT+7
                </span>
              </div>
              <h1 style={{ fontSize: '1.45rem', fontWeight: 900, margin: '2px 0 6px 0', color: 'var(--text-primary)', lineHeight: 1.25 }}>
                Punya Proyek? <span className="text-gradient">Mari Terhubung.</span>
              </h1>
              <p style={{ fontSize: '0.80rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                Konsultasi gratis brief editing, request slot komisi, kolaborasi konten, atau sekadar bertukar sapa dengan kreator.
              </p>
            </div>

            {/* Micro Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginTop: '6px' }}>
              <div style={{ background: 'var(--bg-surface-elevated)', padding: '8px 6px', borderRadius: '10px', border: '1px solid var(--border-medium)' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#10B981' }}>&lt; 2 Jam</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Respon Cepat</div>
              </div>
              <div style={{ background: 'var(--bg-surface-elevated)', padding: '8px 6px', borderRadius: '10px', border: '1px solid var(--border-medium)' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 900, color: 'var(--color-orange)' }}>100%</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Konsultasi Bebas</div>
              </div>
              <div style={{ background: 'var(--bg-surface-elevated)', padding: '8px 6px', borderRadius: '10px', border: '1px solid var(--border-medium)' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#229ED9' }}>WIB</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>09:00 - 22:00</div>
              </div>
            </div>
          </div>

          {/* 2. Direct Primary Channel Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PhoneCall size={18} className="text-orange" />
                <h2 style={{ fontSize: '1.05rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)' }}>
                  Saluran Kontak Utama
                </h2>
              </div>
              <span className="badge badge-glass" style={{ fontSize: '0.65rem' }}>3 Saluran Langsung</span>
            </div>

            {/* WhatsApp Card */}
            <div
              className="glass-card"
              style={{
                padding: '16px',
                borderRadius: '16px',
                border: '2px solid rgba(37, 211, 102, 0.4)',
                background: 'var(--bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: 'rgba(37, 211, 102, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#25D366',
                    }}
                  >
                    <WhatsAppIcon size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      WhatsApp Direct
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#25D366', fontWeight: 700 }}>
                      {displayWhatsappNumber}
                    </div>
                  </div>
                </div>
                <span className="badge" style={{ background: 'rgba(37, 211, 102, 0.15)', color: '#25D366', fontSize: '0.64rem' }}>
                  ⚡ Tercepat
                </span>
              </div>

              <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                Jalur tercepat untuk konsultasi brief, voice note, update revisi real-time, dan order instan.
              </p>

              <div style={{ display: 'flex', gap: '8px' }}>
                <a
                  href={siteConfig.contact?.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    playSoundEffect?.('click');
                    triggerConfetti();
                  }}
                  className="btn btn-sm hover-lift"
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    background: '#1E9E4B',
                    color: '#fff',
                    fontWeight: 800,
                    padding: '9px 12px',
                    fontSize: '0.80rem',
                    gap: '6px',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <MessageCircle size={15} />
                  <span>Chat WhatsApp</span>
                  <ArrowUpRight size={14} />
                </a>

                <button
                  type="button"
                  onClick={() => copyToClipboard(displayWhatsappNumber, 'wa', 'Nomor WhatsApp')}
                  className="btn btn-sm btn-glass"
                  style={{ padding: '9px 12px' }}
                  title="Salin Nomor WhatsApp"
                >
                  {copiedKey === 'wa' ? <Check size={15} style={{ color: '#10B981' }} /> : <Copy size={15} />}
                </button>
              </div>
            </div>

            {/* Telegram Card */}
            <div
              className="glass-card"
              style={{
                padding: '16px',
                borderRadius: '16px',
                border: '2px solid rgba(34, 158, 217, 0.4)',
                background: 'var(--bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: 'rgba(34, 158, 217, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#229ED9',
                    }}
                  >
                    <TelegramIcon size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      Telegram Lounge
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#229ED9', fontWeight: 700 }}>
                      {displayTelegramHandle}
                    </div>
                  </div>
                </div>
                <span className="badge" style={{ background: 'rgba(34, 158, 217, 0.15)', color: '#229ED9', fontSize: '0.64rem' }}>
                  ☁️ File 4K
                </span>
              </div>

              <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                Kirim file project mentahan ukuran besar tanpa kompresi dan obrolan teknis editing.
              </p>

              <div style={{ display: 'flex', gap: '8px' }}>
                <a
                  href={siteConfig.contact?.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSoundEffect?.('click')}
                  className="btn btn-sm hover-lift"
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    background: '#0088CC',
                    color: '#fff',
                    fontWeight: 800,
                    padding: '9px 12px',
                    fontSize: '0.80rem',
                    gap: '6px',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <Send size={15} />
                  <span>Buka Telegram</span>
                  <ArrowUpRight size={14} />
                </a>

                <button
                  type="button"
                  onClick={() => copyToClipboard(displayTelegramHandle, 'tg', 'Handle Telegram')}
                  className="btn btn-sm btn-glass"
                  style={{ padding: '9px 12px' }}
                  title="Salin Handle Telegram"
                >
                  {copiedKey === 'tg' ? <Check size={15} style={{ color: '#10B981' }} /> : <Copy size={15} />}
                </button>
              </div>
            </div>

            {/* Email Card */}
            <div
              className="glass-card"
              style={{
                padding: '16px',
                borderRadius: '16px',
                border: '2px solid rgba(234, 67, 53, 0.35)',
                background: 'var(--bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: 'rgba(234, 67, 53, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#EA4335',
                    }}
                  >
                    <Mail size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      Official Email
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#EA4335', fontWeight: 700 }}>
                      {displayEmail}
                    </div>
                  </div>
                </div>
                <span className="badge" style={{ background: 'rgba(234, 67, 53, 0.15)', color: '#EA4335', fontSize: '0.64rem' }}>
                  📋 Formal/NDA
                </span>
              </div>

              <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                Kerja sama agensi, penawaran sponsorship resmi, permintaan dokumen NDA, dan invoicing.
              </p>

              <div style={{ display: 'flex', gap: '8px' }}>
                <a
                  href={`mailto:${displayEmail}`}
                  onClick={() => playSoundEffect?.('click')}
                  className="btn btn-sm hover-lift"
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    background: '#C5221F',
                    color: '#fff',
                    fontWeight: 800,
                    padding: '9px 12px',
                    fontSize: '0.80rem',
                    gap: '6px',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <Mail size={15} />
                  <span>Kirim Email</span>
                  <ArrowUpRight size={14} />
                </a>

                <button
                  type="button"
                  onClick={() => copyToClipboard(displayEmail, 'email', 'Alamat Email')}
                  className="btn btn-sm btn-glass"
                  style={{ padding: '9px 12px' }}
                  title="Salin Alamat Email"
                >
                  {copiedKey === 'email' ? <Check size={15} style={{ color: '#10B981' }} /> : <Copy size={15} />}
                </button>
              </div>
            </div>
          </div>

          {/* 3. Social Media Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} className="text-orange" />
                <h3 style={{ fontSize: '0.98rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)' }}>
                  Media Sosial &amp; Portofolio
                </h3>
              </div>
              <span className="badge badge-glass" style={{ fontSize: '0.64rem' }}>5 Platform</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {socialList.map((soc, idx) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={idx}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSoundEffect?.('click')}
                    className="glass-card hover-lift"
                    style={{
                      padding: '12px',
                      borderRadius: '14px',
                      background: 'var(--bg-surface)',
                      border: `1.5px solid ${soc.color}35`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      textDecoration: 'none',
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '10px',
                        background: `${soc.color}18`,
                        color: soc.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {soc.name}
                      </div>
                      <div style={{ fontSize: '0.64rem', color: soc.color, fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {soc.handle}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* 4. Operating Hours & Location Bento */}
          <div
            className="glass-card"
            style={{
              padding: '16px',
              borderRadius: '16px',
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} className="text-orange" />
              <h3 style={{ fontSize: '0.94rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)' }}>
                Jadwal Studio &amp; Lokasi
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.76rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px', background: 'var(--bg-surface-elevated)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Jam Kerja Aktif:</span>
                <span style={{ fontWeight: 800, color: '#10B981' }}>09:00 – 22:00 WIB</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px', background: 'var(--bg-surface-elevated)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Hari Layanan:</span>
                <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>Senin – Minggu (Setiap Hari)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px', background: 'var(--bg-surface-elevated)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Lokasi Studio:</span>
                <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>Sidoarjo, Jawa Timur (GMT+7)</span>
              </div>
            </div>
          </div>

          {/* 5. FAQ Accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircle size={18} className="text-orange" />
              <h3 style={{ fontSize: '1.02rem', margin: 0, fontWeight: 900, color: 'var(--text-primary)' }}>
                Tanya Jawab Seputar Kontak (FAQ)
              </h3>
            </div>
            <ContactFAQ />
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
      title="Contact & Creative Concierge"
      icon={MessageSquare}
      badgeText="Official Studio Hub"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '24px' }}>

        {/* 1. HERO BANNER WITH BENTO STATS */}
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
                  Rasfalz Creative Concierge
                </span>
                <span
                  className="badge"
                  style={{
                    background: 'rgba(37, 211, 102, 0.15)',
                    color: '#25D366',
                    border: '1.5px solid rgba(37, 211, 102, 0.4)',
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
                      background: '#25D366',
                      display: 'inline-block',
                    }}
                  />
                  Online &amp; Aktif (GMT+7)
                </span>
                <span className="badge badge-glass" style={{ fontSize: '0.72rem', padding: '4px 10px' }}>
                  ✓ Konsultasi Awal Bebas Biaya
                </span>
              </div>

              <h1 style={{ fontSize: '2.25rem', fontWeight: 900, margin: '0 0 12px 0', lineHeight: 1.2 }}>
                “Punya Proyek Impian?{' '}
                <span className="text-gradient">Mari Wujudkan Bersama.”</span>
              </h1>

              <p style={{ margin: '0 0 22px 0', fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                Saya selalu antusias mendiskusikan peluang komisi video editing (AMV, Jedag-Jedug, Motion Graphics), pembuatan poster anime GFX, lisensi aplikasi editing premium, maupun tawaran sponsorship resmi.
              </p>

              {/* Quick Jump Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href="#direct-channels"
                  className="btn btn-primary-orange hover-lift"
                  style={{ padding: '10px 18px', fontSize: '0.85rem', gap: '8px' }}
                >
                  <PhoneCall size={16} />
                  <span>Pilih Saluran Kontak</span>
                </a>

                <a
                  href={siteConfig.contact?.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    playSoundEffect?.('click');
                    triggerConfetti();
                  }}
                  className="btn btn-glass hover-lift"
                  style={{ padding: '10px 16px', fontSize: '0.85rem', gap: '8px' }}
                >
                  <MessageCircle size={16} style={{ color: '#25D366' }} />
                  <span>Chat WhatsApp Langsung</span>
                  <ArrowUpRight size={15} />
                </a>

                <button
                  type="button"
                  onClick={() => copyToClipboard(displayWhatsappNumber, 'hero-wa', 'Nomor WhatsApp')}
                  className="btn btn-glass hover-lift"
                  style={{ padding: '10px 16px', fontSize: '0.85rem', gap: '8px' }}
                >
                  {copiedKey === 'hero-wa' ? (
                    <>
                      <Check size={16} style={{ color: '#10B981' }} />
                      <span style={{ color: '#10B981', fontWeight: 800 }}>Nomor Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>Salin No. WhatsApp</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: 4 Bento Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {[
                { val: '< 2 Jam', label: 'Rata-Rata Respon', sub: 'Jam Aktif 09:00 - 22:00 WIB', color: '#10B981', icon: Clock },
                { val: '500+', label: 'Proyek Selesai', sub: 'Video AMV, Motion & Poster GFX', color: 'var(--color-orange)', icon: Sparkles },
                { val: '100%', label: 'Konsultasi Gratis', sub: 'Diskusi Konsep & Estimasi Biaya', color: '#2196F3', icon: ShieldCheck },
                { val: 'WIB', label: 'Zona Waktu GMT+7', sub: 'Sidoarjo, Jawa Timur, Indonesia', color: '#8B5CF6', icon: MapPin },
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

        {/* 2. THE 3 DIRECT CHANNELS BENTO (WhatsApp, Telegram, Email) */}
        <div id="direct-channels">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <PhoneCall size={22} className="text-orange" />
              <div>
                <h2 style={{ fontSize: '1.35rem', margin: 0, fontWeight: 900, color: 'var(--text-primary)' }}>
                  Saluran Komunikasi Langsung
                </h2>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                  Pilih saluran yang paling nyaman sesuai kebutuhan proyek atau format percakapan Anda.
                </p>
              </div>
            </div>

            <span className="badge badge-orange" style={{ fontSize: '0.72rem' }}>
              ✨ 3 Jalur Resmi Terverifikasi
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
            }}
          >
            {/* Card 1: WhatsApp Direct */}
            <div
              className="glass-card hover-lift"
              style={{
                padding: '28px 24px',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '2px solid var(--border-medium)',
                background: 'var(--bg-surface)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: '#1E9E4B',
                }}
              />

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '16px',
                      background: 'rgba(37, 211, 102, 0.15)',
                      color: '#25D366',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1.5px solid rgba(37, 211, 102, 0.35)',
                    }}
                  >
                    <WhatsAppIcon size={28} />
                  </div>
                  <span className="badge" style={{ background: 'rgba(37, 211, 102, 0.15)', color: '#25D366', fontWeight: 800, fontSize: '0.72rem' }}>
                    ⚡ Respon &lt; 15 Menit
                  </span>
                </div>

                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Rekomendasi Utama
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: '4px 0 6px 0', color: 'var(--text-primary)' }}>
                  WhatsApp Direct Chat
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#1E9E4B', fontWeight: 800, margin: '0 0 10px 0' }}>
                  {displayWhatsappNumber}
                </p>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 18px 0' }}>
                  Jalur komunikasi paling cepat dan praktis untuk konsultasi brief, negosiasi harga komisi, voice note konsep, dan order instan.
                </p>

                {/* Micro Perks */}
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
                  {[
                    'Respon paling cepat & interaktif',
                    'Bisa kirim voice note & revisi instan',
                    'Dukungan format invoice & receipt digital',
                  ].map((perk, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem' }}>
                      <CheckCircle2 size={13} style={{ color: '#25D366', flexShrink: 0 }} />
                      <span style={{ color: 'var(--text-primary)' }}>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <a
                  href={siteConfig.contact?.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    playSoundEffect?.('click');
                    triggerConfetti();
                  }}
                  className="btn hover-lift"
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    background: '#1E9E4B',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '0.86rem',
                    padding: '12px 18px',
                    borderRadius: '12px',
                    gap: '8px',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <MessageCircle size={16} />
                  <span>Chat via WhatsApp</span>
                  <ArrowUpRight size={16} />
                </a>

                <button
                  type="button"
                  onClick={() => copyToClipboard(displayWhatsappNumber, 'card-wa', 'Nomor WhatsApp')}
                  className="btn btn-glass hover-lift"
                  style={{ padding: '12px 14px' }}
                  title="Salin Nomor WhatsApp"
                >
                  {copiedKey === 'card-wa' ? <Check size={16} style={{ color: '#10B981' }} /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* Card 2: Telegram Lounge */}
            <div
              className="glass-card hover-lift"
              style={{
                padding: '28px 24px',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '2px solid rgba(34, 158, 217, 0.45)',
                background: 'var(--bg-surface)',
                boxShadow: '0 8px 24px rgba(34, 158, 217, 0.12)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: '#0088CC',
                }}
              />

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '16px',
                      background: 'rgba(34, 158, 217, 0.15)',
                      color: '#229ED9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1.5px solid rgba(34, 158, 217, 0.35)',
                    }}
                  >
                    <TelegramIcon size={28} />
                  </div>
                  <span className="badge" style={{ background: 'rgba(34, 158, 217, 0.15)', color: '#229ED9', fontWeight: 800, fontSize: '0.72rem' }}>
                    ☁️ File Asli 4K
                  </span>
                </div>

                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Cloud Hub &amp; File Besar
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: '4px 0 6px 0', color: 'var(--text-primary)' }}>
                  Telegram Lounge
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#229ED9', fontWeight: 800, margin: '0 0 10px 0' }}>
                  {displayTelegramHandle}
                </p>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 18px 0' }}>
                  Ideal untuk transfer file mentahan project Alight Motion/After Effects ukuran gigabyte tanpa terkompresi, serta proposal kerja sama agensi.
                </p>

                {/* Micro Perks */}
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
                  {[
                    'Kirim file project hingga 2GB tanpa kompresi',
                    'Penyimpanan cloud aman tanpa batasan waktu',
                    'Diskusi teknis asset 3D & XML preset',
                  ].map((perk, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem' }}>
                      <CheckCircle2 size={13} style={{ color: '#229ED9', flexShrink: 0 }} />
                      <span style={{ color: 'var(--text-primary)' }}>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <a
                  href={siteConfig.contact?.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSoundEffect?.('click')}
                  className="btn hover-lift"
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    background: '#0088CC',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '0.86rem',
                    padding: '12px 18px',
                    borderRadius: '12px',
                    gap: '8px',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <Send size={16} />
                  <span>Message on Telegram</span>
                  <ArrowUpRight size={16} />
                </a>

                <button
                  type="button"
                  onClick={() => copyToClipboard(displayTelegramHandle, 'card-tg', 'Handle Telegram')}
                  className="btn btn-glass hover-lift"
                  style={{ padding: '12px 14px' }}
                  title="Salin Handle Telegram"
                >
                  {copiedKey === 'card-tg' ? <Check size={16} style={{ color: '#10B981' }} /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* Card 3: Email Formal Inquiry */}
            <div
              className="glass-card hover-lift"
              style={{
                padding: '28px 24px',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '2px solid rgba(234, 67, 53, 0.45)',
                background: 'var(--bg-surface)',
                boxShadow: '0 8px 24px rgba(234, 67, 53, 0.12)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: '#C5221F',
                }}
              />

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '16px',
                      background: 'rgba(234, 67, 53, 0.15)',
                      color: '#EA4335',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1.5px solid rgba(234, 67, 53, 0.35)',
                    }}
                  >
                    <Mail size={26} />
                  </div>
                  <span className="badge" style={{ background: 'rgba(234, 67, 53, 0.15)', color: '#EA4335', fontWeight: 800, fontSize: '0.72rem' }}>
                    📋 Formal &amp; Bisnis
                  </span>
                </div>

                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Kerjasama &amp; Sponsorship
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: '4px 0 6px 0', color: 'var(--text-primary)' }}>
                  Official Email Inquiry
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#EA4335', fontWeight: 800, margin: '0 0 10px 0' }}>
                  {displayEmail}
                </p>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 18px 0' }}>
                  Saluran resmi untuk pengajuan proposal kerja sama agensi, penawaran sponsorship konten, penandatanganan NDA, dan korespondensi korporat.
                </p>

                {/* Micro Perks */}
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
                  {[
                    'Dokumentasi resmi perjanjian & kontrak',
                    'Dukungan lampiran proposal PDF & brief lengkap',
                    'Respon terstruktur dalam 1x24 jam kerja',
                  ].map((perk, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem' }}>
                      <CheckCircle2 size={13} style={{ color: '#EA4335', flexShrink: 0 }} />
                      <span style={{ color: 'var(--text-primary)' }}>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <a
                  href={`mailto:${displayEmail}`}
                  onClick={() => playSoundEffect?.('click')}
                  className="btn hover-lift"
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    background: '#C5221F',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '0.86rem',
                    padding: '12px 18px',
                    borderRadius: '12px',
                    gap: '8px',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <Mail size={16} />
                  <span>Kirim Email Resmi</span>
                  <ArrowUpRight size={16} />
                </a>

                <button
                  type="button"
                  onClick={() => copyToClipboard(displayEmail, 'card-email', 'Alamat Email')}
                  className="btn btn-glass hover-lift"
                  style={{ padding: '12px 14px' }}
                  title="Salin Alamat Email"
                >
                  {copiedKey === 'card-email' ? <Check size={16} style={{ color: '#10B981' }} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. OPERATING HOURS & 4-STEP COLLABORATION WORKFLOW */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px' }}>
          {/* Left: Schedule & Location Card */}
          <div
            className="glass-card hover-lift"
            style={{
              padding: '26px 24px',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Clock size={20} className="text-orange" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)' }}>
                  Jadwal Studio &amp; Lokasi
                </h3>
              </div>
              <p style={{ fontSize: '0.80rem', color: 'var(--text-muted)', margin: '0 0 16px 0' }}>
                Waktu aktif layanan konsultasi dan penerimaan brief komisi harian.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: 'Jam Operasional Aktif', val: '09:00 – 22:00 WIB', hl: '#10B981' },
                  { label: 'Hari Layanan', val: 'Senin – Minggu (Setiap Hari)', hl: 'var(--text-primary)' },
                  { label: 'Lokasi Studio', val: 'Sidoarjo, Jawa Timur (GMT+7)', hl: 'var(--text-primary)' },
                  { label: 'Status Komisi', val: 'Konsultasi & Brief Terbuka', hl: 'var(--color-orange)' },
                ].map((row, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      background: 'var(--bg-surface-elevated)',
                      borderRadius: '10px',
                      border: '1px solid var(--border-medium)',
                      fontSize: '0.80rem',
                    }}
                  >
                    <span style={{ color: 'var(--text-secondary)' }}>{row.label}</span>
                    <span style={{ fontWeight: 800, color: row.hl }}>{row.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                lineHeight: 1.45,
                background: 'rgba(255, 156, 15, 0.08)',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 156, 15, 0.2)',
              }}
            >
              * Pesan yang masuk di luar jam kerja (setelah 22:00 WIB) akan dibalas di urutan pertama pada pagi hari berikutnya.
            </div>
          </div>

          {/* Right: 4-Step Collaboration Workflow */}
          <div
            className="glass-card hover-lift"
            style={{
              padding: '26px 24px',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={20} className="text-orange" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)' }}>
                  Alur Kerjasama Profesional (4 Langkah)
                </h3>
              </div>
              <span className="badge badge-orange" style={{ fontSize: '0.70rem' }}>Workflow Efisien</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {[
                { step: '01', title: 'Kirim Brief & Referensi', desc: 'Sampaikan ide, referensi video, dan materi aset yang Anda miliki melalui WhatsApp/Telegram.' },
                { step: '02', title: 'Diskusi & Penawaran', desc: 'Kami berikan estimasi harga transparan, opsi resolusi 60fps/4K, dan estimasi deadline pengerjaan.' },
                { step: '03', title: 'Produksi & Preview Revisi', desc: 'Proses editing berjalan dengan update berkala serta preview draft untuk revisi sesuai kesepakatan.' },
                { step: '04', title: 'Final Delivery Master File', desc: 'Pengiriman master file kualitas tertinggi (Google Drive/Telegram) tanpa watermark setelah final.' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-surface-elevated)',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: '1.5px solid var(--border-medium)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 900, color: 'var(--color-orange)', letterSpacing: '0.05em' }}>
                      LANGKAH {item.step}
                    </span>
                    <CheckCircle2 size={15} style={{ color: 'var(--color-orange)' }} />
                  </div>
                  <h4 style={{ fontSize: '0.86rem', fontWeight: 800, margin: '2px 0 0 0', color: 'var(--text-primary)' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. SOCIAL MEDIA QUICK CONNECT GRID */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} className="text-orange" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)' }}>
                Jejaring Sosial &amp; Portofolio Kreatif
              </h3>
            </div>
            <span className="badge badge-glass" style={{ fontSize: '0.72rem' }}>Ikuti Update Karya Terbaru</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px' }}>
            {socialList.map((soc, idx) => {
              const Icon = soc.icon;
              return (
                <a
                  key={idx}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSoundEffect?.('click')}
                  className="glass-card hover-lift"
                  style={{
                    padding: '18px 16px',
                    borderRadius: '16px',
                    background: 'var(--bg-surface)',
                    border: `1.5px solid ${soc.color}40`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '12px',
                    textDecoration: 'none',
                    boxShadow: `0 4px 16px ${soc.color}10`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '12px',
                        background: `${soc.color}18`,
                        color: soc.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <ArrowUpRight size={16} style={{ color: 'var(--text-muted)' }} />
                  </div>

                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2px' }}>
                      {soc.name}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: soc.color, fontWeight: 700, marginBottom: '6px' }}>
                      {soc.handle}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
                      {soc.tagline}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* 5. FAQ ACCORDION SECTION */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <HelpCircle size={22} className="text-orange" />
            <div>
              <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 900, color: 'var(--text-primary)' }}>
                Pertanyaan Umum Seputar Kontak &amp; Pemesanan (FAQ)
              </h3>
              <p style={{ fontSize: '0.80rem', color: 'var(--text-muted)', margin: 0 }}>
                Informasi penting yang sering ditanyakan sebelum memulai kolaborasi.
              </p>
            </div>
          </div>
          <ContactFAQ />
        </div>

      </div>
    </WindowFrame>
  );
};
