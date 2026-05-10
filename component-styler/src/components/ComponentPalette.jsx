import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { COMPONENT_TYPES } from '../utils/componentUtils';

function PaletteItem({ type, label, icon }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { fromPalette: true, componentType: type },
  });

  return (
    <div
      ref={setNodeRef}
      className={`palette-item${isDragging ? ' dragging' : ''}`}
      {...listeners}
      {...attributes}
    >
      <span className="palette-icon">{icon}</span>
      <span className="palette-label">{label}</span>
    </div>
  );
}

export default function ComponentPalette() {
  return (
    <aside className="component-palette">
      <h3 className="palette-title">Components</h3>
      <p className="palette-hint">Drag to canvas →</p>
      <div className="palette-list">
        {COMPONENT_TYPES.map(({ type, label, icon }) => (
          <PaletteItem key={type} type={type} label={label} icon={icon} />
        ))}
      </div>
    </aside>
  );
}
