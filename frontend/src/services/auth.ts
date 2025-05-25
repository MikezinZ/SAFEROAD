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
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || 'Login failed' };
    }

    // Store auth data
    setToken(data.token);
    setUser(data.user);

    return { success: true };
  } catch (error) {
    console.error('Login failed:', error);
    return { success: false, error: 'Network error. Please try again.' };
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
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || 'Registration failed' };
    }

    return { success: true };
  } catch (error) {
    console.error('Registration failed:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
};

export const logout = (): void => {
  removeToken();
  removeUser();
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};