import React, { useState, useEffect } from 'react';
import { siteConfig } from '../../config/siteConfig';
import { useOS } from '../../context/OSContext';
import {
  Clock,
  Sparkles,
  MapPin,
  Sun,
  CloudSun,
  CloudRain,
  CloudLightning,
  Cloud,
  Droplets,
  Wind,
  RefreshCw,
  Thermometer,
  ChevronRight,
} from 'lucide-react';
import { DecorativeBackground } from '../common/DecorativeBackground';

export const ClockWidget = () => {
  const { openApp } = useOS();
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState({
    temperature: 30,
    apparentTemperature: 33,
    tempMax: 33,
    tempMin: 24,
    uvIndex: 4,
    weatherCode: 1, // 0: Cerah, 1-3: Berawan, 51-67: Hujan, etc.
    humidity: 78,
    windSpeed: 12,
    locationName: 'Sidoarjo, Jawa Timur',
    isDay: true,
    loading: false,
    forecast: [
      { day: 'Besok', tempMax: 31, tempMin: 24, code: 1, label: 'Cerah Berawan' },
      { day: 'Lusa', tempMax: 29, tempMin: 23, code: 61, label: 'Hujan Ringan' },
      { day: 'Nanti', tempMax: 30, tempMin: 24, code: 2, label: 'Berawan' },
    ],
  });

  // Digital clock tick
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Weather fetcher via Open-Meteo
  const fetchWeather = (lat = -7.4726, lon = 112.6675, locName = 'Sidoarjo, Jawa Timur') => {
    setWeather((prev) => ({ ...prev, loading: true }));
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&timezone=auto`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.current) {
          const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
          const dailyForecast = (data.daily?.time || []).slice(1, 4).map((t, idx) => {
            const d = new Date(t);
            const cCode = data.daily.weather_code?.[idx + 1] ?? 1;
            const info = getWeatherInfo(cCode);
            return {
              day: days[d.getDay()],
              tempMax: Math.round(data.daily.temperature_2m_max?.[idx + 1] ?? 30),
              tempMin: Math.round(data.daily.temperature_2m_min?.[idx + 1] ?? 24),
              code: cCode,
              label: info.label,
            };
          });

          setWeather({
            temperature: Math.round(data.current.temperature_2m),
            apparentTemperature: Math.round(data.current.apparent_temperature),
            tempMax: Math.round(data.daily?.temperature_2m_max?.[0] ?? 33),
            tempMin: Math.round(data.daily?.temperature_2m_min?.[0] ?? 24),
            uvIndex: Math.round(data.daily?.uv_index_max?.[0] ?? 4),
            weatherCode: data.current.weather_code,
            humidity: data.current.relative_humidity_2m,
            windSpeed: Math.round(data.current.wind_speed_10m),
            locationName: locName,
            isDay: data.current.is_day === 1,
            loading: false,
            forecast: dailyForecast.length ? dailyForecast : prev.forecast,
          });
        }
      })
      .catch(() => {
        setWeather((prev) => ({ ...prev, loading: false }));
      });
  };

  useEffect(() => {
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
              const region = geo.principalSubdivision ? `${city}, ${geo.principalSubdivision}` : `${city}, ID`;
              fetchWeather(latitude, longitude, region);
            })
            .catch(() => {
              fetchWeather(latitude, longitude, 'Sidoarjo, Jawa Timur');
            });
        },
        () => {
          fetchWeather(-7.4726, 112.6675, 'Sidoarjo, Jawa Timur');
        },
        { timeout: 5000 }
      );
    } else {
      fetchWeather(-7.4726, 112.6675, 'Sidoarjo, Jawa Timur');
    }
  }, []);

  const getWeatherInfo = (code, isDay = true) => {
    if (code === 0) return { label: 'Cerah', icon: Sun, color: 'var(--color-orange)', advice: 'Cuaca cerah prima untuk shooting outdoor' };
    if (code >= 1 && code <= 3) return { label: 'Cerah Berawan', icon: CloudSun, color: 'var(--color-blue)', advice: 'Pencahayaan natural ideal untuk produksi konten' };
    if (code >= 45 && code <= 48) return { label: 'Berkabut', icon: Cloud, color: 'var(--text-muted)', advice: 'Nuansa sinematik lembut untuk fotografi' };
    if (code >= 51 && code <= 67) return { label: 'Hujan Ringan', icon: CloudRain, color: 'var(--color-blue)', advice: 'Waktu produktif untuk editing & post-production' };
    if (code >= 71 && code <= 77) return { label: 'Hujan Dingin', icon: CloudRain, color: 'var(--color-blue)', advice: 'Suasana tenang untuk sound design & grading' };
    if (code >= 80 && code <= 82) return { label: 'Hujan Deras', icon: CloudRain, color: 'var(--color-blue)', advice: 'Sesi indoor studio: batch rendering & motion' };
    if (code >= 95) return { label: 'Badai Petir', icon: CloudLightning, color: 'var(--color-orange)', advice: 'Optimasi workflow & backup cloud studio' };
    return { label: 'Berawan', icon: Cloud, color: 'var(--color-blue)', advice: 'Kondisi stabil untuk kreasi aset visual' };
  };

  const weatherInfo = getWeatherInfo(weather.weatherCode, weather.isDay);
  const WeatherIcon = weatherInfo.icon;

  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');

  const dateString = time.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className="os-widget hover-lift"
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 18px',
        borderRadius: 'var(--radius-xl)',
        background: 'var(--bg-surface-elevated)',
        border: '2px solid var(--border-medium)',
        boxShadow: 'var(--shadow-window)',
        boxSizing: 'border-box',
        gap: '10px',
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <DecorativeBackground variant="micro" scheme="orange" cols={6} rows={6} opacity={0.35} />

      {/* 1. Widget Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--color-orange-subtle)',
              border: '2px solid var(--color-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-orange)',
              flexShrink: 0,
            }}
          >
            <Clock size={16} />
          </div>
          <div>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', lineHeight: 1.15 }}>
              Jam &amp; Cuaca
            </h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>
              Waktu Digital &amp; Cuaca Live
            </span>
          </div>
        </div>

        <span
          className="badge badge-orange"
          style={{
            fontSize: '0.72rem',
            padding: '2px 8px',
            fontWeight: 800,
            flexShrink: 0,
          }}
        >
          WIB • GMT+7
        </span>
      </div>

      {/* 2. Hero Digital Clock Card */}
      <div
        style={{
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-md)',
          border: '2px solid var(--border-medium)',
          padding: '8px 12px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.4rem',
            fontWeight: 900,
            lineHeight: 1,
            background: 'linear-gradient(145deg, #FF9C0F 0%, #E08500 50%, #A33F00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            gap: '2px',
            letterSpacing: '-0.03em',
            margin: '2px 0',
          }}
        >
          <span>{hours}:{minutes}</span>
          <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-orange)', WebkitTextFillColor: 'var(--color-orange)' }}>
            :{seconds}
          </span>
        </div>

        <p
          style={{
            fontSize: '0.80rem',
            fontWeight: 700,
            color: 'var(--text-secondary)',
            margin: '0',
            lineHeight: 1.2,
          }}
        >
          {dateString}
        </p>
      </div>

      {/* 3. Re-architected High-Precision Weather Command Card (Strict Bounded & Snug Fit) */}
      <div
        style={{
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-md)',
          border: '2px solid var(--border-medium)',
          padding: '10px 11px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '7px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          flex: 1,
          minHeight: 0,
          boxSizing: 'border-box',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '100%',
        }}
      >
        {/* Tier A: Location & Live Telemetry Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1.5px solid var(--border-subtle)',
            paddingBottom: '5px',
            flexShrink: 0,
            boxSizing: 'border-box',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', minWidth: 0, flex: 1, overflow: 'hidden' }}>
            <MapPin size={12} className="text-orange" style={{ flexShrink: 0 }} />
            <span
              style={{
                fontSize: '0.76rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {weather.locationName}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
            <span
              style={{
                fontSize: '0.64rem',
                fontWeight: 800,
                color: 'var(--color-orange)',
                background: 'rgba(255, 156, 15, 0.12)',
                padding: '1px 5px',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid rgba(255, 156, 15, 0.35)',
                whiteSpace: 'nowrap',
              }}
            >
              UV {weather.uvIndex}
            </span>

            <button
              onClick={() => fetchWeather()}
              className="btn-press"
              style={{
                background: 'var(--bg-surface-elevated)',
                border: '1.5px solid var(--border-medium)',
                borderRadius: 'var(--radius-pill)',
                color: 'var(--color-orange)',
                cursor: 'pointer',
                padding: '1px 6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                fontSize: '0.66rem',
                fontWeight: 800,
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              title="Perbarui Cuaca Live"
            >
              <RefreshCw size={9} className={weather.loading ? 'animate-spin' : ''} />
              <span>Sync</span>
            </button>
          </div>
        </div>

        {/* Tier B: Hero Weather Condition & Environmental Metrics Bento (Integrated 2-Row Grid) */}
        <div
          style={{
            background: 'var(--bg-surface-elevated)',
            border: '1.5px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '7px 8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            flexShrink: 0,
            boxSizing: 'border-box',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {/* Row 1: Weather Icon + Temperature & Condition Label + Apparent Temp */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '6px',
              width: '100%',
              minWidth: 0,
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-orange-subtle)',
                  border: '1.5px solid var(--color-orange)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-orange)',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(255, 156, 15, 0.2)',
                }}
              >
                <WeatherIcon size={20} />
              </div>

              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', lineHeight: 1 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.65rem',
                      fontWeight: 900,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {weather.temperature}°
                  </span>
                  <span style={{ fontSize: '0.80rem', color: 'var(--text-muted)', fontWeight: 800 }}>
                    C
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '0.70rem',
                    fontWeight: 800,
                    color: 'var(--color-orange)',
                    lineHeight: 1.1,
                    display: 'block',
                    marginTop: '1px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '105px',
                  }}
                >
                  {weatherInfo.label}
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                fontSize: '0.66rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                background: 'var(--bg-surface)',
                padding: '2px 6px',
                borderRadius: 'var(--radius-pill)',
                border: '1.5px solid var(--border-subtle)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              <Thermometer size={10} className="text-orange" />
              <span>Terasa {weather.apparentTemperature}°</span>
            </div>
          </div>

          {/* Row 2: Symmetric 3-Column Micro Metrics Grid (Fits 100% Perfectly) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '4px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                fontSize: '0.64rem',
                fontWeight: 700,
                color: 'var(--text-secondary)',
                background: 'var(--bg-surface)',
                padding: '2px 2px',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--border-subtle)',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              ↑{weather.tempMax}° ↓{weather.tempMin}°
            </div>

            <div
              style={{
                fontSize: '0.64rem',
                fontWeight: 700,
                color: 'var(--text-secondary)',
                background: 'var(--bg-surface)',
                padding: '2px 2px',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--border-subtle)',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              💧 {weather.humidity}%
            </div>

            <div
              style={{
                fontSize: '0.64rem',
                fontWeight: 700,
                color: 'var(--text-secondary)',
                background: 'var(--bg-surface)',
                padding: '2px 2px',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--border-subtle)',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              💨 {weather.windSpeed} km/h
            </div>
          </div>
        </div>

        {/* Tier C: 3-Day Forecast Cards (Bounded OS Tiles, No Clipping) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '5px',
            flexShrink: 0,
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {weather.forecast.slice(0, 3).map((fc, fIdx) => {
            const fInfo = getWeatherInfo(fc.code, true);
            const FcIcon = fInfo.icon;
            return (
              <div
                key={fIdx}
                style={{
                  padding: '5px 3px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface-elevated)',
                  border: '1.5px solid var(--border-subtle)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  boxSizing: 'border-box',
                  minWidth: 0,
                  overflow: 'hidden',
                }}
              >
                <span
                  style={{
                    fontSize: '0.66rem',
                    fontWeight: 800,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {fc.day}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px', margin: '1px 0' }}>
                  <FcIcon size={13} className="text-orange" />
                  <span
                    style={{
                      fontSize: '0.76rem',
                      fontWeight: 900,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {fc.tempMax}°
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '0.60rem',
                    color: 'var(--text-secondary)',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                    padding: '0 1px',
                  }}
                >
                  ↓{fc.tempMin}° • {fc.label.split(' ')[0]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tier D: Studio Creative Advisory & Production Insight Banner */}
        <div
          style={{
            background: 'var(--bg-surface-elevated)',
            border: '1.5px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '5px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            flexShrink: 0,
            width: '100%',
            boxSizing: 'border-box',
            overflow: 'hidden',
            minWidth: 0,
          }}
        >
          <div
            style={{
              width: '18px',
              height: '18px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--color-orange-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-orange)',
              flexShrink: 0,
            }}
          >
            <Sparkles size={10} />
          </div>
          <div style={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                lineHeight: 1,
                marginBottom: '2px',
              }}
            >
              <span
                style={{
                  fontSize: '0.63rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.4px',
                  color: 'var(--text-muted)',
                }}
              >
                Insight Studio
              </span>
              <span style={{ fontSize: '0.60rem', color: 'var(--color-orange)', fontWeight: 800 }}>
                Live
              </span>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: '0.69rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                lineHeight: 1.25,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              title={weatherInfo.advice}
            >
              {weatherInfo.advice}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Studio Status Capsule */}
      <div
        onClick={() => openApp('commission')}
        className="btn-press"
        style={{
          background: 'var(--bg-surface)',
          padding: '8px 12px',
          borderRadius: 'var(--radius-md)',
          border: '2px solid var(--border-medium)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          transition: 'all 0.2s ease',
          flexShrink: 0,
        }}
        title="Klik untuk Konsultasi / Pesan Slot Studio"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10B981',
              flexShrink: 0,
            }}
          />
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', margin: 0, letterSpacing: '0.02em' }}>
              Studio Rasfalz
            </p>
            <p style={{ fontSize: '0.80rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {siteConfig.profile.status}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
          <span
            className="badge badge-green"
            style={{
              fontSize: '0.72rem',
              padding: '2px 7px',
              fontWeight: 800,
            }}
          >
            Aktif
          </span>
          <ChevronRight size={14} className="text-orange" />
        </div>
      </div>
    </div>
  );
};

export default ClockWidget;


