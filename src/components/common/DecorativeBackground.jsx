import React from 'react';
import { useOS } from '../../context/OSContext';

/* ============================================================
   DecorativeBackground Component
   - Kisi-kisi Grid: Presisi berbasis square cells (tidak memanjang)
   - Faded Accent Tiles: Kotak kisi-kisi dengan warna pudar lembut
   - Geometri Beranimasi:
       1. Kotak Rounded (Rounded Square)
       2. Circle / Lingkaran
       3. Segitiga Rounded (Smooth SVG Rounded Triangle)
       4. Bintang Rounded (Smooth 4-Point & 5-Point Rounded Star)
   - Varian: 'full' | 'subtle' | 'micro'
   - Skema Warna: 'mixed' | 'orange' | 'blue' | 'purple'
   - Responsif: Presisi untuk Mobile (HP), Tablet, dan Desktop
   ============================================================ */

let _keyframesInjected = false;
function injectDecorKeyframes() {
  if (_keyframesInjected || typeof document === 'undefined') return;
  _keyframesInjected = true;
  const style = document.createElement('style');
  style.id = 'decorative-bg-keyframes';
  style.textContent = `
    @keyframes decoFloatSquare {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-8px) rotate(6deg); }
    }
    @keyframes decoFloatCircle {
      0%, 100% { transform: translateY(0px) scale(1); }
      50% { transform: translateY(7px) scale(1.05); }
    }
    @keyframes decoFloatTriangle {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-9px) rotate(-8deg); }
    }
    @keyframes decoFloatStar {
      0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
      50% { transform: translateY(9px) rotate(14deg) scale(1.08); }
    }
    @keyframes decoTileGlow {
      0%, 100% { opacity: 0.45; }
      50% { opacity: 0.85; }
    }
    @keyframes decoShimmer {
      0% { opacity: 0.3; transform: scale(0.98); }
      50% { opacity: 0.7; transform: scale(1.02); }
      100% { opacity: 0.3; transform: scale(0.98); }
    }
  `;
  document.head.appendChild(style);
}

/* --- Precise Square Grid with Faded Colored Accent Cells --- */
const PreciseKisiGrid = React.memo(({ isMobile, variant, scheme }) => {
  const cellSize = isMobile ? 32 : 44;

  // Preset of faded tile positions (col, row, bg, border)
  const isSubtle = variant === 'subtle';
  const isMicro = variant === 'micro';

  const fadedTiles = isMicro
    ? [
        { col: 1, row: 0, bg: 'rgba(255, 156, 15, 0.08)', border: 'rgba(255, 156, 15, 0.18)' },
        { col: 4, row: 1, bg: 'rgba(80, 160, 255, 0.08)', border: 'rgba(80, 160, 255, 0.18)' },
      ]
    : [
        { col: 1, row: 1, bg: 'rgba(255, 156, 15, 0.08)', border: 'rgba(255, 156, 15, 0.22)' },
        { col: 4, row: 0, bg: 'rgba(80, 160, 255, 0.08)', border: 'rgba(80, 160, 255, 0.20)' },
        { col: 7, row: 2, bg: 'rgba(160, 100, 255, 0.07)', border: 'rgba(160, 100, 255, 0.18)' },
        { col: 2, row: 3, bg: 'rgba(20, 200, 160, 0.07)', border: 'rgba(20, 200, 160, 0.18)' },
        { col: 9, row: 1, bg: 'rgba(255, 156, 15, 0.07)', border: 'rgba(255, 156, 15, 0.18)' },
        { col: 5, row: 4, bg: 'rgba(255, 200, 60, 0.06)', border: 'rgba(255, 200, 60, 0.18)' },
        { col: 11, row: 0, bg: 'rgba(80, 160, 255, 0.06)', border: 'rgba(80, 160, 255, 0.16)' },
        { col: 0, row: 4, bg: 'rgba(160, 100, 255, 0.06)', border: 'rgba(160, 100, 255, 0.16)' },
        { col: 13, row: 2, bg: 'rgba(255, 90, 30, 0.07)', border: 'rgba(255, 90, 30, 0.18)' },
        { col: 8, row: 4, bg: 'rgba(20, 200, 160, 0.06)', border: 'rgba(20, 200, 160, 0.16)' },
        { col: 3, row: 5, bg: 'rgba(255, 156, 15, 0.07)', border: 'rgba(255, 156, 15, 0.18)' },
      ];

  const gridOpacity = isSubtle ? 0.025 : 0.038;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        backgroundImage: `
          linear-gradient(to right, var(--grid-line-color) 1px, transparent 1px),
          linear-gradient(to bottom, var(--grid-line-color) 1px, transparent 1px)
        `,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        backgroundPosition: '0 0',
      }}
    >
      {/* Individual Faded Grid Accent Squares aligned with exact cell boundaries */}
      {fadedTiles.map((tile, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            left: `${tile.col * cellSize}px`,
            top: `${tile.row * cellSize}px`,
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            background: tile.bg,
            border: `2px solid ${tile.border}`,
            boxSizing: 'border-box',
            borderRadius: '3px',
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
});

/* --- Floating Geometric Elements: Rounded Square, Circle, Rounded Triangle, Rounded Star --- */
const GeometricShapes = React.memo(({ isMobile, scheme = 'mixed', variant = 'full' }) => {
  injectDecorKeyframes();

  const sz = (mob, dsk) => (isMobile ? mob : dsk);
  const isMicro = variant === 'micro';
  const isSubtle = variant === 'subtle';

  if (isMicro) {
    return (
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.6,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '12px',
            width: '18px',
            height: '18px',
            borderRadius: '5px',
            background: 'rgba(255, 156, 15, 0.2)',
            border: '2px solid rgba(255, 156, 15, 0.35)',
            animation: 'decoFloatSquare 4.5s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '12px',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: 'rgba(80, 160, 255, 0.2)',
            border: '2px solid rgba(80, 160, 255, 0.35)',
            animation: 'decoFloatCircle 5s ease-in-out infinite 0.5s',
          }}
        />
      </div>
    );
  }

  const baseOpacity = isSubtle ? 0.75 : 1;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: baseOpacity,
      }}
    >
      {/* 1. KOTAK ROUNDED (Top-Right) */}
      <div
        style={{
          position: 'absolute',
          top: sz('12px', '22px'),
          right: sz('14px', '34px'),
          width: sz('40px', '56px'),
          height: sz('40px', '56px'),
          borderRadius: sz('12px', '16px'),
          background: 'rgba(255, 156, 15, 0.18)',
          border: '2px solid rgba(255, 156, 15, 0.38)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          animation: 'decoFloatSquare 4.8s ease-in-out infinite',
        }}
      />

      {/* 2. CIRCLE / LINGKARAN (Bottom-Left) */}
      <div
        style={{
          position: 'absolute',
          bottom: sz('16px', '26px'),
          left: sz('12px', '36px'),
          width: sz('34px', '48px'),
          height: sz('34px', '48px'),
          borderRadius: '50%',
          background: 'rgba(0, 82, 245, 0.18)',
          border: '2px solid rgba(0, 82, 245, 0.38)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          animation: 'decoFloatCircle 5.4s ease-in-out infinite 0.6s',
        }}
      />

      {/* 3. SEGITIGA ROUNDED (Mid-Right Smooth Rounded Triangle) */}
      <svg
        style={{
          position: 'absolute',
          top: '50%',
          right: sz('8%', '6%'),
          transform: 'translateY(-50%)',
          width: sz('36px', '52px'),
          height: sz('36px', '52px'),
          animation: 'decoFloatTriangle 6s ease-in-out infinite 1.2s',
          overflow: 'visible',
        }}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 10 C32.5 10, 49 43, 47 47 C45 50, 15 50, 13 47 C11 43, 27.5 10, 30 10 Z"
          fill="rgba(160, 100, 255, 0.24)"
          stroke="rgba(160, 100, 255, 0.48)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      {/* 4. BINTANG ROUNDED (Top-Left Smooth 4-Point Star) */}
      <svg
        style={{
          position: 'absolute',
          top: sz('14px', '26px'),
          left: sz('12px', '28px'),
          width: sz('34px', '48px'),
          height: sz('34px', '48px'),
          animation: 'decoFloatStar 5.2s ease-in-out infinite 0.4s',
          overflow: 'visible',
        }}
        viewBox="0 0 54 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27 4 C27 4, 29.5 14, 34 18.5 C38.5 23, 48 25, 48 25 C48 25, 38.5 27, 34 31.5 C29.5 36, 27 46, 27 46 C27 46, 24.5 36, 20 31.5 C15.5 27, 6 25, 6 25 C6 25, 15.5 23, 20 18.5 C24.5 14, 27 4, 27 4 Z"
          fill="rgba(255, 200, 60, 0.26)"
          stroke="rgba(255, 200, 60, 0.58)"
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      {/* 5. AKSEN KECIL: Mini Kotak Rounded (Center-Left) */}
      <div
        style={{
          position: 'absolute',
          top: sz('28%', '46%'),
          left: sz('32%', '20%'),
          width: sz('12px', '18px'),
          height: sz('12px', '18px'),
          borderRadius: '5px',
          background: 'rgba(255, 156, 15, 0.12)',
          border: '1.2px solid rgba(255, 156, 15, 0.32)',
          animation: 'decoFloatSquare 6.5s ease-in-out infinite 1.5s',
        }}
      />

      {/* 6. AKSEN KECIL: Mini Circle (Bottom-Right Area) */}
      <div
        style={{
          position: 'absolute',
          bottom: sz('22px', '38px'),
          right: sz('16%', '14%'),
          width: sz('14px', '22px'),
          height: sz('14px', '22px'),
          borderRadius: '50%',
          background: 'rgba(80, 160, 255, 0.12)',
          border: '1.2px solid rgba(80, 160, 255, 0.32)',
          animation: 'decoFloatCircle 7s ease-in-out infinite 2s',
        }}
      />

      {/* 7. AKSEN KECIL: Mini Bintang Rounded 5-Point (Center-Right/Bottom) */}
      <svg
        style={{
          position: 'absolute',
          bottom: sz('18px', '16px'),
          right: sz('28%', '26%'),
          width: sz('16px', '22px'),
          height: sz('16px', '22px'),
          animation: 'decoShimmer 4s ease-in-out infinite 1s',
          overflow: 'visible',
        }}
        viewBox="0 0 54 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27 6 L33 19 L47 21 L37 31 L39 45 L27 38 L15 45 L17 31 L7 21 L21 19 Z"
          fill="rgba(255, 156, 15, 0.22)"
          stroke="rgba(255, 156, 15, 0.45)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
});

/* ============================================================
   Exported DecorativeBackground
   ============================================================ */
export const DecorativeBackground = React.memo(
  ({
    isMobile: isMobileProp,
    variant = 'full',
    scheme = 'mixed',
    opacity,
    children,
    style = {},
  }) => {
    // Graceful context detection
    let isMobileContext = false;
    try {
      const os = useOS();
      if (os && typeof os.isMobile === 'boolean') {
        isMobileContext = os.isMobile;
      }
    } catch {
      // If outside context, fallback to screen check
      if (typeof window !== 'undefined') {
        isMobileContext = window.innerWidth <= 768;
      }
    }

    const isMobile = isMobileProp !== undefined ? isMobileProp : isMobileContext;

    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          opacity: opacity !== undefined ? opacity : 1,
          ...style,
        }}
        aria-hidden="true"
      >
        <PreciseKisiGrid isMobile={isMobile} variant={variant} scheme={scheme} />
        <GeometricShapes isMobile={isMobile} scheme={scheme} variant={variant} />
        {children}
      </div>
    );
  }
);

export default DecorativeBackground;
