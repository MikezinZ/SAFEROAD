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
  const [currentUser, setCurrentUser] = useState<Partial<User>>({ nome: '', email: '' });
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;


  useEffect(() => {
    fetchUsers(1); // Sempre busca a primeira página ao montar o componente
  }, []);

  const fetchUsers = async (pageToFetch: number = 1) => {
    setLoading(true);
    setError(null);
    const response = await getUsers<any>(`?page=${pageToFetch}&limit=${itemsPerPage}`);

    if (response.error) {
      setError(response.error);
      setUsers([]);
      setTotalPages(0);
      setTotalItems(0);
    } else if (response.data) {
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      setTotalItems(response.data.totalItems);
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const resetForm = () => {
    setCurrentUser({ nome: '', email: '' });
    setPassword('')
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

    if (isEditing && currentUser.id) {
      if (!currentUser.nome || !currentUser.email) {
        setError('Nome e Email são obrigatórios');
        setLoading(false);
        return;
      }

      const dataToUpdate = { nome: currentUser.nome, email: currentUser.email };
      const response = await updateUser<User>(currentUser.id, dataToUpdate);

      if (!response.error) {
        setUsers(users.map(user =>
          user.id === currentUser.id ? { ...user, ...dataToUpdate } : user
        ));
        showSuccessMessage('Usuário atualizado com sucesso!');
        resetForm();
        fetchUsers(currentPage);
      } else {
        setError(response.error ?? 'Ocorreu um erro ao atualizar.')
      }
    } else {
      if (!currentUser.nome || !currentUser.email || !password) {
        setError('Nome, Email e Senha são obrigatórios');
        setLoading(false);
        return
      }
      const dataToCreate = {
        nome: currentUser.nome,
        email: currentUser.email,
        senha: password
      };
      const response = await createUser<User>(dataToCreate);

      if (!response.error && response.data) {
        fetchUsers(1);
        showSuccessMessage('Usuário criado com sucesso!');
        resetForm();
      } else {
        setError(response.error ?? 'Ocorreu um erro ao criar o usuário.');
      }
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
      if (users.length === 1 && currentPage > 1) { // Se era o último item de uma página que não é a primeira
        fetchUsers(currentPage - 1);
      } else {
        fetchUsers(currentPage); // Recarrega a página atual
      }
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
            value={currentUser.nome || ''}
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
        {!isEditing && (
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}

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
      {/* CONTROLES DE PAGINAÇÃO */}
      {totalPages > 0 && (
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => fetchUsers(currentPage - 1)}
            disabled={currentPage <= 1 || loading}
            className="btn btn-secondary"
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages} (Total de itens: {totalItems})
          </span>
          <button
            onClick={() => fetchUsers(currentPage + 1)}
            disabled={currentPage >= totalPages || loading}
            className="btn btn-secondary"
          >
            Próxima
          </button>
        </div>
      )}

    </div>
  );
};

export default CrudOperations;