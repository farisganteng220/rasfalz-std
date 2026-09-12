import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { useAudio } from '../../context/AudioContext';
import { useTheme } from '../../context/ThemeContext';
import { useDeviceStatus } from '../../context/DeviceStatusContext';
import {
  Wifi,
  WifiOff,
  Bluetooth,
  Volume2,
  VolumeX,
  Smartphone,
  Monitor,
  RotateCcw,
  Sliders,
  Battery,
  BatteryCharging,
  BatteryMedium,
  BatteryLow,
  BatteryWarning,
  X,
  BellOff,
  Bell,
  Eye,
  Sun,
  Moon,
} from 'lucide-react';

export const QuickSettingsModal = () => {
  const {
    isMobile,
    openApp,
    quickSettingsOpen,
    setQuickSettingsOpen,
    osModeOverride,
    setOsModeOverride,
    addToast,
  } = useOS();
  const { isDark, toggleTheme } = useTheme();
  const { volume, setVolume, isMuted, toggleMute, playSoundEffect } = useAudio();

  const { batteryLevel, isCharging, isOnline, networkLabel } = useDeviceStatus();
  const [wifiEnabled, setWifiEnabled] = useState(isOnline);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);

  if (!quickSettingsOpen) return null;

  const handleModeChange = (mode) => {
    setOsModeOverride(mode);
    addToast('OS Mode Switched', `Antarmuka dialihkan ke mode: ${mode.toUpperCase()}`, 'info');
  };

  const renderBatteryTileIcon = () => {
    if (isCharging) return <BatteryCharging size={18} className="text-orange" />;
    if (batteryLevel <= 15) return <BatteryWarning size={18} style={{ color: '#EF4444' }} />;
    if (batteryLevel <= 35) return <BatteryLow size={18} style={{ color: '#F59E0B' }} />;
    if (batteryLevel <= 70) return <BatteryMedium size={18} className="text-orange" />;
    return <Battery size={18} className="text-orange" />;
  };

  return (
    <div
      className="animate-slide-up"
      style={{
        position: 'fixed',
        bottom: '84px',
        right: '24px',
        width: '340px',
        background: 'var(--bg-surface-elevated)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '2px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        padding: '20px',
        boxShadow: 'var(--shadow-dock)',
        zIndex: 1000,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sliders size={18} className="text-orange" />
          <h3 style={{ fontSize: '0.92rem', fontWeight: 800, margin: 0 }}>Quick Settings</h3>
        </div>
        <button
          onClick={() => setQuickSettingsOpen(false)}
          style={{ color: 'var(--text-muted)', cursor: 'pointer', padding: '4px', background: 'transparent', border: 'none' }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Quick Tiles Grid (Balanced 2x2: Network, Bluetooth, Silent Mode, Battery System) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '16px' }}>
        {/* Wifi Tile */}
        <button
          onClick={() => setWifiEnabled(prev => !prev)}
          className="btn-press"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 14px',
            borderRadius: 'var(--radius-lg)',
            background: (wifiEnabled && isOnline) ? 'var(--color-blue-subtle)' : 'var(--bg-surface)',
            border: `2px solid ${(wifiEnabled && isOnline) ? 'var(--color-blue)' : 'var(--border-medium)'}`,
            color: (wifiEnabled && isOnline) ? 'var(--color-blue)' : 'var(--text-muted)',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          {isOnline && wifiEnabled ? <Wifi size={18} /> : <WifiOff size={18} />}
          <div>
            <div style={{ fontSize: '0.84rem', fontWeight: 700 }}>Network</div>
            <div style={{ fontSize: '0.74rem', opacity: 0.8 }}>
              {isOnline && wifiEnabled ? networkLabel : 'Offline'}
            </div>
          </div>
        </button>

        {/* Bluetooth Tile */}
        <button
          onClick={() => setBluetoothEnabled(prev => !prev)}
          className="btn-press"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 14px',
            borderRadius: 'var(--radius-lg)',
            background: bluetoothEnabled ? 'var(--color-orange-subtle)' : 'var(--bg-surface)',
            border: `2px solid ${bluetoothEnabled ? 'var(--color-orange)' : 'var(--border-medium)'}`,
            color: bluetoothEnabled ? 'var(--color-orange)' : 'var(--text-muted)',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <Bluetooth size={18} />
          <div>
            <div style={{ fontSize: '0.84rem', fontWeight: 700 }}>Bluetooth</div>
            <div style={{ fontSize: '0.74rem', opacity: 0.8 }}>{bluetoothEnabled ? 'Ready' : 'Off'}</div>
          </div>
        </button>

        {/* Silent Mode Tile */}
        <button
          onClick={() => {
            toggleMute();
            addToast(
              !isMuted ? 'Mode Hening Aktif' : 'Mode Suara Aktif',
              !isMuted ? 'Seluruh audio dan efek suara studio dimatikan.' : 'Suara dan audio studio kembali aktif.',
              !isMuted ? 'warning' : 'success'
            );
          }}
          className="btn-press"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 14px',
            borderRadius: 'var(--radius-lg)',
            background: isMuted ? 'var(--color-orange-subtle)' : 'var(--bg-surface)',
            border: `2px solid ${isMuted ? 'var(--color-orange)' : 'var(--border-medium)'}`,
            color: isMuted ? 'var(--color-orange)' : 'var(--text-muted)',
            cursor: 'pointer',
            textAlign: 'left',
          }}
          title={isMuted ? 'Klik untuk mematikan Mode Hening' : 'Klik untuk mengaktifkan Mode Hening'}
        >
          {isMuted ? <BellOff size={18} /> : <Bell size={18} />}
          <div>
            <div style={{ fontSize: '0.84rem', fontWeight: 700 }}>Silent Mode</div>
            <div style={{ fontSize: '0.74rem', opacity: 0.8 }}>{isMuted ? 'Hening (Muted)' : 'Suara Aktif'}</div>
          </div>
        </button>

        {/* Real Battery Info Tile */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 14px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-surface)',
            border: '2px solid var(--border-medium)',
            color: 'var(--text-primary)',
          }}
          title={`Baterai: ${batteryLevel}% ${isCharging ? '(Mengisi Daya)' : ''}`}
        >
          {renderBatteryTileIcon()}
          <div>
            <div style={{ fontSize: '0.84rem', fontWeight: 700 }}>Battery System</div>
            <div style={{ fontSize: '0.74rem', color: isCharging ? '#10B981' : 'var(--text-muted)' }}>
              {batteryLevel}% • {isCharging ? 'Charging' : 'Normal'}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Theme & Accessibility Center Tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
        <button
          onClick={() => {
            playSoundEffect?.('click');
            toggleTheme();
          }}
          className="btn btn-glass btn-sm hover-lift"
          style={{
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontWeight: 700,
            borderRadius: 'var(--radius-lg)',
            border: '2px solid var(--border-medium)',
            color: isDark ? 'var(--color-orange)' : 'var(--color-blue)',
            cursor: 'pointer',
          }}
          title={isDark ? 'Beralih ke Light Mode' : 'Beralih ke Dark Mode'}
        >
          {isDark ? <Sun size={15} className="text-orange" /> : <Moon size={15} className="text-blue" />}
          <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        <button
          onClick={() => {
            setQuickSettingsOpen(false);
            openApp('accessibility');
          }}
          className="btn btn-glass btn-sm hover-lift"
          style={{
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontWeight: 700,
            borderRadius: 'var(--radius-lg)',
            border: '2px solid var(--border-medium)',
            cursor: 'pointer',
          }}
        >
          <Eye size={15} className="text-orange" />
          <span>Aksesibilitas</span>
        </button>
      </div>

      {/* Volume Slider */}
      <div style={{ marginBottom: '16px', background: 'var(--bg-surface)', padding: '12px 14px', borderRadius: 'var(--radius-lg)', border: '2px solid var(--border-medium)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Master Volume</span>
          <button
            onClick={toggleMute}
            style={{
              color: isMuted ? '#EF4444' : 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px 6px',
              borderRadius: 'var(--radius-sm)',
              background: isMuted ? 'rgba(239, 68, 68, 0.15)' : 'transparent',
              border: 'none',
            }}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          style={{ width: '100%', accentColor: isMuted ? '#EF4444' : 'var(--color-orange)' }}
        />
      </div>

      {/* OS Mode Selector (Pixel 16 option removed on Desktop/Tablet) */}
      <div style={{ background: 'var(--bg-surface)', padding: '12px 14px', borderRadius: 'var(--radius-lg)', border: '2px solid var(--border-medium)' }}>
        <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
          Device Experience Mode
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)', gap: '8px' }}>
          <button
            onClick={() => handleModeChange('auto')}
            className={`btn-press ${osModeOverride === 'auto' ? 'badge-orange' : 'badge-glass'}`}
            style={{
              padding: '8px 6px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.74rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <RotateCcw size={14} />
            <span>Auto Detect</span>
          </button>

          <button
            onClick={() => handleModeChange('desktop')}
            className={`btn-press ${osModeOverride === 'desktop' ? 'badge-blue' : 'badge-glass'}`}
            style={{
              padding: '8px 6px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.74rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Monitor size={14} />
            <span>Desktop OS</span>
          </button>

          {/* Pixel 16 option is strictly removed on Desktop/Tablet view */}
          {isMobile && (
            <button
              onClick={() => handleModeChange('mobile')}
              className={`btn-press ${osModeOverride === 'mobile' ? 'badge-orange' : 'badge-glass'}`}
              style={{
                padding: '8px 6px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Smartphone size={14} />
              <span>Pixel 16</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickSettingsModal;
