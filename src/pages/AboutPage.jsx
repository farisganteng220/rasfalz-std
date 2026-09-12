import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { WindowFrame } from '../components/common/WindowFrame';
import { useOS } from '../context/OSContext';
import {
  InstagramIcon,
  YoutubeIcon,
  TikTokIcon,
  FacebookIcon,
  GoogleDriveIcon,
} from '../components/common/BrandIcons';
import {
  User,
  Sparkles,
  Award,
  Clock,
  Layers,
  CheckCircle2,
  Send,
  Code2,
  Flame,
  Star,
  MapPin,
  Briefcase,
  FolderGit2,
  HeartHandshake,
  Zap,
  Check,
  Globe,
  Share2,
  ExternalLink,
  FileText,
  Copy,
  Download,
  ShieldCheck,
  HardDrive,
  FileCheck,
  Film,
  Image,
  Box,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   CV / RESUME PROJECT CARD COMPONENT (GOOGLE DRIVE INTEGRATION)
   High-craft project card element showcasing the creator's official CV document
   with direct cloud access, credential telemetry, and copy-link triggers.
───────────────────────────────────────────────────────────────────────────── */
const CvProjectCard = ({ isMobile = false }) => {
  const [copied, setCopied] = useState(false);
  const cv = siteConfig.profile.cvDocument || {
    title: "Curriculum Vitae (CV) — Raihan Salman Alfarisy",
    subtitle: "Motion Designer • Graphic Designer • Video Editor",
    badge: "Official Resume 2026",
    format: "PDF Document (Interactive)",
    fileSize: "4.8 MB",
    lastUpdated: "September 2026",
    version: "v4.2 (Verified Edition)",
    driveUrl: siteConfig.profile.cvUrl || "https://drive.google.com",
    status: "Verified by Rasfalz Studio",
    highlights: [
      "10+ Tahun Pengalaman Desain Grafis, Animasi & Video",
      "1000+ Proyek Kreatif Visual Selesai & Berbayar",
      "Expertise: After Effects, Premiere Pro, Blender 3D, Photoshop",
      "Track Record Kolaborasi Bersama Klien & Komunitas Digital",
    ],
    description: "Dokumen resmi Curriculum Vitae (CV) lengkap Raihan Salman Alfarisy. Memuat riwayat kerja profesional, keahlian teknis perangkat lunak, daftar proyek komersial, dan kontak resmi.",
  };

  const handleCopyLink = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(cv.driveUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  if (isMobile) {
    return (
      <div
        className="glass-card"
        style={{
          padding: '18px 16px',
          borderRadius: 'var(--radius-xl)',
          background: 'var(--bg-surface)',
          border: '2px solid var(--border-medium)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top Badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 10px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(38, 132, 252, 0.12)',
              border: '1.5px solid rgba(38, 132, 252, 0.35)',
              fontSize: '0.7rem',
              fontWeight: 800,
              color: '#2684FC',
            }}
          >
            <GoogleDriveIcon size={14} />
            <span>Google Drive Storage</span>
          </div>

          <span
            className="badge badge-orange"
            style={{ fontSize: '0.66rem', padding: '2px 8px' }}
          >
            {cv.format}
          </span>
        </div>

        {/* Document Title & Subtitle */}
        <div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 156, 15, 0.15)',
                border: '2px solid rgba(255, 156, 15, 0.35)',
                color: 'var(--color-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px',
              }}
            >
              <FileText size={22} />
            </div>

            <div style={{ minWidth: 0 }}>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 800, margin: '0 0 3px 0', color: 'var(--text-primary)', lineHeight: 1.3 }}>
                {cv.title}
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-orange)', fontWeight: 700, margin: '0 0 6px 0' }}>
                {cv.subtitle}
              </p>
            </div>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '8px 0 0 0' }}>
            {cv.description}
          </p>
        </div>

        {/* Highlights Chips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {cv.highlights.map((h, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 10px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface-elevated)',
                border: '1.5px solid var(--border-subtle)',
                fontSize: '0.74rem',
                color: 'var(--text-primary)',
              }}
            >
              <CheckCircle2 size={13} className="text-orange" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600 }}>{h}</span>
            </div>
          ))}
        </div>

        {/* Meta Info Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-surface-elevated)',
            border: '1.5px solid var(--border-subtle)',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            flexWrap: 'wrap',
            gap: '6px',
          }}
        >
          <span>Ukuran: <strong style={{ color: 'var(--text-primary)' }}>{cv.fileSize}</strong></span>
          <span>Versi: <strong style={{ color: 'var(--color-blue)' }}>{cv.version}</strong></span>
          <span>Update: <strong style={{ color: 'var(--text-primary)' }}>{cv.lastUpdated}</strong></span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '2px' }}>
          <a
            href={cv.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary-orange btn-sm btn-press"
            style={{
              flex: 1.3,
              padding: '10px 14px',
              fontSize: '0.82rem',
              justifyContent: 'center',
              textDecoration: 'none',
              gap: '6px',
            }}
          >
            <GoogleDriveIcon size={16} />
            <span>Buka di Drive</span>
            <ExternalLink size={13} />
          </a>

          <button
            type="button"
            onClick={handleCopyLink}
            className="btn btn-glass btn-sm btn-press"
            style={{
              flex: 1,
              padding: '10px 12px',
              fontSize: '0.8rem',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            {copied ? (
              <>
                <Check size={14} className="text-orange" />
                <span style={{ color: 'var(--color-orange)', fontWeight: 700 }}>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Salin Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // DESKTOP LAYOUT
  return (
    <div
      className="glass-card hover-lift cv-desktop-grid"
      style={{
        padding: '22px 24px',
        borderRadius: 'var(--radius-xl)',
        background: 'var(--bg-surface)',
        border: '2px solid var(--border-medium)',
        alignItems: 'stretch',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Left Column: Visual Document Preview Card */}
      <div
        style={{
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-surface-elevated)',
          border: '2px solid var(--border-medium)',
          padding: '18px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '240px',
          gap: '12px',
        }}
      >
        {/* Document Top Badge & Icon */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 156, 15, 0.16)',
                border: '2px solid rgba(255, 156, 15, 0.35)',
                color: 'var(--color-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FileText size={22} />
            </div>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 9px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(38, 132, 252, 0.15)',
                border: '1.5px solid rgba(38, 132, 252, 0.35)',
                fontSize: '0.68rem',
                fontWeight: 800,
                color: '#2684FC',
              }}
            >
              <GoogleDriveIcon size={13} />
              <span>Drive Cloud</span>
            </span>
          </div>

          <span className="badge badge-orange" style={{ fontSize: '0.66rem', padding: '2px 7px', marginBottom: '6px', display: 'inline-block' }}>
            {cv.badge}
          </span>
          <h4 style={{ fontSize: '1.02rem', fontWeight: 800, margin: '0 0 2px 0', color: 'var(--text-primary)', lineHeight: 1.25 }}>
            Curriculum Vitae
          </h4>
          <p style={{ fontSize: '0.76rem', color: 'var(--color-orange)', fontWeight: 700, margin: '0 0 10px 0' }}>
            Raihan Salman Alfarisy
          </p>
        </div>

        {/* Document Metadata Badges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-surface)',
              border: '1.5px solid var(--border-subtle)',
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
            }}
          >
            <span>Format</span>
            <strong style={{ color: 'var(--text-primary)' }}>{cv.format}</strong>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-surface)',
              border: '1.5px solid var(--border-subtle)',
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
            }}
          >
            <span>Ukuran File</span>
            <strong style={{ color: 'var(--color-orange)' }}>{cv.fileSize}</strong>
          </div>
        </div>

        {/* Document Bottom Status Seal */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '8px',
            borderTop: '1.5px solid var(--border-subtle)',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={13} className="text-orange" />
            <span>Verified Doc</span>
          </span>
          <span style={{ fontWeight: 700, color: 'var(--color-blue)' }}>{cv.version}</span>
        </div>
      </div>

      {/* Right Column: Details, Highlights & Drive Action Triggers */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '14px' }}>
        <div>
          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px', flexWrap: 'wrap', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>
                <FolderGit2 size={12} />
                Official Resume
              </span>
              <span className="badge badge-orange" style={{ fontSize: '0.7rem' }}>
                {cv.format}
              </span>
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Pembaruan: <strong style={{ color: 'var(--text-primary)' }}>{cv.lastUpdated}</strong>
            </span>
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 2px 0', color: 'var(--text-primary)' }}>
            {cv.title}
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-orange)', fontWeight: 700, margin: '0 0 8px 0' }}>
            {cv.subtitle}
          </p>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.55', margin: 0 }}>
            {cv.description}
          </p>
        </div>

        {/* 2x2 Highlights Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          {cv.highlights.map((highlight, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 11px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface-elevated)',
                border: '1.5px solid var(--border-subtle)',
                fontSize: '0.76rem',
                color: 'var(--text-primary)',
              }}
            >
              <CheckCircle2 size={13} className="text-orange" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600, lineHeight: 1.3 }}>{highlight}</span>
            </div>
          ))}
        </div>

        {/* Action Triggers Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '12px',
            borderTop: '1.5px solid var(--border-subtle)',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: '#00E676' }} />
            <span>Dokumen aktif & dapat diakses publik via Google Drive</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={handleCopyLink}
              className="btn btn-glass btn-sm hover-lift"
              style={{
                padding: '7px 13px',
                fontSize: '0.8rem',
                gap: '5px',
              }}
            >
              {copied ? (
                <>
                  <Check size={14} className="text-orange" />
                  <span style={{ color: 'var(--color-orange)', fontWeight: 700 }}>Tautan Disalin!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Salin Tautan</span>
                </>
              )}
            </button>

            <a
              href={cv.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary-orange btn-sm hover-lift"
              style={{
                padding: '7px 16px',
                fontSize: '0.82rem',
                textDecoration: 'none',
                gap: '6px',
              }}
            >
              <GoogleDriveIcon size={15} />
              <span>Buka di Google Drive</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AboutPage = () => {
  const { isMobile, openApp } = useOS();

  const socialPlatforms = [
    {
      id: 'instagram',
      name: 'Instagram',
      handle: siteConfig.socials.instagram?.handle || '@rasfalz.std',
      url: siteConfig.socials.instagram?.url || 'https://instagram.com/rasfalz.std',
      description: siteConfig.socials.instagram?.description || 'Galeri visual poster anime (GFX), micro-tips desain, foto behind the scenes & portfolio feed.',
      icon: InstagramIcon,
      accent: '#E1306C',
      solidDark: '#9D174D',
      bgGlow: 'rgba(225, 48, 108, 0.15)',
      badge: 'Visual & Gallery',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      handle: siteConfig.socials.tiktok?.handle || '@rasfalz.std',
      url: siteConfig.socials.tiktok?.url || 'https://tiktok.com/@rasfalz.std',
      description: siteConfig.socials.tiktok?.description || 'Showcase video pendek, motion graphics, jedag-jedug 3D, tutorial editing cepat & konten viral.',
      icon: TikTokIcon,
      accent: '#00F2FE',
      solidDark: '#0E7490',
      bgGlow: 'rgba(0, 242, 254, 0.15)',
      badge: 'Motion & Reels',
    },
    {
      id: 'youtube',
      name: 'YouTube',
      handle: siteConfig.socials.youtube?.handle || 'Raihan (Rasfalz Studio)',
      url: siteConfig.socials.youtube?.url || 'https://www.youtube.com/@rasfalz-std',
      description: siteConfig.socials.youtube?.description || 'Video durasi panjang, AMV/PMV sinematik, breakdown workflow editing & showcase visual karya.',
      icon: YoutubeIcon,
      accent: '#FF0000',
      solidDark: '#991B1B',
      bgGlow: 'rgba(255, 0, 0, 0.15)',
      badge: 'Long-Form',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      handle: siteConfig.socials.facebook?.handle || 'Raihan Salman Alfarisy',
      url: siteConfig.socials.facebook?.url || 'https://www.facebook.com/raihan.salmanalfarisy.397',
      description: siteConfig.socials.facebook?.description || 'Halaman resmi kreator, jejaring komunitas visual, info update preset, dan diskusi kolaborasi.',
      icon: FacebookIcon,
      accent: '#1877F2',
      solidDark: '#1D4ED8',
      bgGlow: 'rgba(24, 119, 242, 0.15)',
      badge: 'Community & Page',
    },
  ];

  // ==========================================
  // MOBILE VIEW: Android Material You / Pixel Pro Creator Deck
  // ==========================================
  if (isMobile) {
    return (
      <WindowFrame title="About Creator" icon={User} badgeText="Studio Profile">
        <style>{`
          .mobile-about-wrapper {
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding-bottom: 24px;
          }
          .mobile-section-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 12px;
          }
          .mobile-section-title {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 1.08rem;
            font-weight: 800;
            margin: 0;
            color: var(--text-primary);
          }
        `}</style>

        <div className="mobile-about-wrapper">
          {/* 1. MOBILE HERO WORKSTATION CARD */}
          <div
            className="glass-card"
            style={{
              padding: '24px 18px',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '14px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Avatar Squircle with Border */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  width: '116px',
                  height: '116px',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '3px solid var(--color-orange)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
                }}
              >
                <img
                  src={siteConfig.profile.avatar}
                  alt={siteConfig.profile.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '-7px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--btn-orange-bg)',
                  border: '2px solid #D95F00',
                  color: '#FFFFFF',
                  padding: '2px 10px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.66rem',
                  fontWeight: 800,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.3)',
                  letterSpacing: '0.04em',
                }}
              >
                PRO CREATOR
              </div>
            </div>

            {/* Studio Active Beacon Tag */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '3px 10px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--bg-surface-elevated)',
                border: '1.5px solid var(--border-subtle)',
                fontSize: '0.68rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#22C55E',
                }}
              />
              <span>Active in Studio • Sidoarjo (GMT+7)</span>
            </div>

            {/* Brand & Creator Name */}
            <div>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--color-orange)',
                  display: 'block',
                  marginBottom: '2px',
                }}
              >
                {siteConfig.profile.brandName}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                  {siteConfig.profile.name}
                </h2>
                <CheckCircle2 size={18} className="text-orange" />
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-blue)', fontWeight: 700, margin: '0 0 8px 0' }}>
                {siteConfig.profile.tagline}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span className="badge badge-orange" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                  {siteConfig.profile.role}
                </span>
                <span
                  className="badge badge-red"
                  style={{
                    fontSize: '0.68rem',
                    padding: '2px 8px',
                  }}
                >
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FFFFFF' }} />
                  {siteConfig.profile.status}
                </span>
              </div>

              {/* Short Bio */}
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '10px 0 0 0' }}>
                {siteConfig.profile.shortBio}
              </p>

              {/* Social Media Quick Row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
                {socialPlatforms.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-press"
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-surface-elevated)',
                        border: '2px solid var(--border-medium)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: s.accent,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                        textDecoration: 'none',
                        transition: 'transform 0.15s ease',
                      }}
                      title={`${s.name}: ${s.handle}`}
                    >
                      <Icon size={18} color={s.accent} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Action Buttons for Mobile */}
            <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '2px' }}>
              <button
                onClick={() => openApp('commission')}
                className="btn btn-primary-orange btn-sm btn-press"
                style={{ flex: 1.2, padding: '10px 8px', fontSize: '0.8rem', justifyContent: 'center', gap: '6px' }}
              >
                <Sparkles size={14} />
                <span>Commission</span>
              </button>
              <a
                href={siteConfig.profile.cvUrl || 'https://drive.google.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-glass btn-sm btn-press"
                style={{ flex: 1, padding: '10px 8px', fontSize: '0.8rem', justifyContent: 'center', textDecoration: 'none', gap: '6px' }}
              >
                <GoogleDriveIcon size={14} />
                <span>CV Drive</span>
              </a>
              <button
                onClick={() => openApp('contact')}
                className="btn btn-glass btn-sm btn-press"
                style={{ padding: '10px 12px', fontSize: '0.8rem', justifyContent: 'center' }}
                title="Hubungi Kami"
              >
                <Send size={14} />
              </button>
            </div>
          </div>

          {/* 2. CREATIVE TELEMETRY HUD (2x2 Glass Grid) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {[
              { label: 'Pengalaman', value: siteConfig.profile.experienceYears || '10+', sub: 'Tahun Kreatif', icon: Award, accent: 'var(--color-orange)', bg: 'rgba(255, 156, 15, 0.12)', border: 'rgba(255, 156, 15, 0.35)' },
              { label: 'Proyek Selesai', value: siteConfig.profile.projectsCompleted || '500+', sub: 'Video & Grafis', icon: Layers, accent: 'var(--color-blue)', bg: 'rgba(0, 82, 245, 0.12)', border: 'rgba(0, 82, 245, 0.35)' },
              { label: 'Klien & Partner', value: siteConfig.profile.happyClients || '100+', sub: 'Kolaborasi Digital', icon: HeartHandshake, accent: '#22C55E', bg: 'rgba(34, 197, 94, 0.12)', border: 'rgba(34, 197, 94, 0.35)' },
              { label: 'Kepuasan Klien', value: siteConfig.profile.rating || '4.8/5.0', sub: 'Review Positif', icon: Star, accent: '#EAB308', bg: 'rgba(234, 179, 8, 0.12)', border: 'rgba(234, 179, 8, 0.35)' },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="glass-card btn-press"
                  style={{
                    padding: '14px 12px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--bg-surface)',
                    border: '2px solid var(--border-medium)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-md)',
                      background: stat.bg,
                      border: `1.5px solid ${stat.border}`,
                      color: stat.accent,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} color={stat.accent} />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                      {stat.label}
                    </div>
                    <div style={{ fontSize: '0.64rem', color: 'var(--text-muted)' }}>
                      {stat.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3. BIOGRAFI & VISI KREATIF (EDITORIAL STORY CARD) */}
          <div
            className="glass-card"
            style={{
              padding: '20px 16px',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255, 156, 15, 0.15)',
                    border: '1.5px solid rgba(255, 156, 15, 0.35)',
                    color: 'var(--color-orange)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Sparkles size={16} />
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>
                  Biografi & Visi Kreatif
                </h3>
              </div>
              <span className="badge badge-orange" style={{ fontSize: '0.66rem' }}>Story</span>
            </div>

            {/* Mobile Milestone Chips */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { era: '2016', title: 'Mobile Editing Roots', desc: 'Kinemaster & Pixellab di smartphone' },
                { era: '2021', title: 'Rebranding Rasfalz', desc: 'Motion Graphics, AMV & GFX Anime' },
                { era: '2024+', title: 'Studio OS Ecosystem', desc: 'Creative Developer & Multi-tool Pipeline' },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-surface-elevated)',
                    border: '1.5px solid var(--border-subtle)',
                  }}
                >
                  <span className="badge badge-orange" style={{ fontSize: '0.64rem', padding: '1px 6px', flexShrink: 0 }}>
                    {m.era}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>
                      {m.title}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>
                      {m.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote Banner */}
            <div
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, rgba(255, 156, 15, 0.08), rgba(0, 82, 245, 0.08))',
                border: '1.5px solid rgba(255, 156, 15, 0.3)',
              }}
            >
              <p style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--text-primary)', margin: 0, lineHeight: 1.5, fontWeight: 500 }}>
                "Kreativitas adalah proses tanpa henti untuk menyajikan karya visual yang berenergi dan memikat audiens."
              </p>
            </div>

            {/* Full Bio Paragraphs */}
            <p style={{ fontSize: '0.84rem', lineHeight: '1.65', color: 'var(--text-secondary)', margin: 0, whiteSpace: 'pre-line' }}>
              {siteConfig.profile.fullBio}
            </p>
          </div>

          {/* 4. CURRICULUM VITAE (CV) MOBILE CARD */}
          <div>
            <div className="mobile-section-header">
              <div className="mobile-section-title">
                <FileText size={18} className="text-orange" />
                <span>Curriculum Vitae (CV)</span>
              </div>
              <span className="badge badge-orange" style={{ fontSize: '0.66rem' }}>Drive Cloud</span>
            </div>

            <CvProjectCard isMobile={true} />
          </div>

          {/* 5. WHAT I DO (MOBILE CARDS) */}
          <div>
            <div className="mobile-section-header">
              <div className="mobile-section-title">
                <Layers size={18} className="text-orange" />
                <span>Layanan & Keahlian Utama</span>
              </div>
              <span className="badge badge-blue" style={{ fontSize: '0.66rem' }}>
                {siteConfig.whatIDo.length} Bidang
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
              {siteConfig.whatIDo.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card btn-press"
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--bg-surface)',
                    border: '2px solid var(--border-medium)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: 'var(--radius-md)',
                      background: `${item.accent}18`,
                      color: item.accent,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1.5px solid ${item.accent}40`,
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.94rem', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.45', margin: 0 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. TECHNICAL SKILLS & MASTERY */}
          <div>
            <div className="mobile-section-header">
              <div className="mobile-section-title">
                <Flame size={18} className="text-blue" />
                <span>Skill & Software Mastery</span>
              </div>
              <span className="badge badge-orange" style={{ fontSize: '0.66rem' }}>Stack</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {siteConfig.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-surface)',
                    border: '2px solid var(--border-medium)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {skill.name}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', background: 'var(--bg-surface-elevated)', padding: '1px 6px', borderRadius: 'var(--radius-sm)' }}>
                        {skill.category}
                      </span>
                    </div>
                    <span className="badge badge-orange" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress Visual Bar */}
                  <div
                    style={{
                      width: '100%',
                      height: '6px',
                      background: 'var(--border-medium)',
                      borderRadius: 'var(--radius-pill)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${skill.level}%`,
                        height: '100%',
                        background: idx % 2 === 0 ? 'var(--color-orange)' : 'var(--color-blue)',
                        borderRadius: 'var(--radius-pill)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7. CREATIVE JOURNEY (STEPPER TIMELINE) */}
          <div>
            <div className="mobile-section-header">
              <div className="mobile-section-title">
                <Clock size={18} className="text-orange" />
                <span>Riwayat Pengalaman</span>
              </div>
              <span className="badge badge-orange" style={{ fontSize: '0.66rem' }}>Timeline</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {(siteConfig.creativeJourney || []).map((exp, idx) => (
                <div
                  key={idx}
                  className="glass-card btn-press"
                  style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--bg-surface)',
                    border: '2px solid var(--border-medium)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className={`badge ${exp.badgeColor || 'badge-orange'}`} style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                      {exp.year}
                    </span>
                    <span style={{ fontSize: '0.74rem', color: 'var(--color-blue)', fontWeight: 800 }}>
                      {exp.company}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 800, margin: '4px 0 2px 0', color: 'var(--text-primary)' }}>
                    {exp.role}
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.45', margin: 0 }}>
                    {exp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 8. SALURAN MEDIA SOSIAL RESMI */}
          <div>
            <div className="mobile-section-header">
              <div className="mobile-section-title">
                <Share2 size={18} className="text-orange" />
                <span>Media Sosial & Komunitas</span>
              </div>
              <span className="badge badge-orange" style={{ fontSize: '0.66rem' }}>4 Akun Resmi</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {socialPlatforms.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card btn-press"
                    style={{
                      padding: '14px 16px',
                      borderRadius: 'var(--radius-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      textDecoration: 'none',
                      color: 'inherit',
                      border: '2px solid var(--border-medium)',
                      background: 'var(--bg-surface)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: 'var(--radius-md)',
                          background: item.bgGlow,
                          color: item.accent,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `1.5px solid ${item.accent}35`,
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={20} color={item.accent} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                            {item.name}
                          </span>
                          <span className="badge" style={{ fontSize: '0.62rem', padding: '2px 7px', background: item.solidDark || '#1E293B', color: '#FFFFFF', border: '1px solid rgba(0,0,0,0.2)' }}>
                            {item.badge}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.76rem', color: 'var(--color-orange)', fontWeight: 700, margin: '0 0 2px 0' }}>
                          {item.handle}
                        </p>
                        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ExternalLink size={16} style={{ color: item.accent, flexShrink: 0 }} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </WindowFrame>
    );
  }

  // ==========================================
  // DESKTOP & TABLET VIEW: Creative Studio Workstation Bento
  // ==========================================
  return (
    <WindowFrame title="About Creator" icon={User} badgeText="Studio Profile & Workstation">
      <style>{`
        .about-desktop-wrapper {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-bottom: 24px;
        }
        .about-hero-grid {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 24px;
          align-items: center;
        }
        .about-hud-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .about-desktop-bento {
          display: grid;
          grid-template-columns: minmax(0, 1.18fr) minmax(0, 1fr);
          gap: 20px;
          align-items: stretch;
        }
        .about-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
          height: 100%;
        }
        .cv-desktop-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 20px;
        }
        @media (max-width: 1080px) {
          .about-desktop-bento {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .about-hud-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .cv-desktop-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 768px) {
          .about-hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            justify-items: center;
          }
          .about-hud-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="about-desktop-wrapper">
        {/* 1. STUDIO PROFILE HERO & COMMAND CENTER */}
        <div
          className="glass-card hover-lift"
          style={{
            padding: '24px 28px',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--bg-surface)',
            border: '2px solid var(--border-medium)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div className="about-hero-grid" style={{ position: 'relative', zIndex: 1 }}>
            {/* Avatar Squircle with Glowing Border & Status */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={siteConfig.profile.avatar}
                  alt={siteConfig.profile.name}
                  style={{
                    width: '132px',
                    height: '132px',
                    borderRadius: 'var(--radius-xl)',
                    objectFit: 'cover',
                    border: '3px solid var(--color-orange)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                    display: 'block',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-7px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--btn-orange-bg)',
                    border: '2px solid #D95F00',
                    color: '#FFFFFF',
                    padding: '2px 10px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
                    letterSpacing: '0.04em',
                  }}
                >
                  PRO CREATOR
                </div>
              </div>

              {/* Status beacon indicator */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'var(--bg-surface-elevated)',
                  border: '1.5px solid var(--border-subtle)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  marginTop: '4px',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#22C55E',
                  }}
                />
                <span>Active in Studio</span>
              </div>
            </div>

            {/* Identity, Role & Quick Commands */}
            <div>
              {/* Meta Tags Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                <span className="badge badge-orange">{siteConfig.profile.role}</span>
                <span className="badge badge-blue">
                  <MapPin size={12} />
                  {siteConfig.profile.location}
                </span>
                <span
                  className="badge badge-red"
                  style={{
                    fontSize: '0.7rem',
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFFFFF' }} />
                  {siteConfig.profile.status}
                </span>
              </div>

              <span
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-orange)',
                  display: 'block',
                  marginBottom: '2px',
                }}
              >
                {siteConfig.profile.brandName}
              </span>
              <h1 style={{ fontSize: '2.1rem', fontWeight: 800, margin: '0 0 4px 0', lineHeight: 1.15, color: 'var(--text-primary)' }}>
                {siteConfig.profile.name}
              </h1>
              <p style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--color-blue)', marginBottom: '8px' }}>
                {siteConfig.profile.tagline}
              </p>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.55', marginBottom: '16px', maxWidth: '820px' }}>
                {siteConfig.profile.shortBio}
              </p>

              {/* Action Buttons & Social Quick Bar (Unified & Connected) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => openApp('commission')}
                    className="btn btn-primary-orange btn-sm hover-lift"
                    style={{ padding: '8px 15px', fontSize: '0.82rem', gap: '6px' }}
                  >
                    <Sparkles size={14} />
                    <span>Start Commission</span>
                  </button>
                  <a
                    href={siteConfig.profile.cvUrl || 'https://drive.google.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-glass btn-sm hover-lift"
                    style={{ padding: '8px 14px', fontSize: '0.82rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <GoogleDriveIcon size={14} />
                    <span>Buka CV di Drive</span>
                    <ExternalLink size={12} />
                  </a>
                  <button
                    onClick={() => openApp('contact')}
                    className="btn btn-glass btn-sm hover-lift"
                    style={{ padding: '8px 14px', fontSize: '0.82rem', gap: '6px' }}
                  >
                    <Send size={14} />
                    <span>Hubungi Kami</span>
                  </button>
                </div>

                <div style={{ width: '2px', height: '24px', background: 'var(--border-medium)', margin: '0 2px' }} />

                {/* Social Media Quick Chips */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, marginRight: '2px' }}>
                    Sosial:
                  </span>
                  {socialPlatforms.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.id}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card hover-lift"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '5px 10px',
                          borderRadius: 'var(--radius-pill)',
                          textDecoration: 'none',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          border: '1.5px solid var(--border-medium)',
                          background: 'var(--bg-surface-elevated)',
                          transition: 'all 0.2s ease',
                        }}
                        title={`${s.name}: ${s.handle}`}
                      >
                        <Icon size={13} color={s.accent} />
                        <span>{s.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. CREATIVE TELEMETRY HUD (4 Glass Stat Capsules) */}
        <div className="about-hud-grid">
          {[
            {
              label: 'Tahun Pengalaman',
              value: siteConfig.profile.experienceYears || '10+',
              sub: 'Desain & Video Sejak 2016',
              icon: Award,
              accent: 'var(--color-orange)',
              bg: 'rgba(255, 156, 15, 0.12)',
              border: 'rgba(255, 156, 15, 0.35)',
            },
            {
              label: 'Proyek Kreatif Selesai',
              value: siteConfig.profile.projectsCompleted || '500+',
              sub: 'Motion, Video & Grafis Komersial',
              icon: Layers,
              accent: 'var(--color-blue)',
              bg: 'rgba(0, 82, 245, 0.12)',
              border: 'rgba(0, 82, 245, 0.35)',
            },
            {
              label: 'Klien & Partner Digital',
              value: siteConfig.profile.happyClients || '100+',
              sub: 'Kolaborasi Komunitas & Brand',
              icon: HeartHandshake,
              accent: '#22C55E',
              bg: 'rgba(34, 197, 94, 0.12)',
              border: 'rgba(34, 197, 94, 0.35)',
            },
            {
              label: 'Tingkat Kepuasan Klien',
              value: siteConfig.profile.rating || '4.8/5.0',
              sub: 'Review & Umpan Balik Positif',
              icon: Star,
              accent: '#EAB308',
              bg: 'rgba(234, 179, 8, 0.12)',
              border: 'rgba(234, 179, 8, 0.35)',
            },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="glass-card hover-lift"
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-surface)',
                  border: '2px solid var(--border-medium)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: stat.bg,
                    border: `2px solid ${stat.border}`,
                    color: stat.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} color={stat.accent} />
                </div>
                <div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, fontFamily: 'var(--font-heading)' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '1px' }}>
                    {stat.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. BENTO CORE: LEFT COLUMN & RIGHT COLUMN */}
        <div className="about-desktop-bento">
          {/* LEFT COLUMN: Core Narrative & What I Do */}
          <div className="about-column">
            {/* CARD A: Biografi & Visi Kreatif (Editorial Reader Card) */}
            <div
              className="glass-card"
              style={{
                padding: '22px 24px',
                borderRadius: 'var(--radius-xl)',
                background: 'var(--bg-surface)',
                border: '2px solid var(--border-medium)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255, 156, 15, 0.15)',
                      border: '2px solid rgba(255, 156, 15, 0.35)',
                      color: 'var(--color-orange)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Sparkles size={17} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.18rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                      Biografi & Visi Kreatif
                    </h2>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Kisah Perjalanan & Identitas Rasfalz Studio
                    </span>
                  </div>
                </div>

                <span className="badge badge-orange" style={{ fontSize: '0.7rem' }}>
                  Creative Story
                </span>
              </div>

              {/* Milestone Timeline Chips (Symmetrical 3-column strip) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',
                }}
              >
                {[
                  { era: '2016 - 2020', title: 'Mobile Editing', desc: 'Kinemaster & Pixellab' },
                  { era: '2021 - 2023', title: 'Rebrand Rasfalz', desc: 'Motion Graphics & AMV' },
                  { era: '2024 - Now', title: 'Studio OS Hub', desc: 'Creative Ecosystem' },
                ].map((m, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-surface-elevated)',
                      border: '1.5px solid var(--border-subtle)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <span className="badge badge-orange" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>{m.era}</span>
                    </div>
                    <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-primary)' }}>{m.title}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{m.desc}</div>
                  </div>
                ))}
              </div>

              {/* Highlight Quote Box */}
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, rgba(255, 156, 15, 0.08), rgba(0, 82, 245, 0.08))',
                  border: '1.5px solid rgba(255, 156, 15, 0.3)',
                }}
              >
                <p style={{ fontSize: '0.84rem', fontStyle: 'italic', color: 'var(--text-primary)', margin: 0, lineHeight: 1.5, fontWeight: 500 }}>
                  "Dari ketertarikan mencoba tutorial di era 2016 hingga bertransformasi menjadi identitas Rasfalz di tahun 2021. Kreativitas adalah proses tanpa henti untuk menyajikan karya visual yang berenergi dan memikat audiens."
                </p>
                <span style={{ display: 'block', marginTop: '4px', fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-orange)', textAlign: 'right' }}>
                  — Raihan Salman Alfarisy (Rasfalz)
                </span>
              </div>

              {/* Full Bio Text with clean container frame */}
              <div
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-surface-elevated)',
                  border: '1.5px solid var(--border-subtle)',
                  fontSize: '0.86rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.65',
                  whiteSpace: 'pre-line',
                }}
              >
                {siteConfig.profile.fullBio}
              </div>
            </div>

            {/* CARD B: What I Do (Symmetrical 2x2 Grid, Expanded Height & Rich Deliverables) */}
            <div
              className="glass-card"
              style={{
                padding: '24px 26px',
                borderRadius: 'var(--radius-xl)',
                background: 'var(--bg-surface)',
                border: '2px solid var(--border-medium)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                flex: 1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(0, 82, 245, 0.15)',
                      border: '2px solid rgba(0, 82, 245, 0.35)',
                      color: 'var(--color-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Layers size={18} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.22rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                      What I Do & Fokus Layanan
                    </h2>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      Keahlian profesional, pilar keahlian kreatif, dan output visual studio
                    </span>
                  </div>
                </div>

                <span className="badge badge-blue" style={{ fontSize: '0.72rem', padding: '3px 10px' }}>
                  {siteConfig.whatIDo.length} Bidang Utama
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', flex: 1 }}>
                {siteConfig.whatIDo.map((item, idx) => {
                  const PillarIcon = item.icon === 'Film' ? Film : item.icon === 'Image' ? Image : item.icon === 'Box' ? Box : Sparkles;
                  return (
                    <div
                      key={idx}
                      className="glass-card hover-lift"
                      style={{
                        padding: '18px 20px',
                        borderRadius: 'var(--radius-lg)',
                        background: 'var(--bg-surface-elevated)',
                        border: '1.5px solid var(--border-medium)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '12px',
                        minHeight: '175px',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <div
                            style={{
                              width: '42px',
                              height: '42px',
                              borderRadius: 'var(--radius-md)',
                              background: `${item.accent}18`,
                              color: item.accent,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: `1.5px solid ${item.accent}35`,
                              flexShrink: 0,
                            }}
                          >
                            <PillarIcon size={20} />
                          </div>
                          <span
                            className="badge badge-category"
                            style={{
                              fontSize: '0.66rem',
                              padding: '2px 8px',
                            }}
                          >
                            Pillar 0{idx + 1}
                          </span>
                        </div>

                        <h3 style={{ fontSize: '1.02rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--text-primary)', lineHeight: 1.3 }}>
                          {item.title}
                        </h3>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.55', margin: 0 }}>
                          {item.description}
                        </p>
                      </div>

                      {item.tags && item.tags.length > 0 && (
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '6px',
                            paddingTop: '10px',
                            borderTop: '1px solid var(--border-subtle)',
                          }}
                        >
                          {item.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              style={{
                                fontSize: '0.68rem',
                                fontWeight: 700,
                                padding: '2px 8px',
                                borderRadius: 'var(--radius-pill)',
                                background: 'var(--bg-surface)',
                                color: 'var(--text-primary)',
                                border: '1px solid var(--border-subtle)',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Software Stack, Career Timeline & Social Hub */}
          <div className="about-column">
            {/* CARD D: Software & Skills Proficiency (Studio Tech Stack Matrix) */}
            <div
              className="glass-card"
              style={{
                padding: '22px 24px',
                borderRadius: 'var(--radius-xl)',
                background: 'var(--bg-surface)',
                border: '2px solid var(--border-medium)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(0, 82, 245, 0.15)',
                      border: '2px solid rgba(0, 82, 245, 0.35)',
                      color: 'var(--color-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Flame size={17} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.18rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                      Software & Tools
                    </h2>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Penguasaan Perangkat Lunak Studio
                    </span>
                  </div>
                </div>

                <span className="badge badge-orange" style={{ fontSize: '0.7rem' }}>
                  Stack Matrix
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {siteConfig.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="glass-card hover-lift"
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-surface-elevated)',
                      border: '1.5px solid var(--border-subtle)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {skill.name}
                        </span>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', background: 'var(--bg-surface)', padding: '1px 6px', borderRadius: 'var(--radius-sm)' }}>
                          {skill.category}
                        </span>
                      </div>
                      <span className="badge badge-orange" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Track */}
                    <div
                      style={{
                        width: '100%',
                        height: '5px',
                        background: 'var(--border-medium)',
                        borderRadius: 'var(--radius-pill)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${skill.level}%`,
                          height: '100%',
                          background: idx % 2 === 0 ? 'var(--color-orange)' : 'var(--color-blue)',
                          borderRadius: 'var(--radius-pill)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD E: Creative Journey Stepper Timeline */}
            <div
              className="glass-card"
              style={{
                padding: '22px 24px',
                borderRadius: 'var(--radius-xl)',
                background: 'var(--bg-surface)',
                border: '2px solid var(--border-medium)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255, 156, 15, 0.15)',
                      border: '2px solid rgba(255, 156, 15, 0.35)',
                      color: 'var(--color-orange)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Clock size={17} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.18rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                      Creative Journey
                    </h2>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Riwayat Karir & Milestone Portofolio
                    </span>
                  </div>
                </div>

                <span className="badge badge-orange" style={{ fontSize: '0.7rem' }}>
                  Timeline
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(siteConfig.creativeJourney || []).map((exp, idx) => (
                  <div
                    key={idx}
                    className="glass-card hover-lift"
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-lg)',
                      background: 'var(--bg-surface-elevated)',
                      border: '1.5px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className={`badge ${exp.badgeColor}`} style={{ fontSize: '0.68rem', padding: '1px 7px' }}>
                        {exp.year}
                      </span>
                      <span style={{ fontSize: '0.74rem', color: 'var(--color-blue)', fontWeight: 800 }}>
                        {exp.company}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 800, margin: '2px 0 2px 0', color: 'var(--text-primary)' }}>
                      {exp.role}
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.45', margin: 0 }}>
                      {exp.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD F: Official Social Media & Community Grid (Clean 2x2, Expanded Height with Descriptions) */}
            <div
              className="glass-card"
              style={{
                padding: '24px 26px',
                borderRadius: 'var(--radius-xl)',
                background: 'var(--bg-surface)',
                border: '2px solid var(--border-medium)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                flex: 1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255, 156, 15, 0.15)',
                      border: '2px solid rgba(255, 156, 15, 0.35)',
                      color: 'var(--color-orange)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Share2 size={18} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.22rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                      Saluran Resmi & Media Sosial
                    </h2>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      Publikasi karya visual, konten kreatif & interaksi komunitas
                    </span>
                  </div>
                </div>

                <span className="badge badge-orange" style={{ fontSize: '0.72rem', padding: '3px 10px' }}>
                  4 Platform Aktif
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', flex: 1 }}>
                {socialPlatforms.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card hover-lift"
                      style={{
                        padding: '18px 20px',
                        borderRadius: 'var(--radius-lg)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '12px',
                        textDecoration: 'none',
                        color: 'inherit',
                        position: 'relative',
                        overflow: 'hidden',
                        border: '1.5px solid var(--border-medium)',
                        background: 'var(--bg-surface-elevated)',
                        minHeight: '175px',
                      }}
                    >
                      <div>
                        {/* Top Bar: Icon + Badge */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <div
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: 'var(--radius-md)',
                              background: item.bgGlow,
                              color: item.accent,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: `1.5px solid ${item.accent}45`,
                              flexShrink: 0,
                            }}
                          >
                            <Icon size={18} color={item.accent} />
                          </div>
                          <span
                            className="badge"
                            style={{
                              fontSize: '0.66rem',
                              fontWeight: 800,
                              padding: '2px 8px',
                              background: item.solidDark || '#1E293B',
                              color: '#FFFFFF',
                              border: '1px solid rgba(0,0,0,0.2)',
                            }}
                          >
                            {item.badge}
                          </span>
                        </div>

                        {/* Platform Name & Handle */}
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                          <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                            {item.name}
                          </h4>
                          <span style={{ fontSize: '0.76rem', color: item.accent, fontWeight: 700 }}>
                            {item.handle}
                          </span>
                        </div>

                        {/* Keterangan Sosial Media */}
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '4px 0 0 0' }}>
                          {item.description}
                        </p>
                      </div>

                      {/* Footer Link Action */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: '8px',
                          borderTop: '1px solid var(--border-subtle)',
                          color: item.accent,
                          fontSize: '0.74rem',
                          fontWeight: 800,
                        }}
                      >
                        <span>Kunjungi {item.name}</span>
                        <ExternalLink size={13} />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 4. CURRICULUM VITAE (CV) FULL-WIDTH WORKSTATION */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={20} className="text-orange" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Curriculum Vitae (CV) & Official Credentials</h2>
            </div>
            <span className="badge badge-orange" style={{ fontSize: '0.72rem' }}>Verified Cloud Doc</span>
          </div>

          <CvProjectCard isMobile={false} />
        </div>
      </div>
    </WindowFrame>
  );
};
