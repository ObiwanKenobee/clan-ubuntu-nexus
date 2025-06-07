
import { ApiResponse, Clan, Member } from '@/types/clanTypes';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Helper function for API calls
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
      return {
        success: false,
        error: data.message || 'API call failed',
      };
    }

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

// Clan Management
export const getClanById = async (clanId: string): Promise<ApiResponse<Clan>> => {
  return apiCall<Clan>(`/clans/${clanId}`);
};

export const createClan = async (clanData: Omit<Clan, 'clan_id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Clan>> => {
  return apiCall<Clan>('/clans', {
    method: 'POST',
    body: JSON.stringify(clanData),
  });
};

export const updateClan = async (clanId: string, updates: Partial<Clan>): Promise<ApiResponse<Clan>> => {
  return apiCall<Clan>(`/clans/${clanId}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
};

export const getClanMembers = async (clanId: string): Promise<ApiResponse<Member[]>> => {
  return apiCall<Member[]>(`/clans/${clanId}/members`);
};

export const addClanMember = async (clanId: string, memberData: Omit<Member, 'uid' | 'join_date'>): Promise<ApiResponse<Member>> => {
  return apiCall<Member>(`/clans/${clanId}/members`, {
    method: 'POST',
    body: JSON.stringify(memberData),
  });
};

export const updateMemberRole = async (clanId: string, memberId: string, role: Member['role']): Promise<ApiResponse<Member>> => {
  return apiCall<Member>(`/clans/${clanId}/members/${memberId}`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  });
};

export const searchClans = async (query: string, region?: string): Promise<ApiResponse<Clan[]>> => {
  const params = new URLSearchParams({ q: query });
  if (region) params.append('region', region);
  
  return apiCall<Clan[]>(`/clans/search?${params}`);
};
