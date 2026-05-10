import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Trash2, FolderOpen, LayoutGrid, Clock, Layers, Plus, AlertCircle } from 'lucide-react';
import { getConfigurations, deleteConfiguration } from '../services/configService';

export default function Configs({ configs: propConfigs, onLoad, onDelete }) {
  const [search, setSearch] = useState('');
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load configurations from API on mount
  useEffect(() => {
    const loadConfigs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getConfigurations();
        setConfigs(data);
        // COMMENTED OUT: localStorage approach
        // const savedConfigs = localStorage.getItem('component-configs');
        // setConfigs(savedConfigs ? JSON.parse(savedConfigs) : []);
      } catch (err) {
        console.error('Failed to load configurations:', err);
        setError(err.message);
        // COMMENTED OUT: Fallback to localStorage if API fails
        // const savedConfigs = localStorage.getItem('component-configs');
        // setConfigs(savedConfigs ? JSON.parse(savedConfigs) : []);
      } finally {
        setLoading(false);
      }
    };

    loadConfigs();
  }, []);

  const filtered = configs.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleLoad = (config) => {
    onLoad(config);
    navigate('/editor');
  };

  const handleDelete = async (id) => {
    try {
      await deleteConfiguration(id);
      setConfigs(configs.filter(c => c.id !== id));
      // COMMENTED OUT: localStorage approach
      // const updated = configs.filter(c => c.id !== id);
      // setConfigs(updated);
      // localStorage.setItem('component-configs', JSON.stringify(updated));
      // onDelete(id);
    } catch (err) {
      console.error('Failed to delete configuration:', err);
      setError(`Failed to delete configuration: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="configs-page">
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
          <p>Loading configurations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="configs-page">
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
        }}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
      {/* Page header */}
      <div className="configs-header">
        <div className="configs-heading-block">
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
                  onClick={() => handleDelete(config.id)}
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
