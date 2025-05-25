import React from 'react';
import LoginForm from '../components/LoginForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="container" style={{ maxWidth: '500px', margin: '40px auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Welcome Back</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;