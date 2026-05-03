import React from 'react';
import './StyleEditor.css';

function ColorInput({ label, value, onChange }) {
  return (
    <div className="style-row">
      <label className="style-label">{label}</label>
      <div className="color-input-wrap">
        <input type="color" value={value || '#ffffff'} onChange={e => onChange(e.target.value)} className="color-picker" />
        <input type="text" value={value || ''} onChange={e => onChange(e.target.value)} className="color-text" placeholder="#ffffff" />
      </div>
    </div>
  );
}

export default function StyleEditor({ component, onStyleChange, onDelete }) {
  if (!component) {
    return (
      <aside className="style-editor empty">
        <div className="editor-empty-state">
          <span className="editor-empty-icon">👆</span>
          <p>Click a component on the canvas to edit its styles</p>
        </div>
      </aside>
    );
  }

  const { styles } = component;
  const update = (key, value) => onStyleChange(component.id, { [key]: value });

  return (
    <aside className="style-editor">
      <div className="editor-header">
        <div>
          <h3 className="editor-title">Style Editor</h3>
          <span className="editor-type">{component.type}</span>
        </div>
        <button className="delete-btn" onClick={() => onDelete(component.id)} title="Delete component">🗑️</button>
      </div>
      <div className="editor-sections">
        <section className="editor-section">
          <h4 className="section-title">Colors</h4>
          <ColorInput label="Background" value={styles.backgroundColor} onChange={v => update('backgroundColor', v)} />
          <ColorInput label="Text" value={styles.color} onChange={v => update('color', v)} />
          <ColorInput label="Border" value={styles.borderColor} onChange={v => update('borderColor', v)} />
        </section>
      </div>
    </aside>
  );
}
