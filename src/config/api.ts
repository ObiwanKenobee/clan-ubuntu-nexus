
// API Configuration - handles backend URL and common settings
const getBackendUrl = (): string => {
  // In Lovable, we use import.meta.env instead of process.env
  // You can set VITE_BACKEND_URL in your deployment environment
  return import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
};

export const API_CONFIG = {
  BACKEND_URL: getBackendUrl(),
  SUPABASE_URL: 'https://jklewwlnrlzomkaetjjo.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprbGV3d2xucmx6b21rYWV0ampvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0MTIxNDEsImV4cCI6MjA1MTk4ODE0MX0.8VjOmAuOnX3L6qYBWm5sUSxxu2jA-V-79g60LeFs5dE',
  ENDPOINTS: {
    // Core API endpoints
    AUTH: '/api/auth',
    CLANS: '/api/clans',
    MEMBERS: '/api/members',
    TASKS: '/api/tasks',
    DISPUTES: '/api/disputes',
    VAULTS: '/api/vaults',
    TOKENS: '/api/tokens',
    RITES: '/api/rites',
    PAYMENTS: '/api/payments',
    SUBSCRIPTIONS: '/api/subscriptions',
    
    // Analytics & Reporting
    ANALYTICS: '/api/analytics',
    REPORTS: '/api/reports',
    
    // System & Admin
    SYSTEM: '/api/system',
    ADMIN: '/api/admin',
    SUPERADMIN: '/api/superadmin'
  }
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BACKEND_URL}${endpoint}`;
};

// Common API headers
export const getApiHeaders = (token?: string): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// API request helper with error handling
export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; error?: string }> => {
  try {
    const url = buildApiUrl(endpoint);
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getApiHeaders(token),
        ...options.headers,
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        error: data.message || `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export default API_CONFIG;
