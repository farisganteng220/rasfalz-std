import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAudio } from './AudioContext';
import { siteConfig } from '../config/siteConfig';

const OSContext = createContext();

export const OSProvider = ({ children }) => {
  const { playSoundEffect } = useAudio();
  const [activeApp, setActiveApp] = useState('home');
  const [windowState, setWindowState] = useState('normal'); // 'normal' | 'maximized' | 'minimized'
  const [isWindowed, setIsWindowed] = useState(true);
  const [quickSettingsOpen, setQuickSettingsOpen] = useState(false);
  const [appLauncherOpen, setAppLauncherOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [accessibilityModalOpen, setAccessibilityModalOpen] = useState(false);
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [activeNewsItem, setActiveNewsItem] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [osModeOverride, setOsModeOverride] = useState('auto'); // 'auto' | 'desktop' | 'mobile'
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Synthesized notification chime
  const playNotificationChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const now = ctx.currentTime;

        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(587.33, now); // D5
        osc1.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
        gain1.gain.setValueAtTime(0.2, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.45);

        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(880, now + 0.1);
        osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.25); // D6
        gain2.gain.setValueAtTime(0.15, now + 0.1);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.1);
        osc2.stop(now + 0.55);
      }
    } catch (e) {
      playSoundEffect('open');
    }
  };

  const markNotifAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const toggleNotifRead = (id) => {
    playSoundEffect('click');
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const deleteNotif = (id) => {
    playSoundEffect('click');
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAllNotifsAsRead = () => {
    playSoundEffect('click');
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('Semua Dibaca', 'Semua notifikasi telah ditandai sebagai dibaca.', 'success');
  };

  const clearAllNotifs = () => {
    playSoundEffect('click');
    setNotifications([]);
    addToast('Notifikasi Dihapus', 'Semua notifikasi telah dibersihkan.', 'info');
  };

  const resetNotificationsToDefault = () => {
    playSoundEffect('open');
    const defaults = siteConfig.initialNotifications || [];
    setNotifications(defaults);
    addToast('Notifikasi Direset', 'Daftar notifikasi dipulihkan ke data standar sistem.', 'success');
  };

  const addNotification = ({ title, message, type = 'update', category = 'Update Fitur', targetApp, actionLabel }) => {
    playNotificationChime();
    const newNotif = {
      id: `notif-${Date.now()}`,
      title,
      message,
      type,
      category,
      targetApp,
      actionLabel,
      time: 'Baru saja',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    addToast(title, message, type === 'promo' ? 'warning' : 'info');
  };

  const triggerSampleNotification = () => {
    playNotificationChime();
    const sampleOptions = [
      {
        title: '🔥 Promo Diskon 30% Terbatas!',
        message: 'Klaim diskon 30% paket video editing reels & motion graphics hari ini.',
        type: 'promo',
        category: 'Info Promosi',
        targetApp: 'commission',
        actionLabel: 'Klaim Diskon',
      },
      {
        title: '🚀 Rilis Update Fitur Baru',
        message: 'Coba Arcade Gaming Zone (Tic-Tac-Toe & Snake) dan widget cuaca baru sekarang!',
        type: 'update',
        category: 'Update Fitur',
        targetApp: 'games',
        actionLabel: 'Buka Game Hub',
      },
      {
        title: '✨ Portofolio 3D Baru Diunggah',
        message: 'Koleksi studi kasus 3D Cyberpunk & Motion Commercial kini live.',
        type: 'portfolio',
        category: 'Update Portofolio',
        targetApp: 'portfolio',
        actionLabel: 'Lihat Karya',
      },
      {
        title: '🏷️ Penurunan Harga Aplikasi Premium',
        message: 'Akun Alight Motion 1 Tahun (Rp 6.000) & CapCut Pro tersedia dengan harga promo.',
        type: 'promo',
        category: 'Update Harga',
        targetApp: 'apps',
        actionLabel: 'Buka Toko Aplikasi',
      },
      {
        title: '📸 Koleksi Wallpaper 4K Baru',
        message: '12 artwork photo manipulation resolusi tinggi telah ditambahkan ke Gallery.',
        type: 'portfolio',
        category: 'Gallery Update',
        targetApp: 'gallery',
        actionLabel: 'Buka Galeri 4K',
      },
      {
        title: '📁 Preset LUTs & SFX Gratis Siap Unduh',
        message: 'Paket aset editing master gratis kini tersedia di File Explorer.',
        type: 'update',
        category: 'File Explorer Update',
        targetApp: 'files',
        actionLabel: 'Unduh File Aset',
      },
    ];
    const picked = sampleOptions[Math.floor(Math.random() * sampleOptions.length)];
    const newNotif = {
      id: `sample-${Date.now()}`,
      ...picked,
      time: 'Baru saja',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    addToast(newNotif.title, newNotif.message, 'info');
  };


  // News Modal Handlers
  const openNews = (newsItem) => {
    playSoundEffect('open');
    setActiveNewsItem(newsItem);
    setNewsModalOpen(true);
  };

  const closeNews = () => {
    setNewsModalOpen(false);
    setActiveNewsItem(null);
  };

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobileDevice(window.innerWidth <= 860);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = osModeOverride === 'auto' ? isMobileDevice : osModeOverride === 'mobile';

  // Handle URL hash changes or back button
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '') || 'home';
      setActiveApp(hash);
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Global keyboard shortcuts (Ctrl+K to search, Esc to close modals)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setSearchModalOpen(false);
        setAppLauncherOpen(false);
        setQuickSettingsOpen(false);
        setNotificationModalOpen(false);
        setNewsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [pageTransition, setPageTransition] = useState(isMobile ? 'page-fade-in' : 'page-zoom-in');

  const openApp = (appId) => {
    playSoundEffect('open');
    setPageTransition(isMobile ? 'page-fade-in' : 'page-zoom-in');
    setActiveApp(appId);
    window.location.hash = `#/${appId === 'home' ? '' : appId}`;
    setAppLauncherOpen(false);
    setSearchModalOpen(false);
    setNewsModalOpen(false);
  };

  const closeApp = () => {
    playSoundEffect('click');
    setPageTransition(isMobile ? 'page-fade-in' : 'page-zoom-out');
    setActiveApp('home');
    window.location.hash = '#/';
  };

  const addToast = (title, message, type = 'info') => {
    const id = Date.now();
    const newToast = { id, title, message, type };
    setToasts((prev) => [...prev.slice(-3), newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <OSContext.Provider
      value={{
        activeApp,
        setActiveApp,
        openApp,
        closeApp,
        pageTransition,
        setPageTransition,
        windowState,
        setWindowState,
        isWindowed,
        setIsWindowed,
        quickSettingsOpen,
        setQuickSettingsOpen,
        appLauncherOpen,
        setAppLauncherOpen,
        searchModalOpen,
        setSearchModalOpen,
        accessibilityModalOpen,
        setAccessibilityModalOpen,
        newsModalOpen,
        setNewsModalOpen,
        activeNewsItem,
        openNews,
        closeNews,
        toasts,
        addToast,
        removeToast,
        isMobile,
        isMobileDevice,
        osModeOverride,
        setOsModeOverride,
      }}
    >
      {children}
    </OSContext.Provider>

  );
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error('useOS must be used within an OSProvider');
  }
  return context;
};

