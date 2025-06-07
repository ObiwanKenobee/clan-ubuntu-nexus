
import { ApiResponse, Vault, ClanToken, PaginatedResponse } from '@/types/clanTypes';

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

// Vault Management
export const getVaultsByClan = async (clanId: string): Promise<ApiResponse<Vault[]>> => {
  return apiCall<Vault[]>(`/clans/${clanId}/vaults`);
};

export const createVault = async (clanId: string, vaultData: Omit<Vault, 'vault_id' | 'created_at'>): Promise<ApiResponse<Vault>> => {
  return apiCall<Vault>(`/clans/${clanId}/vaults`, {
    method: 'POST',
    body: JSON.stringify(vaultData),
  });
};

export const contributeToVault = async (vaultId: string, amount: number, memberId: string): Promise<ApiResponse<Vault>> => {
  return apiCall<Vault>(`/vaults/${vaultId}/contribute`, {
    method: 'POST',
    body: JSON.stringify({ amount, member_id: memberId }),
  });
};

export const withdrawFromVault = async (vaultId: string, amount: number, reason: string, requestedBy: string): Promise<ApiResponse<any>> => {
  return apiCall(`/vaults/${vaultId}/withdraw`, {
    method: 'POST',
    body: JSON.stringify({ amount, reason, requested_by: requestedBy }),
  });
};

// ClanToken Management
export const getClanTokens = async (clanId: string, page = 1, limit = 20): Promise<ApiResponse<PaginatedResponse<ClanToken>>> => {
  return apiCall<PaginatedResponse<ClanToken>>(`/clans/${clanId}/tokens?page=${page}&limit=${limit}`);
};

export const awardTokens = async (clanId: string, tokenData: Omit<ClanToken, 'token_id' | 'timestamp'>): Promise<ApiResponse<ClanToken>> => {
  return apiCall<ClanToken>(`/clans/${clanId}/tokens`, {
    method: 'POST',
    body: JSON.stringify(tokenData),
  });
};

export const verifyTokens = async (tokenId: string, verifiedBy: string): Promise<ApiResponse<ClanToken>> => {
  return apiCall<ClanToken>(`/tokens/${tokenId}/verify`, {
    method: 'PATCH',
    body: JSON.stringify({ verified_by: verifiedBy }),
  });
};

export const getMemberTokenBalance = async (memberId: string): Promise<ApiResponse<{ balance: number; total_earned: number }>> => {
  return apiCall(`/members/${memberId}/token-balance`);
};
