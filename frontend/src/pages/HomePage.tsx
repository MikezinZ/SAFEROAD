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
        <h1>Welcome, {user?.username}!</h1>
        <p>This is your dashboard where you can manage your items.</p>
      </div>
      
      <CrudOperations />
    </div>
  );
};

export default HomePage;