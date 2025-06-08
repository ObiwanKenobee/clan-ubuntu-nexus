
import { supabase } from '@/integrations/supabase/client';

const SUPERADMIN_API_BASE = '/functions/v1/superadmin-api';

class SuperAdminAPI {
  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Authentication required');
    }

    const url = `${SUPERADMIN_API_BASE}/${endpoint}`;
    const response = await supabase.functions.invoke('superadmin-api', {
      body: options.body ? JSON.parse(options.body as string) : undefined,
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data;
  }

  // Analytics APIs
  async getAnalytics(timeframe = '30d', metric?: string) {
    const params = new URLSearchParams({ timeframe });
    if (metric) params.append('metric', metric);
    
    return this.makeRequest(`analytics?${params}`);
  }

  async getPlatformStats(timeframe = '30d') {
    return this.getAnalytics(timeframe, 'platform_stats');
  }

  async getUserMetrics(timeframe = '30d') {
    return this.getAnalytics(timeframe, 'user_metrics');
  }

  async getFinancialMetrics(timeframe = '30d') {
    return this.getAnalytics(timeframe, 'financial_metrics');
  }

  async getEngagementMetrics(timeframe = '30d') {
    return this.getAnalytics(timeframe, 'engagement_metrics');
  }

  // User Management APIs
  async getAllUsers() {
    return this.makeRequest('user-management');
  }

  async getUser(userId: string) {
    return this.makeRequest(`user-management?user_id=${userId}`);
  }

  async suspendUser(userId: string, reason?: string) {
    return this.makeRequest('user-management?action=suspend', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, reason }),
    });
  }

  async activateUser(userId: string) {
    return this.makeRequest('user-management?action=activate', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId }),
    });
  }

  async changeUserRole(userId: string, newRole: string) {
    return this.makeRequest('user-management?action=change_role', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, new_role: newRole }),
    });
  }

  // Subscription Management APIs
  async getAllSubscriptions() {
    return this.makeRequest('subscription-management');
  }

  async getSubscription(subscriptionId: string) {
    return this.makeRequest(`subscription-management?subscription_id=${subscriptionId}`);
  }

  async cancelSubscription(subscriptionId: string, reason?: string) {
    return this.makeRequest('subscription-management', {
      method: 'POST',
      body: JSON.stringify({ 
        action: 'cancel', 
        subscription_id: subscriptionId, 
        reason 
      }),
    });
  }

  async refundPayment(subscriptionId: string, reason?: string) {
    return this.makeRequest('subscription-management', {
      method: 'POST',
      body: JSON.stringify({ 
        action: 'refund', 
        subscription_id: subscriptionId, 
        reason 
      }),
    });
  }

  // System Configuration APIs
  async getSystemConfig() {
    return this.makeRequest('system-config');
  }

  async updateSystemConfig(config: Record<string, any>) {
    return this.makeRequest('system-config', {
      method: 'POST',
      body: JSON.stringify(config),
    });
  }

  // Audit Logs APIs
  async getAuditLogs(filters: {
    userId?: string;
    action?: string;
    startDate?: string;
    endDate?: string;
  } = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    return this.makeRequest(`audit-logs?${params}`);
  }

  // Clan Oversight APIs
  async getAllClans() {
    return this.makeRequest('clan-oversight');
  }

  async getClan(clanId: string) {
    return this.makeRequest(`clan-oversight?clan_id=${clanId}`);
  }

  async suspendClan(clanId: string, reason?: string) {
    return this.makeRequest('clan-oversight', {
      method: 'POST',
      body: JSON.stringify({ 
        action: 'suspend', 
        clan_id: clanId, 
        reason 
      }),
    });
  }

  async verifyClan(clanId: string) {
    return this.makeRequest('clan-oversight', {
      method: 'POST',
      body: JSON.stringify({ 
        action: 'verify', 
        clan_id: clanId 
      }),
    });
  }

  // Financial Reports APIs
  async getFinancialReports(type = 'summary', timeframe = '30d') {
    const params = new URLSearchParams({ type, timeframe });
    return this.makeRequest(`financial-reports?${params}`);
  }

  async getRevenueSummary(timeframe = '30d') {
    return this.getFinancialReports('revenue_summary', timeframe);
  }

  async getPaymentBreakdown(timeframe = '30d') {
    return this.getFinancialReports('payment_breakdown', timeframe);
  }

  async getSubscriptionAnalytics(timeframe = '30d') {
    return this.getFinancialReports('subscription_analytics', timeframe);
  }

  async getRefundAnalysis(timeframe = '30d') {
    return this.getFinancialReports('refund_analysis', timeframe);
  }

  // System Health APIs
  async getSystemHealth() {
    return this.makeRequest('system-health');
  }

  async getDatabaseStatus() {
    const health = await this.getSystemHealth();
    return health.database_status;
  }

  async getAPIPerformance() {
    const health = await this.getSystemHealth();
    return health.api_performance;
  }

  async getUserActivity() {
    const health = await this.getSystemHealth();
    return health.user_activity;
  }

  async getErrorRates() {
    const health = await this.getSystemHealth();
    return health.error_rates;
  }

  async getSystemLoad() {
    const health = await this.getSystemHealth();
    return health.system_load;
  }
}

export const superAdminAPI = new SuperAdminAPI();
export default superAdminAPI;
