import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Layers, Moon, Sun, LayoutTemplate, BookOpen, Pencil, LogOut, ShieldCheck, Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getRole, getTokenRemainingMs, onAuthChange } from '../services/configService';

const navItems = [
  { to: '/', label: 'Home', icon: LayoutTemplate, exact: true },
  { to: '/editor', label: 'Editor', icon: Pencil },
  { to: '/configs', label: 'Saved Configs', icon: BookOpen },
  { to: '/permissions', label: 'JWT Demo', icon: ShieldCheck },
];

const ROLE_COLORS = {
  ADMIN: { fg: '#fff', bg: 'var(--red)' },
  WRITER: { fg: '#fff', bg: 'var(--accent)' },
  VISITOR: { fg: '#fff', bg: 'var(--green)' },
};

function formatRemaining(ms) {
  if (ms <= 0) return '0:00';
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function Navbar({ user, onLogout }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsub = onAuthChange(() => setTick((n) => n + 1));
    const interval = setInterval(() => setTick((n) => n + 1), 1000);
    return () => { unsub(); clearInterval(interval); };
  }, []);

  const role = getRole();
  const remaining = getTokenRemainingMs();
  const expired = remaining <= 0;
  const roleColor = role ? ROLE_COLORS[role] : null;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo">
          <Layers size={20} strokeWidth={2} />
        </div>
        <span className="navbar-name">ComponentStyler</span>
      </div>

      <div className="navbar-links">
        {navItems.map(({ to, label, icon: Icon, exact }) => {
          const active = exact ? location.pathname === to : location.pathname.startsWith(to);
          return (
            <NavLink
              key={to}
              to={to}
              className={`nav-link${active ? ' active' : ''}`}
            >
              <Icon size={15} strokeWidth={2} />
              {label}
            </NavLink>
          );
        })}
      </div>

      <div className="navbar-actions">
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {role && roleColor && (
              <NavLink
                to="/permissions"
                title="Open JWT / permissions demo"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  background: roleColor.bg,
                  color: roleColor.fg,
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                <ShieldCheck size={12} strokeWidth={2.5} />
                {role}
              </NavLink>
            )}
            <span
              title={expired ? 'Token expired — please re-login' : 'Time until JWT expires'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                fontVariantNumeric: 'tabular-nums',
                color: expired ? 'var(--red)' : 'var(--text-secondary)',
                padding: '4px 8px',
                borderRadius: 'var(--radius)',
                background: expired ? 'var(--red-faint)' : 'var(--surface-2)',
                border: `1px solid ${expired ? 'var(--red)' : 'var(--border)'}`,
              }}
            >
              <Clock size={11} strokeWidth={2.5} />
              {formatRemaining(remaining)}
            </span>
            <span style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              whiteSpace: 'nowrap',
            }}>
              {user.username}
            </span>
            <button
              onClick={onLogout}
              className="theme-btn"
              title="Logout"
              aria-label="Logout"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <LogOut size={16} strokeWidth={2} />
            </button>
          </div>
        )}

        <button
          className="theme-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          aria-label="Toggle theme"
        >
          {theme === 'light'
            ? <Moon size={16} strokeWidth={2} />
            : <Sun size={16} strokeWidth={2} />}
        </button>
      </div>
    </nav>
  );
}
