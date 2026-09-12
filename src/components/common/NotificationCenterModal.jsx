import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { useAudio } from '../../context/AudioContext';
import {
  Bell,
  X,
  CheckCheck,
  Trash2,
  Tag,
  Sparkles,
  Flame,
  Film,
  FolderTree,
  Briefcase,
  ChevronRight,
  PlusCircle,
  Clock,
  Eye,
  EyeOff,
  ShoppingBag,
  Gamepad2,
  RotateCcw,
  Layers,
  Image as ImageIcon,
  Check,
  Sliders,
  ExternalLink,
  Volume2,
} from 'lucide-react';

export const NotificationCenterModal = () => {
  const {
    notificationModalOpen,
    setNotificationModalOpen,
    notifications = [],
    unreadNotifCount = 0,
    markNotifAsRead,
    toggleNotifRead,
    deleteNotif,
    markAllNotifsAsRead,
    clearAllNotifs,
    resetNotificationsToDefault,
    triggerSampleNotification,
    openApp,
    isMobile,
  } = useOS();

  const { playSoundEffect } = useAudio();
  const [activeCategory, setActiveCategory] = useState('all'); // 'all' | 'unread' | 'update' | 'portfolio' | 'gallery' | 'files' | 'price' | 'promo'

  if (!notificationModalOpen) return null;

  // Filter items based on active category
  const filteredNotifs = notifications.filter((n) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'unread') return !n.read;
    if (activeCategory === 'update') return n.type === 'update' || n.category?.includes('Fitur');
    if (activeCategory === 'portfolio') return n.type === 'portfolio' || n.category?.includes('Portofolio');
    if (activeCategory === 'gallery') return n.category?.includes('Gallery') || n.category?.includes('Galeri');
    if (activeCategory === 'files') return n.category?.includes('File') || n.category?.includes('Aset');
    if (activeCategory === 'price') return n.category?.includes('Harga');
    if (activeCategory === 'promo') return n.type === 'promo' || n.category?.includes('Promo');
    return true;
  });

  const handleNotifAction = (notif) => {
    playSoundEffect('click');
    markNotifAsRead(notif.id);
    setNotificationModalOpen(false);
    if (notif.targetApp) {
      openApp(notif.targetApp);
    }
  };

  const getCategoryCount = (catId) => {
    if (catId === 'all') return notifications.length;
    if (catId === 'unread') return unreadNotifCount;
    if (catId === 'update') return notifications.filter((n) => n.type === 'update' || n.category?.includes('Fitur')).length;
    if (catId === 'portfolio') return notifications.filter((n) => n.type === 'portfolio' || n.category?.includes('Portofolio')).length;
    if (catId === 'gallery') return notifications.filter((n) => n.category?.includes('Gallery') || n.category?.includes('Galeri')).length;
    if (catId === 'files') return notifications.filter((n) => n.category?.includes('File') || n.category?.includes('Aset')).length;
    if (catId === 'price') return notifications.filter((n) => n.category?.includes('Harga')).length;
    if (catId === 'promo') return notifications.filter((n) => n.type === 'promo' || n.category?.includes('Promo')).length;
    return 0;
  };

  const filterTabs = [
    { id: 'all', label: 'Semua', icon: Bell },
    { id: 'unread', label: 'Belum Dibaca', icon: Eye },
    { id: 'update', label: 'Update Fitur', icon: Sparkles },
    { id: 'portfolio', label: 'Portofolio', icon: Briefcase },
    { id: 'gallery', label: 'Galeri 4K', icon: ImageIcon },
    { id: 'files', label: 'File & Aset', icon: FolderTree },
    { id: 'price', label: 'Update Harga', icon: Tag },
    { id: 'promo', label: 'Promo', icon: Flame },
  ];

  const renderNotifIcon = (notif) => {
    const type = notif.type || '';
    const cat = notif.category || '';

    if (cat.includes('Harga') || type === 'price') {
      return (
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'var(--badge-orange-bg)',
            border: '2px solid var(--badge-orange-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--badge-orange-text)',
            flexShrink: 0,
          }}
        >
          <Tag size={19} />
        </div>
      );
    }

    if (cat.includes('Gallery') || cat.includes('Galeri')) {
      return (
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'var(--badge-purple-bg)',
            border: '2px solid var(--badge-purple-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--badge-purple-text)',
            flexShrink: 0,
          }}
        >
          <ImageIcon size={19} />
        </div>
      );
    }

    if (cat.includes('File') || cat.includes('Aset')) {
      return (
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'var(--badge-green-bg)',
            border: '2px solid var(--badge-green-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--badge-green-text)',
            flexShrink: 0,
          }}
        >
          <FolderTree size={19} />
        </div>
      );
    }

    if (type === 'promo' || cat.includes('Promo')) {
      return (
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'var(--badge-orange-bg)',
            border: '2px solid var(--badge-orange-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--badge-orange-text)',
            flexShrink: 0,
          }}
        >
          <Flame size={19} />
        </div>
      );
    }

    if (type === 'portfolio' || cat.includes('Portofolio')) {
      return (
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'var(--badge-blue-bg)',
            border: '2px solid var(--badge-blue-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--badge-blue-text)',
            flexShrink: 0,
          }}
        >
          <Briefcase size={19} />
        </div>
      );
    }

    // Default: Update Fitur
    return (
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          background: 'var(--badge-blue-bg)',
          border: '2px solid var(--badge-blue-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--badge-blue-text)',
          flexShrink: 0,
        }}
      >
        <Sparkles size={19} />
      </div>
    );
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2600,
        display: 'flex',
        alignItems: isMobile ? 'flex-end' : 'flex-start',
        justifyContent: 'flex-end',
        padding: isMobile ? '0' : '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.72)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      onClick={() => setNotificationModalOpen(false)}
    >
      <div
        className={isMobile ? 'animate-slide-up' : 'animate-slide-left'}
        style={{
          width: '100%',
          maxWidth: isMobile ? '100%' : '460px',
          height: isMobile ? '88vh' : 'calc(100vh - 40px)',
          borderRadius: isMobile ? '26px 26px 0 0' : '24px',
          padding: isMobile ? '20px 16px' : '24px',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-surface-elevated)',
          border: '2px solid var(--border-medium)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.85)',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Pull Drag Indicator */}
        {isMobile && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <div
              style={{
                width: '44px',
                height: '5px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--border-medium)',
              }}
            />
          </div>
        )}

        {/* Header Title & Top Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #FF9C0F 0%, #FF5E3A 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <Bell size={20} />
              {unreadNotifCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-3px',
                    right: '-3px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#EF4444',
                    border: '2px solid var(--bg-surface)',
                  }}
                />
              )}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                  Pusat Notifikasi
                </h3>
                {unreadNotifCount > 0 ? (
                  <span
                    style={{
                      background: '#EF4444',
                      color: '#FFFFFF',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-pill)',
                    }}
                  >
                    {unreadNotifCount} Baru
                  </span>
                ) : (
                  <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>
                    Terbaca
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                Pembaruan fitur, portofolio, galeri, harga & promo
              </p>
            </div>
          </div>

          <button
            onClick={() => setNotificationModalOpen(false)}
            className="btn-press"
            style={{
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Tutup Notifikasi"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Toolbar: Live Simulator, Mark All, Reset */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            marginBottom: '14px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              onClick={triggerSampleNotification}
              className="btn btn-primary-orange btn-sm hover-lift"
              style={{ fontSize: '0.74rem', padding: '6px 12px', gap: '5px', fontWeight: 800 }}
              title="Kirim notifikasi live dengan audio chime"
            >
              <PlusCircle size={13} />
              <span>Simulasi Notif</span>
            </button>

            <button
              onClick={() => {
                setNotificationModalOpen(false);
                openApp('notifications');
              }}
              className="btn btn-glass btn-sm hover-lift"
              style={{ fontSize: '0.74rem', padding: '6px 12px', gap: '5px' }}
              title="Buka halaman informasi pembaruan lengkap"
            >
              <Layers size={13} className="text-orange" />
              <span>Halaman Lengkap ↗</span>
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={markAllNotifsAsRead}
              disabled={unreadNotifCount === 0}
              className="btn btn-glass btn-sm"
              style={{
                fontSize: '0.72rem',
                padding: '6px 10px',
                gap: '4px',
                opacity: unreadNotifCount === 0 ? 0.45 : 1,
                cursor: unreadNotifCount === 0 ? 'default' : 'pointer',
              }}
              title="Tandai semua pesan sebagai telah dibaca"
            >
              <CheckCheck size={13} className="text-orange" />
              <span>Semua Dibaca</span>
            </button>

            <button
              onClick={clearAllNotifs}
              disabled={notifications.length === 0}
              className="btn btn-glass btn-sm"
              style={{
                fontSize: '0.72rem',
                padding: '6px 10px',
                gap: '4px',
                color: '#EF4444',
                opacity: notifications.length === 0 ? 0.45 : 1,
                cursor: notifications.length === 0 ? 'default' : 'pointer',
              }}
              title="Hapus semua notifikasi"
            >
              <Trash2 size={13} />
              <span>Hapus</span>
            </button>
          </div>
        </div>

        {/* Category Filter Chips Bar */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            paddingBottom: '8px',
            marginBottom: '14px',
            scrollbarWidth: 'none',
          }}
        >
          {filterTabs.map((tab) => {
            const count = getCategoryCount(tab.id);
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playSoundEffect('click');
                  setActiveCategory(tab.id);
                }}
                className={`filter-pill ${isActive ? 'active' : ''}`}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.74rem',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  height: '32px',
                }}
              >
                <Icon size={13} />
                <span>{tab.label}</span>
                <span
                  style={{
                    fontSize: '0.66rem',
                    padding: '1px 6px',
                    borderRadius: 'var(--radius-pill)',
                    background: isActive ? '#FFFFFF' : 'var(--badge-neutral-bg)',
                    color: isActive ? 'var(--color-orange)' : 'var(--text-muted)',
                    fontWeight: 800,
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Notifications Scroll Feed */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            paddingRight: '4px',
          }}
        >
          {filteredNotifs.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: 'var(--text-muted)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: 'var(--bg-surface)',
                  border: '2px solid var(--border-medium)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  opacity: 0.7,
                }}
              >
                <Bell size={30} className="text-orange" />
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--text-primary)' }}>
                Tidak Ada Notifikasi
              </h4>
              <p style={{ fontSize: '0.82rem', margin: '0 0 18px 0', maxWidth: '280px', lineHeight: 1.45 }}>
                {activeCategory === 'unread'
                  ? 'Semua notifikasi telah dibaca. Klik tab Semua untuk melihat riwayat.'
                  : 'Belum ada notifikasi pada kategori ini. Anda dapat menguji fitur notifikasi dengan tombol simulasi di bawah.'}
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                  onClick={triggerSampleNotification}
                  className="btn btn-primary-orange btn-sm"
                  style={{ gap: '6px' }}
                >
                  <PlusCircle size={14} />
                  <span>Kirim Notifikasi Uji Coba</span>
                </button>
                <button
                  onClick={resetNotificationsToDefault}
                  className="btn btn-glass btn-sm"
                  style={{ gap: '6px' }}
                >
                  <RotateCcw size={14} />
                  <span>Pulihkan Standar</span>
                </button>
              </div>
            </div>
          ) : (
            filteredNotifs.map((notif) => (
              <div
                key={notif.id}
                className="glass-card hover-lift"
                style={{
                  padding: '16px',
                  borderRadius: '18px',
                  border: notif.read ? '2px solid var(--border-medium)' : '2px solid var(--color-orange)',
                  background: notif.read ? 'var(--bg-surface)' : 'var(--color-orange-subtle)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {/* Unread Dot */}
                {!notif.read && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '14px',
                      right: '14px',
                      width: '9px',
                      height: '9px',
                      borderRadius: '50%',
                      background: 'var(--color-orange)',
                    }}
                    title="Notifikasi Baru"
                  />
                )}

                {/* Top Row: Icon + Category + Time + Content */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  {renderNotifIcon(notif)}

                  <div style={{ flex: 1, minWidth: 0, paddingRight: notif.read ? '0px' : '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <span className="badge badge-neutral" style={{ fontSize: '0.64rem', padding: '2px 8px' }}>
                        {notif.category || 'Pemberitahuan'}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Clock size={11} />
                        {notif.time}
                      </span>
                    </div>

                    <h4
                      style={{
                        fontSize: '0.94rem',
                        fontWeight: notif.read ? 700 : 900,
                        margin: '0 0 5px 0',
                        color: 'var(--text-primary)',
                        lineHeight: 1.35,
                      }}
                    >
                      {notif.title}
                    </h4>

                    <p
                      style={{
                        fontSize: '0.82rem',
                        color: 'var(--text-secondary)',
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {notif.message}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Strip: Direct CTA + Controls */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '2px solid var(--border-subtle)',
                    paddingTop: '10px',
                    marginTop: '2px',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}
                >
                  {/* Target Navigation Action */}
                  {notif.actionLabel ? (
                    <button
                      onClick={() => handleNotifAction(notif)}
                      className="btn btn-primary-orange btn-sm btn-press hover-lift"
                      style={{
                        fontSize: '0.76rem',
                        padding: '5px 12px',
                        fontWeight: 800,
                        gap: '4px',
                      }}
                    >
                      <span>{notif.actionLabel}</span>
                      <ChevronRight size={13} />
                    </button>
                  ) : (
                    <div />
                  )}

                  {/* Secondary Item Actions: Toggle Read & Delete */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      onClick={() => toggleNotifRead(notif.id)}
                      className="btn btn-glass btn-sm"
                      style={{
                        padding: '4px 8px',
                        fontSize: '0.7rem',
                        gap: '4px',
                      }}
                      title={notif.read ? 'Tandai belum dibaca' : 'Tandai sudah dibaca'}
                    >
                      {notif.read ? <EyeOff size={13} /> : <Eye size={13} />}
                      <span>{notif.read ? 'Belum Dibaca' : 'Dibaca'}</span>
                    </button>

                    <button
                      onClick={() => deleteNotif(notif.id)}
                      className="btn btn-glass btn-sm"
                      style={{
                        padding: '4px 8px',
                        color: '#EF4444',
                      }}
                      title="Hapus notifikasi ini"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Info */}
        <div
          style={{
            borderTop: '2px solid var(--border-medium)',
            paddingTop: '12px',
            marginTop: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.74rem',
            color: 'var(--text-muted)',
          }}
        >
          <span>Rasfalz Studio OS • Notifikasi Otomatis</span>
          <button
            onClick={resetNotificationsToDefault}
            className="btn-press"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-orange)',
              fontSize: '0.74rem',
              fontWeight: 700,
              cursor: 'pointer',
              padding: 0,
            }}
          >
            Pulihkan Standar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenterModal;
