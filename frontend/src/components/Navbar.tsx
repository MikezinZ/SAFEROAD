import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">SAFEROAD</Link>

        <ul className="navbar-nav">
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/home" className="nav-link">Início</Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="btn btn-secondary"
                  style={{ marginLeft: '10px' }}
                >
                  Sair
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li>
                <Link to="/register" className="nav-link">Registre-se</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;