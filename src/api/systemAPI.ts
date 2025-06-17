
import { ApiResponse } from '@/types/clanTypes';
import { API_CONFIG, apiRequest } from '@/config/api';

interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  database: { status: string; response_time: number };
  api: { status: string; response_time: number };
  storage: { status: string; usage: number };
  uptime: number;
  last_check: string;
}

interface SystemConfig {
  platform_name: string;
  max_clan_size: number;
  subscription_tiers: any[];
  payment_methods: string[];
  supported_currencies: string[];
  maintenance_mode: boolean;
}

// System Management
export const getSystemHealth = async (): Promise<ApiResponse<SystemHealth>> => {
  return apiRequest<SystemHealth>(`${API_CONFIG.ENDPOINTS.SYSTEM}/health`);
};

export const getSystemConfig = async (): Promise<ApiResponse<SystemConfig>> => {
  return apiRequest<SystemConfig>(`${API_CONFIG.ENDPOINTS.SYSTEM}/config`);
};

export const updateSystemConfig = async (
  config: Partial<SystemConfig>
): Promise<ApiResponse<SystemConfig>> => {
  return apiRequest<SystemConfig>(`${API_CONFIG.ENDPOINTS.SYSTEM}/config`, {
    method: 'PUT',
    body: JSON.stringify(config),
  });
};

export const enableMaintenanceMode = async (): Promise<ApiResponse<void>> => {
  return apiRequest(`${API_CONFIG.ENDPOINTS.SYSTEM}/maintenance/enable`, {
    method: 'POST',
  });
};

export const disableMaintenanceMode = async (): Promise<ApiResponse<void>> => {
  return apiRequest(`${API_CONFIG.ENDPOINTS.SYSTEM}/maintenance/disable`, {
    method: 'POST',
  });
};

export const getAuditLogs = async (
  filters: {
    user_id?: string;
    action?: string;
    start_date?: string;
    end_date?: string;
    page?: number;
    limit?: number;
  } = {}
): Promise<ApiResponse<any>> => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value.toString());
  });
  
  return apiRequest(`${API_CONFIG.ENDPOINTS.SYSTEM}/audit-logs?${params}`);
};
