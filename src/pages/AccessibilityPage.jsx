import React, { useState } from 'react';
import { WindowFrame } from '../components/common/WindowFrame';
import { useAccessibility } from '../context/AccessibilityContext';
import { useOS } from '../context/OSContext';
import {
  Sliders,
  Type,
  Eye,
  Zap,
  Sparkles,
  Volume2,
  VolumeX,
  RotateCcw,
  Check,
  MousePointer,
  Link as LinkIcon,
  Contrast,
  BookOpen,
  Activity,
  Layers,
  ShieldCheck,
  Play,
  Square,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  Sun,
  Moon,
  Info,
  Smartphone,
  Monitor,
} from 'lucide-react';

export const AccessibilityPage = () => {
  const {
    settings,
    setFontSize,
    setHighContrast,
    setDyslexicFont,
    setReducedMotion,
    setColorFilter,
    setHighlightLinks,
    setLargeCursor,
    setWideLetterSpacing,
    applyPreset,
    resetSettings,
    speakText,
    stopSpeaking,
    isSpeaking,
  } = useAccessibility();

  const { isMobile, addToast, openApp } = useOS();
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'text' | 'visual' | 'nav' | 'tts'
  const [customSpeakText, setCustomSpeakText] = useState(
    'Selamat datang di Rasfalz Studio. Antarmuka ini dirancang dengan standar aksesibilitas modern, ramah disleksia, dan nyaman untuk semua pengguna.'
  );

  const fontOptions = [
    { label: 'Normal (100%)', value: '100', desc: 'Standar ukuran bawaan' },
    { label: 'Sedang (112%)', value: '112', desc: 'Lebih mudah dibaca' },
    { label: 'Besar (125%)', value: '125', desc: 'Teks berukuran besar' },
    { label: 'Ekstra (140%)', value: '140', desc: 'Maksimum kenyamanan' },
  ];

  const colorFilterOptions = [
    { id: 'none', label: 'Normal', desc: 'Warna asli studio', color: '#FF9C0F' },
    { id: 'grayscale', label: 'Monokrom', desc: 'Skala abu-abu (Grayscale)', color: '#888888' },
    { id: 'protanopia', label: 'Protanopia', desc: 'Filter spektrum merah', color: '#3B82F6' },
    { id: 'deuteranopia', label: 'Deuteranopia', desc: 'Filter spektrum hijau', color: '#10B981' },
    { id: 'tritanopia', label: 'Tritanopia', desc: 'Filter spektrum biru', color: '#EC4899' },
  ];

  const samplePresets = [
    {
      id: 'reading',
      title: 'Mode Membaca',
      icon: BookOpen,
      color: '#FF9C0F',
      desc: 'Font ramah disleksia, teks diperbesar & spasi luas',
    },
    {
      id: 'high-visibility',
      title: 'Visibilitas Tinggi',
      icon: Contrast,
      color: '#0052F5',
      desc: 'Kontras tajam, kursor besar & sorot semua tautan',
    },
    {
      id: 'calm-visuals',
      title: 'Tenang & Minimalis',
      icon: Activity,
      color: '#10B981',
      desc: 'Mematikan seluruh animasi untuk kenyamanan visual',
    },
  ];

  const speechPresets = [
    { label: 'Ringkasan Studio', text: 'Rasfalz Studio adalah digital creator hub oleh Raihan. Menyediakan portofolio video editing, desain grafis, marketplace aplikasi, dan layanan komisi kreatif.' },
    { label: 'Info Portofolio', text: 'Jelajahi karya video editing, desain grafis, thumbnail YouTube, dan UI/UX modern dengan performa tinggi.' },
    { label: 'Kontak & Dukungan', text: 'Hubungi kreator langsung melalui WhatsApp, Telegram, atau dukung pembuatan karya via Trakteer dan Saweria.' },
  ];

  // Helper helper to get single-color shaded gradient
  const getSingleColorGradient = (color) => {
    if (color === '#0052F5') return 'linear-gradient(145deg, #0052F5 0%, #002D8A 100%)';
    if (color === '#10B981') return 'linear-gradient(145deg, #10B981 0%, #065F46 100%)';
    return 'linear-gradient(145deg, #FF9C0F 0%, #B84700 100%)';
  };

  return (
    <WindowFrame
      title="Pusat Aksesibilitas"
      icon={Eye}
      badgeText="A11y Control Center"
      decorScheme="blue"
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: isMobile ? '16px' : '24px' }}>

        {/* =========================================================
            1. HERO STATUS & PRESETS BANNER
            ========================================================= */}
        <div
          className="glass-card"
          style={{
            padding: isMobile ? '18px 16px' : '24px 28px',
            borderRadius: isMobile ? '20px' : '24px',
            background: 'var(--bg-surface-elevated)',
            border: '2px solid var(--border-medium)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: isMobile ? '42px' : '48px',
                  height: isMobile ? '42px' : '48px',
                  borderRadius: '14px',
                  background: 'linear-gradient(145deg, #0052F5 0%, #002D8A 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  flexShrink: 0,
                }}
              >
                <Eye size={isMobile ? 20 : 24} />
              </div>
              <div>
                <h2 style={{ fontSize: isMobile ? '1.1rem' : '1.3rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)' }}>
                  Pusat Aksesibilitas & Kenyamanan
                </h2>
                <p style={{ fontSize: isMobile ? '0.74rem' : '0.82rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                  Kustomisasi live untuk ukuran teks, kontras, font, filter warna, dan pembaca layar audio.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                resetSettings();
                addToast('Pengaturan Direset', 'Seluruh preferensi aksesibilitas telah dikembalikan ke default.', 'info');
              }}
              className="btn btn-glass btn-sm btn-press"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, padding: '8px 14px' }}
            >
              <RotateCcw size={14} />
              <span>Reset Default</span>
            </button>
          </div>

          {/* Quick Status Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge-glass" style={{ fontSize: '0.72rem', padding: '4px 10px', borderRadius: 'var(--radius-pill)', fontWeight: 700 }}>
              Ukuran Font: <strong>{settings.fontSize}%</strong>
            </span>
            <span className={settings.highContrast ? 'badge-orange' : 'badge-glass'} style={{ fontSize: '0.72rem', padding: '4px 10px', borderRadius: 'var(--radius-pill)', fontWeight: 700 }}>
              Kontras: <strong>{settings.highContrast ? 'Tinggi' : 'Normal'}</strong>
            </span>
            <span className={settings.dyslexicFont ? 'badge-blue' : 'badge-glass'} style={{ fontSize: '0.72rem', padding: '4px 10px', borderRadius: 'var(--radius-pill)', fontWeight: 700 }}>
              Font: <strong>{settings.dyslexicFont ? 'Ramah Disleksia' : 'Standar'}</strong>
            </span>
            <span className={settings.reducedMotion ? 'badge-orange' : 'badge-glass'} style={{ fontSize: '0.72rem', padding: '4px 10px', borderRadius: 'var(--radius-pill)', fontWeight: 700 }}>
              Animasi: <strong>{settings.reducedMotion ? 'Dimatikan' : 'Aktif'}</strong>
            </span>
            {settings.colorFilter !== 'none' && (
              <span className="badge-orange" style={{ fontSize: '0.72rem', padding: '4px 10px', borderRadius: 'var(--radius-pill)', fontWeight: 700 }}>
                Filter: <strong>{settings.colorFilter.toUpperCase()}</strong>
              </span>
            )}
          </div>

          {/* Preset Cards Grid */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Pilihan Mode Cepat:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '10px' }}>
              {samplePresets.map((preset) => {
                const Icon = preset.icon;
                return (
                  <div
                    key={preset.id}
                    onClick={() => {
                      applyPreset(preset.id);
                      addToast('Preset Diterapkan', `${preset.title} telah aktif.`, 'success');
                    }}
                    className="glass-card btn-press"
                    style={{
                      padding: '12px 14px',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      border: '2px solid var(--border-medium)',
                      background: 'var(--bg-surface)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: getSingleColorGradient(preset.color),
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {preset.title}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                        {preset.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================
            2. CATEGORY TABS
            ========================================================= */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '4px',
            scrollbarWidth: 'none',
          }}
        >
          {[
            { id: 'all', label: 'Semua Opsi', icon: Sliders },
            { id: 'text', label: 'Teks & Font', icon: Type },
            { id: 'visual', label: 'Kontras & Warna', icon: Contrast },
            { id: 'nav', label: 'Navigasi & Kursor', icon: MousePointer },
            { id: 'tts', label: 'Pembaca Layar', icon: Volume2 },
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`btn-press ${isActive ? 'btn-primary-orange' : 'btn-glass'}`}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: `2px solid ${isActive ? 'var(--color-orange)' : 'var(--border-medium)'}`,
                }}
              >
                <TabIcon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================
            3. MAIN CONTENT: SETTINGS & LIVE INTERACTIVE SANDBOX
            ========================================================= */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.15fr 0.85fr', gap: isMobile ? '16px' : '24px' }}>

          {/* Left Column: Interactive Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Section A: Text & Typography */}
            {(activeTab === 'all' || activeTab === 'text') && (
              <div
                className="glass-card"
                style={{
                  padding: '20px',
                  borderRadius: '20px',
                  background: 'var(--bg-surface)',
                  border: '2px solid var(--border-medium)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '10px',
                      background: 'var(--color-orange-subtle)',
                      color: 'var(--color-orange)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Type size={17} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '0.96rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                      Teks & Tipografi
                    </h3>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Skala pembesaran font & gaya keterbacaan</span>
                  </div>
                </div>

                {/* Font Scaling Buttons */}
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                    Ukuran Skala Teks Website:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '6px' }}>
                    {fontOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setFontSize(opt.value);
                          addToast('Ukuran Font Diubah', `Skala diatur ke ${opt.label}`, 'info');
                        }}
                        className={`btn-press ${settings.fontSize === opt.value ? 'badge-orange' : 'badge-glass'}`}
                        style={{
                          padding: '10px 8px',
                          borderRadius: '12px',
                          border: `2px solid ${settings.fontSize === opt.value ? 'var(--color-orange)' : 'var(--border-subtle)'}`,
                          textAlign: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ fontSize: '0.84rem', fontWeight: 800 }}>{opt.value}%</div>
                        <div style={{ fontSize: '0.66rem', opacity: 0.8 }}>{opt.label.split(' ')[0]}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dyslexic Font Toggle */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    background: 'var(--bg-surface-elevated)',
                    border: '2px solid var(--border-subtle)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 800 }}>Font Ramah Disleksia</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Tipografi dengan keterbacaan tinggi</div>
                  </div>
                  <button
                    onClick={() => {
                      setDyslexicFont(!settings.dyslexicFont);
                      addToast('Font Disleksia', !settings.dyslexicFont ? 'Diaktifkan' : 'Dinonaktifkan', 'info');
                    }}
                    className={`btn btn-sm btn-press ${settings.dyslexicFont ? 'btn-primary-orange' : 'btn-glass'}`}
                    style={{ minWidth: '76px', padding: '6px 12px', fontSize: '0.76rem' }}
                  >
                    {settings.dyslexicFont ? 'Aktif' : 'Nonaktif'}
                  </button>
                </div>

                {/* Wide Spacing Toggle */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    background: 'var(--bg-surface-elevated)',
                    border: '2px solid var(--border-subtle)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 800 }}>Jarak Teks & Baris Luas</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Meningkatkan tinggi baris & spasi huruf</div>
                  </div>
                  <button
                    onClick={() => {
                      setWideLetterSpacing(!settings.wideLetterSpacing);
                      addToast('Jarak Teks', !settings.wideLetterSpacing ? 'Diaktifkan' : 'Dinonaktifkan', 'info');
                    }}
                    className={`btn btn-sm btn-press ${settings.wideLetterSpacing ? 'btn-primary-orange' : 'btn-glass'}`}
                    style={{ minWidth: '76px', padding: '6px 12px', fontSize: '0.76rem' }}
                  >
                    {settings.wideLetterSpacing ? 'Aktif' : 'Nonaktif'}
                  </button>
                </div>
              </div>
            )}

            {/* Section B: Contrast & Visuals */}
            {(activeTab === 'all' || activeTab === 'visual') && (
              <div
                className="glass-card"
                style={{
                  padding: '20px',
                  borderRadius: '20px',
                  background: 'var(--bg-surface)',
                  border: '2px solid var(--border-medium)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '10px',
                      background: 'var(--color-blue-subtle)',
                      color: 'var(--color-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Contrast size={17} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '0.96rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                      Kontras & Filter Visual
                    </h3>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Ketegasan visual & filter spektrum warna</span>
                  </div>
                </div>

                {/* High Contrast Toggle */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    background: 'var(--bg-surface-elevated)',
                    border: '2px solid var(--border-subtle)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 800 }}>Mode Kontras Tinggi</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Mempertegas teks & batas elemen</div>
                  </div>
                  <button
                    onClick={() => {
                      setHighContrast(!settings.highContrast);
                      addToast('Kontras Tinggi', !settings.highContrast ? 'Diaktifkan' : 'Dinonaktifkan', 'info');
                    }}
                    className={`btn btn-sm btn-press ${settings.highContrast ? 'btn-primary-orange' : 'btn-glass'}`}
                    style={{ minWidth: '76px', padding: '6px 12px', fontSize: '0.76rem' }}
                  >
                    {settings.highContrast ? 'Aktif' : 'Nonaktif'}
                  </button>
                </div>

                {/* Reduced Motion Toggle */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    background: 'var(--bg-surface-elevated)',
                    border: '2px solid var(--border-subtle)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 800 }}>Kurangi Animasi Gerak</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Hentikan putaran piringan & efek gerak</div>
                  </div>
                  <button
                    onClick={() => {
                      setReducedMotion(!settings.reducedMotion);
                      addToast('Animasi Gerak', !settings.reducedMotion ? 'Dimatikan' : 'Diaktifkan', 'info');
                    }}
                    className={`btn btn-sm btn-press ${settings.reducedMotion ? 'btn-primary-orange' : 'btn-glass'}`}
                    style={{ minWidth: '76px', padding: '6px 12px', fontSize: '0.76rem' }}
                  >
                    {settings.reducedMotion ? 'Aktif' : 'Nonaktif'}
                  </button>
                </div>

                {/* Color Blind Filters */}
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                    Filter Buta Warna / Monokrom:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '8px' }}>
                    {colorFilterOptions.map((cf) => (
                      <button
                        key={cf.id}
                        onClick={() => {
                          setColorFilter(cf.id);
                          addToast('Filter Warna Diatur', cf.label, 'info');
                        }}
                        className={`btn-press ${settings.colorFilter === cf.id ? 'badge-orange' : 'badge-glass'}`}
                        style={{
                          padding: '8px 10px',
                          borderRadius: '12px',
                          border: `2px solid ${settings.colorFilter === cf.id ? 'var(--color-orange)' : 'var(--border-subtle)'}`,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        <div
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: cf.color,
                            flexShrink: 0,
                          }}
                        />
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ fontSize: '0.78rem', fontWeight: 800 }}>{cf.label}</div>
                          <div style={{ fontSize: '0.64rem', opacity: 0.8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {cf.desc}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Section C: Navigation & Focus */}
            {(activeTab === 'all' || activeTab === 'nav') && (
              <div
                className="glass-card"
                style={{
                  padding: '20px',
                  borderRadius: '20px',
                  background: 'var(--bg-surface)',
                  border: '2px solid var(--border-medium)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '10px',
                      background: 'rgba(16, 185, 129, 0.12)',
                      color: '#10B981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MousePointer size={17} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '0.96rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                      Navigasi & Interaksi
                    </h3>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Sorotan elemen yang dapat diklik & ukuran kursor</span>
                  </div>
                </div>

                {/* Highlight Links */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    background: 'var(--bg-surface-elevated)',
                    border: '2px solid var(--border-subtle)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 800 }}>Sorot Semua Tautan</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Garis bawah dan outline fokus tebal</div>
                  </div>
                  <button
                    onClick={() => {
                      setHighlightLinks(!settings.highlightLinks);
                      addToast('Sorotan Tautan', !settings.highlightLinks ? 'Diaktifkan' : 'Dinonaktifkan', 'info');
                    }}
                    className={`btn btn-sm btn-press ${settings.highlightLinks ? 'btn-primary-orange' : 'btn-glass'}`}
                    style={{ minWidth: '76px', padding: '6px 12px', fontSize: '0.76rem' }}
                  >
                    {settings.highlightLinks ? 'Aktif' : 'Nonaktif'}
                  </button>
                </div>

                {/* Large Cursor */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    background: 'var(--bg-surface-elevated)',
                    border: '2px solid var(--border-subtle)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 800 }}>Kursor Aksesibilitas Besar</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Ukuran kursor mouse besar & kontras tinggi</div>
                  </div>
                  <button
                    onClick={() => {
                      setLargeCursor(!settings.largeCursor);
                      addToast('Kursor Besar', !settings.largeCursor ? 'Diaktifkan' : 'Dinonaktifkan', 'info');
                    }}
                    className={`btn btn-sm btn-press ${settings.largeCursor ? 'btn-primary-orange' : 'btn-glass'}`}
                    style={{ minWidth: '76px', padding: '6px 12px', fontSize: '0.76rem' }}
                  >
                    {settings.largeCursor ? 'Aktif' : 'Nonaktif'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Sandbox Preview & Speech Reader */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Live Interactive Sandbox Card */}
            <div
              className="glass-card"
              style={{
                padding: '20px',
                borderRadius: '20px',
                background: 'var(--bg-surface-elevated)',
                border: '2px solid var(--border-medium)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} className="text-orange" />
                  <h3 style={{ fontSize: '0.94rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                    Pratinjau Langsung (Live Preview)
                  </h3>
                </div>
                <span className="badge-orange" style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '6px' }}>
                  Live Sandbox
                </span>
              </div>

              {/* Sample Box */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  background: 'var(--bg-surface)',
                  border: '2px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                  Rasfalz Studio • Creative Hub
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  Ini adalah contoh paragraf dinamis. Semua penyesuaian ukuran teks, font ramah disleksia, dan spasi baris langsung terlihat di kotak ini.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px', flexWrap: 'wrap' }}>
                  <a
                    href="#preview"
                    onClick={(e) => e.preventDefault()}
                    style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-blue)' }}
                  >
                    Contoh Tautan Link Aktif →
                  </a>
                  <button
                    className="btn btn-primary-orange btn-sm"
                    style={{ fontSize: '0.76rem', padding: '6px 12px' }}
                  >
                    Contoh Tombol
                  </button>
                </div>
              </div>
            </div>

            {/* Section D: Screen Reader (Text-to-Speech) */}
            {(activeTab === 'all' || activeTab === 'tts') && (
              <div
                className="glass-card"
                style={{
                  padding: '20px',
                  borderRadius: '20px',
                  background: 'var(--bg-surface)',
                  border: '2px solid var(--border-medium)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '10px',
                        background: isSpeaking ? 'var(--color-orange)' : 'var(--color-orange-subtle)',
                        color: isSpeaking ? '#FFFFFF' : 'var(--color-orange)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Volume2 size={18} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '0.94rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                        Pembaca Layar Audio Live
                      </h3>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Sintesis suara browser (Bahasa Indonesia)</span>
                    </div>
                  </div>

                  {isSpeaking && (
                    <span className="badge-orange" style={{ fontSize: '0.68rem', padding: '3px 8px', borderRadius: '6px' }}>
                      Sedang Membaca...
                    </span>
                  )}
                </div>

                {/* Quick Sentences Selector */}
                <div>
                  <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Pilih Teks Cepat:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {speechPresets.map((sp, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setCustomSpeakText(sp.text);
                          speakText(sp.text);
                        }}
                        className="btn-press badge-glass"
                        style={{
                          padding: '8px 10px',
                          borderRadius: '10px',
                          border: '2px solid var(--border-subtle)',
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '6px',
                        }}
                      >
                        <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{sp.label}</span>
                        <Play size={12} className="text-orange" fill="currentColor" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Textarea for Speech */}
                <div>
                  <textarea
                    value={customSpeakText}
                    onChange={(e) => setCustomSpeakText(e.target.value)}
                    rows={3}
                    placeholder="Tulis kalimat di sini untuk dibacakan..."
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      background: 'var(--bg-surface-elevated)',
                      border: '2px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                      fontSize: '0.82rem',
                      lineHeight: 1.4,
                      resize: 'none',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Audio Action Buttons */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  {!isSpeaking ? (
                    <button
                      onClick={() => speakText(customSpeakText)}
                      className="btn btn-primary-orange btn-sm hover-lift"
                      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px' }}
                    >
                      <Play size={14} fill="currentColor" />
                      <span>Mulai Membaca Teks</span>
                    </button>
                  ) : (
                    <button
                      onClick={stopSpeaking}
                      className="btn btn-danger btn-sm"
                      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', background: '#EF4444', color: '#FFF' }}
                    >
                      <Square size={14} fill="currentColor" />
                      <span>Hentikan Suara</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};

export default AccessibilityPage;
