
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

    // Create audit_logs table
    await supabaseClient.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS audit_logs (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES auth.users(id),
          action TEXT NOT NULL,
          details JSONB,
          ip_address INET,
          user_agent TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
        CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
        CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
      `
    })

    // Create system_config table
    await supabaseClient.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS system_config (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          key TEXT UNIQUE NOT NULL,
          value JSONB NOT NULL,
          description TEXT,
          updated_by UUID REFERENCES auth.users(id),
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_system_config_key ON system_config(key);
      `
    })

    // Create app_role enum if it doesn't exist
    await supabaseClient.rpc('exec_sql', {
      sql: `
        DO $$ BEGIN
          CREATE TYPE app_role AS ENUM ('superadmin', 'admin', 'elder', 'youth', 'women', 'civic_partner', 'diaspora', 'tech_steward', 'user');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `
    })

    // Create user_roles table
    await supabaseClient.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS user_roles (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
          role app_role NOT NULL,
          assigned_by UUID REFERENCES auth.users(id),
          assigned_at TIMESTAMPTZ DEFAULT NOW(),
          UNIQUE (user_id, role)
        );

        CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
        CREATE INDEX IF NOT EXISTS idx_user_roles_role ON user_roles(role);
      `
    })

    // Create system monitoring tables
    await supabaseClient.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS system_metrics (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          metric_type TEXT NOT NULL,
          metric_value NUMERIC NOT NULL,
          metadata JSONB,
          recorded_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_system_metrics_type ON system_metrics(metric_type);
        CREATE INDEX IF NOT EXISTS idx_system_metrics_recorded_at ON system_metrics(recorded_at);

        CREATE TABLE IF NOT EXISTS error_logs (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          error_type TEXT NOT NULL,
          error_message TEXT NOT NULL,
          stack_trace TEXT,
          user_id UUID REFERENCES auth.users(id),
          request_data JSONB,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_error_logs_type ON error_logs(error_type);
        CREATE INDEX IF NOT EXISTS idx_error_logs_created_at ON error_logs(created_at);
      `
    })

    // Enable RLS on new tables
    await supabaseClient.rpc('exec_sql', {
      sql: `
        ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
        ALTER TABLE system_config ENABLE ROW LEVEL SECURITY;
        ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
        ALTER TABLE system_metrics ENABLE ROW LEVEL SECURITY;
        ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;
      `
    })

    // Create RLS policies for superadmin access
    await supabaseClient.rpc('exec_sql', {
      sql: `
        -- Superadmin can access all audit logs
        CREATE POLICY "Superadmin audit access" ON audit_logs
        FOR ALL TO authenticated
        USING (
          EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() AND role = 'superadmin'
          )
        );

        -- Superadmin can manage system config
        CREATE POLICY "Superadmin config access" ON system_config
        FOR ALL TO authenticated
        USING (
          EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() AND role = 'superadmin'
          )
        );

        -- Superadmin can manage user roles
        CREATE POLICY "Superadmin role management" ON user_roles
        FOR ALL TO authenticated
        USING (
          EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() AND role = 'superadmin'
          )
        );

        -- Superadmin can view system metrics
        CREATE POLICY "Superadmin metrics access" ON system_metrics
        FOR SELECT TO authenticated
        USING (
          EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() AND role = 'superadmin'
          )
        );

        -- Superadmin can view error logs
        CREATE POLICY "Superadmin error logs access" ON error_logs
        FOR SELECT TO authenticated
        USING (
          EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() AND role = 'superadmin'
          )
        );
      `
    })

    // Create helper functions for role checking
    await supabaseClient.rpc('exec_sql', {
      sql: `
        CREATE OR REPLACE FUNCTION has_role(_user_id UUID, _role app_role)
        RETURNS BOOLEAN
        LANGUAGE SQL
        STABLE
        SECURITY DEFINER
        AS $$
          SELECT EXISTS (
            SELECT 1
            FROM user_roles
            WHERE user_id = _user_id
              AND role = _role
          )
        $$;

        CREATE OR REPLACE FUNCTION is_superadmin(_user_id UUID)
        RETURNS BOOLEAN
        LANGUAGE SQL
        STABLE
        SECURITY DEFINER
        AS $$
          SELECT has_role(_user_id, 'superadmin'::app_role)
        $$;
      `
    })

    // Insert default system configurations
    await supabaseClient.rpc('exec_sql', {
      sql: `
        INSERT INTO system_config (key, value, description) VALUES
        ('max_clans_per_user', '5', 'Maximum number of clans a user can create'),
        ('payment_providers', '["paystack", "paypal"]', 'Enabled payment providers'),
        ('maintenance_mode', 'false', 'System maintenance mode status'),
        ('max_file_upload_size', '10485760', 'Maximum file upload size in bytes (10MB)'),
        ('session_timeout', '86400', 'Session timeout in seconds (24 hours)')
        ON CONFLICT (key) DO NOTHING;
      `
    })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Superadmin schema setup completed successfully' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Schema setup error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
