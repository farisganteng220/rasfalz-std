import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { useOS } from '../context/OSContext';
import { useTheme } from '../context/ThemeContext';
import { DecorativeBackground } from '../components/common/DecorativeBackground';
import { ClockWidget } from '../components/desktop/ClockWidget';
import { CalendarWidget } from '../components/desktop/CalendarWidget';
import { NewsPortfolioWidget } from '../components/desktop/NewsPortfolioWidget';
import { DesktopMusicWidget } from '../components/desktop/DesktopMusicWidget';
import { PixelAtAGlance } from '../components/mobile/PixelAtAGlance';
import { GoogleSearchPill } from '../components/mobile/GoogleSearchPill';
import { AndroidAppGrid } from '../components/mobile/AndroidAppGrid';
import { MobileGalleryWidget } from '../components/mobile/MobileGalleryWidget';
import { MobileMusicWidget } from '../components/mobile/MobileMusicWidget';
import { ThemeToggle } from '../components/common/ThemeToggle';
import {
  InstagramIcon,
  YoutubeIcon,
  TikTokIcon,
  FacebookIcon,
} from '../components/common/BrandIcons';
import {
  Briefcase,
  Sparkles,
  ArrowRight,
  Send,
  MessageSquare,
  Flame,
  Layers,
  ChevronRight,
  Star,
  ExternalLink,
  ShoppingBag,
  Search,
  Gamepad2,
  Eye,
  Newspaper,
  CheckCircle2,
  Award,
  Share2,
} from 'lucide-react';

export const HomePage = () => {
  const { isMobile, openApp, setSearchModalOpen } = useOS();
  const { isDark } = useTheme();

  // Dynamic Live Time for Mobile Clock
  const [mobileTime, setMobileTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setMobileTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const mobileHours = String(mobileTime.getHours()).padStart(2, '0');
  const mobileMinutes = String(mobileTime.getMinutes()).padStart(2, '0');

  // Dynamic Logo Wordmark based on Theme Mode (Light / Dark)
  const currentWordmarkUrl = isDark
    ? siteConfig.profile.logoDarkUrl || siteConfig.profile.logoUrl
    : siteConfig.profile.logoLightUrl || siteConfig.profile.logoUrl;

  if (isMobile) {
    return (
      <div className="mobile-home-container animate-fade-in" style={{ position: 'relative' }}>
        <DecorativeBackground variant="subtle" scheme="mixed" cols={6} rows={8} opacity={0.55} />

        {/* Pixel At-A-Glance Bar (Date, Weather, Live Status) */}
        <PixelAtAGlance />

        {/* Hero Clock & Creator Wordmark Pill */}
        <div className="android-clock-hero">
          <div className="android-clock-display">
            <span className="android-clock-digits">
              {mobileHours}:{mobileMinutes}
            </span>
          </div>

          <div
            className="android-clock-meta-badge btn-press"
            onClick={() => openApp('about')}
            title="Klik untuk Tentang Kreator"
          >
            <div
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'linear-gradient(145deg, #FF9C0F 0%, #B84700 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                fontSize: '0.65rem',
                fontWeight: 900,
              }}
            >
              R
            </div>
            <span>{siteConfig.profile.name} • {siteConfig.profile.brandName}</span>
            <ChevronRight size={14} className="text-orange" />
          </div>
        </div>

        {/* Accessibility Quick Bar */}
        <div style={{ padding: '0 16px', marginBottom: '12px' }}>
          <div
            onClick={() => openApp('accessibility')}
            className="glass-card btn-press"
            style={{
              padding: '10px 14px',
              borderRadius: '16px',
              border: '2px solid var(--border-medium)',
              background: 'var(--bg-surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'linear-gradient(145deg, #0052F5 0%, #002D8A 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                }}
              >
                <Eye size={16} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Pusat Aksesibilitas & Teks
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Atur ukuran font, kontras tinggi & pembaca layar audio
                </div>
              </div>
            </div>

            <ChevronRight size={16} className="text-orange" style={{ flexShrink: 0 }} />
          </div>
        </div>

        {/* Google / Universal Search Bar */}
        <GoogleSearchPill />

        {/* Interactive Material You Music Mini-Widget */}
        <MobileMusicWidget />

        {/* Quick Highlights Metrics Bar */}
        <div className="mobile-stats-row">
          <div className="mobile-stat-card btn-press" onClick={() => openApp('portfolio')}>
            <div className="mobile-stat-value text-gradient">
              {siteConfig.profile.projectsCompleted}
            </div>
            <div className="mobile-stat-label">Karya Selesai</div>
          </div>

          <div className="mobile-stat-card btn-press" onClick={() => openApp('about')}>
            <div className="mobile-stat-value" style={{ color: 'var(--color-orange)' }}>
              {siteConfig.profile.experienceYears}
            </div>
            <div className="mobile-stat-label">Pengalaman</div>
          </div>

          <div className="mobile-stat-card btn-press" onClick={() => openApp('commission')}>
            <div className="mobile-stat-value" style={{ color: 'var(--color-blue)' }}>
              {siteConfig.profile.happyClients}
            </div>
            <div className="mobile-stat-label">Klien Puas</div>
          </div>
        </div>

        {/* Android App Grid with Category Tabs */}
        <div style={{ marginBottom: '10px' }}>
          <div style={{ padding: '0 18px 8px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-primary)' }}>
              Aplikasi & Pusat Layanan
            </span>
            <span className="badge badge-orange" style={{ fontSize: '0.66rem' }}>Android 16 QPR2</span>
          </div>
          <AndroidAppGrid />
        </div>

        {/* Visual Gallery Showcase Carousel */}
        <MobileGalleryWidget />

        {/* Creator Profile & What I Do Showcase Card */}
        <div style={{ padding: '0 16px', marginBottom: '24px' }}>
          <div
            className="glass-card"
            style={{
              padding: '18px',
              borderRadius: '24px',
              background: 'var(--bg-surface-elevated)',
              border: '2px solid var(--border-medium)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
            }}
          >
            {/* Header with Avatar & Name */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={siteConfig.profile.avatar}
                  alt={siteConfig.profile.name}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '16px',
                    objectFit: 'cover',
                    border: '2px solid var(--color-orange)',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                  }}
                />
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                    {siteConfig.profile.name}
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-orange)', fontWeight: 700, margin: 0 }}>
                    {siteConfig.profile.role}
                  </p>
                </div>
              </div>

              <span className="badge badge-orange" style={{ fontSize: '0.72rem' }}>
                <Star size={11} fill="currentColor" />
                {siteConfig.profile.rating}
              </span>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.55 }}>
              {siteConfig.profile.shortBio}
            </p>

            {/* What I Do Services Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-orange)', letterSpacing: '0.04em' }}>
                  What I Do • Layanan Kreatif
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>4 Bidang Spesialisasi</span>
              </div>

              {siteConfig.whatIDo.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => openApp('about')}
                  className="btn-press"
                  style={{
                    padding: '10px 12px',
                    borderRadius: '14px',
                    background: 'var(--bg-surface)',
                    border: '2px solid var(--border-medium)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '8px',
                        background: `${item.accent}18`,
                        color: item.accent,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Sparkles size={12} />
                    </div>
                    <span style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {item.title}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Social Media Channels Row (Mobile) */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-orange)', letterSpacing: '0.04em' }}>
                  Media Sosial Resmi
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>4 Saluran</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
                {[
                  { name: 'Instagram', url: siteConfig.socials.instagram?.url || 'https://instagram.com/rasfalz.std', icon: InstagramIcon, accent: '#E1306C' },
                  { name: 'TikTok', url: siteConfig.socials.tiktok?.url || 'https://tiktok.com/@rasfalz.std', icon: TikTokIcon, accent: '#00F2FE' },
                  { name: 'YouTube', url: siteConfig.socials.youtube?.url || 'https://www.youtube.com/@rasfalz-std', icon: YoutubeIcon, accent: '#FF0000' },
                  { name: 'Facebook', url: siteConfig.socials.facebook?.url || 'https://facebook.com', icon: FacebookIcon, accent: '#1877F2' },
                ].map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={idx}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-press"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-pill)',
                        background: 'var(--bg-surface)',
                        border: '2px solid var(--border-medium)',
                        textDecoration: 'none',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                      }}
                    >
                      <Icon size={14} color={s.accent} />
                      <span>{s.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => openApp('portfolio')}
                className="btn btn-primary-orange btn-sm"
                style={{ flex: 1, padding: '9px 14px', fontSize: '0.82rem', fontWeight: 800 }}
              >
                <Briefcase size={14} />
                <span>Buka Portofolio</span>
              </button>
              <button
                onClick={() => openApp('contact')}
                className="btn btn-primary-blue btn-sm"
                style={{ flex: 1, padding: '9px 14px', fontSize: '0.82rem', fontWeight: 800 }}
              >
                <Send size={14} />
                <span>Kontak Kami</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop OS Dashboard Layout (FydeOS / ChromeOS Flex)
  return (
    <div className="desktop-workspace animate-fade-in" style={{ position: 'relative' }}>
      <DecorativeBackground variant="subtle" scheme="mixed" cols={12} rows={8} opacity={0.55} />
      {/* Top Header Status & Greeting */}
      <div className="desktop-top-bar">
        {/* Brand Logo Wordmark */}
        <div
          onClick={() => openApp('about')}
          className="desktop-logo-wordmark btn-press"
          title="Rasfalz Studio - Klik untuk Tentang Kreator"
        >
          {currentWordmarkUrl ? (
            <img
              src={currentWordmarkUrl}
              alt={siteConfig.profile.brandName}
              className="desktop-wordmark-img"
              loading="eager"
            />
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: 'var(--font-subheading)',
                letterSpacing: '-0.025em',
              }}
            >
              <span
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                  fontFamily: 'var(--font-subheading)',
                }}
              >
                RASFALZ
              </span>
              <span
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #FF9C0F 0%, #FF5E3A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1,
                  fontFamily: 'var(--font-subheading)',
                }}
              >
                STUDIO
              </span>
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--color-orange)',
                  marginLeft: '2px',
                }}
              />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 auto', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          {/* Universal Search Bar Trigger */}
          <div
            onClick={() => setSearchModalOpen(true)}
            className="search-bar btn-press"
            style={{
              padding: '8px 16px',
              flex: '1 1 200px',
              maxWidth: '320px',
              minWidth: '180px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Search size={15} className="text-orange" />
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Cari fitur & portofolio...</span>
            </div>
            <kbd style={{ padding: '2px 6px', background: 'var(--bg-surface)', border: '2px solid var(--border-medium)', borderRadius: '4px', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
              Ctrl K
            </kbd>
          </div>

          {/* Quick Accessibility Center Button */}
          <button
            onClick={() => openApp('accessibility')}
            className="btn btn-glass btn-sm hover-lift"
            style={{
              position: 'relative',
              padding: '8px 14px',
              gap: '6px',
            }}
            title="Buka Pusat Aksesibilitas & Kustomisasi Visual"
          >
            <Eye size={15} className="text-orange" />
            <span>Aksesibilitas</span>
          </button>

          <ThemeToggle />
          <button
            onClick={() => openApp('contact')}
            className="btn btn-primary-blue btn-sm hover-lift"
          >
            <Send size={15} />
            <span>Contact Me</span>
          </button>
        </div>
      </div>

      {/* Main OS Widgets Grid (Row 1: Clock + Weather, Creator Hero, Calendar) */}
      <div className="desktop-widgets-grid">
        <ClockWidget />

        {/* Creator Hero Card / About Us Widget - Scaled Up Slightly & Snug Fit */}
        <div
          className="os-widget creator-hero-widget hover-lift"
          style={{
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--bg-surface)',
            padding: '18px 20px',
            borderRadius: 'var(--radius-xl)',
            border: '2px solid var(--border-medium)',
            boxShadow: 'var(--shadow-window)',
            boxSizing: 'border-box',
            gap: '12px',
            height: '100%',
          }}
        >
          <DecorativeBackground variant="micro" scheme="orange" cols={6} rows={6} opacity={0.25} />

          {/* 1. Creator Profile Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={siteConfig.profile.avatar}
                alt={siteConfig.profile.name}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--color-orange)',
                  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
                  flexShrink: 0,
                }}
              />
              <div>
                <h3 style={{ fontSize: '1.20rem', margin: 0, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                  {siteConfig.profile.name}
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--color-orange)', fontWeight: 700, margin: 0 }}>
                  {siteConfig.profile.role}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <span className="badge badge-orange" style={{ fontSize: '0.76rem', padding: '3px 9px', fontWeight: 800 }}>
                <Star size={12} fill="currentColor" />
                {siteConfig.profile.rating}
              </span>
              <span className="badge badge-green" style={{ fontSize: '0.76rem', padding: '3px 9px', fontWeight: 800 }}>
                Available
              </span>
            </div>
          </div>

          {/* 2. Welcome Headline & Short Bio */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
            <h2 style={{ fontSize: '1.28rem', margin: 0, lineHeight: 1.25, fontWeight: 900 }}>
              “Welcome to My <span className="text-gradient">Digital Space</span>”
            </h2>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              {siteConfig.profile.shortBio}
            </p>
          </div>

          {/* 3. What I Do Services (Compact 2x2 Grid) */}
          <div
            style={{
              background: 'var(--bg-surface-elevated)',
              border: '2px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={14} className="text-orange" />
                <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-primary)' }}>
                  What I Do • Layanan Kreatif
                </span>
              </div>
              <button
                onClick={() => openApp('about')}
                className="btn-glass btn-sm"
                style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: 'var(--radius-pill)' }}
              >
                Detail ↗
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '8px',
              }}
            >
              {siteConfig.whatIDo.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => openApp('about')}
                  className="glass-card btn-press"
                  style={{
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface)',
                    border: '2px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3px',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '5px',
                        background: `${item.accent}20`,
                        color: item.accent,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Sparkles size={12} />
                    </div>
                    <h4 style={{ fontSize: '0.84rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                      {item.title}
                    </h4>
                  </div>
                  <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.3, margin: 0 }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Social Media Channels Strip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              flexWrap: 'wrap',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Share2 size={13} className="text-orange" />
              <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.03em', color: 'var(--text-muted)' }}>
                Media Sosial:
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              {[
                { name: 'Instagram', url: siteConfig.socials.instagram?.url || 'https://instagram.com/rasfalz.std', icon: InstagramIcon, accent: '#E1306C' },
                { name: 'TikTok', url: siteConfig.socials.tiktok?.url || 'https://tiktok.com/@rasfalz.std', icon: TikTokIcon, accent: '#00F2FE' },
                { name: 'YouTube', url: siteConfig.socials.youtube?.url || 'https://www.youtube.com/@rasfalz-std', icon: YoutubeIcon, accent: '#FF0000' },
                { name: 'Facebook', url: siteConfig.socials.facebook?.url || 'https://facebook.com', icon: FacebookIcon, accent: '#1877F2' },
              ].map((s, idx) => {
                const Icon = s.icon;
                return (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press hover-lift"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '3px 9px',
                      borderRadius: 'var(--radius-pill)',
                      background: 'var(--bg-surface-elevated)',
                      border: '2px solid var(--border-subtle)',
                      textDecoration: 'none',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      transition: 'all 0.2s ease',
                    }}
                    title={s.name}
                  >
                    <Icon size={12} color={s.accent} />
                    <span>{s.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* 5. Precision Bottom Stats & Action Buttons Bar */}
          <div
            style={{
              marginTop: 'auto',
              paddingTop: '10px',
              borderTop: '2px solid var(--border-medium)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', gap: '14px' }}>
              <div>
                <span style={{ fontSize: '1.10rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                  {siteConfig.profile.projectsCompleted}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', lineHeight: 1.15, marginTop: '2px' }}>Proyek</span>
              </div>
              <div>
                <span style={{ fontSize: '1.10rem', fontWeight: 800, color: 'var(--color-orange)', lineHeight: 1 }}>
                  {siteConfig.profile.experienceYears}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', lineHeight: 1.15, marginTop: '2px' }}>Pengalaman</span>
              </div>
              <div>
                <span style={{ fontSize: '1.10rem', fontWeight: 800, color: 'var(--color-blue)', lineHeight: 1 }}>
                  {siteConfig.profile.happyClients}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', lineHeight: 1.15, marginTop: '2px' }}>Klien</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => openApp('portfolio')}
                className="btn btn-primary-orange btn-sm hover-lift"
                style={{ padding: '7px 14px', fontSize: '0.82rem', fontWeight: 800 }}
              >
                <Briefcase size={14} />
                <span>Portofolio</span>
              </button>
              <button
                onClick={() => openApp('about')}
                className="btn btn-glass btn-sm hover-lift"
                style={{ padding: '7px 14px', fontSize: '0.82rem', fontWeight: 800 }}
              >
                <Layers size={14} className="text-orange" />
                <span>Tentang</span>
              </button>
            </div>
          </div>
        </div>

        <CalendarWidget />
      </div>

      {/* Second Row: Unified News & Portfolio Widget + Desktop Music Widget with Playlist (No minimize) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 380px) 1fr',
          gap: '20px',
          marginBottom: '20px',
          alignItems: 'stretch',
        }}
        className="desktop-media-grid"
      >
        {/* Desktop Music Widget with Full Playlist */}
        <DesktopMusicWidget />

        {/* Unified News, Promo & Portfolio Widget */}
        <NewsPortfolioWidget />
      </div>
    </div>
  );
};

export default HomePage;



