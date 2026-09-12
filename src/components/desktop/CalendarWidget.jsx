import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Clock,
  StickyNote,
  CalendarDays,
  RotateCcw,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { DecorativeBackground } from '../common/DecorativeBackground';

export const CalendarWidget = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const isTodaySelected = isCurrentMonth && today.getDate() === selectedDay;

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(1);
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(1);
  };

  const resetToToday = () => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDay(now.getDate());
  };

  // Selected date metadata calculation
  const selectedDateObj = new Date(year, month, selectedDay);
  const selectedDayName = selectedDateObj.toLocaleDateString('id-ID', { weekday: 'long' });
  const selectedFormattedDate = selectedDateObj.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Calculate day of year
  const startOfYear = new Date(year, 0, 1);
  const dayOfYear = Math.floor((selectedDateObj - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
  const weekNumber = Math.ceil(dayOfYear / 7);
  const daysRemainingInMonth = daysInMonth - selectedDay;
  const totalDaysInYear = year % 4 === 0 ? 366 : 365;
  const yearProgress = Math.min(100, Math.max(0, Math.round((dayOfYear / totalDaysInYear) * 100)));

  const isWeekend = selectedDayName === 'Minggu' || selectedDayName === 'Sabtu';
  const activityStatus = isTodaySelected
    ? 'Studio Aktif • Produksi & Rendering'
    : isWeekend
    ? 'Sesi Riset & Eksplorasi Visual'
    : 'Jadwal Produksi & Post-Processing';

  // Studio daily note text based on day context
  const getDailyNote = () => {
    if (isTodaySelected) {
      return 'Hari aktif di Studio Rasfalz. Seluruh sistem kreatif, workflow rendering, dan timeline produksi beroperasi prima.';
    }
    if (selectedDayName === 'Minggu' || selectedDayName === 'Sabtu') {
      return 'Waktu eksplorasi visual, riset color grading baru, dan kurasi aset komunitas Rasfalz Studio.';
    }
    return `Catatan penanggalan untuk ${selectedDayName}, ${selectedDay} ${monthNames[month]}. Momentum produktif untuk eksekusi karya visual dan editing.`;
  };

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
      <DecorativeBackground variant="micro" scheme="orange" cols={5} rows={5} opacity={0.35} />

      {/* 1. Compact Widget Header with Integrated Month Switcher */}
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
            <CalendarIcon size={16} />
          </div>
          <div>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', lineHeight: 1.15 }}>
              Kalender
            </h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>
              Penanggalan &amp; Agenda Studio
            </span>
          </div>
        </div>

        {/* Compact Month Switcher Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-pill)',
            border: '2px solid var(--border-medium)',
            padding: '2px 4px',
            flexShrink: 0,
          }}
        >
          <button
            onClick={prevMonth}
            className="btn-press"
            style={{
              color: 'var(--text-primary)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '3px 5px',
              borderRadius: 'var(--radius-pill)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Bulan Sebelumnya"
          >
            <ChevronLeft size={13} />
          </button>
          <span
            style={{
              fontSize: '0.74rem',
              fontWeight: 800,
              padding: '0 4px',
              textAlign: 'center',
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
            }}
          >
            {monthNames[month].slice(0, 3)} {year}
          </span>
          <button
            onClick={nextMonth}
            className="btn-press"
            style={{
              color: 'var(--text-primary)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '3px 5px',
              borderRadius: 'var(--radius-pill)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Bulan Berikutnya"
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </div>

      {/* 2. Calendar Inner Grid Container */}
      <div
        style={{
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-md)',
          border: '2px solid var(--border-medium)',
          padding: '9px 11px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          flexShrink: 0,
        }}
      >
        {/* Days of week header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            textAlign: 'center',
            fontSize: '0.72rem',
            fontWeight: 800,
            color: 'var(--text-muted)',
            marginBottom: '4px',
          }}
        >
          <span style={{ color: 'var(--color-red)' }}>Min</span>
          <span>Sen</span>
          <span>Sel</span>
          <span>Rab</span>
          <span>Kam</span>
          <span>Jum</span>
          <span style={{ color: 'var(--color-blue)' }}>Sab</span>
        </div>

        {/* Numeric Calendar Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '3px',
            textAlign: 'center',
            fontSize: '0.74rem',
            fontWeight: 700,
          }}
        >
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} style={{ height: '26px' }} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const isToday = isCurrentMonth && today.getDate() === dayNum;
            const isSelected = selectedDay === dayNum;

            return (
              <button
                key={dayNum}
                onClick={() => setSelectedDay(dayNum)}
                className="btn-press"
                style={{
                  height: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-sm)',
                  position: 'relative',
                  background: isToday
                    ? 'var(--color-orange)'
                    : isSelected
                    ? 'var(--bg-surface-elevated)'
                    : 'transparent',
                  color: isToday
                    ? '#FFFFFF'
                    : isSelected
                    ? 'var(--color-orange)'
                    : 'var(--text-primary)',
                  fontWeight: isToday || isSelected ? 800 : 600,
                  border: isSelected && !isToday
                    ? '2px solid var(--color-orange)'
                    : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  padding: 0,
                }}
                title={`Pilih tanggal ${dayNum} ${monthNames[month]} ${year}`}
              >
                <span>{dayNum}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Redesigned Snug-Fit Calendar Agenda & Notes Hub */}
      <div
        style={{
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-md)',
          border: '2px solid var(--border-medium)',
          padding: '11px 13px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* Row A: Selected Date & Status Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            borderBottom: '2px solid var(--border-subtle)',
            paddingBottom: '6px',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <CalendarDays size={14} className="text-orange" style={{ flexShrink: 0 }} />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.85rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1.1,
              }}
            >
              {selectedDayName}, {selectedDay} {monthNames[month]}
            </span>
          </div>

          <div>
            {isTodaySelected ? (
              <span
                className="badge badge-orange"
                style={{ fontSize: '0.7rem', padding: '2px 8px', fontWeight: 800 }}
              >
                Hari Ini
              </span>
            ) : (
              <button
                onClick={resetToToday}
                className="btn-press"
                style={{
                  background: 'var(--bg-surface-elevated)',
                  border: '2px solid var(--border-medium)',
                  borderRadius: 'var(--radius-pill)',
                  color: 'var(--color-orange)',
                  cursor: 'pointer',
                  padding: '2px 8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  transition: 'all 0.2s ease',
                }}
                title="Lompat kembali ke Hari Ini"
              >
                <RotateCcw size={10} />
                <span>Hari Ini</span>
              </button>
            )}
          </div>
        </div>

        {/* Row B: Studio Daily Note Box (Multi-line readable & snug) */}
        <div
          style={{
            background: 'var(--bg-surface-elevated)',
            border: '2px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '7px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <StickyNote size={12} className="text-orange" />
              <span
                style={{
                  fontSize: '0.67rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: 'var(--text-muted)',
                }}
              >
                Catatan Studio
              </span>
            </div>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: isTodaySelected ? 'var(--color-green)' : 'var(--color-orange)',
                boxShadow: isTodaySelected
                  ? '0 0 6px var(--color-green)'
                  : '0 0 6px var(--color-orange)',
              }}
            />
          </div>
          <p
            style={{
              margin: 0,
              fontSize: '0.72rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.35,
              fontWeight: 600,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
            title={getDailyNote()}
          >
            {getDailyNote()}
          </p>
        </div>

        {/* Row C: Operational Status Strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--bg-surface-elevated)',
            border: '2px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '5px 8px',
            flexShrink: 0,
          }}
        >
          <Zap size={12} className="text-orange" style={{ flexShrink: 0 }} />
          <span
            style={{
              fontSize: '0.71rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {activityStatus}
          </span>
        </div>

        {/* Row D: Quick Telemetry Indicators */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '5px',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              background: 'var(--bg-surface-elevated)',
              padding: '3px 4px',
              borderRadius: 'var(--radius-pill)',
              border: '2px solid var(--border-subtle)',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            Pekan W-{weekNumber}
          </div>

          <div
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              background: 'var(--bg-surface-elevated)',
              padding: '3px 4px',
              borderRadius: 'var(--radius-pill)',
              border: '2px solid var(--border-subtle)',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            Hari {dayOfYear}/365
          </div>

          <div
            style={{
              fontSize: '0.7rem',
              fontWeight: 800,
              color: 'var(--color-orange)',
              background: 'var(--bg-surface-elevated)',
              padding: '3px 4px',
              borderRadius: 'var(--radius-pill)',
              border: '2px solid var(--border-subtle)',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            Sisa {daysRemainingInMonth} H
          </div>
        </div>

        {/* Row E: Year Progress Meter Strip */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            paddingTop: '2px',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.67rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={11} className="text-orange" />
              <span>Tahun {year}</span>
            </div>
            <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>
              {yearProgress}%
            </span>
          </div>
          <div
            style={{
              height: '4px',
              width: '100%',
              background: 'var(--border-subtle)',
              borderRadius: 'var(--radius-pill)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${yearProgress}%`,
                background: 'linear-gradient(90deg, var(--color-orange), #FFA34D)',
                borderRadius: 'var(--radius-pill)',
                transition: 'width 0.5s ease',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;

