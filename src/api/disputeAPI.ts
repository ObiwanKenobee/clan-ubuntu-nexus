
import { ApiResponse, Dispute, Testimony, DisputeVerdict, PaginatedResponse } from '@/types/clanTypes';
import { API_CONFIG, apiRequest } from '@/config/api';

// Dispute Management
export const getDisputesByClan = async (
  clanId: string, 
  status?: Dispute['status'], 
  page = 1, 
  limit = 10
): Promise<ApiResponse<PaginatedResponse<Dispute>>> => {
  const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
  if (status) params.append('status', status);
  
  return apiRequest<PaginatedResponse<Dispute>>(`${API_CONFIG.ENDPOINTS.CLANS}/${clanId}/disputes?${params}`);
};

export const createDispute = async (
  clanId: string, 
  disputeData: Omit<Dispute, 'dispute_id' | 'created_at' | 'updated_at'>
): Promise<ApiResponse<Dispute>> => {
  return apiRequest<Dispute>(`${API_CONFIG.ENDPOINTS.CLANS}/${clanId}/disputes`, {
    method: 'POST',
    body: JSON.stringify(disputeData),
  });
};

export const getDisputeById = async (disputeId: string): Promise<ApiResponse<Dispute>> => {
  return apiRequest<Dispute>(`${API_CONFIG.ENDPOINTS.DISPUTES}/${disputeId}`);
};

export const addTestimony = async (
  disputeId: string, 
  testimony: Omit<Testimony, 'timestamp' | 'verified'>
): Promise<ApiResponse<Dispute>> => {
  return apiRequest<Dispute>(`${API_CONFIG.ENDPOINTS.DISPUTES}/${disputeId}/testimonies`, {
    method: 'POST',
    body: JSON.stringify(testimony),
  });
};

export const verifyTestimony = async (
  disputeId: string, 
  testimonyIndex: number, 
  verifiedBy: string
): Promise<ApiResponse<Dispute>> => {
  return apiRequest<Dispute>(`${API_CONFIG.ENDPOINTS.DISPUTES}/${disputeId}/testimonies/${testimonyIndex}/verify`, {
    method: 'PATCH',
    body: JSON.stringify({ verified_by: verifiedBy }),
  });
};

export const requestAgentVerdict = async (disputeId: string): Promise<ApiResponse<DisputeVerdict>> => {
  return apiRequest<DisputeVerdict>(`${API_CONFIG.ENDPOINTS.DISPUTES}/${disputeId}/agent-verdict`, {
    method: 'POST',
  });
};

export const elderOverride = async (
  disputeId: string, 
  decision: string, 
  elderId: string, 
  reasoning: string
): Promise<ApiResponse<Dispute>> => {
  return apiRequest<Dispute>(`${API_CONFIG.ENDPOINTS.DISPUTES}/${disputeId}/elder-override`, {
    method: 'POST',
    body: JSON.stringify({ decision, elder_id: elderId, reasoning }),
  });
};

export const updateDisputeStatus = async (
  disputeId: string, 
  status: Dispute['status']
): Promise<ApiResponse<Dispute>> => {
  return apiRequest<Dispute>(`${API_CONFIG.ENDPOINTS.DISPUTES}/${disputeId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
};
