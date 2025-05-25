import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LandingPage: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="container">
      <div style={{ 
        textAlign: 'center', 
        maxWidth: '800px', 
        margin: '80px auto',
        padding: '0 20px'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
          Simple React Application
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: '#555' }}>
          A basic frontend with authentication and CRUD operations to connect with your Express backend.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          {isLoggedIn ? (
            <Link to="/home" className="btn btn-primary">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-secondary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;