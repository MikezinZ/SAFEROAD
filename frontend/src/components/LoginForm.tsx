import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const errors: { email?: string; password?: string } = {};
    let isValid = true;

    if (!email) {
      errors.email = 'Email é obrigatório';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email inválido';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Senha é obrigatória';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) {
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate('/home');
    }
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: '20px' }}>Login</h2>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {formErrors.email && <div className="error-message">{formErrors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {formErrors.password && <div className="error-message">{formErrors.password}</div>}
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>

        <div>
          Não tem uma conta? <Link to="/register">Registre-se</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;