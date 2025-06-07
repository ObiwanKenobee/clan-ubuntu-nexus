
import { ApiResponse, Rite, PaginatedResponse } from '@/types/clanTypes';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const apiCall = async <T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
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

// Rites Management
export const getRitesByClan = async (
  clanId: string, 
  type?: Rite['type'], 
  page = 1, 
  limit = 20
): Promise<ApiResponse<PaginatedResponse<Rite>>> => {
  const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
  if (type) params.append('type', type);
  
  return apiCall<PaginatedResponse<Rite>>(`/clans/${clanId}/rites?${params}`);
};

export const createRite = async (
  clanId: string, 
  riteData: Omit<Rite, 'rite_id'>
): Promise<ApiResponse<Rite>> => {
  return apiCall<Rite>(`/clans/${clanId}/rites`, {
    method: 'POST',
    body: JSON.stringify(riteData),
  });
};

export const updateRite = async (
  riteId: string, 
  updates: Partial<Rite>
): Promise<ApiResponse<Rite>> => {
  return apiCall<Rite>(`/rites/${riteId}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
};

export const uploadRiteMedia = async (
  riteId: string, 
  mediaFile: File, 
  mediaType: 'audio' | 'video' | 'photo'
): Promise<ApiResponse<{ url: string }>> => {
  const formData = new FormData();
  formData.append('file', mediaFile);
  formData.append('type', mediaType);

  try {
    const response = await fetch(`${API_BASE_URL}/rites/${riteId}/media`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.message || 'Upload failed' };
    }

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload error occurred',
    };
  }
};

export const getRiteById = async (riteId: string): Promise<ApiResponse<Rite>> => {
  return apiCall<Rite>(`/rites/${riteId}`);
};

export const scheduleRite = async (
  clanId: string,
  riteData: Omit<Rite, 'rite_id' | 'status'> & { status: 'planned' }
): Promise<ApiResponse<Rite>> => {
  return apiCall<Rite>(`/clans/${clanId}/rites/schedule`, {
    method: 'POST',
    body: JSON.stringify(riteData),
  });
};
