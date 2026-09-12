import React, { createContext, useContext, useState, useEffect } from 'react';

const DeviceStatusContext = createContext();

export const DeviceStatusProvider = ({ children }) => {
  // Battery State
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);
  const [hasBatteryAPI, setHasBatteryAPI] = useState(false);

  // Network State
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [networkType, setNetworkType] = useState('wifi');
  const [effectiveType, setEffectiveType] = useState('4g');
  const [downlink, setDownlink] = useState(10);
  const [rtt, setRtt] = useState(50);

  // Device & OS Detection State (Handphone, Tablet, Desktop)
  const [deviceType, setDeviceType] = useState('desktop'); // 'handphone' | 'tablet' | 'desktop'
  const [osName, setOsName] = useState('ChromeOS');

  // Detect Device Type and OS
  useEffect(() => {
    const detectDevice = () => {
      const w = window.innerWidth;
      const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';

      // Check OS from User Agent
      let detectedOS = 'ChromeOS';
      if (/android/i.test(ua)) detectedOS = 'Android';
      else if (/iphone|ipad|ipod/i.test(ua)) detectedOS = 'iOS';
      else if (/windows/i.test(ua)) detectedOS = 'Windows';
      else if (/macintosh|mac os x/i.test(ua)) detectedOS = 'macOS';
      else if (/cros/i.test(ua)) detectedOS = 'ChromeOS';
      else if (/linux/i.test(ua)) detectedOS = 'Linux';
      setOsName(detectedOS);

      // Check Device Type: Handphone vs Tablet vs Desktop
      const isTabletUA = /ipad|tablet|(android(?!.*mobile))/i.test(ua);
      const isMobileUA = /mobile|iphone|ipod|android/i.test(ua);

      if (w <= 640 || (isMobileUA && !isTabletUA && w <= 768)) {
        setDeviceType('handphone');
      } else if (isTabletUA || (w > 640 && w <= 1024)) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    detectDevice();
    window.addEventListener('resize', detectDevice);
    return () => window.removeEventListener('resize', detectDevice);
  }, []);

  // 1. Real Battery API Integration
  useEffect(() => {
    let batteryInstance = null;

    const updateBattery = (battery) => {
      if (!battery) return;
      setBatteryLevel(Math.round(battery.level * 100));
      setIsCharging(battery.charging);
      setHasBatteryAPI(true);
    };

    if (typeof navigator !== 'undefined' && typeof navigator.getBattery === 'function') {
      navigator
        .getBattery()
        .then((battery) => {
          batteryInstance = battery;
          updateBattery(battery);

          const onLevelChange = () => updateBattery(battery);
          const onChargingChange = () => updateBattery(battery);

          battery.addEventListener('levelchange', onLevelChange);
          battery.addEventListener('chargingchange', onChargingChange);

          return () => {
            battery.removeEventListener('levelchange', onLevelChange);
            battery.removeEventListener('chargingchange', onChargingChange);
          };
        })
        .catch(() => {
          setHasBatteryAPI(false);
        });
    }

    return () => {
      if (batteryInstance) {
        // cleanup if needed
      }
    };
  }, []);

  // 2. Real Network & Online/Offline API Integration
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Network Information API
    const conn =
      typeof navigator !== 'undefined'
        ? navigator.connection || navigator.mozConnection || navigator.webkitConnection
        : null;

    const updateConnection = () => {
      if (conn) {
        if (conn.type) setNetworkType(conn.type);
        if (conn.effectiveType) setEffectiveType(conn.effectiveType);
        if (conn.downlink) setDownlink(conn.downlink);
        if (conn.rtt) setRtt(conn.rtt);
      }
    };

    if (conn) {
      updateConnection();
      conn.addEventListener('change', updateConnection);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (conn) {
        conn.removeEventListener('change', updateConnection);
      }
    };
  }, []);

  // Display label for network (e.g., '5G', '4G', 'Wi-Fi', 'LAN', 'Offline')
  const getNetworkLabel = () => {
    if (!isOnline) return 'Offline';
    if (networkType === 'wifi') return 'Wi-Fi';
    if (networkType === 'cellular') {
      return effectiveType === '4g' ? '5G' : effectiveType.toUpperCase();
    }
    if (networkType === 'ethernet') return 'LAN';
    if (effectiveType === '4g') return '5G';
    return effectiveType ? effectiveType.toUpperCase() : 'Wi-Fi';
  };

  // Device-specific brand badge text
  const getDeviceLabel = () => {
    if (deviceType === 'handphone') {
      return osName === 'iOS' ? 'iPhone OS' : 'Pixel Android 16';
    }
    if (deviceType === 'tablet') {
      return osName === 'iOS' ? 'iPadOS' : 'Pixel Tablet OS';
    }
    return osName === 'Windows' ? 'Windows Flex' : osName === 'macOS' ? 'macOS Flex' : 'ChromeOS Flex';
  };

  return (
    <DeviceStatusContext.Provider
      value={{
        batteryLevel,
        isCharging,
        hasBatteryAPI,
        isOnline,
        networkType,
        effectiveType,
        downlink,
        rtt,
        networkLabel: getNetworkLabel(),
        deviceType,
        isHandphone: deviceType === 'handphone',
        isTablet: deviceType === 'tablet',
        isDesktop: deviceType === 'desktop',
        osName,
        deviceLabel: getDeviceLabel(),
      }}
    >
      {children}
    </DeviceStatusContext.Provider>
  );
};

export const useDeviceStatus = () => {
  const context = useContext(DeviceStatusContext);
  if (!context) {
    throw new Error('useDeviceStatus must be used within a DeviceStatusProvider');
  }
  return context;
};

export default DeviceStatusContext;
