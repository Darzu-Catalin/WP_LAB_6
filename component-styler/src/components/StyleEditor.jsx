import React from 'react';

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

        <section className="editor-section">
          <h4 className="section-title">Border</h4>
          <NumberInput label="Width" value={styles.borderWidth} onChange={v => update('borderWidth', v)} unit="px" />
          <NumberInput label="Radius" value={styles.borderRadius} onChange={v => update('borderRadius', v)} unit="px" />
          <SelectInput label="Style" value={styles.borderStyle} onChange={v => update('borderStyle', v)}
            options={[
              { value: 'none', label: 'None' },
              { value: 'solid', label: 'Solid' },
              { value: 'dashed', label: 'Dashed' },
              { value: 'dotted', label: 'Dotted' },
              { value: 'double', label: 'Double' },
            ]} />
        </section>

        <section className="editor-section">
          <h4 className="section-title">Sizing</h4>
          <div className="style-row">
            <label className="style-label">Width</label>
            <div className="sizing-wrap">
              <input type="text" value={styles.width || 'auto'} onChange={e => update('width', e.target.value)} className="sizing-input" placeholder="auto" />
              <select value={styles.widthUnit || 'px'} onChange={e => update('widthUnit', e.target.value)} className="unit-select">
                <option value="px">px</option><option value="%">%</option><option value="auto">auto</option>
              </select>
            </div>
          </div>
          <div className="style-row">
            <label className="style-label">Height</label>
            <div className="sizing-wrap">
              <input type="text" value={styles.height || 'auto'} onChange={e => update('height', e.target.value)} className="sizing-input" placeholder="auto" />
              <select value={styles.heightUnit || 'px'} onChange={e => update('heightUnit', e.target.value)} className="unit-select">
                <option value="px">px</option><option value="%">%</option><option value="auto">auto</option>
              </select>
            </div>
          </div>
        </section>

        <section className="editor-section">
          <h4 className="section-title">Effects</h4>
          <SelectInput label="Box Shadow" value={styles.boxShadow} onChange={v => update('boxShadow', v)}
            options={[
              { value: 'none', label: 'None' },
              { value: '0 1px 3px rgba(0,0,0,0.12)', label: 'Small' },
              { value: '0 4px 6px rgba(0,0,0,0.1)', label: 'Medium' },
              { value: '0 10px 15px rgba(0,0,0,0.1)', label: 'Large' },
              { value: '0 20px 25px rgba(0,0,0,0.15)', label: 'X-Large' },
              { value: 'inset 0 2px 4px rgba(0,0,0,0.06)', label: 'Inner' },
            ]} />
          <div className="style-row">
            <label className="style-label">Opacity</label>
            <div className="opacity-wrap">
              <input type="range" min="0" max="1" step="0.05" value={styles.opacity || 1}
                onChange={e => update('opacity', e.target.value)} className="range-input" />
              <span className="opacity-value">{Math.round((styles.opacity || 1) * 100)}%</span>
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
}
