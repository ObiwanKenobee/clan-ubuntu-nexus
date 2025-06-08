
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Subscription {
  id: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  service_packages: {
    name: string;
    description: string;
    price_monthly: number;
  };
  payments: Array<{
    amount: number;
    payment_date: string;
    status: string;
  }>;
}

export const SubscriptionManager = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('subscriptions')
        .select(`
          *,
          service_packages (*),
          payments (*)
        `)
        .eq('user_id', session.user.id)
        .eq('status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setSubscription(data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
      toast({
        title: "Error",
        description: "Failed to load subscription details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelSubscription = async () => {
    if (!subscription) return;

    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ status: 'cancelled' })
        .eq('id', subscription.id);

      if (error) throw error;

      toast({
        title: "Subscription Cancelled",
        description: "Your subscription has been cancelled. Access will continue until the end of your billing period.",
      });

      fetchSubscription();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel subscription",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="p-6">Loading subscription details...</div>;
  }

  if (!subscription) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Active Subscription</h3>
          <p className="text-muted-foreground mb-4">
            You don't have an active subscription. Subscribe to a plan to unlock premium features.
          </p>
          <Button>Browse Plans</Button>
        </CardContent>
      </Card>
    );
  }

  const nextBillingDate = new Date(subscription.current_period_end);
  const isExpiringSoon = nextBillingDate.getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000;

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Current Plan</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold">{subscription.service_packages.name}</h3>
              <p className="text-muted-foreground">{subscription.service_packages.description}</p>
            </div>
            <Badge variant={subscription.status === 'active' ? 'default' : 'destructive'}>
              {subscription.status}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Next billing date</p>
                <p className="font-medium">
                  {nextBillingDate.toLocaleDateString()}
                  {isExpiringSoon && (
                    <Badge variant="outline" className="ml-2 text-orange-600">
                      Expiring Soon
                    </Badge>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Monthly cost</p>
                <p className="font-medium">${subscription.service_packages.price_monthly}</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <Button variant="outline" onClick={cancelSubscription}>
              Cancel Subscription
            </Button>
            <Button>Upgrade Plan</Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          {subscription.payments && subscription.payments.length > 0 ? (
            <div className="space-y-3">
              {subscription.payments.slice(0, 5).map((payment, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">${payment.amount}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(payment.payment_date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={payment.status === 'success' ? 'default' : 'destructive'}>
                    {payment.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No payment history available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
