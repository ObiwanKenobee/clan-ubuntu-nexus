
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Users, Globe } from 'lucide-react';
import { useBusinessModel, ClanTier } from '@/contexts/BusinessModelContext';

interface TierUpgradeCardProps {
  archetype: string;
}

export const TierUpgradeCard: React.FC<TierUpgradeCardProps> = ({ archetype }) => {
  const { currentTier, tierFeatures, upgradeTier } = useBusinessModel();

  const tierInfo = {
    seed: { icon: Crown, color: 'bg-emerald-500', price: 'Free' },
    clan: { icon: Users, color: 'bg-primary', price: '$5-10/month' },
    federation: { icon: Globe, color: 'bg-ochre-500', price: '$50-100/month' }
  };

  return (
    <Card className="bg-gradient-to-r from-primary/10 to-emerald/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Crown className="w-5 h-5 text-ochre-500" />
          <span>Clan Tier: {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {Object.entries(tierInfo).map(([tier, info]) => {
            const Icon = info.icon;
            const isActive = currentTier === tier;
            return (
              <div
                key={tier}
                className={`p-3 rounded-lg border-2 ${
                  isActive ? 'border-primary bg-primary/10' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Icon className="w-4 h-4" />
                  <span className="font-medium capitalize">{tier}</span>
                  <Badge className={info.color}>{info.price}</Badge>
                </div>
                <ul className="text-sm space-y-1">
                  {tierFeatures[tier as ClanTier].map((feature, index) => (
                    <li key={index} className="text-muted-foreground">• {feature}</li>
                  ))}
                </ul>
                {!isActive && (
                  <Button
                    size="sm"
                    className="mt-2 w-full"
                    onClick={() => upgradeTier(tier as ClanTier)}
                  >
                    Upgrade
                  </Button>
                )}
              </div>
            );
          })}
        </div>
        <p className="text-sm text-muted-foreground">
          Perfect for {archetype} activities and community governance
        </p>
      </CardContent>
    </Card>
  );
};
