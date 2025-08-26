import React, { useState } from 'react';
import { AuthLayout } from '@/components/AuthLayout';
import { LoginForm } from '@/components/LoginForm';
import { Dashboard } from '@/components/Dashboard';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);

  const handleLogin = (credentials: { username: string; password: string }) => {
    // Simple demo authentication - in real app, this would validate against a backend
    if (credentials.username && credentials.password) {
      setUser({ username: credentials.username });
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  if (isAuthenticated && user) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <AuthLayout>
      <LoginForm onLogin={handleLogin} />
    </AuthLayout>
  );
};

export default Index;
