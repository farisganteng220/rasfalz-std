import React from 'react';

// Helper to compute rich gradient from base hex
const computeRichSquircleGradient = (color) => {
  if (!color || typeof color !== 'string') {
    return 'linear-gradient(145deg, #FF9C0F 0%, #D67A00 100%)';
  }
  if (color.startsWith('linear-gradient')) return color;
  
  // Specific standard palette mappings
  const colorMap = {
    '#0052F5': 'linear-gradient(145deg, #0052F5 0%, #0036B8 100%)',
    '#FF9C0F': 'linear-gradient(145deg, #FF9C0F 0%, #D97706 100%)',
    '#10B981': 'linear-gradient(145deg, #10B981 0%, #047857 100%)',
    '#EC4899': 'linear-gradient(145deg, #EC4899 0%, #BE185D 100%)',
    '#8B5CF6': 'linear-gradient(145deg, #8B5CF6 0%, #6D28D9 100%)',
    '#25D366': 'linear-gradient(145deg, #25D366 0%, #15803D 100%)',
    '#EE4D2D': 'linear-gradient(145deg, #EE4D2D 0%, #C22A0D 100%)',
    '#229ED9': 'linear-gradient(145deg, #229ED9 0%, #0284C7 100%)',
    '#FA9D24': 'linear-gradient(145deg, #FA9D24 0%, #C26804 100%)',
  };

  return colorMap[color.toUpperCase()] || `linear-gradient(145deg, ${color} 0%, rgba(0,0,0,0.3) 100%), ${color}`;
};

/**
 * AppSquircleIcon
 * Renders an aesthetically polished, solid OS-style squircle app icon
 * with rich linear gradient, crisp inner highlight, and drop shadow.
 */
export const AppSquircleIcon = ({
  icon: Icon,
  gradient,
  color = '#FF9C0F',
  size = 50,
  iconSize,
  borderRadius,
  className = '',
  style = {},
  badge,
}) => {
  const calculatedIconSize = iconSize || Math.round(size * 0.52);
  const calculatedRadius = borderRadius || Math.round(size * 0.32);
  const finalGradient = gradient || computeRichSquircleGradient(color);

  return (
    <div
      className={`app-squircle-icon ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${calculatedRadius}px`,
        background: finalGradient,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        flexShrink: 0,
        boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 4px 14px rgba(0, 0, 0, 0.18)`,
        border: '2px solid rgba(255, 255, 255, 0.25)',
        userSelect: 'none',
        transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        ...style,
      }}
    >
      {Icon && (
        <Icon
          size={calculatedIconSize}
          style={{
            filter: 'drop-shadow(0 1.5px 3px rgba(0, 0, 0, 0.25))',
          }}
        />
      )}
      {badge && (
        <span
          style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            background: '#EF4444',
            color: '#FFF',
            fontSize: '0.62rem',
            fontFamily: 'var(--font-subheading)',
            fontWeight: 800,
            padding: '2px 6px',
            borderRadius: '99px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
            border: '2px solid #FFF',
          }}
        >
          {badge}
        </span>
      )}
    </div>
  );
};
