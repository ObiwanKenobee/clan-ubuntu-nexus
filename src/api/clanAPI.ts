
import { ApiResponse, Clan, Member } from '@/types/clanTypes';
import { API_CONFIG, apiRequest } from '@/config/api';

// Clan Management
export const getClanById = async (clanId: string): Promise<ApiResponse<Clan>> => {
  return apiRequest<Clan>(`${API_CONFIG.ENDPOINTS.CLANS}/${clanId}`);
};

export const createClan = async (clanData: Omit<Clan, 'clan_id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Clan>> => {
  return apiRequest<Clan>(API_CONFIG.ENDPOINTS.CLANS, {
    method: 'POST',
    body: JSON.stringify(clanData),
  });
};

export const updateClan = async (clanId: string, updates: Partial<Clan>): Promise<ApiResponse<Clan>> => {
  return apiRequest<Clan>(`${API_CONFIG.ENDPOINTS.CLANS}/${clanId}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
};

export const getClanMembers = async (clanId: string): Promise<ApiResponse<Member[]>> => {
  return apiRequest<Member[]>(`${API_CONFIG.ENDPOINTS.CLANS}/${clanId}/members`);
};

export const addClanMember = async (clanId: string, memberData: Omit<Member, 'uid' | 'join_date'>): Promise<ApiResponse<Member>> => {
  return apiRequest<Member>(`${API_CONFIG.ENDPOINTS.CLANS}/${clanId}/members`, {
    method: 'POST',
    body: JSON.stringify(memberData),
  });
};

export const updateMemberRole = async (clanId: string, memberId: string, role: Member['role']): Promise<ApiResponse<Member>> => {
  return apiRequest<Member>(`${API_CONFIG.ENDPOINTS.CLANS}/${clanId}/members/${memberId}`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  });
};

export const searchClans = async (query: string, region?: string): Promise<ApiResponse<Clan[]>> => {
  const params = new URLSearchParams({ q: query });
  if (region) params.append('region', region);
  
  return apiRequest<Clan[]>(`${API_CONFIG.ENDPOINTS.CLANS}/search?${params}`);
};
