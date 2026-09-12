import React from 'react';
import { useOS } from '../../context/OSContext';
import { Sparkles, CheckCircle2, AlertCircle, Info, X, Bell, ChevronRight } from 'lucide-react';

export const ToastNotification = () => {
  const { toasts, removeToast, setNotificationModalOpen } = useOS();

  if (!toasts.length) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '380px',
        width: 'calc(100vw - 48px)',
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-slide-down"
          style={{
            pointerEvents: 'auto',
            background: 'var(--bg-surface-elevated)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border:
              toast.type === 'success'
                ? '2px solid #065F38'
                : toast.type === 'warning'
                ? '2px solid var(--color-orange)'
                : '2px solid var(--border-medium)',
            borderRadius: '16px',
            padding: '14px 16px',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.45)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            cursor: 'pointer',
            position: 'relative',
          }}
          onClick={() => {
            setNotificationModalOpen(true);
            removeToast(toast.id);
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background:
                toast.type === 'success'
                  ? 'var(--badge-green-bg)'
                  : toast.type === 'warning'
                  ? 'var(--badge-orange-bg)'
                  : 'var(--badge-blue-bg)',
              border: `2px solid ${
                toast.type === 'success'
                  ? 'var(--badge-green-border)'
                  : toast.type === 'warning'
                  ? 'var(--badge-orange-border)'
                  : 'var(--badge-blue-border)'
              }`,
              color:
                toast.type === 'success'
                  ? 'var(--badge-green-text)'
                  : toast.type === 'warning'
                  ? 'var(--badge-orange-text)'
                  : 'var(--badge-blue-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 size={18} />
            ) : toast.type === 'warning' ? (
              <AlertCircle size={18} />
            ) : (
              <Bell size={18} />
            )}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '2px' }}>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                {toast.title}
              </h4>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
              {toast.message}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              removeToast(toast.id);
            }}
            className="btn-press"
            style={{
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px',
              background: 'transparent',
              border: 'none',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Tutup Notifikasi"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastNotification;
