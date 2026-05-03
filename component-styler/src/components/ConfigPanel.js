import React, { useState } from 'react';
import './ConfigPanel.css';

export default function ConfigPanel({ configs, onSave, onLoad, onDelete }) {
  const [saveName, setSaveName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    const name = saveName.trim();
    if (!name) return;
    onSave(name);
    setSaveName('');
  };

  return (
    <div className={`config-panel${isOpen ? ' open' : ''}`}>
      <button className="config-toggle" onClick={() => setIsOpen(v => !v)} title="Saved Configurations">
        💾 <span>Configs</span>
        {configs.length > 0 && <span className="config-count">{configs.length}</span>}
      </button>

      {isOpen && (
        <div className="config-drawer">
          <div className="config-drawer-header">
            <h3>Saved Configurations</h3>
          </div>
          <div className="config-save-row">
            <input type="text" placeholder="Configuration name..." value={saveName}
              onChange={e => setSaveName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSave()}
              className="config-name-input" />
            <button onClick={handleSave} className="save-btn" disabled={!saveName.trim()}>Save</button>
          </div>
          <div className="config-list">
            {configs.length === 0 && <div className="config-empty">No saved configurations yet.</div>}
            {configs.map(config => (
              <div key={config.id} className="config-item">
                <div className="config-item-info">
                  <span className="config-item-name">{config.name}</span>
                  <span className="config-item-meta">
                    {config.components.length} component{config.components.length !== 1 ? 's' : ''}
                    {' · '}{new Date(config.savedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="config-item-actions">
                  <button onClick={() => onLoad(config)} className="load-btn" title="Load">📂</button>
                  <button onClick={() => onDelete(config.id)} className="del-btn" title="Delete">🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

