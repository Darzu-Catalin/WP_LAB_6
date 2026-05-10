import React from 'react';
import { stylesToCSS } from '../utils/componentUtils';

function renderComponent(type, styles) {
  const css = stylesToCSS(styles);

  switch (type) {
    case 'button':
      return <button style={css}>Button</button>;
    case 'input':
      return <input style={css} type="text" placeholder="Text input..." readOnly />;
    case 'textarea':
      return <textarea style={{ ...css, resize: 'none' }} placeholder="Text area..." readOnly rows={3} />;
    case 'card':
      return (
        <div style={css}>
          <strong style={{ display: 'block', marginBottom: 6 }}>Card Title</strong>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>Card content goes here.</p>
        </div>
      );
    case 'heading':
      return <h2 style={{ ...css, margin: 0 }}>Heading Text</h2>;
    case 'paragraph':
      return <p style={{ ...css, margin: 0 }}>This is a paragraph of example text content.</p>;
    case 'image':
      return (
        <div
          style={{
            ...css,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 80,
            backgroundColor: css.backgroundColor || '#e5e7eb',
            fontSize: '24px',
          }}
        >
          🖼️
        </div>
      );
    case 'divider':
      return <hr style={{ ...css, border: 'none', borderTop: `${styles.borderWidth || 1}px ${styles.borderStyle || 'solid'} ${styles.borderColor || '#cccccc'}`, margin: `${styles.marginTop || 8}px 0` }} />;
    default:
      return <div style={css}>{type}</div>;
  }
}

export default function CanvasComponent({ component, isSelected, onClick, dragHandleProps, dragRef, style }) {
  return (
    <div
      ref={dragRef}
      className={`canvas-component${isSelected ? ' selected' : ''}`}
      style={style}
      onClick={(e) => { e.stopPropagation(); onClick(component.id); }}
      {...dragHandleProps}
    >
      {isSelected && <div className="selection-badge">{component.type}</div>}
      <div className="component-preview" style={{ pointerEvents: 'none' }}>
        {renderComponent(component.type, component.styles)}
      </div>
    </div>
  );
}
