
import { ApiResponse, Member } from '@/types/clanTypes';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: Member['role'];
  clan_id?: string;
}

interface AuthResponse {
  user: Member;
  token: string;
  expires_at: string;
}

const apiCall = async <T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> => {
  try {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options?.headers,
      },
      ...options,
    });

    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.message || 'API call failed' };
    }

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

// Authentication
export const login = async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
  const response = await apiCall<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  if (response.success && response.data) {
    localStorage.setItem('auth_token', response.data.token);
    localStorage.setItem('user_data', JSON.stringify(response.data.user));
  }

  return response;
};

export const register = async (userData: RegisterData): Promise<ApiResponse<AuthResponse>> => {
  const response = await apiCall<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

  if (response.success && response.data) {
    localStorage.setItem('auth_token', response.data.token);
    localStorage.setItem('user_data', JSON.stringify(response.data.user));
  }

  return response;
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_data');
  await apiCall('/auth/logout', { method: 'POST' });
};

export const getCurrentUser = async (): Promise<ApiResponse<Member>> => {
  return apiCall<Member>('/auth/me');
};

export const refreshToken = async (): Promise<ApiResponse<{ token: string; expires_at: string }>> => {
  const response = await apiCall<{ token: string; expires_at: string }>('/auth/refresh', {
    method: 'POST',
  });

  if (response.success && response.data) {
    localStorage.setItem('auth_token', response.data.token);
  }

  return response;
};

export const updateProfile = async (updates: Partial<Member>): Promise<ApiResponse<Member>> => {
  const response = await apiCall<Member>('/auth/profile', {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });

  if (response.success && response.data) {
    localStorage.setItem('user_data', JSON.stringify(response.data));
  }

  return response;
};

export const changePassword = async (currentPassword: string, newPassword: string): Promise<ApiResponse<void>> => {
  return apiCall('/auth/change-password', {
    method: 'POST',
    body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
  });
};
