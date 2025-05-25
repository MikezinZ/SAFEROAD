import React from 'react';
import CrudOperations from '../components/CrudOperations';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container" style={{ margin: '40px auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1>Bem Vindo, {user?.username}!</h1>
        <p>Este é o seu painel onde você pode gerenciar seus itens.</p>
      </div>

      <CrudOperations />
    </div>
  );
};

export default HomePage;