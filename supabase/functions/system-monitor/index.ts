
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

    // Collect system metrics
    const metrics = await collectSystemMetrics(supabaseClient)
    
    // Store metrics in database
    for (const metric of metrics) {
      await supabaseClient
        .from('system_metrics')
        .insert({
          metric_type: metric.type,
          metric_value: metric.value,
          metadata: metric.metadata
        })
    }

    // Check for alerts
    const alerts = await checkSystemAlerts(supabaseClient, metrics)
    
    if (alerts.length > 0) {
      console.log('System alerts detected:', alerts)
      // Here you would typically send notifications
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        metrics_collected: metrics.length,
        alerts: alerts.length 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('System monitor error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function collectSystemMetrics(supabase: any) {
  const metrics = []

  try {
    // Database metrics
    const dbStart = Date.now()
    await supabase.from('profiles').select('id').limit(1)
    const dbResponseTime = Date.now() - dbStart

    metrics.push({
      type: 'database_response_time',
      value: dbResponseTime,
      metadata: { unit: 'milliseconds' }
    })

    // User activity metrics
    const { count: activeUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .gte('last_sign_in_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

    metrics.push({
      type: 'active_users_24h',
      value: activeUsers || 0,
      metadata: { timeframe: '24h' }
    })

    // Subscription metrics
    const { count: activeSubscriptions } = await supabase
      .from('subscriptions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')

    metrics.push({
      type: 'active_subscriptions',
      value: activeSubscriptions || 0,
      metadata: { status: 'active' }
    })

    // Revenue metrics (last 24h)
    const { data: recentPayments } = await supabase
      .from('payments')
      .select('amount')
      .eq('status', 'success')
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

    const revenue24h = recentPayments?.reduce((sum, p) => sum + p.amount, 0) || 0

    metrics.push({
      type: 'revenue_24h',
      value: revenue24h,
      metadata: { currency: 'USD', timeframe: '24h' }
    })

    // Error rate metrics
    const { count: recentErrors } = await supabase
      .from('error_logs')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', new Date(Date.now() - 60 * 60 * 1000).toISOString())

    metrics.push({
      type: 'error_rate_1h',
      value: recentErrors || 0,
      metadata: { timeframe: '1h' }
    })

    // Clan activity metrics
    const { count: activeClanActions } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

    metrics.push({
      type: 'clan_activity_24h',
      value: activeClanActions || 0,
      metadata: { timeframe: '24h' }
    })

  } catch (error) {
    console.error('Error collecting metrics:', error)
    metrics.push({
      type: 'metric_collection_error',
      value: 1,
      metadata: { error: error.message }
    })
  }

  return metrics
}

async function checkSystemAlerts(supabase: any, metrics: any[]) {
  const alerts = []

  // Check database response time
  const dbMetric = metrics.find(m => m.type === 'database_response_time')
  if (dbMetric && dbMetric.value > 5000) {
    alerts.push({
      type: 'high_database_latency',
      severity: 'critical',
      message: `Database response time is ${dbMetric.value}ms (threshold: 5000ms)`,
      value: dbMetric.value
    })
  }

  // Check error rate
  const errorMetric = metrics.find(m => m.type === 'error_rate_1h')
  if (errorMetric && errorMetric.value > 50) {
    alerts.push({
      type: 'high_error_rate',
      severity: 'warning',
      message: `Error rate is ${errorMetric.value} errors/hour (threshold: 50)`,
      value: errorMetric.value
    })
  }

  // Check user activity drop
  const userMetric = metrics.find(m => m.type === 'active_users_24h')
  if (userMetric && userMetric.value === 0) {
    alerts.push({
      type: 'no_user_activity',
      severity: 'warning',
      message: 'No active users in the last 24 hours',
      value: userMetric.value
    })
  }

  // Log alerts to database
  for (const alert of alerts) {
    await supabase
      .from('error_logs')
      .insert({
        error_type: 'system_alert',
        error_message: alert.message,
        request_data: alert
      })
  }

  return alerts
}
