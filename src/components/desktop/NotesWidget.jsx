import React, { useState, useEffect } from 'react';
import { Edit3, CheckSquare, Square, Plus, Trash2 } from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { DecorativeBackground } from '../common/DecorativeBackground';

export const NotesWidget = () => {
  const { addToast } = useOS();
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('vantara_os_todos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      { id: 1, text: 'Design Android 16 Google Pixel UI', done: true },
      { id: 2, text: 'Render 3D Cyberpunk showreel intro', done: true },
      { id: 3, text: 'Export new sound FX pack for Premiere', done: false },
      { id: 4, text: 'Review incoming commission requests', done: false },
    ];
  });

  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    localStorage.setItem('vantara_os_todos', JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: inputVal.trim(),
      done: false,
    };
    setTodos(prev => [newTodo, ...prev]);
    setInputVal('');
    addToast('Task Added', 'Quick note berhasil ditambahkan ke OS dashboard!', 'success');
  };

  const deleteTodo = (id, e) => {
    e.stopPropagation();
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="os-widget hover-lift" style={{ position: 'relative', overflow: 'hidden' }}>
      <DecorativeBackground variant="micro" scheme="purple" cols={5} rows={4} opacity={0.45} />
      <div className="os-widget-header">
        <span className="os-widget-title">
          <Edit3 size={16} className="text-orange" />
          Quick Notes & To-Do
        </span>
        <span className="badge badge-glass">
          {todos.filter(t => t.done).length}/{todos.length} Done
        </span>
      </div>

      {/* Todo List */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          maxHeight: '160px',
          overflowY: 'auto',
          paddingRight: '4px',
          marginBottom: '12px',
        }}
      >
        {todos.map(todo => (
          <div
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
              padding: '8px 10px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
              {todo.done ? (
                <CheckSquare size={16} className="text-orange" />
              ) : (
                <Square size={16} style={{ color: 'var(--text-muted)' }} />
              )}
              <span
                style={{
                  fontSize: '0.82rem',
                  color: todo.done ? 'var(--text-muted)' : 'var(--text-primary)',
                  textDecoration: todo.done ? 'line-through' : 'none',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {todo.text}
              </span>
            </div>

            <button
              onClick={(e) => deleteTodo(todo.id, e)}
              style={{ color: 'var(--text-muted)', cursor: 'pointer', opacity: 0.6 }}
              className="hover-scale"
              title="Delete note"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>

      {/* Input Add Task */}
      <form onSubmit={addTodo} style={{ display: 'flex', gap: '6px' }}>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Tulis catatan atau task baru..."
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: 'var(--radius-pill)',
            background: 'var(--bg-surface)',
            border: '2px solid var(--border-medium)',
            color: 'var(--text-primary)',
            fontSize: '0.82rem',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          className="btn btn-primary-orange btn-sm btn-press"
          style={{ padding: '8px 14px', borderRadius: 'var(--radius-pill)' }}
        >
          <Plus size={16} />
        </button>
      </form>
    </div>
  );
};
