import React, { useState, useEffect } from 'react';
import { MapPin, Sun, CloudSun, CloudRain, Cloud, CloudLightning, Calendar, Sparkles } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const PixelAtAGlance = () => {
  const [dateStr, setDateStr] = useState('');
  const [dayFull, setDayFull] = useState('');
  const [locationName, setLocationName] = useState('Sidoarjo, ID');
  const [weather, setWeather] = useState({
    temp: 30,
    code: 1,
    label: 'Cerah Berawan',
    icon: CloudSun,
  });

  const getWeatherInfo = (code) => {
    if (code === 0) return { label: 'Cerah', icon: Sun };
    if (code >= 1 && code <= 3) return { label: 'Cerah Berawan', icon: CloudSun };
    if (code >= 45 && code <= 48) return { label: 'Berkabut', icon: Cloud };
    if (code >= 51 && code <= 67) return { label: 'Hujan Ringan', icon: CloudRain };
    if (code >= 71 && code <= 77) return { label: 'Hujan Dingin', icon: CloudRain };
    if (code >= 80 && code <= 82) return { label: 'Hujan Deras', icon: CloudRain };
    if (code >= 95) return { label: 'Badai Petir', icon: CloudLightning };
    return { label: 'Berawan', icon: Cloud };
  };

  const fetchLiveWeatherAndLocation = (lat = -7.4726, lon = 112.6675, loc = 'Sidoarjo, ID') => {
    setLocationName(loc);
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.current) {
          const temp = Math.round(data.current.temperature_2m);
          const code = data.current.weather_code;
          const info = getWeatherInfo(code);
          setWeather({
            temp,
            code,
            label: info.label,
            icon: info.icon,
          });
        }
      })
      .catch(() => {
        // Fallback default
      });
  };

  useEffect(() => {
    const d = new Date();
    setDateStr(
      d.toLocaleDateString('id-ID', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      })
    );
    setDayFull(
      d.toLocaleDateString('id-ID', {
        weekday: 'long',
      })
    );

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=id`
          )
            .then((res) => res.json())
            .then((geo) => {
              const city = geo.city || geo.locality || geo.principalSubdivision || 'Sidoarjo';
              const country = geo.countryCode || 'ID';
              const locLabel = `${city}, ${country}`;
              fetchLiveWeatherAndLocation(latitude, longitude, locLabel);
            })
            .catch(() => {
              fetchLiveWeatherAndLocation(latitude, longitude, 'Sidoarjo, ID');
            });
        },
        () => {
          fetchLiveWeatherAndLocation(-7.4726, 112.6675, 'Sidoarjo, ID');
        },
        { timeout: 5000 }
      );
    } else {
      fetchLiveWeatherAndLocation(-7.4726, 112.6675, 'Sidoarjo, ID');
    }
  }, []);

  const WeatherIconComponent = weather.icon;

  return (
    <div className="pixel-at-a-glance">
      {/* Top Row: Date & Weather */}
      <div className="at-a-glance-top-row">
        <div className="at-a-glance-date-group">
          <Calendar size={18} className="text-orange" />
          <span>{dateStr || 'Hari ini'}</span>
        </div>

        <div className="at-a-glance-weather-pill">
          <WeatherIconComponent size={14} className="text-orange" />
          <span>{weather.temp}°C {weather.label}</span>
        </div>
      </div>

      {/* Bottom Row: Accurate Location & Live Status */}
      <div className="at-a-glance-status-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
          <MapPin size={13} className="text-orange" />
          <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{locationName}</span>
        </div>

        <div className="creator-live-status-pill">
          <span className="live-pulse-dot" />
          <span>{siteConfig.profile.status || 'Available for Projects'}</span>
        </div>
      </div>
    </div>
  );
};

export default PixelAtAGlance;
