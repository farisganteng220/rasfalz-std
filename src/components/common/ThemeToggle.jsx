import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = ({ compact = false }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`btn btn-glass ${compact ? 'btn-sm' : ''} hover-scale`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        borderRadius: 'var(--radius-pill)',
        padding: compact ? '6px 12px' : '8px 16px',
        color: isDark ? 'var(--color-orange)' : 'var(--color-blue)',
      }}
    >
      {isDark ? (
        <>
          <Sun size={18} className="text-orange" />
          {!compact && <span>Light Mode</span>}
        </>
      ) : (
        <>
          <Moon size={18} className="text-blue" />
          {!compact && <span>Dark Mode</span>}
        </>
      )}
    </button>
  );
};
