
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Zap } from 'lucide-react';

const servicePackages = [
  {
    id: 'community',
    name: 'Community Edition',
    price: 'Free',
    description: 'Perfect for single clans getting started',
    icon: Star,
    features: [
      'Up to 100 clan members',
      'Basic dispute resolution',
      'Simple vault management',
      'Community discussions',
      'Mobile app access'
    ],
    limitations: [
      'Limited storage (1GB)',
      'Basic analytics',
      'Email support only'
    ],
    cta: 'Start Free'
  },
  {
    id: 'clan',
    name: 'Clan Premium',
    price: '$29/month',
    description: 'For established clans with growing needs',
    icon: Crown,
    popular: true,
    features: [
      'Up to 1,000 clan members',
      'Advanced dispute AI',
      'Multi-vault management',
      'Rite recording & archival',
      'Token reward system',
      'Analytics dashboard',
      'Priority support'
    ],
    limitations: [
      'Limited to 5 connected clans'
    ],
    cta: 'Upgrade to Premium'
  },
  {
    id: 'federation',
    name: 'Federation',
    price: '$99/month',
    description: 'For clan networks and regional federations',
    icon: Zap,
    features: [
      'Unlimited clan members',
      'Inter-clan governance',
      'Advanced AI agents',
      'Blockchain integration',
      'Custom integrations',
      'Real-time analytics',
      'Dedicated support',
      'White-label options'
    ],
    limitations: [],
    cta: 'Contact Sales'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    description: 'For governments and large organizations',
    icon: Crown,
    features: [
      'Government compliance',
      'Custom deployment',
      'Advanced security',
      'API access',
      'Training programs',
      'On-premise options',
      '24/7 support',
      'Legal framework integration'
    ],
    limitations: [],
    cta: 'Schedule Demo'
  }
];

export const ServicePackagesGrid = () => {
  return (
    <div className="py-12 bg-gradient-to-br from-ochre-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your ClanChain Package</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Scale from individual clans to continent-wide federations with our flexible service tiers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicePackages.map((pkg) => {
            const IconComponent = pkg.icon;
            return (
              <Card key={pkg.id} className={`relative ${pkg.popular ? 'ring-2 ring-primary shadow-xl' : ''}`}>
                {pkg.popular && (
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
                  <div className="text-3xl font-bold text-primary">{pkg.price}</div>
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

                  {pkg.limitations.length > 0 && (
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
                    variant={pkg.popular ? "default" : "outline"}
                  >
                    {pkg.cta}
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
  );
};
