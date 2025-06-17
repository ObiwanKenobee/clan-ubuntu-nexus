
import { ApiResponse, Member } from '@/types/clanTypes';
import { API_CONFIG, apiRequest } from '@/config/api';

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

// Authentication
export const login = async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
  const response = await apiRequest<AuthResponse>(`${API_CONFIG.ENDPOINTS.AUTH}/login`, {
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
  const response = await apiRequest<AuthResponse>(`${API_CONFIG.ENDPOINTS.AUTH}/register`, {
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
  await apiRequest(`${API_CONFIG.ENDPOINTS.AUTH}/logout`, { method: 'POST' });
};

export const getCurrentUser = async (): Promise<ApiResponse<Member>> => {
  return apiRequest<Member>(`${API_CONFIG.ENDPOINTS.AUTH}/me`);
};

export const refreshToken = async (): Promise<ApiResponse<{ token: string; expires_at: string }>> => {
  const response = await apiRequest<{ token: string; expires_at: string }>(`${API_CONFIG.ENDPOINTS.AUTH}/refresh`, {
    method: 'POST',
  });

  if (response.success && response.data) {
    localStorage.setItem('auth_token', response.data.token);
  }

  return response;
};

export const updateProfile = async (updates: Partial<Member>): Promise<ApiResponse<Member>> => {
  const response = await apiRequest<Member>(`${API_CONFIG.ENDPOINTS.AUTH}/profile`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });

  if (response.success && response.data) {
    localStorage.setItem('user_data', JSON.stringify(response.data));
  }

  return response;
};

export const changePassword = async (currentPassword: string, newPassword: string): Promise<ApiResponse<void>> => {
  return apiRequest(`${API_CONFIG.ENDPOINTS.AUTH}/change-password`, {
    method: 'POST',
    body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
  });
};
