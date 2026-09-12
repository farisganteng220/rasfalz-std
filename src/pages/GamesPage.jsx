import React, { useState } from 'react';
import { WindowFrame } from '../components/common/WindowFrame';
import { TicTacToeGame } from '../components/games/TicTacToeGame';
import { SnakeGame } from '../components/games/SnakeGame';
import { useOS } from '../context/OSContext';
import { useAudio } from '../context/AudioContext';
import {
  Gamepad2,
  Grid,
  Flame,
  Trophy,
  Sparkles,
  Award,
  Zap,
  RotateCcw,
  Keyboard,
  MousePointer,
  HelpCircle,
  Volume2,
  VolumeX,
} from 'lucide-react';

export const GamesPage = () => {
  const { isMobile, addToast } = useOS();
  const { isMuted, toggleMute, playSoundEffect } = useAudio();
  const [activeGame, setActiveGame] = useState('tictactoe'); // 'tictactoe' | 'snake'

  // ==========================================
  // MOBILE VIEW: Preserved Clean Mobile Layout
  // ==========================================
  if (isMobile) {
    return (
      <WindowFrame
        title="Arcade & Game Hub"
        icon={Gamepad2}
        badgeText="Arcade v1.0"
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '30px' }}>
          {/* Game Hub Header & Tab Switcher */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--badge-orange-bg)',
                border: '2px solid var(--color-orange)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-pill)',
                marginBottom: '10px',
              }}
            >
              <Sparkles size={14} className="text-orange" />
              <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--badge-orange-text)' }}>
                Interactive Mini Games
              </span>
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
              Arcade <span className="text-gradient">Gaming Zone</span>
            </h2>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0 }}>
              Istirahat sejenak sambil bermain game klasik Tic-Tac-Toe & Snake Arcade langsung di website kami.
            </p>

            {/* Game Switcher Tabs */}
            <div
              style={{
                display: 'inline-flex',
                background: 'var(--bg-surface)',
                padding: '4px',
                borderRadius: 'var(--radius-pill)',
                border: '2px solid var(--border-medium)',
                marginTop: '16px',
                gap: '4px',
              }}
            >
              <button
                onClick={() => {
                  setActiveGame('tictactoe');
                  playSoundEffect('click');
                }}
                className={`filter-pill ${activeGame === 'tictactoe' ? 'active' : ''}`}
                style={{ padding: '6px 18px', fontSize: '0.82rem', borderRadius: 'var(--radius-pill)' }}
              >
                <Grid size={15} style={{ marginRight: '6px' }} />
                Tic-Tac-Toe
              </button>
              <button
                onClick={() => {
                  setActiveGame('snake');
                  playSoundEffect('click');
                }}
                className={`filter-pill ${activeGame === 'snake' ? 'active' : ''}`}
                style={{ padding: '6px 18px', fontSize: '0.82rem', borderRadius: 'var(--radius-pill)' }}
              >
                <Flame size={15} style={{ marginRight: '6px' }} />
                Snake Arcade
              </button>
            </div>
          </div>

          {/* Active Game Window */}
          <div className="animate-fade-in">
            {activeGame === 'tictactoe' ? <TicTacToeGame /> : <SnakeGame />}
          </div>
        </div>
      </WindowFrame>
    );
  }

  // ==========================================
  // DESKTOP & TABLET VIEW: Sleek Arcade Arena Dual-Pane Layout
  // ==========================================
  return (
    <WindowFrame
      title="Rasfalz Studio — Studio Arcade Gaming Lounge"
      icon={Gamepad2}
      badgeText="Arcade Hub v2.0 • Pro"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* ── TOP HERO HEADER BANNER ── */}
        <div
          className="glass-card"
          style={{
            padding: '20px 24px',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, rgba(255, 156, 15, 0.08) 0%, rgba(0, 82, 245, 0.08) 100%), var(--bg-surface-elevated)',
            border: '2px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <span className="badge badge-orange" style={{ fontSize: '0.72rem', padding: '3px 10px' }}>
                <Sparkles size={12} /> Studio Arcade Lounge
              </span>
              <span className="badge badge-blue" style={{ fontSize: '0.72rem', padding: '3px 10px' }}>
                <Zap size={12} /> 60 FPS Engine
              </span>
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 900, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
              Arcade <span className="text-gradient">Gaming Arena</span>
            </h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0 }}>
              Mainkan mini game klasik dengan kecerdasan AI, haptic sound effects, dan pelacak skor waktu nyata.
            </p>
          </div>

          {/* Quick Sound FX Mute & Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => {
                toggleMute();
                playSoundEffect('click');
              }}
              className="btn btn-glass btn-sm"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                borderColor: isMuted ? '#EF4444' : 'var(--color-orange)',
                color: isMuted ? '#EF4444' : 'var(--color-orange)',
              }}
              title={isMuted ? 'Nyalakan Efek Suara' : 'Bisukan Efek Suara'}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              <span>{isMuted ? 'SFX Hening' : 'SFX Aktif'}</span>
            </button>
          </div>
        </div>

        {/* ── MAIN DESKTOP ARENA LAYOUT (Dual Pane) ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '300px 1fr',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          {/* Left Arcade Sidebar: Game Chooser, Player Card & Control Guides */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Game Selector Cards */}
            <div
              className="glass-card"
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-xl)',
                background: 'var(--bg-surface-elevated)',
                border: '2px solid var(--border-medium)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Pilih Game Arcade
              </span>

              {/* Tic-Tac-Toe Option */}
              <div
                onClick={() => {
                  setActiveGame('tictactoe');
                  playSoundEffect('click');
                }}
                className={`glass-card btn-press ${activeGame === 'tictactoe' ? 'active-game-card' : ''}`}
                style={{
                  padding: '14px',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  background: activeGame === 'tictactoe' ? 'var(--color-orange-subtle)' : 'var(--bg-surface)',
                  border: activeGame === 'tictactoe' ? '2px solid var(--color-orange)' : '2px solid var(--border-medium)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s ease',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: activeGame === 'tictactoe' ? 'var(--color-orange)' : 'rgba(255, 156, 15, 0.15)',
                    color: activeGame === 'tictactoe' ? '#FFFFFF' : 'var(--color-orange)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Grid size={22} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                      Tic-Tac-Toe
                    </h4>
                    {activeGame === 'tictactoe' && (
                      <span className="badge badge-orange" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                        Playing
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                    AI Smart Bot • 2 Player Match
                  </p>
                </div>
              </div>

              {/* Snake Game Option */}
              <div
                onClick={() => {
                  setActiveGame('snake');
                  playSoundEffect('click');
                }}
                className={`glass-card btn-press ${activeGame === 'snake' ? 'active-game-card' : ''}`}
                style={{
                  padding: '14px',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  background: activeGame === 'snake' ? 'var(--color-blue-subtle)' : 'var(--bg-surface)',
                  border: activeGame === 'snake' ? '2px solid var(--color-blue)' : '2px solid var(--border-medium)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s ease',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: activeGame === 'snake' ? 'var(--color-blue)' : 'rgba(0, 82, 245, 0.15)',
                    color: activeGame === 'snake' ? '#FFFFFF' : 'var(--color-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Flame size={22} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                      Snake Arcade
                    </h4>
                    {activeGame === 'snake' && (
                      <span className="badge badge-blue" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                        Playing
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                    Retro Speed • High Score
                  </p>
                </div>
              </div>
            </div>

            {/* Game Controls Guide Card */}
            <div
              className="glass-card"
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-xl)',
                background: 'var(--bg-surface)',
                border: '2px solid var(--border-medium)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <Keyboard size={16} className="text-orange" />
                <span style={{ fontSize: '0.82rem', fontWeight: 800 }}>Panduan Kontrol</span>
              </div>

              {activeGame === 'tictactoe' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MousePointer size={13} className="text-blue" />
                    <span>Klik kotak untuk menempatkan simbol <strong>X</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Zap size={13} className="text-orange" />
                    <span>Pilih mode lawan AI pintar atau teman 2 Player</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Award size={13} className="text-green" />
                    <span>Raih 3 garis beruntun untuk menang!</span>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="badge badge-neutral" style={{ fontSize: '0.66rem', padding: '1px 5px' }}>W / A / S / D</span>
                    <span>atau Tombol Panah Arah</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="badge badge-neutral" style={{ fontSize: '0.66rem', padding: '1px 5px' }}>Space</span>
                    <span>Jeda / Lanjutkan Permainan</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Trophy size={13} className="text-orange" />
                    <span>Kumpulkan buah untuk cetak rekor baru!</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Main Game Arena Canvas */}
          <div
            className="glass-card"
            style={{
              padding: '24px',
              borderRadius: 'var(--radius-2xl)',
              background: 'var(--bg-surface-elevated)',
              border: '2px solid var(--border-medium)',
              boxShadow: 'var(--shadow-lg)',
              minHeight: '520px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div className="animate-fade-in" style={{ width: '100%' }}>
              {activeGame === 'tictactoe' ? <TicTacToeGame /> : <SnakeGame />}
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};

export default GamesPage;
