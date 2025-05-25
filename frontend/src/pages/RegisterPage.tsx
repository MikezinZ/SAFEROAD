import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage: React.FC = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="container" style={{ maxWidth: '500px', margin: '40px auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Crie sua conta</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;