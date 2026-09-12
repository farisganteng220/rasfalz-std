import React, { useState, useEffect } from 'react';
import {
  Wifi,
  WifiOff,
  Battery,
  BatteryCharging,
  BatteryMedium,
  BatteryLow,
  BatteryWarning,
  Sun,
  Moon,
  Sparkles,
} from 'lucide-react';
import { useDeviceStatus } from '../../context/DeviceStatusContext';
import { useTheme } from '../../context/ThemeContext';
import { useAudio } from '../../context/AudioContext';

export const AndroidStatusBar = () => {
  const [timeStr, setTimeStr] = useState('');
  const { batteryLevel, isCharging, isOnline, networkLabel, deviceLabel, isTablet } = useDeviceStatus();
  const { isDark, toggleTheme } = useTheme();
  const { playSoundEffect } = useAudio();

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

  // Adaptive Battery Icon based on real device battery status
  const renderBatteryIcon = () => {
    if (isCharging) return <BatteryCharging size={13} className="text-orange status-battery-charging-pulse" />;
    if (batteryLevel <= 15) return <BatteryWarning size={13} style={{ color: '#EF4444' }} />;
    if (batteryLevel <= 35) return <BatteryLow size={13} style={{ color: '#F59E0B' }} />;
    if (batteryLevel <= 70) return <BatteryMedium size={13} className="text-orange" />;
    return <Battery size={13} className="text-orange" />;
  };

  return (
    <div className="android-status-bar">
      {/* Left: Time & Device Identifier */}
      <div className="status-left">
        <span className="status-time">{timeStr}</span>
        <span
          style={{
            fontSize: '0.72rem',
            color: 'var(--color-orange)',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            fontWeight: 800,
          }}
        >
          • {deviceLabel || 'Rasfalz Phone'}
        </span>
      </div>

      {/* Right: Theme Toggle, Network Status, Battery Pill */}
      <div className="status-right">
        {/* Switch Light / Dark Mode */}
        <button
          onClick={() => {
            playSoundEffect('click');
            toggleTheme();
          }}
          className="btn-press"
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '42px',
            height: '22px',
            borderRadius: '11px',
            background: isDark ? 'rgba(255, 156, 15, 0.22)' : 'rgba(0, 82, 245, 0.22)',
            border: `2px solid ${isDark ? 'var(--color-orange)' : 'var(--color-blue)'}`,
            padding: '1.5px',
            cursor: 'pointer',
            position: 'relative',
            transition: 'all 0.25s ease',
          }}
          title={isDark ? 'Beralih ke Light Mode' : 'Beralih ke Dark Mode'}
          aria-label="Toggle Theme"
        >
          <div
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: isDark ? 'var(--color-orange)' : 'var(--color-blue)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: isDark ? 'translateX(20px)' : 'translateX(0px)',
              transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            }}
          >
            {isDark ? <Moon size={10} /> : <Sun size={10} />}
          </div>
        </button>

        {/* Real Network Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          {isOnline ? (
            <Wifi size={13} className="text-blue" />
          ) : (
            <WifiOff size={13} style={{ color: '#EF4444' }} />
          )}
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              color: isOnline ? 'var(--text-primary)' : '#EF4444',
            }}
          >
            {networkLabel}
          </span>
        </div>

        {/* Real Battery Indicator Pill */}
        <div
          className="status-pill-battery"
          style={{
            background: isCharging ? 'var(--color-orange-subtle)' : 'var(--bg-surface)',
            borderColor: isCharging ? 'var(--color-orange)' : 'var(--border-medium)',
          }}
          title={`Status Baterai: ${batteryLevel}% ${isCharging ? '(Mengisi Daya)' : '(Normal)'}`}
        >
          {renderBatteryIcon()}
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              color: isCharging ? 'var(--color-orange)' : 'var(--text-primary)',
            }}
          >
            {batteryLevel}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default AndroidStatusBar;
