interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

// Token management
export const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('auth_token');
};

// User management
export const getUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Failed to parse user data', error);
    return null;
  }
};

export const setUser = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUser = (): void => {
  localStorage.removeItem('user');
};

// Auth operations
export const login = async (
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha: password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || 'Falha no Login' };
    }

    // Store auth data
    setToken(data.token);
    const userData = {
      id: data.user.id,
      username: data.user.nome, // Convertendo 'nome' para 'username'
      email: data.user.email,
    };
    setUser(userData);


    return { success: true };
  } catch (error) {
    console.error('Falha no Login: ', error);
    return { success: false, error: 'Erro de rede. Tente novamente.' };
  }
};

export const register = async (
  username: string,
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome: username, email, senha: password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || 'O registro falhou' };
    }

    return { success: true };
  } catch (error) {
    console.error('O registro falhou:', error);
    return { success: false, error: 'Erro de rede. Tente novamente.' };
  }
};

export const logout = (): void => {
  removeToken();
  removeUser();
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};