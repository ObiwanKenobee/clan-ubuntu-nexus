
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { PaymentModal } from '@/components/payments/PaymentModal';
import { useToast } from '@/hooks/use-toast';

interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
  limitations: string[];
  is_popular: boolean;
}

export const ServicePackagesGrid = () => {
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [userSubscription, setUserSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPackages();
    fetchUserSubscription();
  }, []);

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('service_packages')
        .select('*')
        .eq('is_active', true)
        .order('price_monthly');

      if (error) throw error;
      setPackages(data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserSubscription = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('subscriptions')
        .select(`
          *,
          service_packages (*)
        `)
        .eq('user_id', session.user.id)
        .eq('status', 'active')
        .single();

      if (!error && data) {
        setUserSubscription(data);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  const handleSubscribe = (pkg: ServicePackage) => {
    setSelectedPackage(pkg);
    setIsPaymentModalOpen(true);
  };

  const getPackageIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'community edition':
        return Star;
      case 'clan premium':
        return Crown;
      case 'federation':
      case 'enterprise':
        return Zap;
      default:
        return Star;
    }
  };

  const isCurrentPackage = (packageId: string) => {
    return userSubscription?.package_id === packageId;
  };

  if (loading) {
    return (
      <div className="py-12 bg-gradient-to-br from-ochre-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading packages...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="py-12 bg-gradient-to-br from-ochre-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your ClanChain Package</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Scale from individual clans to continent-wide federations with our flexible service tiers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => {
              const IconComponent = getPackageIcon(pkg.name);
              const isCurrent = isCurrentPackage(pkg.id);
              const isFree = pkg.price_monthly === 0;

              return (
                <Card key={pkg.id} className={`relative ${pkg.is_popular ? 'ring-2 ring-primary shadow-xl' : ''}`}>
                  {pkg.is_popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-3 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <IconComponent className="w-10 h-10 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                    <div className="text-3xl font-bold text-primary">
                      {isFree ? 'Free' : `$${pkg.price_monthly}`}
                      {!isFree && <span className="text-sm font-normal text-muted-foreground">/month</span>}
                    </div>
                    <p className="text-sm text-muted-foreground">{pkg.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Features</h4>
                      <ul className="space-y-2">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {pkg.limitations && pkg.limitations.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2 text-muted-foreground">Limitations</h4>
                        <ul className="space-y-1">
                          {pkg.limitations.map((limitation, index) => (
                            <li key={index} className="text-xs text-muted-foreground">
                              • {limitation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button 
                      className="w-full mt-6" 
                      variant={pkg.is_popular ? "default" : "outline"}
                      onClick={() => handleSubscribe(pkg)}
                      disabled={isCurrent}
                    >
                      {isCurrent ? 'Current Plan' : (isFree ? 'Get Started' : 'Subscribe')}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              All plans include basic security, mobile access, and community support
            </p>
            <div className="flex justify-center space-x-4">
              <Badge variant="outline">30-day free trial</Badge>
              <Badge variant="outline">No setup fees</Badge>
              <Badge variant="outline">Cancel anytime</Badge>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        servicePackage={selectedPackage}
      />
    </>
  );
};
