/**
 * Dynamic Reading Time & Reactive Activity Tracker Utility
 * Tracks estimated word-count reading time and real-time user reading activity history.
 */

// Re-export siteConfig from the central configuration so any imports remain backwards compatible
export { siteConfig } from '../config/siteConfig';

export const calculateEstimatedReadTime = (item) => {
  if (!item) return '1 mnt baca';
  const fullText = `${item.title || ''} ${item.summary || ''} ${item.content || ''}`;
  const words = fullText.trim().split(/\s+/).filter(Boolean).length;

  // Standard human reading speed: ~180 words per minute
  if (words < 90) {
    return '1 mnt baca';
  }
  const minutes = Math.ceil(words / 180);
  return `${minutes} mnt baca`;
};

export const getArticleReadActivity = (articleId) => {
  if (!articleId || typeof window === 'undefined') {
    return { duration: 0, lastReadAt: null, readCount: 0 };
  }
  try {
    const raw = localStorage.getItem(`rasfalz_article_read_activity_${articleId}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        duration: parsed.duration || 0,
        lastReadAt: parsed.lastReadAt || null,
        readCount: parsed.readCount || 1,
      };
    }
    // Fallback legacy key
    const legacy = localStorage.getItem(`rasfalz_article_read_time_${articleId}`);
    if (legacy) {
      return { duration: parseInt(legacy, 10) || 0, lastReadAt: Date.now(), readCount: 1 };
    }
    return { duration: 0, lastReadAt: null, readCount: 0 };
  } catch {
    return { duration: 0, lastReadAt: null, readCount: 0 };
  }
};

export const saveArticleReadActivity = (articleId, seconds) => {
  if (!articleId || typeof window === 'undefined') return;
  try {
    const current = getArticleReadActivity(articleId);
    const newDuration = Math.max(current.duration, seconds);
    const payload = {
      duration: newDuration,
      lastReadAt: Date.now(),
      readCount: current.duration === 0 ? 1 : current.readCount + (seconds > current.duration ? 1 : 0),
    };
    localStorage.setItem(`rasfalz_article_read_activity_${articleId}`, JSON.stringify(payload));
    localStorage.setItem(`rasfalz_article_read_time_${articleId}`, String(newDuration));

    // Dispatch global event for reactive UI synchronization
    window.dispatchEvent(
      new CustomEvent('rasfalz-read-activity-updated', {
        detail: { articleId, ...payload },
      })
    );
  } catch { }
};

export const formatReadingDuration = (seconds) => {
  if (!seconds || seconds <= 0) return '0 dtk';
  if (seconds < 60) return `${seconds} dtk`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m} mnt ${s} dtk` : `${m} mnt`;
};

export const formatTimeAgo = (timestamp) => {
  if (!timestamp) return null;
  const now = Date.now();
  const diffSec = Math.floor((now - timestamp) / 1000);

  if (diffSec < 45) return 'Baru saja';
  if (diffSec < 3600) {
    const min = Math.max(1, Math.floor(diffSec / 60));
    return `${min} mnt lalu`;
  }
  if (diffSec < 86400) {
    const hr = Math.floor(diffSec / 3600);
    return `${hr} jam lalu`;
  }
  const date = new Date(timestamp);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getAllReadActivityStats = (newsItems = []) => {
  if (typeof window === 'undefined') {
    return { totalReadCount: 0, totalDuration: 0, activities: {} };
  }
  const activities = {};
  let totalReadCount = 0;
  let totalDuration = 0;

  newsItems.forEach((item) => {
    const act = getArticleReadActivity(item.id);
    if (act.duration > 0) {
      activities[item.id] = act;
      totalReadCount += 1;
      totalDuration += act.duration;
    }
  });

  return { totalReadCount, totalDuration, activities };
};
