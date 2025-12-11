import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { ProgramsAndEvents } from './pages/ProgramsAndEvents';
import { Resources } from './pages/Resources';
import { ActionCenter } from './pages/ActionCenter';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';
import { ChatBot } from './components/ChatBot';
import { AppDataProvider } from './context/AppDataContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <AppDataProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Admin Route */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Main Routes with Layout */}
            <Route
              path="*"
              element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/programs" element={<ProgramsAndEvents />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/action" element={<ActionCenter />} />
                  </Routes>
                  <ChatBot />
                </Layout>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </AppDataProvider>
  );
};

export default App;