
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

    console.log(`${method} request to notifications API`);

    // Get auth header
    const authHeader = req.headers.get('Authorization');
    if (authHeader) {
      supabase.auth.setAuth(authHeader.replace('Bearer ', ''));
    }

    switch (method) {
      case 'GET':
        return await handleGetNotifications(supabase, url);
      
      case 'POST':
        return await handleCreateNotification(supabase, req);
        
      case 'PUT':
        return await handleUpdateNotification(supabase, req, url);
        
      default:
        throw new Error('Method not allowed');
    }

  } catch (error) {
    console.error('Notifications API Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function handleGetNotifications(supabase: any, url: URL) {
  const userId = url.searchParams.get('user_id');
  const type = url.searchParams.get('type');
  const unreadOnly = url.searchParams.get('unread_only') === 'true';

  // Using messages table for notifications
  let query = supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (userId) {
    query = query.eq('sender_id', userId);
  }

  if (unreadOnly) {
    query = query.eq('read', false);
  }

  const { data: notifications, error } = await query;
  
  if (error) throw error;

  // Transform messages into notification format
  const formattedNotifications = notifications.map((msg: any) => ({
    id: msg.id,
    title: msg.content.split(' ').slice(0, 5).join(' ') + '...',
    message: msg.content,
    type: determineNotificationType(msg.content),
    read: msg.read,
    created_at: msg.created_at,
    user_id: msg.sender_id,
    metadata: {
      thread_id: msg.thread_id,
      attachment_url: msg.attachment_url
    }
  }));

  return new Response(JSON.stringify({
    notifications: formattedNotifications,
    total_count: formattedNotifications.length,
    unread_count: formattedNotifications.filter(n => !n.read).length
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

async function handleCreateNotification(supabase: any, req: Request) {
  const notificationData = await req.json();
  
  // Create a message entry for the notification
  const { data, error } = await supabase
    .from('messages')
    .insert({
      content: notificationData.message || notificationData.title,
      sender_id: notificationData.user_id,
      thread_id: notificationData.thread_id || crypto.randomUUID(),
      read: false
    })
    .select()
    .single();
  
  if (error) throw error;

  // If it's an elder notification or high priority, also create in community_insights
  if (notificationData.type === 'elder_alert' || notificationData.priority === 'high') {
    await supabase
      .from('community_insights')
      .insert({
        content: notificationData.message,
        topic: notificationData.type || 'notification',
        insight_type: 'alert',
        source: 'clan_system',
        sentiment_score: notificationData.priority === 'high' ? -0.5 : 0
      });
  }
  
  return new Response(JSON.stringify({
    id: data.id,
    message: 'Notification created successfully',
    data: data
  }), {
    status: 201,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

async function handleUpdateNotification(supabase: any, req: Request, url: URL) {
  const notificationId = url.searchParams.get('id');
  const updateData = await req.json();
  
  if (!notificationId) {
    throw new Error('Notification ID required');
  }

  const { data, error } = await supabase
    .from('messages')
    .update({
      read: updateData.read,
      ...(updateData.content && { content: updateData.content })
    })
    .eq('id', notificationId)
    .select()
    .single();
  
  if (error) throw error;
  
  return new Response(JSON.stringify({
    message: 'Notification updated successfully',
    data: data
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

function determineNotificationType(content: string): string {
  const lowerContent = content.toLowerCase();
  
  if (lowerContent.includes('elder') || lowerContent.includes('council')) {
    return 'elder_alert';
  } else if (lowerContent.includes('task') || lowerContent.includes('youth')) {
    return 'youth_task';
  } else if (lowerContent.includes('vault') || lowerContent.includes('fund')) {
    return 'vault_update';
  } else if (lowerContent.includes('rule') || lowerContent.includes('ethics')) {
    return 'ethics_update';
  } else if (lowerContent.includes('diaspora') || lowerContent.includes('abroad')) {
    return 'diaspora_update';
  } else {
    return 'general';
  }
}
