
import { ApiResponse, Vault, ClanToken, PaginatedResponse } from '@/types/clanTypes';
import { API_CONFIG, apiRequest } from '@/config/api';

// Vault Management
export const getVaultsByClan = async (clanId: string): Promise<ApiResponse<Vault[]>> => {
  return apiRequest<Vault[]>(`${API_CONFIG.ENDPOINTS.CLANS}/${clanId}/vaults`);
};

export const createVault = async (clanId: string, vaultData: Omit<Vault, 'vault_id' | 'created_at'>): Promise<ApiResponse<Vault>> => {
  return apiRequest<Vault>(`${API_CONFIG.ENDPOINTS.CLANS}/${clanId}/vaults`, {
    method: 'POST',
    body: JSON.stringify(vaultData),
  });
};

export const contributeToVault = async (vaultId: string, amount: number, memberId: string): Promise<ApiResponse<Vault>> => {
  return apiRequest<Vault>(`${API_CONFIG.ENDPOINTS.VAULTS}/${vaultId}/contribute`, {
    method: 'POST',
    body: JSON.stringify({ amount, member_id: memberId }),
  });
};

export const withdrawFromVault = async (vaultId: string, amount: number, reason: string, requestedBy: string): Promise<ApiResponse<any>> => {
  return apiRequest(`${API_CONFIG.ENDPOINTS.VAULTS}/${vaultId}/withdraw`, {
    method: 'POST',
    body: JSON.stringify({ amount, reason, requested_by: requestedBy }),
  });
};

// ClanToken Management
export const getClanTokens = async (clanId: string, page = 1, limit = 20): Promise<ApiResponse<PaginatedResponse<ClanToken>>> => {
  return apiRequest<PaginatedResponse<ClanToken>>(`${API_CONFIG.ENDPOINTS.CLANS}/${clanId}/tokens?page=${page}&limit=${limit}`);
};

export const awardTokens = async (clanId: string, tokenData: Omit<ClanToken, 'token_id' | 'timestamp'>): Promise<ApiResponse<ClanToken>> => {
  return apiRequest<ClanToken>(`${API_CONFIG.ENDPOINTS.CLANS}/${clanId}/tokens`, {
    method: 'POST',
    body: JSON.stringify(tokenData),
  });
};

export const verifyTokens = async (tokenId: string, verifiedBy: string): Promise<ApiResponse<ClanToken>> => {
  return apiRequest<ClanToken>(`${API_CONFIG.ENDPOINTS.TOKENS}/${tokenId}/verify`, {
    method: 'PATCH',
    body: JSON.stringify({ verified_by: verifiedBy }),
  });
};

export const getMemberTokenBalance = async (memberId: string): Promise<ApiResponse<{ balance: number; total_earned: number }>> => {
  return apiRequest(`${API_CONFIG.ENDPOINTS.MEMBERS}/${memberId}/token-balance`);
};
