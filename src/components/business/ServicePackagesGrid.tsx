
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TreePine, Scroll, Coins, Brain, Radio, Heart } from 'lucide-react';
import { useBusinessModel, ServicePackage } from '@/contexts/BusinessModelContext';

export const ServicePackagesGrid: React.FC = () => {
  const { activePackages, packagePricing, addPackage } = useBusinessModel();

  const packages = [
    {
      id: 'genesis' as ServicePackage,
      icon: TreePine,
      title: 'Clan Genesis Bundle',
      description: 'Digital family tree setup, identity onboarding',
      target: '1–2 extended families',
      color: 'bg-emerald-500'
    },
    {
      id: 'council' as ServicePackage,
      icon: Scroll,
      title: 'Elders Council Protocol',
      description: 'Custom moral rules, voiceprint logs, memory wall',
      target: 'Clan councils, spiritual groups',
      color: 'bg-ochre-500'
    },
    {
      id: 'vault' as ServicePackage,
      icon: Coins,
      title: 'Community Vault Service',
      description: 'Shared funds for funerals, bursaries, projects',
      target: 'SACCOs, burial societies',
      color: 'bg-sienna-500'
    },
    {
      id: 'ethics' as ServicePackage,
      icon: Brain,
      title: 'Ethics-as-Code Studio',
      description: 'Shape inheritance and voting rules',
      target: 'Family mediators, leaders',
      color: 'bg-primary'
    },
    {
      id: 'kiosk' as ServicePackage,
      icon: Radio,
      title: 'Offline Kiosk Node',
      description: 'Solar-powered SMS/USSD access point',
      target: 'Villages, rural wards',
      color: 'bg-secondary'
    },
    {
      id: 'covenant' as ServicePackage,
      icon: Heart,
      title: 'Clan Covenant Plan',
      description: 'Ritual/tech fusion, voice harmonics, blockchain',
      target: 'Faith communities',
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {packages.map((pkg) => {
        const Icon = pkg.icon;
        const isActive = activePackages.includes(pkg.id);
        const price = packagePricing[pkg.id];

        return (
          <Card key={pkg.id} className={`${isActive ? 'ring-2 ring-primary' : ''}`}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon className={`w-5 h-5 text-white p-1 rounded ${pkg.color}`} />
                <span className="text-sm">{pkg.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{pkg.description}</p>
              <Badge variant="outline" className="mb-3 text-xs">
                Target: {pkg.target}
              </Badge>
              <div className="flex justify-between items-center">
                <span className="font-bold">${price}/month</span>
                <Button
                  size="sm"
                  disabled={isActive}
                  onClick={() => addPackage(pkg.id)}
                >
                  {isActive ? 'Active' : 'Add'}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
