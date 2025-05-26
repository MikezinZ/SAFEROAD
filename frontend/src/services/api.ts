import { getToken } from './auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export async function apiRequest<T>(
  endpoint: string,
  method: string = 'GET',
  data?: any
): Promise<ApiResponse<T>> {
  const token = getToken();

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      ...(data ? { body: JSON.stringify(data) } : {})
    });

    const responseData = await response.json();

    if (!response.ok) {
      return { error: responseData.message || 'Algo deu errado' };
    }

    return { data: responseData };
  } catch (error) {
    console.error('Falha na solicitação da API:', error);
    return { error: 'Erro de rede. Tente novamente.' };
  }
}

// Common CRUD operations

// O backend retorna um array de usuários
export async function getUsers<T>(queryParams: string = ''): Promise<ApiResponse<T>> { // Aceita queryParams
  return apiRequest<T>(`/users${queryParams}`); // Concatena queryParams
}

// O backend cria um usuário
export async function createUser<T>(data: Partial<T>): Promise<ApiResponse<T>> {
  return apiRequest<T>('/users', 'POST', data);
}

// O backend atualiza um usuário
export async function updateUser<T>(id: string, data: Partial<T>): Promise<ApiResponse<T>> {
  return apiRequest<T>(`/users/${id}`, 'PUT', data);
}

// O backend deleta um usuário
export async function deleteUser(id: string): Promise<ApiResponse<{ success: boolean }>> {
  return apiRequest<{ success: boolean }>(`/users/${id}`, 'DELETE');
}