import React, { useState, useCallback, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { DEFAULT_STYLES, COMPONENT_TYPES, generateId } from '../utils/componentUtils';
import ComponentPalette from '../components/ComponentPalette.jsx';
import Canvas from '../components/Canvas.jsx';
import StyleEditor from '../components/StyleEditor.jsx';
import EditorToolbar from '../components/EditorToolbar.jsx';

export default function Editor({ configs, onSaveConfig, onDeleteConfig, pendingLoad, onClearPendingLoad }) {
  const [components, setComponents] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [draggedPaletteType, setDraggedPaletteType] = useState(null);
  const [canvasBg, setCanvasBg] = useState('dots');
  const [customBg, setCustomBg] = useState('#f0f3fa');

  useEffect(() => {
    if (pendingLoad) {
      setComponents(pendingLoad);
      setSelectedId(null);
      onClearPendingLoad();
    }
  }, [pendingLoad, onClearPendingLoad]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const selectedComponent = components.find(c => c.id === selectedId) || null;

  const handleDragStart = useCallback((event) => {
    const { active } = event;
    if (active.data.current?.fromPalette) {
      setDraggedPaletteType(active.data.current.componentType);
    }
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { active, over, delta } = event;
    setDraggedPaletteType(null);
    if (!over) return;

    if (active.data.current?.fromPalette && over.id === 'canvas') {
      const canvasEl = document.querySelector('.canvas');
      if (!canvasEl) return;
      const rect = canvasEl.getBoundingClientRect();
      const x = Math.max(0, Math.round((rect.width / 2) - 60 + (Math.random() - 0.5) * 100));
      const y = Math.max(0, Math.round((rect.height / 2) - 30 + (Math.random() - 0.5) * 80));
      const newComp = {
        id: generateId(),
        type: active.data.current.componentType,
        position: { x, y },
        styles: { ...DEFAULT_STYLES },
      };
      setComponents(prev => [...prev, newComp]);
      setSelectedId(newComp.id);
      return;
    }

    if (active.data.current?.fromCanvas) {
      const compId = active.data.current.componentId;
      setComponents(prev =>
        prev.map(c =>
          c.id === compId
            ? { ...c, position: { x: Math.max(0, c.position.x + delta.x), y: Math.max(0, c.position.y + delta.y) } }
            : c
        )
      );
    }
  }, []);

  const handleStyleChange = useCallback((id, newStyles) => {
    setComponents(prev =>
      prev.map(c => c.id === id ? { ...c, styles: { ...c.styles, ...newStyles } } : c)
    );
  }, []);

  const handleDeleteComponent = useCallback((id) => {
    setComponents(prev => prev.filter(c => c.id !== id));
    setSelectedId(prev => prev === id ? null : prev);
  }, []);

  const handleClearCanvas = useCallback(() => {
    if (components.length === 0) return;
    if (window.confirm('Clear all components from the canvas?')) {
      setComponents([]);
      setSelectedId(null);
    }
  }, [components]);

  const handleSave = useCallback((name) => {
    onSaveConfig(name, components);
  }, [onSaveConfig, components]);

  const paletteTypeInfo = draggedPaletteType
    ? COMPONENT_TYPES.find(c => c.type === draggedPaletteType)
    : null;

  return (
    <div className="editor-page">
      <EditorToolbar
        components={components}
        configs={configs}
        onSaveConfig={handleSave}
        onLoadConfig={null}
        onDeleteConfig={onDeleteConfig}
        onClearCanvas={handleClearCanvas}
        canvasBg={canvasBg}
        setCanvasBg={setCanvasBg}
        customBg={customBg}
        setCustomBg={setCustomBg}
      />
      <div className="app-workspace">
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <ComponentPalette />
          <Canvas
            components={components}
            selectedId={selectedId}
            onSelectComponent={setSelectedId}
            canvasBg={canvasBg}
            customBg={customBg}
          />
          <DragOverlay>
            {paletteTypeInfo ? (
              <div className="drag-overlay-item">
                <span>{paletteTypeInfo.label}</span>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
        <StyleEditor
          component={selectedComponent}
          onStyleChange={handleStyleChange}
          onDelete={handleDeleteComponent}
        />
      </div>
    </div>
  );
}
