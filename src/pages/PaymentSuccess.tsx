
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    try {
      const reference = searchParams.get('reference');
      const subscriptionId = searchParams.get('subscription_id');
      const provider = searchParams.get('provider') || 'paystack';

      if (!reference && !subscriptionId) {
        setStatus('error');
        setMessage('Invalid payment parameters');
        return;
      }

      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: {
          reference,
          subscriptionId,
          provider
        }
      });

      if (error) throw error;

      if (data.success) {
        setStatus('success');
        setMessage('Your subscription has been activated successfully!');
        toast({
          title: "Payment Successful",
          description: "Welcome to your new ClanChain subscription!",
        });
      } else {
        setStatus('error');
        setMessage(data.message || 'Payment verification failed');
      }
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'An error occurred while verifying payment');
      toast({
        title: "Verification Error",
        description: "There was an issue verifying your payment",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ochre-50 to-emerald-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            {status === 'loading' && <Loader2 className="w-6 h-6 animate-spin text-blue-500" />}
            {status === 'success' && <CheckCircle className="w-6 h-6 text-green-500" />}
            {status === 'error' && <AlertCircle className="w-6 h-6 text-red-500" />}
            <span>
              {status === 'loading' && 'Verifying Payment...'}
              {status === 'success' && 'Payment Successful!'}
              {status === 'error' && 'Payment Issues'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">{message}</p>
          
          {status === 'success' && (
            <div className="space-y-3">
              <p className="text-sm">
                You can now access all the features of your selected plan. 
                Check your email for a confirmation receipt.
              </p>
              <div className="flex space-x-3">
                <Button onClick={() => navigate('/dashboard')} className="flex-1">
                  Go to Dashboard
                </Button>
                <Button onClick={() => navigate('/')} variant="outline" className="flex-1">
                  Return Home
                </Button>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-3">
              <p className="text-sm">
                If you believe this is an error, please contact our support team.
              </p>
              <div className="flex space-x-3">
                <Button onClick={() => navigate('/packages')} className="flex-1">
                  Try Again
                </Button>
                <Button onClick={() => navigate('/')} variant="outline" className="flex-1">
                  Return Home
                </Button>
              </div>
            </div>
          )}

          {status === 'loading' && (
            <p className="text-sm">Please wait while we confirm your payment...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
