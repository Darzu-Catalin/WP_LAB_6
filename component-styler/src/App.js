import React, { useState, useCallback } from 'react';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { DEFAULT_STYLES, COMPONENT_TYPES, generateId } from './utils/componentUtils';
import { useLocalStorage } from './hooks/useLocalStorage';
import ComponentPalette from './components/ComponentPalette';
import Canvas from './components/Canvas';
import StyleEditor from './components/StyleEditor';
import './App.css';

function App() {
  const [components, setComponents] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [configs, setConfigs] = useLocalStorage('component-styler-configs', []);
  const [draggedPaletteType, setDraggedPaletteType] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const selectedComponent = components.find(c => c.id === selectedId) || null;

  const handleDragStart = useCallback((event) => {
    const { active } = event;
    if (active.data.current?.fromPalette) setDraggedPaletteType(active.data.current.componentType);
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { active, over, delta } = event;
    setDraggedPaletteType(null);
    if (!over) return;
    if (active.data.current?.fromPalette && over.id === 'canvas') {
      const canvasEl = document.querySelector('.canvas');
      if (!canvasEl) return;
      const rect = canvasEl.getBoundingClientRect();
      const x = Math.max(0, Math.round((rect.width / 2) - 60 + (Math.random() - 0.5) * 80));
      const y = Math.max(0, Math.round((rect.height / 2) - 30 + (Math.random() - 0.5) * 60));
      const newComp = { id: generateId(), type: active.data.current.componentType, position: { x, y }, styles: { ...DEFAULT_STYLES } };
      setComponents(prev => [...prev, newComp]);
      setSelectedId(newComp.id);
      return;
    }
    if (active.data.current?.fromCanvas) {
      const compId = active.data.current.componentId;
      setComponents(prev =>
        prev.map(c => c.id === compId
          ? { ...c, position: { x: Math.max(0, c.position.x + delta.x), y: Math.max(0, c.position.y + delta.y) } }
          : c)
      );
    }
  }, []);

  const handleStyleChange = useCallback((id, newStyles) => {
    setComponents(prev => prev.map(c => c.id === id ? { ...c, styles: { ...c.styles, ...newStyles } } : c));
  }, []);

  const handleDeleteComponent = useCallback((id) => {
    setComponents(prev => prev.filter(c => c.id !== id));
    setSelectedId(prev => prev === id ? null : prev);
  }, []);

  const handleSaveConfig = useCallback((name) => {
    const newConfig = {
      id: generateId(),
      name,
      components: JSON.parse(JSON.stringify(components)),
      savedAt: new Date().toISOString(),
    };
    setConfigs(prev => [newConfig, ...prev]);
  }, [components, setConfigs]);

  const paletteTypeInfo = draggedPaletteType ? COMPONENT_TYPES.find(c => c.type === draggedPaletteType) : null;

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🎨 Component Styler</h1>
        <button className="save-quick-btn" onClick={() => handleSaveConfig(`Config ${configs.length + 1}`)} disabled={components.length === 0}>
          💾 Save Config
        </button>
        <span className="saved-count">{configs.length} saved</span>
      </header>
      <div className="app-workspace">
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <ComponentPalette />
          <Canvas components={components} selectedId={selectedId} onSelectComponent={setSelectedId} />
          <DragOverlay>
            {paletteTypeInfo ? (
              <div className="drag-overlay-item"><span>{paletteTypeInfo.icon}</span><span>{paletteTypeInfo.label}</span></div>
            ) : null}
          </DragOverlay>
        </DndContext>
        <StyleEditor component={selectedComponent} onStyleChange={handleStyleChange} onDelete={handleDeleteComponent} />
      </div>
    </div>
  );
}

export default App;
