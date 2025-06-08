
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
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )

    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: user } = await supabaseClient.auth.getUser(token)

    if (!user.user) {
      throw new Error('Unauthorized')
    }

    const { packageId, paymentProvider, billingCycle } = await req.json()

    // Get package details
    const { data: servicePackage, error: packageError } = await supabaseClient
      .from('service_packages')
      .select('*')
      .eq('id', packageId)
      .single()

    if (packageError || !servicePackage) {
      throw new Error('Package not found')
    }

    const amount = billingCycle === 'yearly' ? servicePackage.price_yearly : servicePackage.price_monthly

    // Create subscription record
    const { data: subscription, error: subError } = await supabaseClient
      .from('subscriptions')
      .insert({
        user_id: user.user.id,
        package_id: packageId,
        payment_provider: paymentProvider,
        status: 'pending'
      })
      .select()
      .single()

    if (subError) {
      throw new Error('Failed to create subscription')
    }

    let paymentUrl = ''

    if (paymentProvider === 'paystack') {
      // Initialize Paystack payment
      const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('PAYSTACK_SECRET_KEY')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.user.email,
          amount: amount * 100, // Paystack expects amount in kobo
          currency: 'USD',
          callback_url: `${Deno.env.get('SITE_URL')}/payment/success`,
          metadata: {
            subscription_id: subscription.id,
            package_name: servicePackage.name,
            billing_cycle: billingCycle
          }
        })
      })

      const paystackData = await paystackResponse.json()
      
      if (paystackData.status) {
        paymentUrl = paystackData.data.authorization_url
        
        // Update subscription with external ID
        await supabaseClient
          .from('subscriptions')
          .update({ external_subscription_id: paystackData.data.reference })
          .eq('id', subscription.id)
      }
    } else if (paymentProvider === 'paypal') {
      // Initialize PayPal payment
      const paypalAuth = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en_US',
          'Authorization': `Basic ${btoa(`${Deno.env.get('PAYPAL_CLIENT_ID')}:${Deno.env.get('PAYPAL_CLIENT_SECRET')}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials'
      })

      const authData = await paypalAuth.json()

      const paypalResponse = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData.access_token}`,
        },
        body: JSON.stringify({
          intent: 'CAPTURE',
          purchase_units: [{
            amount: {
              currency_code: 'USD',
              value: amount.toString()
            },
            description: `${servicePackage.name} - ${billingCycle} subscription`,
            custom_id: subscription.id
          }],
          application_context: {
            return_url: `${Deno.env.get('SITE_URL')}/payment/success`,
            cancel_url: `${Deno.env.get('SITE_URL')}/payment/cancel`
          }
        })
      })

      const paypalData = await paypalResponse.json()
      
      if (paypalData.id) {
        paymentUrl = paypalData.links.find((link: any) => link.rel === 'approve').href
        
        // Update subscription with external ID
        await supabaseClient
          .from('subscriptions')
          .update({ external_subscription_id: paypalData.id })
          .eq('id', subscription.id)
      }
    }

    return new Response(
      JSON.stringify({ paymentUrl, subscriptionId: subscription.id }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
