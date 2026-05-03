import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Trash2, FolderOpen, LayoutGrid, Clock, Layers, Plus } from 'lucide-react';
import './Configs.css';

export default function Configs({ configs, onLoad, onDelete }) {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filtered = configs.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleLoad = (config) => {
    onLoad(config);
    navigate('/editor');
  };

  return (
    <div className="configs-page">
      {/* Page header */}
      <div className="configs-header">
        <div>
          <h1 className="configs-title">Saved Configurations</h1>
          <p className="configs-sub">
            {configs.length === 0
              ? 'No configurations saved yet. Go to the editor to create one.'
              : `${configs.length} configuration${configs.length !== 1 ? 's' : ''} stored locally`}
          </p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/editor')}>
          <Plus size={15} strokeWidth={2.5} />
          New in Editor
        </button>
      </div>

      {/* Search */}
      {configs.length > 0 && (
        <div className="configs-search-wrap">
          <Search size={15} className="search-icon" />
          <input
            type="text"
            placeholder="Search configurations..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="configs-search"
          />
        </div>
      )}

      {/* Empty state */}
      {configs.length === 0 && (
        <div className="configs-empty">
          <div className="configs-empty-icon">
            <Layers size={32} strokeWidth={1.5} />
          </div>
          <h3>No saved configurations</h3>
          <p>Head to the editor, build a component layout, then save it here.</p>
          <button className="btn-primary" onClick={() => navigate('/editor')}>
            Open Editor
          </button>
        </div>
      )}

      {/* No search results */}
      {configs.length > 0 && filtered.length === 0 && (
        <div className="configs-empty">
          <div className="configs-empty-icon">
            <Search size={28} strokeWidth={1.5} />
          </div>
          <h3>No results</h3>
          <p>No configurations match "{search}"</p>
        </div>
      )}

      {/* Grid */}
      {filtered.length > 0 && (
        <div className="configs-grid">
          {filtered.map(config => (
            <div key={config.id} className="config-card">
              <div className="config-card-preview">
                <LayoutGrid size={28} strokeWidth={1.25} />
              </div>
              <div className="config-card-body">
                <h3 className="config-card-name">{config.name}</h3>
                <div className="config-card-meta">
                  <span className="meta-chip">
                    <Layers size={12} strokeWidth={2} />
                    {config.components.length} component{config.components.length !== 1 ? 's' : ''}
                  </span>
                  <span className="meta-chip">
                    <Clock size={12} strokeWidth={2} />
                    {new Date(config.savedAt).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
              <div className="config-card-actions">
                <button
                  className="btn-primary config-load-btn"
                  onClick={() => handleLoad(config)}
                  title="Load this configuration"
                >
                  <FolderOpen size={14} strokeWidth={2} />
                  Load
                </button>
                <button
                  className="config-delete-btn"
                  onClick={() => onDelete(config.id)}
                  title="Delete configuration"
                >
                  <Trash2 size={14} strokeWidth={2} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
