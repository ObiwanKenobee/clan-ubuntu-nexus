
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    const url = new URL(req.url);
    const method = req.method;

    console.log(`${method} request to analytics API`);

    // Get auth header
    const authHeader = req.headers.get('Authorization');
    if (authHeader) {
      supabase.auth.setAuth(authHeader.replace('Bearer ', ''));
    }

    switch (method) {
      case 'GET':
        return await handleAnalyticsGet(supabase, url);
      
      case 'POST':
        return await handleAnalyticsPost(supabase, req);
        
      default:
        throw new Error('Method not allowed');
    }

  } catch (error) {
    console.error('Analytics API Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function handleAnalyticsGet(supabase: any, url: URL) {
  const reportType = url.searchParams.get('type');
  const startDate = url.searchParams.get('start_date');
  const endDate = url.searchParams.get('end_date');

  switch (reportType) {
    case 'community-pulse':
      return await getCommunityPulseAnalytics(supabase, startDate, endDate);
    
    case 'clan-vault-summary':
      return await getClanVaultSummary(supabase);
    
    case 'youth-progress':
      return await getYouthProgressAnalytics(supabase, startDate, endDate);
    
    case 'ethics-compliance':
      return await getEthicsComplianceReport(supabase);
    
    case 'diaspora-engagement':
      return await getDiasporaEngagement(supabase, startDate, endDate);
    
    default:
      return await getOverallAnalytics(supabase);
  }
}

async function getCommunityPulseAnalytics(supabase: any, startDate?: string, endDate?: string) {
  let query = supabase
    .from('community_insights')
    .select('*')
    .order('created_at', { ascending: false });

  if (startDate) {
    query = query.gte('created_at', startDate);
  }
  if (endDate) {
    query = query.lte('created_at', endDate);
  }

  const { data: insights, error } = await query.limit(100);
  
  if (error) throw error;

  // Calculate sentiment trends
  const sentimentTrends = insights.reduce((acc: any, insight: any) => {
    const topic = insight.topic || 'general';
    if (!acc[topic]) {
      acc[topic] = { positive: 0, neutral: 0, negative: 0, total: 0 };
    }
    
    const sentiment = insight.sentiment_score || 0;
    if (sentiment > 0.1) acc[topic].positive++;
    else if (sentiment < -0.1) acc[topic].negative++;
    else acc[topic].neutral++;
    
    acc[topic].total++;
    return acc;
  }, {});

  return new Response(JSON.stringify({
    insights,
    sentiment_trends: sentimentTrends,
    total_insights: insights.length,
    date_range: { start: startDate, end: endDate }
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

async function getClanVaultSummary(supabase: any) {
  const { data: organizations, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('subscription_active', true);
  
  if (error) throw error;

  const summary = {
    total_vaults: organizations.length,
    active_subscriptions: organizations.filter((org: any) => org.subscription_active).length,
    total_members: organizations.reduce((sum: number, org: any) => sum + (org.member_count || 0), 0),
    subscription_revenue: organizations.reduce((sum: number, org: any) => {
      // Assuming plan pricing logic
      const planValue = org.plan === 'pro' ? 50 : org.plan === 'premium' ? 100 : 0;
      return sum + planValue;
    }, 0)
  };

  return new Response(JSON.stringify(summary), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

async function getYouthProgressAnalytics(supabase: any, startDate?: string, endDate?: string) {
  let query = supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });

  if (startDate) {
    query = query.gte('created_at', startDate);
  }
  if (endDate) {
    query = query.lte('created_at', endDate);
  }

  const { data: tasks, error } = await query.limit(500);
  
  if (error) throw error;

  const analytics = {
    total_tasks: tasks.length,
    completed_tasks: tasks.filter((task: any) => task.status === 'completed').length,
    pending_tasks: tasks.filter((task: any) => task.status === 'pending').length,
    in_progress_tasks: tasks.filter((task: any) => task.status === 'in_progress').length,
    completion_rate: tasks.length > 0 ? 
      (tasks.filter((task: any) => task.status === 'completed').length / tasks.length * 100).toFixed(2) : 0,
    task_categories: tasks.reduce((acc: any, task: any) => {
      const category = task.category || 'general';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {})
  };

  return new Response(JSON.stringify(analytics), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

async function getEthicsComplianceReport(supabase: any) {
  const { data: rules, error } = await supabase
    .from('ethics_rules')
    .select('*')
    .eq('status', 'active');
  
  if (error) throw error;

  const compliance = {
    total_active_rules: rules.length,
    rules_by_category: rules.reduce((acc: any, rule: any) => {
      const category = rule.category || 'general';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {}),
    average_weight: rules.length > 0 ? 
      (rules.reduce((sum: number, rule: any) => sum + (rule.weight || 1), 0) / rules.length).toFixed(2) : 0
  };

  return new Response(JSON.stringify(compliance), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

async function getDiasporaEngagement(supabase: any, startDate?: string, endDate?: string) {
  // Using profiles table to simulate diaspora data
  let query = supabase
    .from('profiles')
    .select('*');

  if (startDate) {
    query = query.gte('created_at', startDate);
  }
  if (endDate) {
    query = query.lte('created_at', endDate);
  }

  const { data: profiles, error } = await query;
  
  if (error) throw error;

  const diasporaMembers = profiles.filter((profile: any) => 
    profile.focus_areas?.includes('diaspora') || 
    profile.organization?.toLowerCase().includes('diaspora')
  );

  const engagement = {
    total_diaspora_members: diasporaMembers.length,
    recent_registrations: diasporaMembers.filter((member: any) => {
      const createdAt = new Date(member.created_at);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return createdAt > thirtyDaysAgo;
    }).length,
    industries: diasporaMembers.reduce((acc: any, member: any) => {
      const industry = member.industry || 'unknown';
      acc[industry] = (acc[industry] || 0) + 1;
      return acc;
    }, {})
  };

  return new Response(JSON.stringify(engagement), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

async function getOverallAnalytics(supabase: any) {
  const [profilesResult, tasksResult, rulesResult, insightsResult] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact' }),
    supabase.from('tasks').select('id', { count: 'exact' }),
    supabase.from('ethics_rules').select('id', { count: 'exact' }).eq('status', 'active'),
    supabase.from('community_insights').select('id', { count: 'exact' })
  ]);

  const overview = {
    total_members: profilesResult.count || 0,
    total_tasks: tasksResult.count || 0,
    active_ethics_rules: rulesResult.count || 0,
    community_insights: insightsResult.count || 0,
    platform_health: 'active',
    last_updated: new Date().toISOString()
  };

  return new Response(JSON.stringify(overview), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

async function handleAnalyticsPost(supabase: any, req: Request) {
  const analyticsData = await req.json();
  
  // Store analytics metrics
  const { data, error } = await supabase
    .from('analytics_metrics')
    .insert({
      metric_name: analyticsData.metric_name,
      metric_type: analyticsData.metric_type,
      metric_value: analyticsData.metric_value,
      user_id: analyticsData.user_id,
      timestamp: new Date().toISOString()
    })
    .select()
    .single();
  
  if (error) throw error;
  
  return new Response(JSON.stringify(data), {
    status: 201,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}
