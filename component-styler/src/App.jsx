import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
// import { useLocalStorage } from './hooks/useLocalStorage';
import { generateId } from './utils/componentUtils';
import { createConfiguration, isAuthenticated, getStoredUser } from './services/configService';
import Navbar from './components/Navbar.jsx';
import Landing from './pages/Landing.jsx';
import Editor from './pages/Editor.jsx';
import Configs from './pages/Configs.jsx';
import Auth from './pages/Auth.jsx';
import { GLOBAL_STYLES } from './styles/globalStyles.jsx';

function ProtectedLayout({ children, user, onLogout }) {
  return (
    <div className="app">
      <Navbar user={user} onLogout={onLogout} />
      {children}
    </div>
  );
}

export default function App() {
  // COMMENTED OUT: Using API instead of localStorage
  // const [configs, setConfigs] = useLocalStorage('component-styler-configs', []);
  const [pendingLoad, setPendingLoad] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const authenticated = isAuthenticated();
    setIsAuth(authenticated);
    if (authenticated) {
      const storedUser = getStoredUser();
      setUser(storedUser);
    }
    setAuthLoading(false);
  }, []);

  const handleSaveConfig = async (name, components) => {
    try {
      const newConfig = {
        name,
        components: JSON.parse(JSON.stringify(components)),
        // savedAt is set by the backend
      };
      // Save to API
      await createConfiguration(newConfig);
      // No need to update local state since Configs page will fetch from API
    } catch (error) {
      console.error('Failed to save configuration:', error);
      // COMMENTED OUT: Fallback to localStorage if needed
      // const config = {
      //   id: generateId(),
      //   name,
      //   components: JSON.parse(JSON.stringify(components)),
      //   savedAt: new Date().toISOString(),
      // };
      // setConfigs(prev => [config, ...prev]);
    }
  };

  const handleLoadConfig = (config) => {
    setPendingLoad(JSON.parse(JSON.stringify(config.components)));
  };

  const handleDeleteConfig = (id) => {
    // Delete via API is handled in Configs.jsx
    // COMMENTED OUT: localStorage approach
    // setConfigs(prev => prev.filter(c => c.id !== id));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('app-jwt-token');
    sessionStorage.removeItem('app-jwt-expiry');
    sessionStorage.removeItem('app-user');
    setIsAuth(false);
    setUser(null);
  };

  const handleAuthSuccess = (userData) => {
    setIsAuth(true);
    setUser(userData);
  };

  if (authLoading) {
    return (
      <ThemeProvider>
        <style>{GLOBAL_STYLES}</style>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'var(--bg)',
          color: 'var(--text-muted)',
        }}>
          Loading...
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <style>{GLOBAL_STYLES}</style>
      <Routes>
        {!isAuth ? (
          <Route path="*" element={<Auth onAuthSuccess={handleAuthSuccess} />} />
        ) : (
          <>
            <Route
              path="/"
              element={
                <ProtectedLayout user={user} onLogout={handleLogout}>
                  <Landing />
                </ProtectedLayout>
              }
            />
            <Route
              path="/editor"
              element={
                <ProtectedLayout user={user} onLogout={handleLogout}>
                  <Editor
                    configs={[]} // COMMENTED OUT: configs now come from API
                    onSaveConfig={handleSaveConfig}
                    pendingLoad={pendingLoad}
                    onClearPendingLoad={() => setPendingLoad(null)}
                    onDeleteConfig={handleDeleteConfig}
                  />
                </ProtectedLayout>
              }
            />
            <Route
              path="/configs"
              element={
                <ProtectedLayout user={user} onLogout={handleLogout}>
                  <Configs
                    configs={[]} // COMMENTED OUT: configs now come from API
                    onLoad={handleLoadConfig}
                    onDelete={handleDeleteConfig}
                  />
                </ProtectedLayout>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </ThemeProvider>
  );
}
