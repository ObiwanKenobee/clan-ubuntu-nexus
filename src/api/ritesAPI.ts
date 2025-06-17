
import { ApiResponse, Rite, PaginatedResponse } from '@/types/clanTypes';
import { API_CONFIG, apiRequest, buildApiUrl } from '@/config/api';

// Rites Management
export const getRitesByClan = async (
  clanId: string, 
  type?: Rite['type'], 
  page = 1, 
  limit = 20
): Promise<ApiResponse<PaginatedResponse<Rite>>> => {
  const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
  if (type) params.append('type', type);
  
  return apiRequest<PaginatedResponse<Rite>>(`${API_CONFIG.ENDPOINTS.CLANS}/${clanId}/rites?${params}`);
};

export const createRite = async (
  clanId: string, 
  riteData: Omit<Rite, 'rite_id'>
): Promise<ApiResponse<Rite>> => {
  return apiRequest<Rite>(`${API_CONFIG.ENDPOINTS.CLANS}/${clanId}/rites`, {
    method: 'POST',
    body: JSON.stringify(riteData),
  });
};

export const updateRite = async (
  riteId: string, 
  updates: Partial<Rite>
): Promise<ApiResponse<Rite>> => {
  return apiRequest<Rite>(`${API_CONFIG.ENDPOINTS.RITES}/${riteId}`, {
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
    const token = localStorage.getItem('auth_token');
    const response = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.RITES}/${riteId}/media`), {
      method: 'POST',
      body: formData,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
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
  return apiRequest<Rite>(`${API_CONFIG.ENDPOINTS.RITES}/${riteId}`);
};

export const scheduleRite = async (
  clanId: string,
  riteData: Omit<Rite, 'rite_id' | 'status'> & { status: 'planned' }
): Promise<ApiResponse<Rite>> => {
  return apiRequest<Rite>(`${API_CONFIG.ENDPOINTS.CLANS}/${clanId}/rites/schedule`, {
    method: 'POST',
    body: JSON.stringify(riteData),
  });
};
