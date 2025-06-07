
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Globe, 
  Heart, 
  TrendingUp, 
  Shield, 
  Handshake,
  BookOpen,
  Coins
} from 'lucide-react';

const missionMetrics = [
  {
    title: 'Clans Connected',
    current: 1247,
    target: 5000,
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    description: 'Active clan communities across Africa'
  },
  {
    title: 'Disputes Resolved',
    current: 3891,
    target: 10000,
    icon: Shield,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    description: 'Traditional conflicts peacefully mediated'
  },
  {
    title: 'Cultural Rites Preserved',
    current: 892,
    target: 2000,
    icon: BookOpen,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    description: 'Ceremonies documented for future generations'
  },
  {
    title: 'Diaspora Connections',
    current: 15680,
    target: 50000,
    icon: Globe,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    description: 'Diaspora members reconnected to roots'
  },
  {
    title: 'Community Funds (USD)',
    current: 284750,
    target: 1000000,
    icon: Coins,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    description: 'Collective savings and investments'
  },
  {
    title: 'Youth Empowered',
    current: 5234,
    target: 20000,
    icon: TrendingUp,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    description: 'Young people gaining traditional wisdom'
  }
];

export const MissionMetrics = () => {
  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="py-12 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Impact Across Africa</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Measuring our progress in strengthening African communities through technology, tradition, and togetherness
          </p>
          <div className="flex justify-center space-x-4 mt-6">
            <Badge className="bg-primary">Live Metrics</Badge>
            <Badge variant="outline">Updated Daily</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missionMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            const progress = calculateProgress(metric.current, metric.target);
            
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                      <IconComponent className={`w-6 h-6 ${metric.color}`} />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {progress.toFixed(1)}%
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{metric.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">
                        {formatNumber(metric.current)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        of {formatNumber(metric.target)}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {metric.description}
                  </p>

                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Heart className="w-3 h-3" />
                    <span>Real impact in African communities</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Handshake className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Join Our Mission</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Every clan that joins ClanChain strengthens the fabric of African heritage and community wisdom.
              </p>
              <div className="flex justify-center space-x-4">
                <Badge className="bg-primary/20 text-primary">2024 Goal: Connect 1000+ more clans</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
