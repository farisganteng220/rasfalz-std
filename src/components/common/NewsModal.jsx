import React, { useState, useEffect, useRef } from 'react';
import { useOS } from '../../context/OSContext';
import {
  X,
  Calendar,
  Clock,
  Tag,
  Share2,
  ExternalLink,
  Sparkles,
  Newspaper,
  Activity,
  CheckCircle2,
  Flame,
} from 'lucide-react';
import {
  calculateEstimatedReadTime,
  getArticleReadActivity,
  saveArticleReadActivity,
  formatReadingDuration,
} from '../../utils/readingTime';

export const NewsModal = () => {
  const { newsModalOpen, setNewsModalOpen, activeNewsItem, addToast } = useOS();
  const [activeSeconds, setActiveSeconds] = useState(0);
  const secondsRef = useRef(0);

  // Active reading timer
  useEffect(() => {
    if (!newsModalOpen || !activeNewsItem) {
      setActiveSeconds(0);
      secondsRef.current = 0;
      return;
    }

    const activity = getArticleReadActivity(activeNewsItem.id);
    setActiveSeconds(activity.duration);
    secondsRef.current = activity.duration;

    const timer = setInterval(() => {
      setActiveSeconds((prev) => {
        const next = prev + 1;
        secondsRef.current = next;
        saveArticleReadActivity(activeNewsItem.id, next);
        return next;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      if (activeNewsItem?.id && secondsRef.current > 0) {
        saveArticleReadActivity(activeNewsItem.id, secondsRef.current);
      }
    };
  }, [newsModalOpen, activeNewsItem]);

  if (!newsModalOpen || !activeNewsItem) return null;

  const estimatedTime = calculateEstimatedReadTime(activeNewsItem);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link Disalin', 'Tautan berita berhasil disalin ke clipboard!', 'info');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      onClick={() => setNewsModalOpen(false)}
    >
      <div
        className="glass-card animate-scale-up"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 'var(--radius-2xl)',
          padding: '24px',
          position: 'relative',
          background: 'var(--bg-surface-elevated)',
          border: '2px solid var(--border-medium)',
          boxShadow: 'var(--shadow-window)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setNewsModalOpen(false)}
          className="btn-press"
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'var(--bg-surface)',
            border: '2px solid var(--border-medium)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          <X size={18} />
        </button>

        {/* Badge & Category & isLatest */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          {activeNewsItem.isLatest && (
            <span
              className="badge badge-orange animate-pulse"
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Flame size={12} />
              <span>isLatest</span>
            </span>
          )}
          <span
            className={`badge ${activeNewsItem.badgeType === 'blue' ? 'badge-blue' : 'badge-orange'}`}
            style={{ fontSize: '0.72rem' }}
          >
            {activeNewsItem.badge}
          </span>
          <span className="badge badge-category" style={{ fontSize: '0.72rem' }}>
            {activeNewsItem.category}
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: '1.45rem',
            fontWeight: 800,
            lineHeight: 1.3,
            marginBottom: '14px',
            color: 'var(--text-primary)',
            paddingRight: '36px',
          }}
        >
          {activeNewsItem.title}
        </h2>

        {/* Metadata & Live Reading Activity Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            marginBottom: '18px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Calendar size={14} className="text-orange" />
            <span>{activeNewsItem.date}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={14} className="text-blue" />
            <span>Estimasi: <strong>{estimatedTime}</strong></span>
          </div>

          {/* Active Reading Stopwatch */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--badge-orange-bg)',
              color: 'var(--badge-orange-text)',
              border: '2px solid var(--badge-orange-border)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.72rem',
              fontWeight: 800,
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--color-orange)',
                display: 'inline-block',
                animation: 'pulse 1.5s infinite',
              }}
            />
            <Activity size={12} />
            <span>Aktivitas Membaca: {formatReadingDuration(activeSeconds)}</span>
          </div>

          <button
            onClick={handleShare}
            className="btn-press"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: 'var(--color-orange)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
              marginLeft: 'auto',
            }}
          >
            <Share2 size={13} />
            <span>Bagikan</span>
          </button>
        </div>

        {/* Cover Image */}
        {activeNewsItem.image && (
          <div
            style={{
              width: '100%',
              height: '240px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              marginBottom: '20px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}
          >
            <img
              src={activeNewsItem.image}
              alt={activeNewsItem.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Article Content */}
        <div
          style={{
            fontSize: '0.92rem',
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            marginBottom: '24px',
            whiteSpace: 'pre-line',
          }}
        >
          {activeNewsItem.content}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            borderTop: '2px solid var(--border-medium)',
            paddingTop: '18px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={() => setNewsModalOpen(false)}
            className="btn btn-glass btn-sm"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
