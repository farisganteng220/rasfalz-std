import React, { useState, useEffect } from 'react';
import { useAudio } from '../../context/AudioContext';
import { RotateCcw, User, Bot, Sparkles, Trophy } from 'lucide-react';

export const TicTacToeGame = () => {
  const { playSoundEffect } = useAudio();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [mode, setMode] = useState('pve'); // 'pve' (vs AI) | 'pvp' (2 Player)
  const [difficulty, setDifficulty] = useState('medium'); // 'easy' | 'medium' | 'hard'
  const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 });

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6],             // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    if (squares.every(Boolean)) return { winner: 'Draw', line: [] };
    return null;
  };

  const gameResult = calculateWinner(board);
  const winner = gameResult ? gameResult.winner : null;
  const winningLine = gameResult ? gameResult.line : [];

  // Update scores on game over
  useEffect(() => {
    if (winner) {
      if (winner === 'X') {
        setScores(prev => ({ ...prev, x: prev.x + 1 }));
      } else if (winner === 'O') {
        setScores(prev => ({ ...prev, o: prev.o + 1 }));
      } else if (winner === 'Draw') {
        setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
      }
    }
  }, [winner]);

  // AI Turn Logic
  useEffect(() => {
    if (mode === 'pve' && !isXNext && !winner) {
      const timer = setTimeout(() => {
        makeAIMove();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isXNext, mode, winner, board]);

  const makeAIMove = () => {
    const emptyIndices = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);

    if (emptyIndices.length === 0) return;

    let chosenIndex = null;

    if (difficulty === 'hard') {
      // Check if AI can win
      for (const idx of emptyIndices) {
        const temp = [...board];
        temp[idx] = 'O';
        if (calculateWinner(temp)?.winner === 'O') {
          chosenIndex = idx;
          break;
        }
      }
      // Check if human can win and block
      if (chosenIndex === null) {
        for (const idx of emptyIndices) {
          const temp = [...board];
          temp[idx] = 'X';
          if (calculateWinner(temp)?.winner === 'X') {
            chosenIndex = idx;
            break;
          }
        }
      }
    }

    if (chosenIndex === null && (difficulty === 'medium' || difficulty === 'hard')) {
      // Pick center if available
      if (board[4] === null) chosenIndex = 4;
    }

    if (chosenIndex === null) {
      // Pick random
      chosenIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }

    handleClick(chosenIndex, true);
  };

  const handleClick = (index, fromAI = false) => {
    if (board[index] || winner) return;
    if (mode === 'pve' && !isXNext && !fromAI) return;

    playSoundEffect(isXNext ? 'click' : 'open');
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    playSoundEffect('click');
    setBoard(Array(9).fill(null));
    setIsXNext(true);
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
        maxWidth: '380px',
        margin: '0 auto',
      }}
    >
      {/* Game Mode Controls */}
      <div style={{ display: 'flex', gap: '8px', width: '100%', justifyContent: 'center' }}>
        <button
          onClick={() => { setMode('pve'); handleReset(); }}
          className={`filter-pill ${mode === 'pve' ? 'active' : ''}`}
          style={{ fontSize: '0.76rem', padding: '4px 12px' }}
        >
          <Bot size={13} style={{ marginRight: '4px' }} />
          Lawan AI
        </button>
        <button
          onClick={() => { setMode('pvp'); handleReset(); }}
          className={`filter-pill ${mode === 'pvp' ? 'active' : ''}`}
          style={{ fontSize: '0.76rem', padding: '4px 12px' }}
        >
          <User size={13} style={{ marginRight: '4px' }} />
          2 Player
        </button>
      </div>

      {/* Scoreboard */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          width: '100%',
          textAlign: 'center',
          background: 'var(--bg-input)',
          padding: '8px 12px',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid var(--border-medium)',
        }}
      >
        <div>
          <span style={{ fontSize: '0.7rem', color: 'var(--color-orange)', fontWeight: 700 }}>P1 (X)</span>
          <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{scores.x}</div>
        </div>
        <div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>Seri</span>
          <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{scores.draws}</div>
        </div>
        <div>
          <span style={{ fontSize: '0.7rem', color: 'var(--color-blue)', fontWeight: 700 }}>
            {mode === 'pve' ? 'AI (O)' : 'P2 (O)'}
          </span>
          <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{scores.o}</div>
        </div>
      </div>

      {/* Status Turn / Winner Banner */}
      <div
        style={{
          fontSize: '0.86rem',
          fontWeight: 700,
          color: winner
            ? winner === 'Draw'
              ? 'var(--text-primary)'
              : winner === 'X'
              ? 'var(--color-orange)'
              : 'var(--color-blue)'
            : 'var(--text-secondary)',
        }}
      >
        {winner ? (
          winner === 'Draw' ? (
            '🤝 Permainan Seri!'
          ) : (
            `🎉 Pemenang: ${winner === 'X' ? 'Player 1 (X)' : mode === 'pve' ? 'AI (O)' : 'Player 2 (O)'}`
          )
        ) : (
          `Giliran: ${isXNext ? 'Player 1 (X)' : mode === 'pve' ? 'AI berpikir...' : 'Player 2 (O)'}`
        )}
      </div>

      {/* 3x3 Grid Board */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          width: '240px',
          height: '240px',
        }}
      >
        {board.map((cell, idx) => {
          const isWinningCell = winningLine.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => handleClick(idx)}
              className="btn-press"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 'var(--radius-lg)',
                background: isWinningCell
                  ? cell === 'X'
                    ? 'var(--badge-orange-bg)'
                    : 'var(--badge-blue-bg)'
                  : 'var(--bg-surface)',
                border: isWinningCell
                  ? `2px solid ${cell === 'X' ? 'var(--color-orange)' : 'var(--color-blue)'}`
                  : '2px solid var(--border-medium)',
                fontSize: '1.8rem',
                fontWeight: 900,
                color: cell === 'X' ? 'var(--color-orange)' : 'var(--color-blue)',
                cursor: cell || winner ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isWinningCell ? '0 4px 14px rgba(0,0,0,0.3)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {cell}
            </button>
          );
        })}
      </div>

      {/* Reset Game Button */}
      <button
        onClick={handleReset}
        className="btn btn-glass btn-sm"
        style={{ width: '100%', gap: '6px', marginTop: '4px' }}
      >
        <RotateCcw size={14} />
        <span>Ulang Permainan</span>
      </button>
    </div>
  );
};

export default TicTacToeGame;
