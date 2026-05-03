import React from 'react';
import { useTheme } from '../context/ThemeContext';
import ConfigPanel from './ConfigPanel';
import './Toolbar.css';

export default function Toolbar({ components, configs, onSaveConfig, onLoadConfig, onDeleteConfig, onClearCanvas }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="toolbar">
      <div className="toolbar-left">
        <span className="toolbar-logo">🎨</span>
        <h1 className="toolbar-title">Component Styler</h1>
      </div>
      <div className="toolbar-right">
        <button
          className="toolbar-btn danger"
          onClick={onClearCanvas}
          disabled={components.length === 0}
          title="Clear all components from canvas"
        >
          Clear Canvas
        </button>

        <ConfigPanel
          configs={configs}
          onSave={onSaveConfig}
          onLoad={onLoadConfig}
          onDelete={onDeleteConfig}
        />

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}
