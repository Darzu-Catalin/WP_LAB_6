import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Layers, Moon, Sun, LayoutTemplate, BookOpen, Pencil, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { to: '/', label: 'Home', icon: LayoutTemplate, exact: true },
  { to: '/editor', label: 'Editor', icon: Pencil },
  { to: '/configs', label: 'Saved Configs', icon: BookOpen },
];

export default function Navbar({ user, onLogout }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

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
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
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
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
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
