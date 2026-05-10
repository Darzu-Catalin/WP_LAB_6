import React from 'react';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import CanvasComponent from './CanvasComponent.jsx';

function DraggableCanvasComponent({ component, isSelected, onClick }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: component.id,
    data: { fromCanvas: true, componentId: component.id },
  });

  const style = {
    position: 'absolute',
    left: component.position.x,
    top: component.position.y,
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    zIndex: isDragging ? 1000 : isSelected ? 10 : 1,
    opacity: isDragging ? 0.85 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  return (
    <CanvasComponent
      component={component}
      isSelected={isSelected}
      onClick={onClick}
      dragRef={setNodeRef}
      dragHandleProps={{ ...listeners, ...attributes }}
      style={style}
    />
  );
}

export default function Canvas({ components, selectedId, onSelectComponent, onDropFromPalette, canvasBg = 'dots', customBg = '#f0f3fa' }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas' });

  const bgStyle = canvasBg === 'custom' ? { backgroundColor: customBg, backgroundImage: 'none' } : {};

  return (
    <main
      ref={setNodeRef}
      className={`canvas canvas-bg-${canvasBg}${isOver ? ' drop-over' : ''}${components.length === 0 ? ' empty' : ''}`}
      style={bgStyle}
      onClick={() => onSelectComponent(null)}
    >
      {components.length === 0 && (
        <div className="canvas-empty-state">
          <div className="empty-icon">🎨</div>
          <p>Drag components from the palette to get started</p>
        </div>
      )}
      {components.map(comp => (
        <DraggableCanvasComponent
          key={comp.id}
          component={comp}
          isSelected={comp.id === selectedId}
          onClick={onSelectComponent}
        />
      ))}
    </main>
  );
}
