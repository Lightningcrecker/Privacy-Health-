import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DatabaseProvider } from './contexts/DatabaseContext';
import { DnaBackground } from './components/shared/DnaBackground';
import { AppRoutes } from './routes';
import { Toaster } from './components/shared/Toaster';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DatabaseProvider>
          <div className="relative min-h-screen">
            <DnaBackground />
            <AppRoutes />
            <Toaster />
          </div>
        </DatabaseProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;