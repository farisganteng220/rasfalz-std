import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { WindowFrame } from '../components/common/WindowFrame';
import { useOS } from '../context/OSContext';
import { useAudio } from '../context/AudioContext';
import { DecorativeBackground } from '../components/common/DecorativeBackground';
import {
  Users,
  MessageCircle,
  Send,
  Sparkles,
  CheckCircle2,
  Share2,
  Radio,
  MessagesSquare,
  Copy,
  Check,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  ArrowUpRight,
  Filter,
  ExternalLink,
  Flame,
  Clock,
  Compass,
  Search,
  FolderArchive,
  Zap,
  X,
} from 'lucide-react';

/* ────────────────────────────────────────────
   COMMUNITY FAQ ACCORDION
──────────────────────────────────────────── */
const CommunityFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Apa perbedaan antara Grup Diskusi dan Saluran Channel?',
      a: 'Grup Diskusi (WhatsApp & Telegram) adalah forum interaktif 2 arah tempat semua member bisa mengobrol, bertanya seputar software editing, mengirim karya untuk direview, dan berdiskusi santai. Sedangkan Saluran Channel (WhatsApp & Telegram) adalah siaran 1 arah khusus pengumuman rilis preset, mentahan gratis, info jadwal komisi, dan update konten tanpa notifikasi obrolan yang menumpuk.',
    },
    {
      q: 'Apakah bergabung ke komunitas dan download preset di channel berbayar?',
      a: '100% Gratis! Seluruh grup diskusi dan channel resource dibuka secara cuma-cuma untuk seluruh kreator, editor video, animator, dan desainer grafis dari berbagai tingkatan (pemula hingga pro).',
    },
    {
      q: 'Aplikasi editing apa saja yang sering dibahas di dalam komunitas?',
      a: 'Komunitas Rasfalz Studio aktif membahas Alight Motion (AM), CapCut, Adobe Premiere Pro, After Effects, Photoshop, Illustrator, Pixellab, hingga tips workflow mobile & PC editing.',
    },
    {
      q: 'Bagaimana jika tautan grup WhatsApp penuh?',
      a: 'Jika grup WhatsApp mencapai batas kapasitas maksimal, Anda bisa langsung bergabung ke Grup Telegram kami yang memiliki kapasitas lebih besar, atau hubungi admin via WhatsApp untuk mendapatkan link batch grup berikutnya.',
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
   MAIN COMMUNITY PAGE
──────────────────────────────────────────── */
export const CommunityPage = () => {
  const { isMobile, addToast } = useOS();
  const { playSoundEffect } = useAudio();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const communities = siteConfig.communities || [];

  const handleCopyLink = (item) => {
    playSoundEffect?.('click');
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    addToast?.('Tautan Disalin! 📋', `Link ${item.name} berhasil disalin ke clipboard.`, 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleShare = async (item) => {
    playSoundEffect?.('click');
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.name,
          text: `${item.name} - Komunitas Kreator Rasfalz Studio: ${item.tagline}`,
          url: item.url,
        });
        return;
      } catch (e) {
        // Fallback to copy
      }
    }
    handleCopyLink(item);
  };

  const filteredCommunities = communities.filter((item) => {
    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'wa' && item.platform.toLowerCase().includes('whatsapp')) ||
      (selectedFilter === 'tg' && item.platform.toLowerCase().includes('telegram')) ||
      (selectedFilter === 'group' && item.type === 'group') ||
      (selectedFilter === 'channel' && item.type === 'channel');

    if (!matchesFilter) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.tagline.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.platform.toLowerCase().includes(q) ||
      (item.perks && item.perks.some((p) => p.toLowerCase().includes(q)))
    );
  });

  const filterTabs = [
    { id: 'all', label: 'Semua Komunitas', count: communities.length, icon: Compass },
    { id: 'wa', label: 'WhatsApp', count: communities.filter((c) => c.platform === 'WhatsApp').length, icon: MessageCircle },
    { id: 'tg', label: 'Telegram', count: communities.filter((c) => c.platform === 'Telegram').length, icon: Send },
    { id: 'group', label: 'Grup Diskusi', count: communities.filter((c) => c.type === 'group').length, icon: MessagesSquare },
    { id: 'channel', label: 'Channel Siaran', count: communities.filter((c) => c.type === 'channel').length, icon: Radio },
  ];

  // ==========================================
  // MOBILE VIEW
  // ==========================================
  if (isMobile) {
    return (
      <WindowFrame
        title="Komunitas Kreator"
        icon={Users}
        badgeText="Rasfalz Studio"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '4px 0 28px 0' }}>

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
                ✦ Creative Creator Network
              </span>
              <span className="badge badge-green" style={{ fontSize: '0.64rem', padding: '3px 8px' }}>
                ✓ 100% Free to Join
              </span>
            </div>

            <div>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 900, margin: '0 0 6px 0', color: 'var(--text-primary)', lineHeight: 1.25 }}>
                Komunitas &amp; <span className="text-gradient">Pusat Kreatif</span>
              </h1>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                Tempat berkumpulnya editor video, motion designer, dan kreator visual. Tersedia grup diskusi interaktif dan saluran resource eksklusif di WhatsApp &amp; Telegram.
              </p>
            </div>

            {/* Micro Stats Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginTop: '2px' }}>
              {[
                { val: '200+', label: 'Total Member' },
                { val: '2 Grup', label: 'Diskusi Interaktif' },
                { val: '2 Channel', label: 'Resource Siaran' },
                { val: '100%', label: 'Akses Gratis' },
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
                  <div style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--color-orange)' }}>
                    {s.val}
                  </div>
                  <div style={{ fontSize: '0.58rem', fontWeight: 700, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Filter Category Pills */}
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
            {filterTabs.map((tab) => {
              const active = selectedFilter === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedFilter(tab.id);
                    playSoundEffect?.('click');
                  }}
                  className={`filter-pill ${active ? 'active' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 12px',
                    fontSize: '0.76rem',
                    borderRadius: 'var(--radius-pill)',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={13} />
                  <span>{tab.label}</span>
                  <span style={{ opacity: 0.8, fontSize: '0.68rem' }}>({tab.count})</span>
                </button>
              );
            })}
          </div>

          {/* 3. Community Cards Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredCommunities.map((item) => {
              const isWa = item.platform === 'WhatsApp';
              const brandColor = isWa ? '#25D366' : '#229ED9';
              const isGroup = item.type === 'group';
              const TypeIcon = isGroup ? MessagesSquare : Radio;

              return (
                <div
                  key={item.id}
                  className="glass-card btn-press"
                  style={{
                    borderRadius: '18px',
                    padding: '16px',
                    background: 'var(--bg-surface)',
                    border: `2px solid ${brandColor}40`,
                    boxShadow: `0 4px 18px ${brandColor}15`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  {/* Card Header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          background: brandColor,
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: 'var(--shadow-sm)',
                          flexShrink: 0,
                        }}
                      >
                        {isWa ? <MessageCircle size={22} /> : <Send size={20} />}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                          <span
                            className="badge"
                            style={{
                              background: `${brandColor}20`,
                              color: brandColor,
                              border: `1.5px solid ${brandColor}40`,
                              fontSize: '0.62rem',
                              padding: '2px 8px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <TypeIcon size={11} />
                            <span>{isGroup ? 'Grup Diskusi' : 'Saluran Siaran'}</span>
                          </span>
                          <span className="badge badge-glass" style={{ fontSize: '0.62rem', padding: '2px 8px' }}>
                            {item.membersCount}
                          </span>
                        </div>
                        <h3 style={{ fontSize: '1.02rem', fontWeight: 900, margin: '4px 0 0 0', color: 'var(--text-primary)' }}>
                          {item.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                    {item.description}
                  </p>

                  {/* Perks Checklist */}
                  <div
                    style={{
                      background: 'var(--bg-surface-elevated)',
                      borderRadius: '12px',
                      padding: '10px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    <span style={{ fontSize: '0.66rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                      Benefit Bergabung:
                    </span>
                    {item.perks.map((perk, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.74rem' }}>
                        <CheckCircle2 size={13} style={{ color: brandColor, flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ color: 'var(--text-primary)', lineHeight: 1.35 }}>{perk}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm hover-lift"
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        background: brandColor,
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        padding: '10px 14px',
                        gap: '6px',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    >
                      <span>{item.buttonText}</span>
                      <ArrowUpRight size={14} />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopyLink(item)}
                      className="btn btn-glass btn-sm"
                      style={{ padding: '10px 12px', fontSize: '0.76rem' }}
                      title="Salin Tautan Undangan"
                    >
                      {copiedId === item.id ? <Check size={14} style={{ color: '#10B981' }} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4. Mobile Rules Section */}
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
              <ShieldCheck size={18} className="text-orange" />
              <div>
                <h3 style={{ fontSize: '1.05rem', margin: 0, fontWeight: 900, color: 'var(--text-primary)' }}>
                  Aturan &amp; Etika Komunitas
                </h3>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>
                  Menjaga ruang belajar dan diskusi tetap nyaman, kondusif, dan produktif.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { emoji: '🤝', title: 'Saling Menghargai', desc: 'Beri kritik dan feedback karya yang sopan dan membangun.' },
                { emoji: '🚫', title: 'Bebas Spam & Scam', desc: 'Dilarang promosi liar, spam bot, atau share link mencurigakan.' },
                { emoji: '💡', title: 'Budaya Berbagi', desc: 'Terbuka membagikan tutorial, preset, dan shortcut editing.' },
                { emoji: '🎯', title: 'Fokus Kreativitas', desc: 'Gunakan ruang chat untuk belajar dan kolaborasi project visual.' },
              ].map((rule, idx) => (
                <div
                  key={idx}
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
                  <div style={{ fontSize: '1.25rem' }}>{rule.emoji}</div>
                  <h4 style={{ fontSize: '0.80rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                    {rule.title}
                  </h4>
                  <p style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', lineHeight: 1.35, margin: 0 }}>
                    {rule.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Mobile FAQ Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircle size={18} className="text-orange" />
              <h3 style={{ fontSize: '1.05rem', margin: 0, fontWeight: 900, color: 'var(--text-primary)' }}>
                Tanya Jawab Komunitas (FAQ)
              </h3>
            </div>
            <CommunityFAQ />
          </div>

          {/* 6. Admin Contact Support Banner */}
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
                HUBUNGI ADMIN
              </span>
              <h4 style={{ fontSize: '0.94rem', fontWeight: 800, margin: '2px 0', color: 'var(--text-primary)' }}>
                Mengalami Kendala Join atau Ingin Kolaborasi?
              </h4>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                Jika link grup error atau ingin mengajukan kerjasama komunitas / sponsorship, silakan chat langsung Raihan.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary-orange btn-sm"
                style={{ flex: 1, justifyContent: 'center', padding: '8px 12px', fontSize: '0.78rem', gap: '6px' }}
              >
                <MessageCircle size={14} />
                <span>Chat WhatsApp Admin</span>
              </a>
              <a
                href={siteConfig.contact.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary-blue btn-sm"
                style={{ flex: 1, justifyContent: 'center', padding: '8px 12px', fontSize: '0.78rem', gap: '6px' }}
              >
                <Send size={14} />
                <span>Chat Telegram</span>
              </a>
            </div>
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
      title="Creative Creator Community Hub"
      icon={Users}
      badgeText="WhatsApp & Telegram Network"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '20px' }}>

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
          <DecorativeBackground isMobile={false} scheme="mixed" />
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
                  Rasfalz Creative Community Hub
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
                  4 Komunitas Aktif &amp; Terverifikasi
                </span>
                <span className="badge badge-glass" style={{ fontSize: '0.72rem', padding: '4px 10px' }}>
                  ✓ 100% Akses Gratis
                </span>
              </div>

              <h1 style={{ fontSize: '2.3rem', fontWeight: 900, margin: '0 0 12px 0', lineHeight: 1.2 }}>
                Pusat Komunitas &amp; Jejaring Kreatif{' '}
                <span className="text-gradient">Rasfalz Studio</span>
              </h1>

              <p style={{ margin: '0 0 22px 0', fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                Wadah berkumpulnya para editor video, animator 3D, dan desainer visual di seluruh nusantara. Bergabunglah ke{' '}
                <strong style={{ color: 'var(--text-primary)' }}>Grup Diskusi Interaktif</strong> untuk saling sharing tips dan bedah karya, serta ikuti{' '}
                <strong style={{ color: 'var(--text-primary)' }}>Saluran Siaran Resource</strong> untuk download mentahan dan preset gratis tanpa ribet.
              </p>

              {/* Quick Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href="#community-list"
                  className="btn btn-primary-orange hover-lift"
                  style={{ padding: '10px 18px', fontSize: '0.85rem', gap: '8px' }}
                >
                  <Compass size={16} />
                  <span>Jelajahi Saluran Komunitas</span>
                </a>
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-glass hover-lift"
                  style={{ padding: '10px 16px', fontSize: '0.85rem', gap: '8px' }}
                >
                  <MessageCircle size={16} className="text-orange" />
                  <span>Tanya Admin Komunitas</span>
                </a>
              </div>
            </div>

            {/* Right Column: 4 Bento Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {[
                { val: '200+', label: 'Total Member Aktif', sub: 'Tersebar di WA & TG', color: 'var(--color-orange)', icon: Users },
                { val: '2 Grup', label: 'Diskusi 2-Arah', sub: 'Tanya jawab & sharing', color: '#25D366', icon: MessagesSquare },
                { val: '2 Channel', label: 'Resource Siaran', sub: 'Preset & Mentahan 4K', color: '#229ED9', icon: Radio },
                { val: '100%', label: 'Akses Gratis', sub: 'Tanpa biaya keanggotaan', color: '#10B981', icon: Sparkles },
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

        {/* 2. FILTER CONTROLS & LIVE SEARCH BAR */}
        <div
          id="community-list"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
            padding: '4px 0',
          }}
        >
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {filterTabs.map((tab) => {
              const active = selectedFilter === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setSelectedFilter(tab.id);
                    playSoundEffect?.('click');
                  }}
                  className="btn-press hover-lift"
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: active ? '2px solid var(--btn-orange-border, #BA5400)' : '2px solid var(--border-medium)',
                    background: active ? 'var(--btn-orange-bg, #D46200)' : 'var(--bg-surface)',
                    color: active ? '#fff' : 'var(--text-secondary)',
                    transition: 'all 0.18s ease',
                    fontFamily: 'var(--font-primary)',
                    boxShadow: active ? 'var(--shadow-sm)' : 'none',
                  }}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      background: active ? 'rgba(255,255,255,0.25)' : 'var(--bg-surface-elevated)',
                      color: active ? '#fff' : 'var(--text-muted)',
                      padding: '1px 7px',
                      borderRadius: '10px',
                      fontWeight: 700,
                    }}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search input & dynamic counter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Search
                size={15}
                style={{
                  position: 'absolute',
                  left: '12px',
                  color: 'var(--text-muted)',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="text"
                placeholder="Cari komunitas, preset, grup..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '8px 34px 8px 34px',
                  borderRadius: 'var(--radius-pill)',
                  border: '2px solid var(--border-medium)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  fontSize: '0.80rem',
                  fontFamily: 'var(--font-primary)',
                  outline: 'none',
                  width: '240px',
                  transition: 'all 0.2s ease',
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    color: 'var(--text-muted)',
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              Menampilkan <strong>{filteredCommunities.length}</strong> Komunitas
            </div>
          </div>
        </div>

        {/* 3. 2x2 COMMUNITY CARDS GRID */}
        {filteredCommunities.length === 0 ? (
          <div
            className="glass-card"
            style={{
              padding: '48px 24px',
              textAlign: 'center',
              borderRadius: '20px',
              border: '2px dashed var(--border-medium)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'var(--color-orange-subtle)',
                color: 'var(--color-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Search size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)' }}>
              Komunitas Tidak Ditemukan
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: 0, maxWidth: '420px' }}>
              Tidak ada grup atau channel yang cocok dengan kata kunci "{searchQuery}". Coba gunakan istilah pencarian lain.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
              }}
              className="btn btn-primary-orange btn-sm"
              style={{ marginTop: '8px' }}
            >
              Reset Pencarian &amp; Filter
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
              gap: '24px',
            }}
          >
            {filteredCommunities.map((item) => {
              const isWa = item.platform === 'WhatsApp';
              const brandColor = isWa ? '#25D366' : '#229ED9';
              const isGroup = item.type === 'group';
              const TypeIcon = isGroup ? MessagesSquare : Radio;

              return (
                <div
                  key={item.id}
                  className="glass-card hover-lift"
                  style={{
                    padding: '28px 30px',
                    borderRadius: 'var(--radius-xl)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: `2px solid ${brandColor}45`,
                    background: 'var(--bg-surface)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Top Glowing Brand Accent Line */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: brandColor,
                    }}
                  />

                  <div>
                    {/* Card Header Top */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div
                          style={{
                            width: '54px',
                            height: '54px',
                            borderRadius: '16px',
                            background: brandColor,
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: 'var(--shadow-sm)',
                            flexShrink: 0,
                          }}
                        >
                          {isWa ? <MessageCircle size={28} /> : <Send size={26} />}
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                            <span
                              className="badge"
                              style={{
                                background: `${brandColor}20`,
                                color: brandColor,
                                border: `1.5px solid ${brandColor}40`,
                                fontSize: '0.68rem',
                                padding: '2px 10px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                fontWeight: 800,
                              }}
                            >
                              <TypeIcon size={12} />
                              <span>{isGroup ? 'Grup Diskusi (2-Arah)' : 'Saluran Channel (Siaran)'}</span>
                            </span>
                            <span className="badge badge-glass" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                              {item.platform}
                            </span>
                          </div>
                          <h2 style={{ fontSize: '1.28rem', fontWeight: 900, margin: '6px 0 0 0', color: 'var(--text-primary)' }}>
                            {item.name}
                          </h2>
                        </div>
                      </div>

                      <span
                        className="badge"
                        style={{
                          background: 'var(--bg-surface-elevated)',
                          color: brandColor,
                          border: '1.5px solid var(--border-medium)',
                          fontSize: '0.74rem',
                          fontWeight: 800,
                          padding: '4px 10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <Users size={12} />
                        <span>{item.membersCount}</span>
                      </span>
                    </div>

                    {/* Subtitle / Tagline */}
                    <div
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        color: 'var(--color-orange)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Sparkles size={12} />
                      <span>{item.tagline}</span>
                    </div>

                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 18px 0' }}>
                      {item.description}
                    </p>

                    {/* Perks Checklist */}
                    <div
                      style={{
                        background: 'var(--bg-surface-elevated)',
                        borderRadius: '14px',
                        padding: '14px 16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        marginBottom: '22px',
                        border: '1.5px solid var(--border-medium)',
                      }}
                    >
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                        Keuntungan &amp; Fasilitas Bergabung:
                      </span>
                      {item.perks.map((perk, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}>
                          <CheckCircle2 size={15} style={{ color: brandColor, flexShrink: 0 }} />
                          <span style={{ color: 'var(--text-primary)', lineHeight: 1.4 }}>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Buttons */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn hover-lift"
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        background: brandColor,
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: '0.88rem',
                        padding: '12px 18px',
                        borderRadius: '12px',
                        gap: '8px',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    >
                      <span>{item.buttonText}</span>
                      <ArrowUpRight size={16} />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopyLink(item)}
                      className="btn btn-glass hover-lift"
                      style={{ padding: '12px 16px', fontSize: '0.84rem' }}
                      title="Salin Tautan Undangan"
                    >
                      {copiedId === item.id ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontWeight: 800 }}>
                          <Check size={16} />
                          <span>Tersalin!</span>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Copy size={16} />
                          <span>Salin Link</span>
                        </div>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleShare(item)}
                      className="btn btn-glass hover-lift"
                      style={{ padding: '12px 14px' }}
                      title="Bagikan Komunitas"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 4. VALUE PILLARS (Mengapa Bergabung di Komunitas Rasfalz) */}
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
                }}
              >
                <Sparkles size={22} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.35rem', margin: 0, fontWeight: 900, color: 'var(--text-primary)' }}>
                  Aktivitas &amp; Keuntungan Eksklusif Member
                </h2>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                  Manfaat nyata yang Anda dapatkan saat aktif dalam ekosistem kreatif Rasfalz Studio.
                </p>
              </div>
            </div>

            <span className="badge badge-orange" style={{ fontSize: '0.72rem' }}>
              ✨ 100% Free Resources
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {[
              {
                icon: FolderArchive,
                title: 'Preset & Mentahan Asli 4K',
                desc: 'Download langsung file XML Alight Motion, mentahan 3D Blender, sound effect, dan overlay AMV original tanpa watermark.',
                color: 'var(--color-orange)',
              },
              {
                icon: MessageCircle,
                title: 'Kritik & Review Karya',
                desc: 'Ruang apresiasi karya untuk pemula hingga expert dengan feedback membangun langsung dari tim dan sesama video editor.',
                color: '#25D366',
              },
              {
                icon: Users,
                title: 'Jejaring Kolaborasi Kreator',
                desc: 'Temukan partner kolaborasi multi-editor project AMV, project desain poster GFX, serta memperluas koneksi freelance.',
                color: '#229ED9',
              },
              {
                icon: Zap,
                title: 'Update Tercepat & Slot Komisi',
                desc: 'Dapatkan notifikasi pertama saat slot komisi video editing dibuka, penawaran diskon, dan rilis aset eksklusif.',
                color: '#F59E0B',
              },
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
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
                      background: `${pillar.color}15`,
                      color: pillar.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                    {pillar.title}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. COMMUNITY RULES & CODE OF CONDUCT */}
        <div
          className="glass-card"
          style={{
            padding: '32px 36px',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--bg-surface)',
            border: '2px solid var(--border-medium)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
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
                Aturan &amp; Etika Komunitas Rasfalz Studio
              </h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                Panduan bersama untuk menjaga ekosistem komunitas tetap sehat, saling menghargai, dan berfaedah.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {[
              {
                num: '01',
                emoji: '🤝',
                title: 'Saling Menghargai & Beradab',
                desc: 'Hargai setiap karya yang dibagikan anggota, baik pemula maupun mahir. Berikan feedback dan masukan yang konstruktif dan sopan.',
              },
              {
                num: '02',
                emoji: '🚫',
                title: 'Bebas Spam & Konten Liar',
                desc: 'Dilarang membagikan konten SARA, ujaran kebencian, link scam/phishing, serta promosi produk tanpa izin resmi dari moderator.',
              },
              {
                num: '03',
                emoji: '💡',
                title: 'Budaya Berbagi & Edukasi',
                desc: 'Bagikan pengalaman, tutorial singkat, preset, serta materi referensi gratis demi kemajuan bersama sesama kreator digital.',
              },
              {
                num: '04',
                emoji: '🎯',
                title: 'Kolaborasi & Silaturahmi Positif',
                desc: 'Jadikan grup sebagai jembatan untuk mencari rekan project kreatif, partner kolaborasi AMV/GFX, dan memperluas relasi profesional.',
              },
            ].map((rule, idx) => (
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
                  gap: '8px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '1.6rem' }}>{rule.emoji}</span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 900,
                      color: 'var(--color-orange)',
                      background: 'var(--color-orange-subtle)',
                      padding: '2px 8px',
                      borderRadius: '8px',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    RULE {rule.num}
                  </span>
                </div>
                <h4 style={{ fontSize: '0.96rem', fontWeight: 800, margin: '4px 0 0 0', color: 'var(--text-primary)' }}>
                  {rule.title}
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. FAQ SECTION */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <HelpCircle size={22} className="text-orange" />
            <h2 style={{ fontSize: '1.35rem', margin: 0, fontWeight: 900 }}>
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
          </div>
          <CommunityFAQ />
        </div>

        {/* 7. DIRECT ADMIN VIP CONTACT & PARTNERSHIP BANNER */}
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
                ADMIN SUPPORT &amp; PARTNERSHIP
              </span>
              <span className="badge badge-glass" style={{ fontSize: '0.68rem', padding: '3px 8px' }}>
                ⚡ Fast Response
              </span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, margin: '4px 0 6px 0', color: 'var(--text-primary)' }}>
              Butuh Bantuan Akses Komunitas atau Tertarik Kerjasama?
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
              Jika link grup penuh, error, atau Anda ingin mengajukan proposal kolaborasi komunitas / sponsorship, hubungi Raihan secara langsung.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary-orange hover-lift"
              style={{ padding: '12px 22px', fontSize: '0.88rem', gap: '8px' }}
            >
              <MessageCircle size={18} />
              <span>Chat WhatsApp Admin</span>
            </a>
            <a
              href={siteConfig.contact.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary-blue hover-lift"
              style={{ padding: '12px 22px', fontSize: '0.88rem', gap: '8px' }}
            >
              <Send size={18} />
              <span>Chat Telegram Admin</span>
            </a>
          </div>
        </div>

      </div>
    </WindowFrame>
  );
};
