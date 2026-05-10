import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, AlertCircle } from 'lucide-react';
import { loginUser, registerUser } from '../services/configService';

export default function Auth({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        if (!username || !password) {
          throw new Error('Please enter username and password');
        }
        const result = await loginUser(username, password);
        onAuthSuccess(result.user);
        navigate('/');
      } else {
        // Register
        if (!username || !email || !password || !confirmPassword) {
          throw new Error('Please fill in all fields');
        }
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        if (username.length < 3) {
          throw new Error('Username must be at least 3 characters');
        }

        const result = await registerUser(username, email, password);
        setSuccess(`Account created! Welcome ${result.username}. You can now login.`);
        
        // Clear form and switch to login
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => setIsLogin(true), 2000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            background: 'var(--accent)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            margin: '0 auto 16px',
            fontSize: '28px',
          }}>
            ⚙️
          </div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '800',
            color: 'var(--text)',
            margin: '0 0 8px',
            letterSpacing: '-0.02em',
          }}>
            Component Styler
          </h1>
          <p style={{
            fontSize: '14px',
            color: 'var(--text-secondary)',
            margin: 0,
          }}>
            {isLogin ? 'Sign in to continue' : 'Create your account'}
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div style={{
            padding: '12px 16px',
            background: 'var(--red-faint)',
            border: '1px solid var(--red)',
            borderRadius: 'var(--radius)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'var(--red)',
            marginBottom: '20px',
            fontSize: '13px',
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Success message */}
        {success && (
          <div style={{
            padding: '12px 16px',
            background: 'var(--green-faint)',
            border: '1px solid var(--green)',
            borderRadius: 'var(--radius)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'var(--green)',
            marginBottom: '20px',
            fontSize: '13px',
          }}>
            ✓ {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {/* Username */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{
              fontSize: '13px',
              fontWeight: '600',
              color: 'var(--text-secondary)',
            }}>
              Username {!isLogin && '(min 3 chars)'}
            </label>
            <input
              type="text"
              placeholder={isLogin ? 'username or email' : 'choose a username'}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                padding: '10px 12px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                background: 'var(--input-bg)',
                color: 'var(--text)',
                fontSize: '14px',
                transition: 'border-color 0.15s, box-shadow 0.15s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--accent)';
                e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border)';
                e.target.style.boxShadow = 'none';
              }}
              disabled={loading}
            />
          </div>

          {/* Email (register only) */}
          {!isLogin && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{
                fontSize: '13px',
                fontWeight: '600',
                color: 'var(--text-secondary)',
              }}>
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: '10px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  background: 'var(--input-bg)',
                  color: 'var(--text)',
                  fontSize: '14px',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent)';
                  e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border)';
                  e.target.style.boxShadow = 'none';
                }}
                disabled={loading}
              />
            </div>
          )}

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{
              fontSize: '13px',
              fontWeight: '600',
              color: 'var(--text-secondary)',
            }}>
              Password {!isLogin && '(min 6 chars)'}
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: '10px 12px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                background: 'var(--input-bg)',
                color: 'var(--text)',
                fontSize: '14px',
                transition: 'border-color 0.15s, box-shadow 0.15s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--accent)';
                e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border)';
                e.target.style.boxShadow = 'none';
              }}
              disabled={loading}
            />
          </div>

          {/* Confirm Password (register only) */}
          {!isLogin && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{
                fontSize: '13px',
                fontWeight: '600',
                color: 'var(--text-secondary)',
              }}>
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  padding: '10px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  background: 'var(--input-bg)',
                  color: 'var(--text)',
                  fontSize: '14px',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent)';
                  e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border)';
                  e.target.style.boxShadow = 'none';
                }}
                disabled={loading}
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '10px 20px',
              background: 'var(--accent)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius)',
              fontSize: '14px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background 0.15s, opacity 0.15s',
              marginTop: '8px',
            }}
            onMouseEnter={(e) => !loading && (e.target.style.background = 'var(--accent-hover)')}
            onMouseLeave={(e) => (e.target.style.background = 'var(--accent)')}
          >
            {isLogin ? (
              <>
                <LogIn size={16} />
                Sign In
              </>
            ) : (
              <>
                <UserPlus size={16} />
                Create Account
              </>
            )}
          </button>

          {/* Toggle */}
          <div style={{
            textAlign: 'center',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            marginTop: '8px',
          }}>
            {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
                setSuccess(null);
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent)',
                cursor: 'pointer',
                fontWeight: '600',
                textDecoration: 'underline',
              }}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </form>

        {/* Footer */}
        <p style={{
          fontSize: '12px',
          color: 'var(--text-muted)',
          textAlign: 'center',
          marginTop: '20px',
        }}>
          Demo: Credentials stored server-side (in-memory)
        </p>
      </div>
    </div>
  );
}
