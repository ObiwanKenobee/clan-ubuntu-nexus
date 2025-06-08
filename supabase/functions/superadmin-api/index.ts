
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: user } = await supabaseClient.auth.getUser(token)

    if (!user.user) {
      throw new Error('Unauthorized')
    }

    // Verify superadmin role
    const { data: roleData } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.user.id)
      .eq('role', 'superadmin')
      .single()

    if (!roleData) {
      throw new Error('Insufficient permissions - superadmin role required')
    }

    const url = new URL(req.url)
    const path = url.pathname.split('/').filter(p => p)
    const action = path[path.length - 1]
    const method = req.method

    console.log(`Superadmin ${method} request to ${action}`)

    switch (action) {
      case 'analytics':
        return await handleAnalytics(supabaseClient, req, method)
      
      case 'user-management':
        return await handleUserManagement(supabaseClient, req, method)
        
      case 'subscription-management':
        return await handleSubscriptionManagement(supabaseClient, req, method)
        
      case 'system-config':
        return await handleSystemConfig(supabaseClient, req, method)
        
      case 'audit-logs':
        return await handleAuditLogs(supabaseClient, req, method)
        
      case 'clan-oversight':
        return await handleClanOversight(supabaseClient, req, method)
        
      case 'financial-reports':
        return await handleFinancialReports(supabaseClient, req, method)
        
      case 'system-health':
        return await handleSystemHealth(supabaseClient, req, method)
        
      default:
        return new Response(
          JSON.stringify({ error: 'Endpoint not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }

  } catch (error) {
    console.error('Superadmin API Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

// Platform Analytics
async function handleAnalytics(supabase: any, req: Request, method: string) {
  if (method !== 'GET') throw new Error('Method not allowed')

  const url = new URL(req.url)
  const timeframe = url.searchParams.get('timeframe') || '30d'
  const metric = url.searchParams.get('metric')

  const analytics = {
    platform_stats: await getPlatformStats(supabase, timeframe),
    user_metrics: await getUserMetrics(supabase, timeframe),
    financial_metrics: await getFinancialMetrics(supabase, timeframe),
    engagement_metrics: await getEngagementMetrics(supabase, timeframe)
  }

  if (metric) {
    return new Response(
      JSON.stringify(analytics[metric] || {}),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  return new Response(
    JSON.stringify(analytics),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

// User Management
async function handleUserManagement(supabase: any, req: Request, method: string) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('user_id')
  const action = url.searchParams.get('action')

  switch (method) {
    case 'GET':
      if (userId) {
        const { data: user, error } = await supabase
          .from('profiles')
          .select(`
            *,
            user_roles (role),
            subscriptions (*)
          `)
          .eq('id', userId)
          .single()

        if (error) throw error
        return new Response(JSON.stringify(user), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      } else {
        const { data: users, error } = await supabase
          .from('profiles')
          .select(`
            *,
            user_roles (role),
            subscriptions (status, package_id)
          `)
          .order('created_at', { ascending: false })
          .limit(100)

        if (error) throw error
        return new Response(JSON.stringify(users), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

    case 'POST':
      const userData = await req.json()
      
      if (action === 'suspend') {
        await supabase
          .from('profiles')
          .update({ status: 'suspended' })
          .eq('id', userData.user_id)
          
        await logAuditAction(supabase, 'user_suspended', userData)
      } else if (action === 'activate') {
        await supabase
          .from('profiles')
          .update({ status: 'active' })
          .eq('id', userData.user_id)
          
        await logAuditAction(supabase, 'user_activated', userData)
      } else if (action === 'change_role') {
        await supabase
          .from('user_roles')
          .upsert({ 
            user_id: userData.user_id, 
            role: userData.new_role 
          })
          
        await logAuditAction(supabase, 'role_changed', userData)
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })

    default:
      throw new Error('Method not allowed')
  }
}

// Subscription Management
async function handleSubscriptionManagement(supabase: any, req: Request, method: string) {
  const url = new URL(req.url)
  const subscriptionId = url.searchParams.get('subscription_id')

  switch (method) {
    case 'GET':
      const query = supabase
        .from('subscriptions')
        .select(`
          *,
          profiles (email, full_name),
          service_packages (name, price_monthly),
          payments (*)
        `)
        .order('created_at', { ascending: false })

      if (subscriptionId) {
        query.eq('id', subscriptionId).single()
      } else {
        query.limit(100)
      }

      const { data, error } = await query
      if (error) throw error

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })

    case 'POST':
      const subData = await req.json()
      const action = subData.action

      if (action === 'cancel') {
        await supabase
          .from('subscriptions')
          .update({ status: 'cancelled' })
          .eq('id', subData.subscription_id)
      } else if (action === 'refund') {
        await supabase
          .from('payments')
          .update({ status: 'refunded' })
          .eq('subscription_id', subData.subscription_id)
      }

      await logAuditAction(supabase, `subscription_${action}`, subData)

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })

    default:
      throw new Error('Method not allowed')
  }
}

// System Configuration
async function handleSystemConfig(supabase: any, req: Request, method: string) {
  switch (method) {
    case 'GET':
      const { data: configs, error } = await supabase
        .from('system_config')
        .select('*')

      if (error) throw error

      return new Response(JSON.stringify(configs), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })

    case 'POST':
      const configData = await req.json()
      
      const { error: updateError } = await supabase
        .from('system_config')
        .upsert(configData)

      if (updateError) throw updateError

      await logAuditAction(supabase, 'config_updated', configData)

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })

    default:
      throw new Error('Method not allowed')
  }
}

// Audit Logs
async function handleAuditLogs(supabase: any, req: Request, method: string) {
  if (method !== 'GET') throw new Error('Method not allowed')

  const url = new URL(req.url)
  const userId = url.searchParams.get('user_id')
  const action = url.searchParams.get('action')
  const startDate = url.searchParams.get('start_date')
  const endDate = url.searchParams.get('end_date')

  let query = supabase
    .from('audit_logs')
    .select(`
      *,
      profiles (email, full_name)
    `)
    .order('created_at', { ascending: false })
    .limit(1000)

  if (userId) query = query.eq('user_id', userId)
  if (action) query = query.eq('action', action)
  if (startDate) query = query.gte('created_at', startDate)
  if (endDate) query = query.lte('created_at', endDate)

  const { data, error } = await query
  if (error) throw error

  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

// Clan Oversight
async function handleClanOversight(supabase: any, req: Request, method: string) {
  const url = new URL(req.url)
  const clanId = url.searchParams.get('clan_id')

  switch (method) {
    case 'GET':
      if (clanId) {
        const { data: clan, error } = await supabase
          .from('organizations')
          .select(`
            *,
            profiles!organizations_founder_id_fkey (email, full_name),
            ethics_rules (count),
            tasks (count)
          `)
          .eq('id', clanId)
          .single()

        if (error) throw error
        return new Response(JSON.stringify(clan), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      } else {
        const { data: clans, error } = await supabase
          .from('organizations')
          .select(`
            *,
            profiles!organizations_founder_id_fkey (email, full_name)
          `)
          .order('created_at', { ascending: false })
          .limit(100)

        if (error) throw error
        return new Response(JSON.stringify(clans), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

    case 'POST':
      const clanData = await req.json()
      const action = clanData.action

      if (action === 'suspend') {
        await supabase
          .from('organizations')
          .update({ status: 'suspended' })
          .eq('id', clanData.clan_id)
      } else if (action === 'verify') {
        await supabase
          .from('organizations')
          .update({ verified: true })
          .eq('id', clanData.clan_id)
      }

      await logAuditAction(supabase, `clan_${action}`, clanData)

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })

    default:
      throw new Error('Method not allowed')
  }
}

// Financial Reports
async function handleFinancialReports(supabase: any, req: Request, method: string) {
  if (method !== 'GET') throw new Error('Method not allowed')

  const url = new URL(req.url)
  const reportType = url.searchParams.get('type') || 'summary'
  const timeframe = url.searchParams.get('timeframe') || '30d'

  const reports = {
    revenue_summary: await getRevenueSummary(supabase, timeframe),
    payment_breakdown: await getPaymentBreakdown(supabase, timeframe),
    subscription_analytics: await getSubscriptionAnalytics(supabase, timeframe),
    refund_analysis: await getRefundAnalysis(supabase, timeframe)
  }

  return new Response(JSON.stringify(reports[reportType] || reports), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

// System Health
async function handleSystemHealth(supabase: any, req: Request, method: string) {
  if (method !== 'GET') throw new Error('Method not allowed')

  const healthData = {
    database_status: await checkDatabaseHealth(supabase),
    api_performance: await getAPIPerformance(supabase),
    user_activity: await getUserActivity(supabase),
    error_rates: await getErrorRates(supabase),
    system_load: await getSystemLoad(supabase)
  }

  return new Response(JSON.stringify(healthData), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

// Helper Functions
async function getPlatformStats(supabase: any, timeframe: string) {
  const dateFilter = getDateFilter(timeframe)
  
  const [
    { count: totalUsers },
    { count: activeClans },
    { count: totalDisputes },
    { count: totalRites }
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('organizations').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('ethics_rules').select('*', { count: 'exact', head: true }),
    supabase.from('consciousness_studio').select('*', { count: 'exact', head: true })
  ])

  return {
    total_users: totalUsers,
    active_clans: activeClans,
    total_disputes: totalDisputes,
    total_rites: totalRites,
    timestamp: new Date().toISOString()
  }
}

async function getUserMetrics(supabase: any, timeframe: string) {
  const dateFilter = getDateFilter(timeframe)
  
  const { data: userGrowth } = await supabase
    .from('profiles')
    .select('created_at')
    .gte('created_at', dateFilter)
    .order('created_at')

  return {
    user_growth: userGrowth,
    growth_rate: calculateGrowthRate(userGrowth)
  }
}

async function getFinancialMetrics(supabase: any, timeframe: string) {
  const dateFilter = getDateFilter(timeframe)
  
  const { data: payments } = await supabase
    .from('payments')
    .select('amount, created_at, status')
    .gte('created_at', dateFilter)
    .eq('status', 'success')

  const totalRevenue = payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0
  
  return {
    total_revenue: totalRevenue,
    payment_count: payments?.length || 0,
    average_payment: payments?.length ? totalRevenue / payments.length : 0
  }
}

async function getEngagementMetrics(supabase: any, timeframe: string) {
  const dateFilter = getDateFilter(timeframe)
  
  const [
    { count: activeTasks },
    { count: recentInsights },
    { count: newMembers }
  ] = await Promise.all([
    supabase.from('tasks').select('*', { count: 'exact', head: true }).gte('created_at', dateFilter),
    supabase.from('community_insights').select('*', { count: 'exact', head: true }).gte('created_at', dateFilter),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).gte('created_at', dateFilter)
  ])

  return {
    active_tasks: activeTasks,
    recent_insights: recentInsights,
    new_members: newMembers
  }
}

async function getRevenueSummary(supabase: any, timeframe: string) {
  const dateFilter = getDateFilter(timeframe)
  
  const { data: payments } = await supabase
    .from('payments')
    .select(`
      amount,
      created_at,
      payment_provider,
      subscriptions (
        service_packages (name)
      )
    `)
    .gte('created_at', dateFilter)
    .eq('status', 'success')

  return {
    total_revenue: payments?.reduce((sum, p) => sum + p.amount, 0) || 0,
    by_provider: groupByProvider(payments),
    by_package: groupByPackage(payments)
  }
}

async function getPaymentBreakdown(supabase: any, timeframe: string) {
  const dateFilter = getDateFilter(timeframe)
  
  const { data } = await supabase
    .from('payments')
    .select('payment_provider, status, amount, created_at')
    .gte('created_at', dateFilter)

  return data
}

async function getSubscriptionAnalytics(supabase: any, timeframe: string) {
  const { data } = await supabase
    .from('subscriptions')
    .select(`
      status,
      created_at,
      service_packages (name, price_monthly)
    `)

  return {
    by_status: groupByStatus(data),
    by_package: groupByPackage(data)
  }
}

async function getRefundAnalysis(supabase: any, timeframe: string) {
  const dateFilter = getDateFilter(timeframe)
  
  const { data } = await supabase
    .from('payments')
    .select('amount, created_at, payment_provider')
    .eq('status', 'refunded')
    .gte('created_at', dateFilter)

  return {
    total_refunds: data?.reduce((sum, p) => sum + p.amount, 0) || 0,
    refund_count: data?.length || 0,
    by_provider: groupByProvider(data)
  }
}

async function checkDatabaseHealth(supabase: any) {
  try {
    const start = Date.now()
    await supabase.from('profiles').select('id').limit(1).single()
    const responseTime = Date.now() - start
    
    return {
      status: 'healthy',
      response_time_ms: responseTime,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    }
  }
}

async function getAPIPerformance(supabase: any) {
  // This would typically come from monitoring tools
  return {
    average_response_time: 150,
    requests_per_minute: 245,
    error_rate: 0.02
  }
}

async function getUserActivity(supabase: any) {
  const { count } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .gte('last_sign_in_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

  return {
    active_users_24h: count || 0
  }
}

async function getErrorRates(supabase: any) {
  // This would typically come from error tracking
  return {
    error_rate_24h: 0.015,
    critical_errors: 2,
    warnings: 15
  }
}

async function getSystemLoad(supabase: any) {
  // This would typically come from infrastructure monitoring
  return {
    cpu_usage: 45,
    memory_usage: 62,
    disk_usage: 78,
    active_connections: 234
  }
}

async function logAuditAction(supabase: any, action: string, data: any) {
  await supabase
    .from('audit_logs')
    .insert({
      action,
      details: data,
      timestamp: new Date().toISOString()
    })
}

function getDateFilter(timeframe: string): string {
  const now = new Date()
  const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : timeframe === '90d' ? 90 : 30
  return new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString()
}

function calculateGrowthRate(data: any[]): number {
  if (!data || data.length < 2) return 0
  const recent = data.slice(-7).length
  const previous = data.slice(-14, -7).length
  return previous > 0 ? ((recent - previous) / previous) * 100 : 0
}

function groupByProvider(payments: any[]): Record<string, number> {
  return payments?.reduce((acc, payment) => {
    acc[payment.payment_provider] = (acc[payment.payment_provider] || 0) + payment.amount
    return acc
  }, {}) || {}
}

function groupByPackage(data: any[]): Record<string, number> {
  return data?.reduce((acc, item) => {
    const packageName = item.service_packages?.name || item.subscriptions?.service_packages?.name || 'Unknown'
    acc[packageName] = (acc[packageName] || 0) + (item.amount || 1)
    return acc
  }, {}) || {}
}

function groupByStatus(subscriptions: any[]): Record<string, number> {
  return subscriptions?.reduce((acc, sub) => {
    acc[sub.status] = (acc[sub.status] || 0) + 1
    return acc
  }, {}) || {}
}
