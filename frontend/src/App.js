import React, { useState } from 'react';
import AuthPage from './components/AuthPage';
import Dashboard from './components/DashBoard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <AuthPage onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}