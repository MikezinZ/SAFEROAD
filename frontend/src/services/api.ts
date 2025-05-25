import { getToken } from './auth';

const API_URL = 'http://localhost:3000/api'; // Change this to your backend URL

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
      return { error: responseData.message || 'Something went wrong' };
    }

    return { data: responseData };
  } catch (error) {
    console.error('API request failed:', error);
    return { error: 'Network error. Please try again.' };
  }
}

// Common CRUD operations

export async function getItems<T>(): Promise<ApiResponse<T[]>> {
  return apiRequest<T[]>('/items');
}

export async function getItem<T>(id: string): Promise<ApiResponse<T>> {
  return apiRequest<T>(`/items/${id}`);
}

export async function createItem<T>(data: Partial<T>): Promise<ApiResponse<T>> {
  return apiRequest<T>('/items', 'POST', data);
}

export async function updateItem<T>(id: string, data: Partial<T>): Promise<ApiResponse<T>> {
  return apiRequest<T>(`/items/${id}`, 'PUT', data);
}

export async function deleteItem(id: string): Promise<ApiResponse<{ success: boolean }>> {
  return apiRequest<{ success: boolean }>(`/items/${id}`, 'DELETE');
}