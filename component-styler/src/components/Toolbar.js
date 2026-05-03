import React from 'react';
import ConfigPanel from './ConfigPanel';
import './Toolbar.css';

export default function Toolbar({ components, configs, onSaveConfig, onLoadConfig, onDeleteConfig, onClearCanvas }) {
  return (
    <header className="toolbar">
      <div className="toolbar-left">
        <span className="toolbar-logo">🎨</span>
        <h1 className="toolbar-title">Component Styler</h1>
      </div>
      <div className="toolbar-right">
        <button className="toolbar-btn danger" onClick={onClearCanvas} disabled={components.length === 0} title="Clear all components">
          Clear Canvas
        </button>
        <ConfigPanel configs={configs} onSave={onSaveConfig} onLoad={onLoadConfig} onDelete={onDeleteConfig} />
      </div>
    </header>
  );
}

