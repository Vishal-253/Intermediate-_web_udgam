import React, { useState } from 'react';
import { setAdminAuth } from '../utils/festivalStore';

export default function AdminLogin({ onLoginSuccess, onNavigateHome }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      // Single account credentials as requested
      if (username.trim() === 'admin' && password === 'admin123') {
        setAdminAuth(true, rememberMe);
        setIsLoading(false);
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        setIsLoading(false);
        setErrorMsg('Invalid administrative credentials. Please check username and password.');
      }
    }, 350);
  };

  const handleQuickFill = () => {
    setUsername('admin');
    setPassword('admin123');
    setErrorMsg('');
  };

  return (
    <div className="admin-login-screen">
      <div className="admin-login-glow-circle circle-1"></div>
      <div className="admin-login-glow-circle circle-2"></div>

      <div className="admin-login-card card-bloom">
        {/* Top return link */}
        <button
          type="button"
          className="admin-back-btn"
          onClick={onNavigateHome}
        >
          <span>←</span> Back to Udgam 2026
        </button>

        <div className="admin-login-header">
          <div className="admin-shield-icon-badge">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <span className="admin-badge-label">NIT SIKKIM • UDGAM 2026</span>
          <h2 className="admin-login-title">Control Portal</h2>
          <p className="admin-login-subtitle">
            Sign in to manage festival merchandise drops, stages, and official arena events.
          </p>
        </div>

        {errorMsg && (
          <div className="admin-alert-error" role="alert">
            <span className="alert-icon">⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-form-group">
            <label htmlFor="admin-username">Admin Username</label>
            <div className="admin-input-wrapper">
              <span className="input-icon">👤</span>
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username (admin)"
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <div className="admin-label-row">
              <label htmlFor="admin-password">Password</label>
              <button
                type="button"
                className="admin-toggle-pwd-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="admin-input-wrapper">
              <span className="input-icon">🔑</span>
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (admin123)"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <div className="admin-form-meta-row">
            <label className="admin-checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember this session</span>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-bloom admin-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Access Management Dashboard</span>
                <span>🌸</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Quick-Fill box */}
        <div className="admin-demo-box">
          <div className="admin-demo-text">
            <strong>Demo Account Credentials:</strong>
            <div className="demo-credentials-tag">
              <code>admin</code> / <code>admin123</code>
            </div>
          </div>
          <button
            type="button"
            className="btn-quick-fill"
            onClick={handleQuickFill}
          >
            ⚡ Auto-Fill Credentials
          </button>
        </div>
      </div>
    </div>
  );
}
