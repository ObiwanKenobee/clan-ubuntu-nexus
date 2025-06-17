
import { ApiResponse } from '@/types/clanTypes';
import { API_CONFIG, apiRequest } from '@/config/api';

interface AnalyticsData {
  metric: string;
  value: number;
  change: number;
  period: string;
  timestamp: string;
}

interface ClanAnalytics {
  clan_id: string;
  member_count: number;
  active_members: number;
  tasks_completed: number;
  disputes_resolved: number;
  vault_balance: number;
  token_circulation: number;
}

// Analytics & Reporting
export const getClanAnalytics = async (
  clanId: string,
  timeframe = '30d'
): Promise<ApiResponse<ClanAnalytics>> => {
  return apiRequest<ClanAnalytics>(`${API_CONFIG.ENDPOINTS.ANALYTICS}/clan/${clanId}?timeframe=${timeframe}`);
};

export const getPlatformAnalytics = async (
  timeframe = '30d'
): Promise<ApiResponse<AnalyticsData[]>> => {
  return apiRequest<AnalyticsData[]>(`${API_CONFIG.ENDPOINTS.ANALYTICS}/platform?timeframe=${timeframe}`);
};

export const getUserMetrics = async (
  userId: string,
  timeframe = '30d'
): Promise<ApiResponse<AnalyticsData[]>> => {
  return apiRequest<AnalyticsData[]>(`${API_CONFIG.ENDPOINTS.ANALYTICS}/user/${userId}?timeframe=${timeframe}`);
};

export const getEngagementMetrics = async (
  clanId?: string,
  timeframe = '30d'
): Promise<ApiResponse<AnalyticsData[]>> => {
  const endpoint = clanId 
    ? `${API_CONFIG.ENDPOINTS.ANALYTICS}/engagement/clan/${clanId}`
    : `${API_CONFIG.ENDPOINTS.ANALYTICS}/engagement/platform`;
  
  return apiRequest<AnalyticsData[]>(`${endpoint}?timeframe=${timeframe}`);
};

export const generateReport = async (
  type: 'clan' | 'platform' | 'financial',
  id?: string,
  timeframe = '30d'
): Promise<ApiResponse<{ report_url: string; expires_at: string }>> => {
  const body = { type, timeframe };
  if (id) Object.assign(body, { id });
  
  return apiRequest<{ report_url: string; expires_at: string }>(`${API_CONFIG.ENDPOINTS.REPORTS}/generate`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};
