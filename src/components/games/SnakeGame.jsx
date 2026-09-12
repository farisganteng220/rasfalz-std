import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAudio } from '../../context/AudioContext';
import {
  Play,
  Pause,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Trophy,
  Flame,
  Zap,
  Gauge,
} from 'lucide-react';

const GRID_SIZE = 16;
const INITIAL_SNAKE = [
  { x: 8, y: 8 },
  { x: 8, y: 9 },
  { x: 8, y: 10 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 }; // Up

// Speed intervals in milliseconds (Lower = Faster)
const SPEED_CONFIG = {
  slow: { label: 'Lambat', interval: 180, icon: '🐢', color: '#10B981' },
  normal: { label: 'Normal', interval: 120, icon: '⚡', color: '#FF9C0F' },
  fast: { label: 'Cepat', interval: 70, icon: '🚀', color: '#EF4444' },
};

export const SnakeGame = () => {
  const { playSoundEffect } = useAudio();
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 4, y: 4 });
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState('normal'); // 'slow' | 'normal' | 'fast'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('rasfalz_snake_highscore') || '0', 10);
    } catch {
      return 0;
    }
  });

  const nextDirectionRef = useRef(INITIAL_DIRECTION);

  const generateFood = useCallback((currentSnake) => {
    while (true) {
      const newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const onSnake = currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y);
      if (!onSnake) return newFood;
    }
  }, []);

  // Keyboard navigation & speed hotkeys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code) && direction.y === 0) {
        e.preventDefault();
        nextDirectionRef.current = { x: 0, y: -1 };
      } else if (['ArrowDown', 'KeyS'].includes(e.code) && direction.y === 0) {
        e.preventDefault();
        nextDirectionRef.current = { x: 0, y: 1 };
      } else if (['ArrowLeft', 'KeyA'].includes(e.code) && direction.x === 0) {
        e.preventDefault();
        nextDirectionRef.current = { x: -1, y: 0 };
      } else if (['ArrowRight', 'KeyD'].includes(e.code) && direction.x === 0) {
        e.preventDefault();
        nextDirectionRef.current = { x: 1, y: 0 };
      } else if (e.code === 'Space') {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      } else if (e.key === '1') {
        setSpeed('slow');
      } else if (e.key === '2') {
        setSpeed('normal');
      } else if (e.key === '3') {
        setSpeed('fast');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  // Main game loop with dynamic speed interval
  useEffect(() => {
    if (gameOver || isPaused) return;

    const currentInterval = SPEED_CONFIG[speed].interval;

    const gameInterval = setInterval(() => {
      setSnake((prevSnake) => {
        const nextDir = nextDirectionRef.current;
        setDirection(nextDir);

        const newHead = {
          x: prevSnake[0].x + nextDir.x,
          y: prevSnake[0].y + nextDir.y,
        };

        // Wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          playSoundEffect('click');
          setGameOver(true);
          return prevSnake;
        }

        // Self collision
        if (prevSnake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
          playSoundEffect('click');
          setGameOver(true);
          return prevSnake;
        }

        // Eating food
        if (newHead.x === food.x && newHead.y === food.y) {
          playSoundEffect('open');
          setScore((s) => {
            // Speed bonus multiplier: Slow = 10pts, Normal = 15pts, Fast = 25pts
            const multiplier = speed === 'fast' ? 25 : speed === 'normal' ? 15 : 10;
            const newScore = s + multiplier;
            if (newScore > highScore) {
              setHighScore(newScore);
              try {
                localStorage.setItem('rasfalz_snake_highscore', String(newScore));
              } catch {}
            }
            return newScore;
          });
          setFood(generateFood([newHead, ...prevSnake]));
          return [newHead, ...prevSnake];
        }

        // Move forward
        return [newHead, ...prevSnake.slice(0, -1)];
      });
    }, currentInterval);

    return () => clearInterval(gameInterval);
  }, [gameOver, isPaused, food, highScore, speed, generateFood, playSoundEffect]);

  const handleReset = () => {
    playSoundEffect('click');
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    nextDirectionRef.current = INITIAL_DIRECTION;
    setFood({ x: 4, y: 4 });
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  };

  const changeDirection = (dir) => {
    if (dir === 'up' && direction.y === 0) nextDirectionRef.current = { x: 0, y: -1 };
    if (dir === 'down' && direction.y === 0) nextDirectionRef.current = { x: 0, y: 1 };
    if (dir === 'left' && direction.x === 0) nextDirectionRef.current = { x: -1, y: 0 };
    if (dir === 'right' && direction.x === 0) nextDirectionRef.current = { x: 1, y: 0 };
  };

  const handleSpeedSelect = (newSpeed) => {
    playSoundEffect('click');
    setSpeed(newSpeed);
  };

  return (
    <div
      className="glass-card"
      style={{
        padding: '20px',
        borderRadius: 'var(--radius-xl)',
        background: 'var(--bg-surface-elevated)',
        border: '2px solid var(--border-medium)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      {/* Score Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          background: 'var(--bg-input)',
          padding: '8px 14px',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid var(--border-medium)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Flame size={16} className="text-orange" />
          <span style={{ fontSize: '0.84rem', fontWeight: 800 }}>Score: {score}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Trophy size={15} style={{ color: '#F59E0B' }} />
          <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#F59E0B' }}>Best: {highScore}</span>
        </div>
      </div>

      {/* ── SPEED SELECTOR BAR (Lambat, Normal, Cepat) ── */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          background: 'var(--bg-surface)',
          padding: '8px 12px',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-muted)' }}>
            <Gauge size={13} className="text-orange" />
            <span>KECEPATAN GAME</span>
          </div>
          <span
            style={{
              fontSize: '0.68rem',
              fontWeight: 800,
              color: SPEED_CONFIG[speed].color,
            }}
          >
            {SPEED_CONFIG[speed].interval}ms / step
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
          {Object.entries(SPEED_CONFIG).map(([key, cfg]) => {
            const isSelected = speed === key;
            return (
              <button
                key={key}
                onClick={() => handleSpeedSelect(key)}
                className={`btn-press ${isSelected ? 'active' : ''}`}
                style={{
                  padding: '6px 4px',
                  borderRadius: 'var(--radius-md)',
                  border: isSelected ? `2px solid ${cfg.color}` : '2px solid var(--border-medium)',
                  background: isSelected ? `${cfg.color}20` : 'var(--bg-surface-elevated)',
                  color: isSelected ? cfg.color : 'var(--text-secondary)',
                  fontSize: '0.74rem',
                  fontWeight: isSelected ? 800 : 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <span>{cfg.icon}</span>
                <span>{cfg.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Snake Canvas Grid */}
      <div
        style={{
          width: '260px',
          height: '260px',
          background: 'var(--bg-card)',
          backgroundImage: `
            linear-gradient(to right, var(--grid-line-color) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-line-color) 1px, transparent 1px)
          `,
          backgroundSize: `${260 / GRID_SIZE}px ${260 / GRID_SIZE}px`,
          borderRadius: 'var(--radius-lg)',
          border: '2px solid var(--border-medium)',
          position: 'relative',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
        }}
      >
        {/* Render Grid Cells */}
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
          const x = idx % GRID_SIZE;
          const y = Math.floor(idx / GRID_SIZE);
          const isHead = snake[0].x === x && snake[0].y === y;
          const isBody = snake.slice(1).some((s) => s.x === x && s.y === y);
          const isFoodCell = food.x === x && food.y === y;

          let cellBg = 'transparent';
          if (isHead) cellBg = 'var(--color-orange)';
          else if (isBody) cellBg = 'rgba(255, 156, 15, 0.7)';
          else if (isFoodCell) cellBg = '#10B981';

          return (
            <div
              key={idx}
              style={{
                background: cellBg,
                borderRadius: isHead ? '4px' : isFoodCell ? '50%' : '2px',
                transform: isFoodCell ? 'scale(0.85)' : 'none',
              }}
            />
          );
        })}

        {/* Game Over Overlay */}
        {gameOver && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontSize: '1.2rem', color: '#EF4444', margin: 0, fontWeight: 800 }}>Game Over!</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              Skor Akhir: {score} • Mode: {SPEED_CONFIG[speed].label}
            </p>
            <button onClick={handleReset} className="btn btn-primary-orange btn-sm">
              Main Lagi
            </button>
          </div>
        )}
      </div>

      {/* D-Pad Touch Controls (Mobile Friendly) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 38px)',
          gridTemplateRows: 'repeat(2, 38px)',
          gap: '6px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div />
        <button
          onClick={() => changeDirection('up')}
          className="btn-press"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-surface)',
            border: '2px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            cursor: 'pointer',
          }}
        >
          <ArrowUp size={18} />
        </button>
        <div />

        <button
          onClick={() => changeDirection('left')}
          className="btn-press"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-surface)',
            border: '2px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={18} />
        </button>

        <button
          onClick={() => changeDirection('down')}
          className="btn-press"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-surface)',
            border: '2px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            cursor: 'pointer',
          }}
        >
          <ArrowDown size={18} />
        </button>

        <button
          onClick={() => changeDirection('right')}
          className="btn-press"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-surface)',
            border: '2px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            cursor: 'pointer',
          }}
        >
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Control Buttons */}
      <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
        <button
          onClick={() => setIsPaused((p) => !p)}
          className="btn btn-glass btn-sm"
          style={{ flex: 1, gap: '4px' }}
        >
          {isPaused ? <Play size={13} /> : <Pause size={13} />}
          <span>{isPaused ? 'Resume' : 'Pause'}</span>
        </button>

        <button
          onClick={handleReset}
          className="btn btn-glass btn-sm"
          style={{ flex: 1, gap: '4px' }}
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};

export default SnakeGame;
