import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { AppSquircleIcon } from '../common/AppSquircleIcon';
import {
  Briefcase,
  User,
  ShoppingBag,
  Film,
  Users,
  HeartHandshake,
  FileText,
  MessageSquare,
  Store,
  Image,
  Music,
  Camera,
  Search,
  X,
  Sparkles,
  LayoutGrid,
  Newspaper,
  Eye,
  Gamepad2,
  Folder,
} from 'lucide-react';

export const APP_REGISTRY = [
  { id: 'portfolio', name: 'Portfolio', icon: Briefcase, category: 'Works', color: '#0052F5', desc: 'Galeri portofolio karya & proyek kreatif' },
  { id: 'news', name: 'News & Promo', icon: Newspaper, category: 'Media', color: '#FF9C0F', desc: 'Warta resmi, promo komisi & diskon aplikasi' },
  { id: 'accessibility', name: 'Aksesibilitas', icon: Eye, category: 'System', color: '#0052F5', desc: 'Ukuran font, kontras, screen reader & navigasi' },
  { id: 'games', name: 'Arcade Games', icon: Gamepad2, category: 'Media', color: '#10B981', desc: 'Game Tic-Tac-Toe vs AI & Snake Arcade retro' },
  { id: 'about', name: 'About Me', icon: User, category: 'Creator', color: '#FF9C0F', desc: 'Profil, pengalaman, skills & creative journey' },
  { id: 'apps', name: 'Premium Apps', icon: ShoppingBag, category: 'Store', color: '#10B981', desc: 'Marketplace software & toolkit editing' },
  { id: 'commission', name: 'Commission', icon: Film, category: 'Services', color: '#FF9C0F', desc: 'Jasa video, photo editing & creative project' },
  { id: 'community', name: 'Community', icon: Users, category: 'Social', color: '#229ED9', desc: 'Grup WhatsApp & Telegram komunitas kreator' },
  { id: 'donation', name: 'Donation', icon: HeartHandshake, category: 'Support', color: '#FA9D24', desc: 'Dukung karya via Trakteer & Saweria' },
  { id: 'visual-identity', name: 'Visual Identity', icon: FileText, category: 'Brand', color: '#0052F5', desc: 'Brand guidelines, logo packs & design spec' },
  { id: 'contact', name: 'Contact Us', icon: MessageSquare, category: 'Social', color: '#25D366', desc: 'Hubungi via WhatsApp, Telegram & Email' },
  { id: 'shop', name: 'Online Shop', icon: Store, category: 'Store', color: '#EE4D2D', desc: 'Link belanja Gumroad, Shopee & Tokopedia' },
  { id: 'gallery', name: 'Gallery', icon: Image, category: 'Works', color: '#8B5CF6', desc: 'Masonry image collection & artwork preview' },
  { id: 'files', name: 'File Explorer', icon: Folder, category: 'System', color: '#0052F5', desc: 'File manager aset & portfolio master' },
  { id: 'music', name: 'Music Player', icon: Music, category: 'Media', color: '#FF9C0F', desc: 'Lo-Fi synthesizer & background audio hub' },
  { id: 'camera', name: 'Creative Camera', icon: Camera, category: 'Media', color: '#EC4899', desc: 'Photo booth interaktif dengan retro filter' },
];


export const AppLauncherModal = () => {
  const { appLauncherOpen, setAppLauncherOpen, openApp } = useOS();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!appLauncherOpen) return null;

  const categories = ['All', 'Works', 'Store', 'Services', 'Social', 'Brand', 'System', 'Media'];

  const filteredApps = APP_REGISTRY.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div
      className="animate-fade-in"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 1200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setAppLauncherOpen(false);
      }}
    >
      <div
        className="animate-scale-in"
        style={{
          width: '90vw',
          maxWidth: '860px',
          maxHeight: '85vh',
          background: 'var(--bg-surface-elevated)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '2px solid var(--border-medium)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-dock)',
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          overflow: 'hidden',
        }}
      >
        {/* Top Search & Close */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div className="search-bar" style={{ maxWidth: '100%' }}>
            <Search size={18} className="text-orange" />
            <input
              type="text"
              placeholder="Search apps, tools, portfolio & links..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            )}
          </div>
          <button
            onClick={() => setAppLauncherOpen(false)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div className="filter-pills" style={{ maxWidth: 'fit-content' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* App Icons Grid */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '16px',
            padding: '8px 4px',
          }}
        >
          {filteredApps.map(app => {
            const Icon = app.icon;
            return (
              <div
                key={app.id}
                onClick={() => {
                  openApp(app.id);
                  setAppLauncherOpen(false);
                }}
                className="glass-card btn-press hover-lift"
                style={{
                  padding: '20px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <AppSquircleIcon
                  icon={Icon}
                  color={app.color}
                  size={56}
                  iconSize={26}
                  borderRadius={18}
                />
                <div>
                  <h4 style={{ fontSize: '0.94rem', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>{app.name}</h4>
                  <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.3 }}>{app.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
