
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, CreditCard, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
  is_popular: boolean;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  servicePackage: ServicePackage | null;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, servicePackage }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [paymentProvider, setPaymentProvider] = useState<'paystack' | 'paypal'>('paystack');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    if (!servicePackage) return;

    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to subscribe to a service package",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          packageId: servicePackage.id,
          paymentProvider,
          billingCycle
        }
      });

      if (error) throw error;

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message || "Failed to initiate payment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!servicePackage) return null;

  const price = billingCycle === 'yearly' ? servicePackage.price_yearly : servicePackage.price_monthly;
  const savings = billingCycle === 'yearly' ? (servicePackage.price_monthly * 12) - servicePackage.price_yearly : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Subscribe to {servicePackage.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Package Summary */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{servicePackage.name}</h3>
              {servicePackage.is_popular && (
                <Badge className="bg-primary">Most Popular</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{servicePackage.description}</p>
          </div>

          {/* Billing Cycle */}
          <div>
            <Label className="text-base font-medium mb-3 block">Billing Cycle</Label>
            <RadioGroup value={billingCycle} onValueChange={(value: 'monthly' | 'yearly') => setBillingCycle(value)}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly" className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <span>Monthly</span>
                    <span className="font-semibold">${servicePackage.price_monthly}/month</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="yearly" id="yearly" />
                <Label htmlFor="yearly" className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <span>Yearly</span>
                      {savings > 0 && (
                        <Badge variant="outline" className="ml-2 text-green-600">
                          Save ${savings}
                        </Badge>
                      )}
                    </div>
                    <span className="font-semibold">${servicePackage.price_yearly}/year</span>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Payment Provider */}
          <div>
            <Label className="text-base font-medium mb-3 block">Payment Method</Label>
            <RadioGroup value={paymentProvider} onValueChange={(value: 'paystack' | 'paypal') => setPaymentProvider(value)}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="paystack" id="paystack" />
                <Label htmlFor="paystack" className="flex-1 cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">P</div>
                    <span>Paystack</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">PP</div>
                    <span>PayPal</span>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Total */}
          <div className="p-4 bg-primary/10 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total</span>
              <span className="text-2xl font-bold text-primary">${price}</span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {billingCycle === 'yearly' ? 'Billed annually' : 'Billed monthly'}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handlePayment} disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4 mr-2" />
                  Subscribe Now
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
