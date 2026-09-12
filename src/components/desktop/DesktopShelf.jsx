import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { useAudio } from '../../context/AudioContext';
import { useTheme } from '../../context/ThemeContext';
import { useDeviceStatus } from '../../context/DeviceStatusContext';
import { siteConfig } from '../../config/siteConfig';
import { InstagramIcon, YoutubeIcon, TikTokIcon } from '../common/BrandIcons';
import {
  Camera,
  Globe,
  MessageSquare,
  Image,
  Store,
  Wifi,
  WifiOff,
  Battery,
  BatteryCharging,
  BatteryMedium,
  BatteryLow,
  BatteryWarning,
  Sliders,
  Newspaper,
  Gamepad2,
  Eye,
  Music,
  Folder,
  Sun,
  Moon,
} from 'lucide-react';

export const DesktopShelf = () => {
  const {
    activeApp,
    openApp,
    setAppLauncherOpen,
    appLauncherOpen,
    setQuickSettingsOpen,
  } = useOS();
  const { isDark, toggleTheme } = useTheme();
  const { playSoundEffect } = useAudio();

  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(
        d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const { batteryLevel, isCharging, isOnline, networkLabel } = useDeviceStatus();

  // Adaptive Battery Icon for Desktop Tray
  const renderBatteryIcon = () => {
    if (isCharging) return <BatteryCharging size={14} className="text-orange" />;
    if (batteryLevel <= 15) return <BatteryWarning size={14} style={{ color: '#EF4444' }} />;
    if (batteryLevel <= 35) return <BatteryLow size={14} style={{ color: '#F59E0B' }} />;
    if (batteryLevel <= 70) return <BatteryMedium size={14} className="text-orange" />;
    return <Battery size={14} className="text-orange" />;
  };

  const shelfApps = [
    { id: 'camera', name: 'Camera Studio', icon: Camera, color: '#EC4899', gradient: 'linear-gradient(145deg, #EC4899 0%, #BE185D 100%)', isExternal: false },
    { id: 'news', name: 'Warta & Promo', icon: Newspaper, color: '#FF9C0F', gradient: 'linear-gradient(145deg, #FF9C0F 0%, #D97706 100%)', isExternal: false },
    { id: 'music', name: 'Music Player', icon: Music, color: '#FF9C0F', gradient: 'linear-gradient(145deg, #FF9C0F 0%, #B45309 100%)', isExternal: false },
    { id: 'games', name: 'Arcade Games', icon: Gamepad2, color: '#10B981', gradient: 'linear-gradient(145deg, #10B981 0%, #047857 100%)', isExternal: false },
    { id: 'accessibility', name: 'Pusat Aksesibilitas', icon: Eye, color: '#0052F5', gradient: 'linear-gradient(145deg, #0052F5 0%, #003ECC 100%)', isExternal: false },
    { id: 'portfolio', name: 'Portfolio Hub', icon: Globe, color: '#0052F5', gradient: 'linear-gradient(145deg, #0052F5 0%, #0036B8 100%)', isExternal: false },
    { id: 'contact', name: 'Contact Us', icon: MessageSquare, color: '#25D366', gradient: 'linear-gradient(145deg, #25D366 0%, #15803D 100%)', isExternal: false },
    { id: 'gallery', name: 'Gallery Collection', icon: Image, color: '#8B5CF6', gradient: 'linear-gradient(145deg, #8B5CF6 0%, #6D28D9 100%)', isExternal: false },
    { id: 'shop', name: 'Online Shop', icon: Store, color: '#EE4D2D', gradient: 'linear-gradient(145deg, #EE4D2D 0%, #C22A0D 100%)', isExternal: false },
    { id: 'files', name: 'File Explorer', icon: Folder, color: '#0052F5', gradient: 'linear-gradient(145deg, #0052F5 0%, #002D9C 100%)', isExternal: false },
    { id: 'tiktok', name: 'TikTok Portfolio', icon: TikTokIcon, color: '#00F2FE', gradient: 'linear-gradient(145deg, #00F2FE 0%, #0284C7 100%)', isExternal: true, url: siteConfig.socials.tiktok?.url || 'https://tiktok.com/@rasfalz.std' },
    { id: 'instagram', name: 'Instagram Visuals', icon: InstagramIcon, color: '#E1306C', gradient: 'linear-gradient(145deg, #E1306C 0%, #9D174D 100%)', isExternal: true, url: siteConfig.socials.instagram?.url || 'https://instagram.com/rasfalz.std' },
    { id: 'youtube', name: 'YouTube Channel', icon: YoutubeIcon, color: '#FF0000', gradient: 'linear-gradient(145deg, #FF0000 0%, #B91C1C 100%)', isExternal: true, url: siteConfig.socials.youtube?.url || 'https://www.youtube.com/@rasfalz-std' },
  ];

  return (
    <div className="desktop-shelf-container">
      <div className="desktop-shelf">
        {/* ChromeOS App Launcher Icon (Circular Button with Center Dot) */}
        <div className="tooltip-container">
          <button
            onClick={() => setAppLauncherOpen(!appLauncherOpen)}
            className={`shelf-launcher-btn btn-press ${appLauncherOpen ? 'active' : ''}`}
            aria-label="App Launcher"
            title="Chrome OS App Launcher"
          >
            <div className="shelf-launcher-dot" />
          </button>
          <span className="tooltip">Launcher</span>
        </div>

        <div className="shelf-divider" />

        {/* Shelf Pinned & Running Apps (Solid Squircle App Icons - No Outline) */}
        <div className="shelf-apps-row">
          {shelfApps.map((app) => {
            const Icon = app.icon;
            const isActive = activeApp === app.id;

            if (app.isExternal) {
              return (
                <div key={app.id} className="tooltip-container">
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shelf-app-icon btn-press"
                    style={{
                      '--app-accent': app.color,
                      '--app-gradient': app.gradient,
                      background: app.gradient || app.color,
                    }}
                    aria-label={app.name}
                  >
                    <Icon size={20} color="#FFFFFF" strokeWidth={2.4} style={{ filter: 'drop-shadow(0 1.5px 2px rgba(0,0,0,0.35))' }} />
                  </a>
                  <span className="tooltip">{app.name} ↗</span>
                </div>
              );
            }

            return (
              <div key={app.id} className="tooltip-container">
                <button
                  onClick={() => openApp(app.id)}
                  className={`shelf-app-icon btn-press ${isActive ? 'active' : ''}`}
                  style={{
                    '--app-accent': app.color,
                    '--app-gradient': app.gradient,
                    background: app.gradient || app.color,
                  }}
                  aria-label={app.name}
                >
                  <Icon size={20} color="#FFFFFF" strokeWidth={2.4} style={{ filter: 'drop-shadow(0 1.5px 2px rgba(0,0,0,0.35))' }} />
                </button>
                <span className="tooltip">{app.name}</span>
              </div>
            );
          })}
        </div>

        <div className="shelf-divider" />

        {/* Quick Theme Switcher Button */}
        <div className="tooltip-container">
          <button
            onClick={() => {
              playSoundEffect?.('click');
              toggleTheme();
            }}
            className="shelf-system-tray btn-press"
            style={{
              padding: '6px 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isDark ? 'var(--color-orange)' : 'var(--color-blue)',
            }}
            aria-label="Toggle Theme"
            title={isDark ? 'Beralih ke Mode Terang (Light Mode)' : 'Beralih ke Mode Gelap (Dark Mode)'}
          >
            {isDark ? <Sun size={15} className="text-orange" /> : <Moon size={15} className="text-blue" />}
          </button>
          <span className="tooltip">{isDark ? 'Mode Terang' : 'Mode Gelap'}</span>
        </div>

        {/* Chrome OS System Tray (Clock, Battery, Network, Settings) */}
        <div className="tooltip-container">
          <div
            className="shelf-system-tray btn-press"
            onClick={() => setQuickSettingsOpen((prev) => !prev)}
            title={`Baterai: ${batteryLevel}% ${isCharging ? '(Mengisi)' : ''} | Jaringan: ${networkLabel}`}
          >
            {isOnline ? (
              <Wifi size={14} className="text-blue" />
            ) : (
              <WifiOff size={14} style={{ color: '#EF4444' }} />
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {renderBatteryIcon()}
              <span style={{ fontSize: '0.74rem', fontWeight: 700 }}>{batteryLevel}%</span>
            </div>
            <span className="tray-time">{timeStr}</span>
            <Sliders size={14} style={{ color: 'var(--text-muted)' }} />
          </div>
          <span className="tooltip">Status: {batteryLevel}% • {networkLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default DesktopShelf;
