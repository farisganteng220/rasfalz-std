import React from 'react';
import { RefreshCw, AlertTriangle, Home, Sparkles } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Rasfalz Studio OS caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReload = () => {
    window.location.hash = '#/';
    window.location.reload();
  };

  handleResetHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.hash = '#/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-main)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)',
            padding: '24px',
            boxSizing: 'border-box',
          }}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '520px',
              width: '100%',
              padding: '32px 24px',
              borderRadius: '24px',
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
              textAlign: 'center',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'var(--color-orange-subtle)',
                color: 'var(--color-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                border: '2px solid var(--color-orange)',
              }}
            >
              <AlertTriangle size={30} />
            </div>

            <h2 style={{ fontSize: '1.4rem', margin: '0 0 8px 0', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontWeight: 800 }}>
              Sistem Studio Dipulihkan
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 24px 0', lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>
              Terjadi sedikit kendala sesi pada peramban. Seluruh data karya dan portofolio Anda tetap aman.
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={this.handleResetHome}
                className="btn btn-primary-orange"
              >
                <Home size={16} />
                <span>Kembali ke Beranda</span>
              </button>

              <button
                onClick={this.handleReload}
                className="btn btn-glass"
              >
                <RefreshCw size={16} />
                <span>Refresh OS</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
