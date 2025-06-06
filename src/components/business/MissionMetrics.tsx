
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Shield, TreePine, Users, Heart } from 'lucide-react';

export const MissionMetrics: React.FC = () => {
  const metrics = [
    { icon: TreePine, label: 'Clans Activated', value: 47, color: 'text-emerald-600' },
    { icon: Shield, label: 'Vaults Protected', value: 23, color: 'text-primary' },
    { icon: TrendingUp, label: 'Rules Codified', value: 156, color: 'text-ochre-600' },
    { icon: Users, label: 'Youth Participation', value: 89, unit: '%', color: 'text-sienna-600' },
    { icon: Heart, label: 'Disputes Resolved', value: 12, color: 'text-red-600' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <span>Mission-Driven Impact</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="text-center">
                <Icon className={`w-6 h-6 mx-auto mb-2 ${metric.color}`} />
                <div className="text-2xl font-bold">
                  {metric.value}{metric.unit || ''}
                </div>
                <p className="text-xs text-muted-foreground">{metric.label}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
