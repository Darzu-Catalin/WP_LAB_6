import React from 'react';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import ComponentPalette from './components/ComponentPalette';
import './App.css';

function App() {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🎨 Component Styler</h1>
      </header>
      <div className="app-workspace">
        <DndContext sensors={sensors}>
          <ComponentPalette />
          <main className="canvas-placeholder">
            <p>Canvas coming soon — drag components here</p>
          </main>
        </DndContext>
      </div>
    </div>
  );
}

export default App;
