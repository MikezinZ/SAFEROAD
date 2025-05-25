import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUser, isAuthenticated, login, logout, register } from '../services/auth';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state
  useEffect(() => {
    const initAuth = () => {
      if (isAuthenticated()) {
        const userData = getUser();
        setUser(userData);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    const result = await login(email, password);
    
    if (!result.success) {
      setError(result.error || 'Login failed');
      setLoading(false);
      return false;
    }

    setUser(getUser());
    setLoading(false);
    return true;
  };

  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    const result = await register(username, email, password);
    
    if (!result.success) {
      setError(result.error || 'Registration failed');
      setLoading(false);
      return false;
    }

    setLoading(false);
    return true;
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    isLoggedIn: !!user,
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};