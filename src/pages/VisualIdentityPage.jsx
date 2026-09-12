import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { WindowFrame } from '../components/common/WindowFrame';
import { Lightbox } from '../components/common/Lightbox';
import { useOS } from '../context/OSContext';
import {
  FileText,
  Download,
  Eye,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Layers,
  Palette,
  Type,
  FileCode,
  HardDrive,
  Cloud,
  Share2,
  BookOpen,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

export const VisualIdentityPage = () => {
  const { addToast, isMobile } = useOS();
  const [copiedHex, setCopiedHex] = useState(null);
  const [copiedDocId, setCopiedDocId] = useState(null);
  const [activePreviewDoc, setActivePreviewDoc] = useState(null);

  const brandColors = [
    { name: 'Primary Orange', hex: '#FF9C0F', rgb: 'rgb(255, 156, 15)', role: 'Accent utama, tombol CTA, highlight, icon aktif' },
    { name: 'Primary Blue', hex: '#0052F5', rgb: 'rgb(0, 82, 245)', role: 'Secondary accent, link hover, network & badges' },
    { name: 'Light Mode Background', hex: '#F8F8FF', rgb: 'rgb(248, 248, 255)', role: 'Canvas dasar tema terang (Ghost White)' },
    { name: 'Dark Mode Background', hex: '#191919', rgb: 'rgb(25, 25, 25)', role: 'Canvas dasar tema gelap (Matte Jet Charcoal)' },
  ];

  const copyColor = (hex, name) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    addToast('Color Copied!', `${name} (${hex}) tersalin ke clipboard.`, 'success');
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const copyDocLink = (url, name, id) => {
    if (!url || url === '#') {
      addToast('Informasi', `Link dokumen ${name} sedang dipersiapkan di Google Drive.`, 'info');
      return;
    }
    navigator.clipboard.writeText(url);
    setCopiedDocId(id);
    addToast('Link Tersalin!', `Tautan Google Drive untuk ${name} berhasil disalin.`, 'success');
    setTimeout(() => setCopiedDocId(null), 2000);
  };

  // Master Brand Guideline document (primary showcase)
  const masterGuidelineDoc = siteConfig.visualIdentityDocs[0];

  return (
    <WindowFrame title="Visual Identity & Brand Assets" icon={FileText} badgeText="Brand Specs v2.5">
      <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '24px' : '36px' }}>
        
        {/* ────────────────────────────────────────────
            1. HEADER HERO
        ──────────────────────────────────────────── */}
        <div
          className="glass-card"
          style={{
            padding: isMobile ? '20px 18px' : '30px 32px',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--bg-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            border: '2px solid var(--border-medium)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-orange" style={{ fontSize: isMobile ? '0.65rem' : '0.72rem' }}>Design System</span>
              <span className="badge badge-blue" style={{ fontSize: isMobile ? '0.65rem' : '0.72rem' }}>Official Specification</span>
              <span className="badge badge-glass" style={{ fontSize: isMobile ? '0.65rem' : '0.72rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Cloud size={11} className="text-orange" />
                <span>Google Drive Connected</span>
              </span>
            </div>
            <h1 style={{ fontSize: isMobile ? '1.3rem' : '1.85rem', marginBottom: '6px', lineHeight: '1.2' }}>
              Rasfalz Studio <span className="text-gradient">Visual Identity &amp; Guidelines</span>
            </h1>
            <p style={{ maxWidth: '680px', margin: 0, fontSize: isMobile ? '0.84rem' : '0.92rem', color: 'var(--text-secondary)' }}>
              Pusat pedoman identitas visual resmi, berkas dokumen brand guidelines yang terhubung langsung dengan Google Drive, spesifikasi palet warna, dan hierarki tipografi.
            </p>
          </div>
        </div>

        {/* ────────────────────────────────────────────
            2. OFFICIAL COLOR PALETTE TOKENS
        ──────────────────────────────────────────── */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <Palette size={isMobile ? 18 : 20} className="text-orange" />
            <h2 style={{ fontSize: isMobile ? '1.15rem' : '1.4rem', margin: 0, lineHeight: '1.3' }}>
              Official Color Palette &amp; Hex Tokens
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
            {brandColors.map((col) => (
              <div
                key={col.hex}
                className="glass-card hover-lift"
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    height: '110px',
                    borderRadius: 'var(--radius-lg)',
                    background: col.hex,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                    border: '2px solid rgba(255,255,255,0.1)',
                  }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '1.05rem', margin: 0 }}>{col.name}</h3>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '4px 0 10px 0', lineHeight: '1.4' }}>
                    {col.role}
                  </p>

                  <button
                    onClick={() => copyColor(col.hex, col.name)}
                    className="btn btn-glass btn-sm hover-lift"
                    style={{ width: '100%', justifyContent: 'space-between', fontSize: '0.82rem' }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{col.hex}</span>
                    {copiedHex === col.hex ? <Check size={14} className="text-orange" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ────────────────────────────────────────────
            3. TYPOGRAPHY & HIERARCHY STANDARDS
        ──────────────────────────────────────────── */}
        <div className="glass-card" style={{ padding: isMobile ? '20px 18px' : '28px 32px', borderRadius: 'var(--radius-xl)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <Type size={20} className="text-blue" />
            <h2 style={{ fontSize: isMobile ? '1.15rem' : '1.35rem', margin: 0 }}>Typography &amp; Hierarchy Standards</h2>
          </div>
          <p style={{ marginBottom: '22px', maxWidth: '720px', fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
            Standar tipografi Rasfalz Studio dibagi menjadi dua fungsi utama: <strong>Laro Soft (Bold &amp; Medium)</strong> khusus digunakan untuk logo branding dan signature wordmark resmi, sedangkan <strong>Creato Display</strong> (Headline/Display) dan <strong>Poppins</strong> (Body Text &amp; UI) digunakan untuk struktur antarmuka dan konten website.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {/* 1. Laro Soft (Logo Branding) */}
            <div
              style={{
                padding: '20px',
                background: 'linear-gradient(145deg, rgba(255, 156, 15, 0.08) 0%, var(--bg-surface) 100%)',
                borderRadius: 'var(--radius-lg)',
                border: '2px solid rgba(255, 156, 15, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <span className="badge badge-orange" style={{ fontSize: '0.68rem', fontWeight: 800 }}>
                    Logo Branding Font
                  </span>
                  <span className="badge badge-glass" style={{ fontSize: '0.65rem' }}>
                    Official Wordmark
                  </span>
                </div>
                <h3 style={{ fontSize: '1.45rem', margin: '4px 0', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  Laro Soft (Bold &amp; Medium)
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '6px 0 0 0', lineHeight: 1.45 }}>
                  Disesuaikan khusus untuk identitas logo branding Rasfalz Studio, signature wordmark, dan logogram utama agar memiliki karakter visual yang modern, solid, dan berdaya ingat tinggi.
                </p>
              </div>
              <div style={{ background: 'var(--bg-surface)', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '2px solid var(--border-medium)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                <strong>Varian:</strong> Laro Soft Bold (Wordmark Logo), Laro Soft Medium (Tagline &amp; Sub-brand)
              </div>
            </div>

            {/* 2. Creato Display (Website Display) */}
            <div
              style={{
                padding: '20px',
                background: 'linear-gradient(145deg, rgba(0, 82, 245, 0.06) 0%, var(--bg-surface) 100%)',
                borderRadius: 'var(--radius-lg)',
                border: '2px solid rgba(0, 82, 245, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <span className="badge badge-blue" style={{ fontSize: '0.68rem', fontWeight: 800 }}>
                    Website Display Font
                  </span>
                  <span className="badge badge-glass" style={{ fontSize: '0.65rem' }}>
                    Headline UI
                  </span>
                </div>
                <h3 style={{ fontSize: '1.45rem', margin: '4px 0', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Creato Display (Bold)
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '6px 0 0 0', lineHeight: 1.45 }}>
                  Disesuaikan untuk jenis font tampilan website pada judul hero, heading banner, nama fitur aplikasi, dan tipografi display antarmuka OS website.
                </p>
              </div>
              <div style={{ background: 'var(--bg-surface)', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '2px solid var(--border-medium)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                <strong>Varian:</strong> Creato Display Bold, ExtraBold (Hero Titles &amp; OS Widget Headers)
              </div>
            </div>

            {/* 3. Poppins (Website Body & UI) */}
            <div
              style={{
                padding: '20px',
                background: 'var(--bg-surface)',
                borderRadius: 'var(--radius-lg)',
                border: '2px solid var(--border-medium)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <span className="badge badge-glass" style={{ fontSize: '0.68rem', fontWeight: 800 }}>
                    Website Body &amp; UI Font
                  </span>
                  <span className="badge badge-neutral" style={{ fontSize: '0.65rem' }}>
                    Content &amp; Text
                  </span>
                </div>
                <h3 style={{ fontSize: '1.35rem', margin: '4px 0', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Poppins (Regular &amp; Medium)
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '6px 0 0 0', lineHeight: 1.45 }}>
                  Disesuaikan untuk keterbacaan optimal pada teks isi website, deskripsi proyek, artikel berita, label tombol, dan dokumen panduan pengguna.
                </p>
              </div>
              <div style={{ background: 'var(--bg-surface)', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '2px solid var(--border-medium)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                <strong>Varian:</strong> Poppins Regular (Body Copy), Poppins Medium/SemiBold (Interactive UI &amp; Badges)
              </div>
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────
            4. BRAND GUIDELINES & CLOUD ASSET FILES (AT THE VERY BOTTOM)
        ──────────────────────────────────────────── */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BookOpen size={isMobile ? 18 : 22} className="text-orange" />
              <h2 style={{ fontSize: isMobile ? '1.15rem' : '1.4rem', margin: 0, lineHeight: '1.3' }}>
                Brand Guidelines &amp; Cloud Asset Files
              </h2>
            </div>
            <span
              className="badge badge-orange"
              style={{
                fontSize: '0.68rem',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
              }}
            >
              <HardDrive size={12} />
              <span>Akses Cloud Google Drive</span>
            </span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '18px', maxWidth: '720px' }}>
            Dokumen resmi panduan merek dan aset grafis Rasfalz Studio dapat dibaca, dipratinjau, atau diakses langsung dalam resolusi penuh melalui tautan resmi Google Drive di bawah ini.
          </p>

          {/* FEATURED MASTER SHOWCASE CARD (Master Brand Guidelines) */}
          {masterGuidelineDoc && (
            <div
              className="glass-card hover-lift"
              style={{
                borderRadius: isMobile ? '16px' : '22px',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(255, 156, 15, 0.07) 0%, rgba(0, 82, 245, 0.05) 100%), var(--bg-surface)',
                border: '2px solid rgba(255, 156, 15, 0.4)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                marginBottom: '4px',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '280px 1fr',
                  alignItems: 'stretch',
                }}
              >
                {/* Visual Cover Preview */}
                <div
                  style={{
                    position: 'relative',
                    minHeight: isMobile ? '200px' : '280px',
                    background: 'rgba(0,0,0,0.2)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onClick={() => setActivePreviewDoc(masterGuidelineDoc)}
                  title="Klik untuk melihat pratinjau cover dokumen"
                >
                  <img
                    src={masterGuidelineDoc.previewImg}
                    alt={masterGuidelineDoc.name}
                    className="hover-scale"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    <span className="badge badge-orange" style={{ fontSize: '0.66rem', fontWeight: 800 }}>
                      Official Brand Book
                    </span>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: 'rgba(25, 25, 25, 0.85)',
                      backdropFilter: 'blur(10px)',
                      color: '#fff',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-pill)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      border: '2px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    <Eye size={12} />
                    <span>Preview Cover</span>
                  </div>
                </div>

                {/* Content & Direct Drive Action */}
                <div
                  style={{
                    padding: isMobile ? '18px' : '26px 30px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <span className="badge badge-orange" style={{ fontSize: '0.74rem' }}>
                        {masterGuidelineDoc.type}
                      </span>
                      <span className="badge badge-glass" style={{ fontSize: '0.74rem', color: 'var(--color-orange)', fontWeight: 700 }}>
                        {masterGuidelineDoc.size}
                      </span>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        Diperbarui: {masterGuidelineDoc.updated}
                      </span>
                    </div>

                    <h3 style={{ fontSize: isMobile ? '1.05rem' : '1.4rem', fontWeight: 900, margin: '0 0 8px 0', lineHeight: 1.25 }}>
                      {masterGuidelineDoc.name}
                    </h3>

                    <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 16px 0' }}>
                      {masterGuidelineDoc.description}
                    </p>

                    {/* Feature Specs Badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                      <span className="badge badge-neutral" style={{ fontSize: '0.74rem' }}>
                        📖 Standar Logo &amp; Clearspace
                      </span>
                      <span className="badge badge-neutral" style={{ fontSize: '0.74rem' }}>
                        🎨 Palet Warna CMYK, RGB &amp; HEX
                      </span>
                      <span className="badge badge-neutral" style={{ fontSize: '0.74rem' }}>
                        🔤 Hierarki Tipografi Resmi
                      </span>
                      <span className="badge badge-neutral" style={{ fontSize: '0.74rem' }}>
                        ☁️ Google Drive Direct Link
                      </span>
                    </div>
                  </div>

                  {/* Actions Group */}
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                    {masterGuidelineDoc.downloadUrl && masterGuidelineDoc.downloadUrl !== '#' ? (
                      <a
                        href={masterGuidelineDoc.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary-orange hover-lift"
                        style={{
                          flex: isMobile ? '1 1 100%' : 'initial',
                          padding: '9px 20px',
                          fontSize: '0.88rem',
                          fontWeight: 800,
                          textDecoration: 'none',
                          justifyContent: 'center',
                          boxShadow: '0 4px 16px rgba(255, 156, 15, 0.35)',
                        }}
                      >
                        <HardDrive size={16} />
                        <span>Buka di Google Drive</span>
                        <ArrowUpRight size={15} />
                      </a>
                    ) : (
                      <button
                        onClick={() => setActivePreviewDoc(masterGuidelineDoc)}
                        className="btn btn-primary-orange hover-lift"
                        style={{ flex: isMobile ? '1 1 100%' : 'initial', fontSize: '0.88rem' }}
                      >
                        <Eye size={16} />
                        <span>Preview Dokumen</span>
                      </button>
                    )}

                    <button
                      onClick={() => setActivePreviewDoc(masterGuidelineDoc)}
                      className="btn btn-glass hover-lift"
                      style={{
                        flex: isMobile ? '1 1 auto' : 'initial',
                        fontSize: '0.88rem',
                        justifyContent: 'center',
                      }}
                    >
                      <Eye size={15} />
                      <span>Lihat Cover</span>
                    </button>

                    <button
                      onClick={() => copyDocLink(masterGuidelineDoc.downloadUrl, masterGuidelineDoc.name, masterGuidelineDoc.id)}
                      className="btn btn-glass hover-lift"
                      style={{
                        flex: isMobile ? '1 1 auto' : 'initial',
                        fontSize: '0.88rem',
                        justifyContent: 'center',
                      }}
                      title="Salin Tautan Google Drive"
                    >
                      {copiedDocId === masterGuidelineDoc.id ? (
                        <>
                          <Check size={15} className="text-orange" />
                          <span className="text-orange">Link Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Share2 size={15} />
                          <span>Salin Link Drive</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Document Lightbox Preview */}
      {activePreviewDoc && (
        <Lightbox
          isOpen={Boolean(activePreviewDoc)}
          image={activePreviewDoc.previewImg}
          title={activePreviewDoc.name}
          caption={`${activePreviewDoc.type} • ${activePreviewDoc.size} • Diperbarui: ${activePreviewDoc.updated}`}
          onClose={() => setActivePreviewDoc(null)}
        />
      )}
    </WindowFrame>
  );
};

export default VisualIdentityPage;

