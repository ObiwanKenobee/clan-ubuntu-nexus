
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
    const path = url.pathname;
    const method = req.method;

    console.log(`${method} request to ${path}`);

    // Parse the path to determine the resource and action
    const pathParts = path.split('/').filter(p => p);
    const resource = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];

    // Get auth header
    const authHeader = req.headers.get('Authorization');
    if (authHeader) {
      supabase.auth.setAuth(authHeader.replace('Bearer ', ''));
    }

    // Route handlers
    switch (resource) {
      case 'profiles':
        return await handleProfiles(supabase, req, method);
      
      case 'family-tree':
        return await handleFamilyTree(supabase, req, method);
        
      case 'clan-vault':
        return await handleClanVault(supabase, req, method);
        
      case 'ethics-rules':
        return await handleEthicsRules(supabase, req, method);
        
      case 'community-insights':
        return await handleCommunityInsights(supabase, req, method);
        
      case 'youth-tasks':
        return await handleYouthTasks(supabase, req, method);
        
      case 'cultural-memory':
        return await handleCulturalMemory(supabase, req, method);
        
      default:
        return new Response(
          JSON.stringify({ error: 'Not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Profile management
async function handleProfiles(supabase: any, req: Request, method: string) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('user_id');

  switch (method) {
    case 'GET':
      if (userId) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
        
        if (error) throw error;
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } else {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .limit(50);
        
        if (error) throw error;
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

    case 'POST':
      const profileData = await req.json();
      const { data, error } = await supabase
        .from('profiles')
        .insert(profileData)
        .select()
        .single();
      
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    case 'PUT':
      if (!userId) throw new Error('User ID required for update');
      const updateData = await req.json();
      const { data: updatedData, error: updateError } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId)
        .select()
        .single();
      
      if (updateError) throw updateError;
      return new Response(JSON.stringify(updatedData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    case 'DELETE':
      if (!userId) throw new Error('User ID required for delete');
      const { error: deleteError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);
      
      if (deleteError) throw deleteError;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    default:
      throw new Error('Method not allowed');
  }
}

// Family tree management (using profiles table with relationship logic)
async function handleFamilyTree(supabase: any, req: Request, method: string) {
  const url = new URL(req.url);
  const familyId = url.searchParams.get('family_id');

  switch (method) {
    case 'GET':
      // Get family tree data - using profiles with focus_areas for family relationships
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .contains('focus_areas', familyId ? [familyId] : [])
        .limit(100);
      
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    case 'POST':
      const familyMemberData = await req.json();
      const { data: newMember, error: insertError } = await supabase
        .from('profiles')
        .insert({
          ...familyMemberData,
          focus_areas: familyMemberData.focus_areas || ['family_tree']
        })
        .select()
        .single();
      
      if (insertError) throw insertError;
      return new Response(JSON.stringify(newMember), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    default:
      throw new Error('Method not allowed');
  }
}

// Clan vault management (using organizations table)
async function handleClanVault(supabase: any, req: Request, method: string) {
  const url = new URL(req.url);
  const vaultId = url.searchParams.get('vault_id');

  switch (method) {
    case 'GET':
      if (vaultId) {
        const { data, error } = await supabase
          .from('organizations')
          .select('*')
          .eq('id', vaultId)
          .single();
        
        if (error) throw error;
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } else {
        const { data, error } = await supabase
          .from('organizations')
          .select('*')
          .limit(20);
        
        if (error) throw error;
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

    case 'POST':
      const vaultData = await req.json();
      const { data, error } = await supabase
        .from('organizations')
        .insert(vaultData)
        .select()
        .single();
      
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    case 'PUT':
      if (!vaultId) throw new Error('Vault ID required for update');
      const updateData = await req.json();
      const { data: updatedData, error: updateError } = await supabase
        .from('organizations')
        .update(updateData)
        .eq('id', vaultId)
        .select()
        .single();
      
      if (updateError) throw updateError;
      return new Response(JSON.stringify(updatedData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    default:
      throw new Error('Method not allowed');
  }
}

// Ethics rules management
async function handleEthicsRules(supabase: any, req: Request, method: string) {
  const url = new URL(req.url);
  const ruleId = url.searchParams.get('rule_id');

  switch (method) {
    case 'GET':
      if (ruleId) {
        const { data, error } = await supabase
          .from('ethics_rules')
          .select('*')
          .eq('id', ruleId)
          .single();
        
        if (error) throw error;
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } else {
        const { data, error } = await supabase
          .from('ethics_rules')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(50);
        
        if (error) throw error;
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

    case 'POST':
      const ruleData = await req.json();
      const { data, error } = await supabase
        .from('ethics_rules')
        .insert(ruleData)
        .select()
        .single();
      
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    case 'PUT':
      if (!ruleId) throw new Error('Rule ID required for update');
      const updateData = await req.json();
      const { data: updatedData, error: updateError } = await supabase
        .from('ethics_rules')
        .update(updateData)
        .eq('id', ruleId)
        .select()
        .single();
      
      if (updateError) throw updateError;
      return new Response(JSON.stringify(updatedData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    case 'DELETE':
      if (!ruleId) throw new Error('Rule ID required for delete');
      // Soft delete by updating status
      const { data: deletedData, error: deleteError } = await supabase
        .from('ethics_rules')
        .update({ status: 'archived' })
        .eq('id', ruleId)
        .select()
        .single();
      
      if (deleteError) throw deleteError;
      return new Response(JSON.stringify(deletedData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    default:
      throw new Error('Method not allowed');
  }
}

// Community insights management
async function handleCommunityInsights(supabase: any, req: Request, method: string) {
  const url = new URL(req.url);
  const insightId = url.searchParams.get('insight_id');
  const topic = url.searchParams.get('topic');

  switch (method) {
    case 'GET':
      if (insightId) {
        const { data, error } = await supabase
          .from('community_insights')
          .select('*')
          .eq('id', insightId)
          .single();
        
        if (error) throw error;
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } else {
        let query = supabase
          .from('community_insights')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);
        
        if (topic) {
          query = query.eq('topic', topic);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

    case 'POST':
      const insightData = await req.json();
      const { data, error } = await supabase
        .from('community_insights')
        .insert(insightData)
        .select()
        .single();
      
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    case 'PUT':
      if (!insightId) throw new Error('Insight ID required for update');
      const updateData = await req.json();
      const { data: updatedData, error: updateError } = await supabase
        .from('community_insights')
        .update(updateData)
        .eq('id', insightId)
        .select()
        .single();
      
      if (updateError) throw updateError;
      return new Response(JSON.stringify(updatedData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    default:
      throw new Error('Method not allowed');
  }
}

// Youth tasks management (using tasks table)
async function handleYouthTasks(supabase: any, req: Request, method: string) {
  const url = new URL(req.url);
  const taskId = url.searchParams.get('task_id');
  const userId = url.searchParams.get('user_id');

  switch (method) {
    case 'GET':
      if (taskId) {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('id', taskId)
          .single();
        
        if (error) throw error;
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } else {
        let query = supabase
          .from('tasks')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);
        
        if (userId) {
          query = query.eq('user_id', userId);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

    case 'POST':
      const taskData = await req.json();
      const { data, error } = await supabase
        .from('tasks')
        .insert(taskData)
        .select()
        .single();
      
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    case 'PUT':
      if (!taskId) throw new Error('Task ID required for update');
      const updateData = await req.json();
      const { data: updatedData, error: updateError } = await supabase
        .from('tasks')
        .update(updateData)
        .eq('id', taskId)
        .select()
        .single();
      
      if (updateError) throw updateError;
      return new Response(JSON.stringify(updatedData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    case 'DELETE':
      if (!taskId) throw new Error('Task ID required for delete');
      const { error: deleteError } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);
      
      if (deleteError) throw deleteError;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    default:
      throw new Error('Method not allowed');
  }
}

// Cultural memory management (using consciousness_studio table)
async function handleCulturalMemory(supabase: any, req: Request, method: string) {
  const url = new URL(req.url);
  const memoryId = url.searchParams.get('memory_id');
  const meditationType = url.searchParams.get('type');

  switch (method) {
    case 'GET':
      if (memoryId) {
        const { data, error } = await supabase
          .from('consciousness_studio')
          .select('*')
          .eq('id', memoryId)
          .single();
        
        if (error) throw error;
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } else {
        let query = supabase
          .from('consciousness_studio')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);
        
        if (meditationType) {
          query = query.eq('meditation_type', meditationType);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

    case 'POST':
      const memoryData = await req.json();
      const { data, error } = await supabase
        .from('consciousness_studio')
        .insert(memoryData)
        .select()
        .single();
      
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    case 'PUT':
      if (!memoryId) throw new Error('Memory ID required for update');
      const updateData = await req.json();
      const { data: updatedData, error: updateError } = await supabase
        .from('consciousness_studio')
        .update(updateData)
        .eq('id', memoryId)
        .select()
        .single();
      
      if (updateError) throw updateError;
      return new Response(JSON.stringify(updatedData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    case 'DELETE':
      if (!memoryId) throw new Error('Memory ID required for delete');
      const { error: deleteError } = await supabase
        .from('consciousness_studio')
        .delete()
        .eq('id', memoryId);
      
      if (deleteError) throw deleteError;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    default:
      throw new Error('Method not allowed');
  }
}
