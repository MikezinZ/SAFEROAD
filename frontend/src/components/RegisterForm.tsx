import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const { register, error, clearError } = useAuth();
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const errors: {
      username?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    let isValid = true;

    if (!username) {
      errors.username = 'Nome de usuário é obrigatório';
      isValid = false;
    }

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
    } else if (password.length < 6) {
      errors.password = 'A senha deve ter pelo menos 6 caracteres';
      isValid = false;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'As senhas não correspondem';
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

    const success = await register(username, email, password);
    if (success) {
      navigate('/login');
    }
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: '20px' }}>Registre-se</h2>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nome de Usuário</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {formErrors.username && <div className="error-message">{formErrors.username}</div>}
        </div>

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
          <label htmlFor="confirmPassword">Confirme a sua senha</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {formErrors.confirmPassword && (
            <div className="error-message">{formErrors.confirmPassword}</div>
          )}
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary">Register</button>
        </div>

        <div>
          Já possui uma conta? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;