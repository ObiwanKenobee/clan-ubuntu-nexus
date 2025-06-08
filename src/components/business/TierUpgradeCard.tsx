
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, Database, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { PaymentModal } from '@/components/payments/PaymentModal';

interface TierUpgradeCardProps {
  currentTier: string;
  usage: {
    members: { current: number; limit: number };
    storage: { current: number; limit: number };
    disputes: { current: number; limit: number };
  };
}

export const TierUpgradeCard: React.FC<TierUpgradeCardProps> = ({ currentTier, usage }) => {
  const [upgradablePackages, setUpgradablePackages] = useState<any[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    fetchUpgradablePackages();
  }, [currentTier]);

  const fetchUpgradablePackages = async () => {
    try {
      const { data, error } = await supabase
        .from('service_packages')
        .select('*')
        .eq('is_active', true)
        .order('price_monthly');

      if (error) throw error;

      // Filter packages that are upgrades from current tier
      const currentPrice = getCurrentTierPrice(currentTier);
      const upgrades = data?.filter(pkg => pkg.price_monthly > currentPrice) || [];
      setUpgradablePackages(upgrades);
    } catch (error) {
      console.error('Error fetching upgradable packages:', error);
    }
  };

  const getCurrentTierPrice = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'community edition':
        return 0;
      case 'clan premium':
        return 29;
      case 'federation':
        return 99;
      default:
        return 0;
    }
  };

  const getUsagePercentage = (current: number, limit: number) => {
    return Math.min((current / limit) * 100, 100);
  };

  const shouldShowUpgrade = () => {
    return Object.values(usage).some(metric => 
      getUsagePercentage(metric.current, metric.limit) > 80
    );
  };

  const handleUpgrade = (pkg: any) => {
    setSelectedPackage(pkg);
    setIsPaymentModalOpen(true);
  };

  if (!shouldShowUpgrade() || upgradablePackages.length === 0) {
    return null;
  }

  const recommendedPackage = upgradablePackages[0]; // First upgrade option

  return (
    <>
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-amber-600" />
            <span>Upgrade Recommended</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">Current: {currentTier}</Badge>
            <Badge className="bg-amber-600">Near Limits</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Your clan is growing! Consider upgrading to unlock more features and capacity.
          </p>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Members</span>
              </div>
              <span className="text-sm font-medium">
                {usage.members.current}/{usage.members.limit}
              </span>
            </div>
            <Progress value={getUsagePercentage(usage.members.current, usage.members.limit)} />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-green-600" />
                <span className="text-sm">Storage</span>
              </div>
              <span className="text-sm font-medium">
                {usage.storage.current}GB/{usage.storage.limit}GB
              </span>
            </div>
            <Progress value={getUsagePercentage(usage.storage.current, usage.storage.limit)} />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-purple-600" />
                <span className="text-sm">Monthly Disputes</span>
              </div>
              <span className="text-sm font-medium">
                {usage.disputes.current}/{usage.disputes.limit}
              </span>
            </div>
            <Progress value={getUsagePercentage(usage.disputes.current, usage.disputes.limit)} />
          </div>

          <div className="p-3 bg-white rounded-md border">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Recommended: {recommendedPackage.name}</span>
              <span className="text-lg font-bold text-primary">${recommendedPackage.price_monthly}/mo</span>
            </div>
            <p className="text-xs text-muted-foreground">{recommendedPackage.description}</p>
          </div>

          <div className="pt-4 space-y-2">
            <Button className="w-full" onClick={() => handleUpgrade(recommendedPackage)}>
              Upgrade to {recommendedPackage.name}
            </Button>
            <Button variant="outline" className="w-full">
              Compare All Plans
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>✓ Instant upgrade • ✓ No data migration • ✓ 30-day guarantee</p>
          </div>
        </CardContent>
      </Card>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        servicePackage={selectedPackage}
      />
    </>
  );
};
