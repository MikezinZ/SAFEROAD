import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/api';

interface User {
  id: string;
  nome: string;
  email: string;
  [key: string]: any;
}

const CrudOperations: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<Partial<User>>({ name: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load items on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    const response = await getUsers<User>();

    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setUsers(response.data);
    }

    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const resetForm = () => {
    setCurrentUser({ name: '', description: '' });
    setIsEditing(false);
  };

  const showSuccessMessage = (message: string) => {
    setSuccess(message);
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!currentUser.nome || !currentUser.email) {
      setError('Nome e Email são obrigatórios');
      setLoading(false);
      return;
    }

    let response;

    if (isEditing && currentUser.id) {
      response = await updateUser<User>(currentUser.id, currentUser);

      if (!response.error) {
        setUsers(users.map(user =>
          user.id === currentUser.id ? { ...user, ...currentUser } : user
        ));
        showSuccessMessage('Usuário atualizado com sucesso!');
      }
    } else {
      const dataToCreate = { ...currentUser, senha: 'password123' };
      response = await createUser<User>(currentUser);

      if (!response.error && response.data) {
        setUsers([...users, response.data]);
        showSuccessMessage('Usuário criado com sucesso!');
      }
    }

    if (response.error) {
      setError(response.error);
    } else {
      resetForm();
    }

    setLoading(false);
  };

  const handleEdit = (user: User) => {
    setCurrentUser(user);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja deletar este usuário?')) {
      return;
    }

    setLoading(true);
    setError(null);

    const response = await deleteUser(id);

    if (response.error) {
      setError(response.error);
    } else {
      setUsers(users.filter(user => user.id !== id));
      showSuccessMessage('Usuário deletado com sucesso!');
    }

    setLoading(false);
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: '20px' }}>
        {isEditing ? 'Editar Usuário' : 'Criar Novo Usuário'}
      </h2>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            className="form-control"
            value={currentUser.name || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={currentUser.email || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Processing...' : isEditing ? 'Update' : 'Create'}
          </button>

          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 style={{ margin: '30px 0 20px' }}>Lista de Usuários</h2>

      {loading && <p>Carregando...</p>}

      {users.length === 0 && !loading ? (
        <p>Nenhum usuário encontrado!</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td className="action-buttons">
                  <button
                    onClick={() => handleEdit(user)}
                    className="btn btn-secondary"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-danger"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CrudOperations;