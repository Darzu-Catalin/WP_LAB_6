import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateId } from './utils/componentUtils';
import Navbar from './components/Navbar.jsx';
import Landing from './pages/Landing.jsx';
import Editor from './pages/Editor.jsx';
import Configs from './pages/Configs.jsx';
import { GLOBAL_STYLES } from './styles/globalStyles.jsx';

function AppShell() {
  const [configs, setConfigs] = useLocalStorage('component-styler-configs', []);
  const [pendingLoad, setPendingLoad] = useState(null);

  const handleSaveConfig = (name, components) => {
    const newConfig = {
      id: generateId(),
      name,
      components: JSON.parse(JSON.stringify(components)),
      savedAt: new Date().toISOString(),
    };
    setConfigs(prev => [newConfig, ...prev]);
  };

  const handleLoadConfig = (config) => {
    setPendingLoad(JSON.parse(JSON.stringify(config.components)));
  };

  const handleDeleteConfig = (id) => {
    setConfigs(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/editor"
          element={
            <Editor
              configs={configs}
              onSaveConfig={handleSaveConfig}
              pendingLoad={pendingLoad}
              onClearPendingLoad={() => setPendingLoad(null)}
              onDeleteConfig={handleDeleteConfig}
            />
          }
        />
        <Route
          path="/configs"
          element={
            <Configs
              configs={configs}
              onLoad={handleLoadConfig}
              onDelete={handleDeleteConfig}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <style>{GLOBAL_STYLES}</style>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </ThemeProvider>
  );
}
