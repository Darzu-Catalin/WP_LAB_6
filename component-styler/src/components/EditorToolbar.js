import React, { useState, useRef, useEffect } from 'react';
import { Save, FolderOpen, Trash2, ChevronDown, LayoutTemplate, Search, X, CheckCircle2 } from 'lucide-react';
import './EditorToolbar.css';

function SavePanel({ configs, onSave, onLoad, onDelete }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const [saved, setSaved] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name.trim());
    setName('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const filtered = configs.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="save-panel-wrap" ref={ref}>
      <button className="editor-toolbar-btn accent" onClick={() => setOpen(v => !v)}>
        <Save size={14} strokeWidth={2.5} />
        Configurations
        {configs.length > 0 && <span className="count-badge">{configs.length}</span>}
        <ChevronDown size={13} strokeWidth={2} className={`chevron${open ? ' open' : ''}`} />
      </button>

      {open && (
        <div className="save-dropdown">
          <div className="save-dropdown-section">
            <p className="dropdown-label">Save current canvas</p>
            <div className="save-input-row">
              <input
                type="text"
                placeholder="Configuration name..."
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSave()}
                className="save-name-input"
                autoFocus
              />
              <button
                className={`save-submit-btn${saved ? ' saved' : ''}`}
                onClick={handleSave}
                disabled={!name.trim()}
              >
                {saved ? <CheckCircle2 size={15} strokeWidth={2} /> : <Save size={14} strokeWidth={2.5} />}
                {saved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>

          {configs.length > 0 && (
            <div className="save-dropdown-section border-top">
              <p className="dropdown-label">Saved configurations</p>
              <div className="dropdown-search-wrap">
                <Search size={13} className="dropdown-search-icon" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="dropdown-search"
                />
                {search && (
                  <button className="dropdown-search-clear" onClick={() => setSearch('')}>
                    <X size={12} />
                  </button>
                )}
              </div>
              <div className="configs-list">
                {filtered.length === 0 && (
                  <div className="configs-list-empty">No results found</div>
                )}
                {filtered.map(config => (
                  <div key={config.id} className="configs-list-item">
                    <div className="configs-list-info">
                      <span className="configs-list-name">{config.name}</span>
                      <span className="configs-list-meta">
                        {config.components.length} component{config.components.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="configs-list-actions">
                      <button
                        className="config-action-btn load"
                        onClick={() => { onLoad(config); setOpen(false); }}
                        title="Load"
                      >
                        <FolderOpen size={13} strokeWidth={2} />
                      </button>
                      <button
                        className="config-action-btn delete"
                        onClick={() => onDelete(config.id)}
                        title="Delete"
                      >
                        <Trash2 size={13} strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const BG_PRESETS = [
  { id: 'dots', label: 'Dots' },
  { id: 'grid', label: 'Grid' },
  { id: 'plain', label: 'Plain' },
];

function BgPanel({ canvasBg, setCanvasBg, customBg, setCustomBg }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="bg-panel-wrap" ref={ref}>
      <button className="editor-toolbar-btn" onClick={() => setOpen(v => !v)}>
        <LayoutTemplate size={14} strokeWidth={2} />
        Canvas BG
        <ChevronDown size={13} strokeWidth={2} className={`chevron${open ? ' open' : ''}`} />
      </button>

      {open && (
        <div className="bg-dropdown">
          <p className="dropdown-label">Background style</p>
          <div className="bg-preset-row">
            {BG_PRESETS.map(({ id, label }) => (
              <button
                key={id}
                className={`bg-preset-btn${canvasBg === id ? ' active' : ''}`}
                onClick={() => setCanvasBg(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="bg-color-row">
            <p className="dropdown-label" style={{ marginTop: 12 }}>Custom color</p>
            <div className="bg-color-pick">
              <input
                type="color"
                value={customBg}
                onChange={e => { setCustomBg(e.target.value); setCanvasBg('custom'); }}
                className="bg-color-input"
              />
              <input
                type="text"
                value={customBg}
                onChange={e => { setCustomBg(e.target.value); setCanvasBg('custom'); }}
                className="bg-color-text"
                placeholder="#f0f3fa"
              />
              <button
                className={`bg-preset-btn${canvasBg === 'custom' ? ' active' : ''}`}
                onClick={() => setCanvasBg('custom')}
              >
                Use
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EditorToolbar({
  components, configs, onSaveConfig, onLoadConfig, onDeleteConfig,
  onClearCanvas, canvasBg, setCanvasBg, customBg, setCustomBg,
}) {
  return (
    <div className="editor-toolbar">
      <div className="editor-toolbar-left">
        <span className="editor-toolbar-label">
          {components.length} component{components.length !== 1 ? 's' : ''} on canvas
        </span>
      </div>
      <div className="editor-toolbar-right">
        <BgPanel canvasBg={canvasBg} setCanvasBg={setCanvasBg} customBg={customBg} setCustomBg={setCustomBg} />
        <SavePanel configs={configs} onSave={onSaveConfig} onLoad={onLoadConfig} onDelete={onDeleteConfig} />
        <button
          className="editor-toolbar-btn danger"
          onClick={onClearCanvas}
          disabled={components.length === 0}
        >
          <Trash2 size={14} strokeWidth={2} />
          Clear Canvas
        </button>
      </div>
    </div>
  );
}
