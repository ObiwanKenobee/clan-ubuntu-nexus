
import { ApiResponse, Dispute, Testimony, DisputeVerdict, PaginatedResponse } from '@/types/clanTypes';

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

// Dispute Management
export const getDisputesByClan = async (
  clanId: string, 
  status?: Dispute['status'], 
  page = 1, 
  limit = 10
): Promise<ApiResponse<PaginatedResponse<Dispute>>> => {
  const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
  if (status) params.append('status', status);
  
  return apiCall<PaginatedResponse<Dispute>>(`/clans/${clanId}/disputes?${params}`);
};

export const createDispute = async (
  clanId: string, 
  disputeData: Omit<Dispute, 'dispute_id' | 'created_at' | 'updated_at'>
): Promise<ApiResponse<Dispute>> => {
  return apiCall<Dispute>(`/clans/${clanId}/disputes`, {
    method: 'POST',
    body: JSON.stringify(disputeData),
  });
};

export const getDisputeById = async (disputeId: string): Promise<ApiResponse<Dispute>> => {
  return apiCall<Dispute>(`/disputes/${disputeId}`);
};

export const addTestimony = async (
  disputeId: string, 
  testimony: Omit<Testimony, 'timestamp' | 'verified'>
): Promise<ApiResponse<Dispute>> => {
  return apiCall<Dispute>(`/disputes/${disputeId}/testimonies`, {
    method: 'POST',
    body: JSON.stringify(testimony),
  });
};

export const verifyTestimony = async (
  disputeId: string, 
  testimonyIndex: number, 
  verifiedBy: string
): Promise<ApiResponse<Dispute>> => {
  return apiCall<Dispute>(`/disputes/${disputeId}/testimonies/${testimonyIndex}/verify`, {
    method: 'PATCH',
    body: JSON.stringify({ verified_by: verifiedBy }),
  });
};

export const requestAgentVerdict = async (disputeId: string): Promise<ApiResponse<DisputeVerdict>> => {
  return apiCall<DisputeVerdict>(`/disputes/${disputeId}/agent-verdict`, {
    method: 'POST',
  });
};

export const elderOverride = async (
  disputeId: string, 
  decision: string, 
  elderId: string, 
  reasoning: string
): Promise<ApiResponse<Dispute>> => {
  return apiCall<Dispute>(`/disputes/${disputeId}/elder-override`, {
    method: 'POST',
    body: JSON.stringify({ decision, elder_id: elderId, reasoning }),
  });
};

export const updateDisputeStatus = async (
  disputeId: string, 
  status: Dispute['status']
): Promise<ApiResponse<Dispute>> => {
  return apiCall<Dispute>(`/disputes/${disputeId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
};
