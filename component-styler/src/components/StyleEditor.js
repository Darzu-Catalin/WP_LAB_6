import React from 'react';
import './StyleEditor.css';

function NumberInput({ label, value, onChange, unit, min = 0 }) {
  return (
    <div className="style-row">
      <label className="style-label">{label}</label>
      <div className="number-input-wrap">
        <input type="number" value={value || 0} min={min} onChange={e => onChange(e.target.value)} className="number-input" />
        {unit && <span className="unit-label">{unit}</span>}
      </div>
    </div>
  );
}

function SelectInput({ label, value, onChange, options }) {
  return (
    <div className="style-row">
      <label className="style-label">{label}</label>
      <select value={value || ''} onChange={e => onChange(e.target.value)} className="select-input">
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function SpacingGroup({ label, values, onChange }) {
  const sides = ['Top', 'Right', 'Bottom', 'Left'];
  return (
    <div className="spacing-group">
      <span className="style-label">{label}</span>
      <div className="spacing-inputs">
        {sides.map(side => (
          <div key={side} className="spacing-input-wrap">
            <input type="number" min={0} value={values[side.toLowerCase()] || 0}
              onChange={e => onChange(side.toLowerCase(), e.target.value)} className="spacing-input" />
            <span className="spacing-side-label">{side[0]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

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

        <section className="editor-section">
          <h4 className="section-title">Typography</h4>
          <SelectInput label="Font Family" value={styles.fontFamily} onChange={v => update('fontFamily', v)}
            options={[
              { value: 'inherit', label: 'Inherit' },
              { value: 'sans-serif', label: 'Sans-serif' },
              { value: 'serif', label: 'Serif' },
              { value: 'monospace', label: 'Monospace' },
              { value: 'Arial, sans-serif', label: 'Arial' },
              { value: 'Georgia, serif', label: 'Georgia' },
              { value: 'Verdana, sans-serif', label: 'Verdana' },
            ]} />
          <NumberInput label="Font Size" value={styles.fontSize} onChange={v => update('fontSize', v)} unit="px" min={1} />
          <SelectInput label="Font Weight" value={styles.fontWeight} onChange={v => update('fontWeight', v)}
            options={[
              { value: '300', label: 'Light (300)' },
              { value: '400', label: 'Regular (400)' },
              { value: '500', label: 'Medium (500)' },
              { value: '600', label: 'SemiBold (600)' },
              { value: '700', label: 'Bold (700)' },
            ]} />
          <SelectInput label="Text Align" value={styles.textAlign} onChange={v => update('textAlign', v)}
            options={[
              { value: 'left', label: 'Left' },
              { value: 'center', label: 'Center' },
              { value: 'right', label: 'Right' },
              { value: 'justify', label: 'Justify' },
            ]} />
        </section>

        <section className="editor-section">
          <h4 className="section-title">Spacing (px)</h4>
          <SpacingGroup label="Padding"
            values={{ top: styles.paddingTop, right: styles.paddingRight, bottom: styles.paddingBottom, left: styles.paddingLeft }}
            onChange={(side, v) => update(`padding${side.charAt(0).toUpperCase() + side.slice(1)}`, v)} />
          <SpacingGroup label="Margin"
            values={{ top: styles.marginTop, right: styles.marginRight, bottom: styles.marginBottom, left: styles.marginLeft }}
            onChange={(side, v) => update(`margin${side.charAt(0).toUpperCase() + side.slice(1)}`, v)} />
        </section>
      </div>
    </aside>
  );
}
