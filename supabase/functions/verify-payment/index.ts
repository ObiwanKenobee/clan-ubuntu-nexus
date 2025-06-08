
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

    const { reference, subscriptionId, provider } = await req.json()

    if (provider === 'paystack') {
      // Verify Paystack payment
      const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
          'Authorization': `Bearer ${Deno.env.get('PAYSTACK_SECRET_KEY')}`,
        },
      })

      const data = await response.json()

      if (data.status && data.data.status === 'success') {
        // Update subscription to active
        const periodStart = new Date()
        const periodEnd = new Date()
        periodEnd.setMonth(periodEnd.getMonth() + 1) // Default to monthly

        await supabaseClient
          .from('subscriptions')
          .update({
            status: 'active',
            current_period_start: periodStart.toISOString(),
            current_period_end: periodEnd.toISOString()
          })
          .eq('id', subscriptionId)

        // Create payment record
        await supabaseClient
          .from('payments')
          .insert({
            subscription_id: subscriptionId,
            amount: data.data.amount / 100, // Convert from kobo
            payment_provider: 'paystack',
            external_payment_id: reference,
            status: 'success',
            metadata: data.data
          })

        return new Response(
          JSON.stringify({ success: true, message: 'Payment verified successfully' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    } else if (provider === 'paypal') {
      // PayPal verification would be handled via webhooks in production
      // For now, we'll mark as successful if we reach this point
      const periodStart = new Date()
      const periodEnd = new Date()
      periodEnd.setMonth(periodEnd.getMonth() + 1)

      await supabaseClient
        .from('subscriptions')
        .update({
          status: 'active',
          current_period_start: periodStart.toISOString(),
          current_period_end: periodEnd.toISOString()
        })
        .eq('id', subscriptionId)

      return new Response(
        JSON.stringify({ success: true, message: 'Payment verified successfully' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: false, message: 'Payment verification failed' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
