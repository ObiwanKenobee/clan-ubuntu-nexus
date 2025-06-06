
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Cpu, Zap, Rocket, Shield, Globe, Brain } from 'lucide-react';
import { ResponsiveContainer } from '@/components/ui/responsive-layout';
import { useResponsive } from '@/hooks/use-responsive';
import { CommunityAI } from '@/components/ai/CommunityAI';
import { BlockchainIntegration } from '@/components/blockchain/BlockchainIntegration';
import { AdvancedFintech } from '@/components/fintech/AdvancedFintech';
import { HealthTech } from '@/components/health/HealthTech';

export const SuperTechDashboard: React.FC = () => {
  const { isMobile } = useResponsive();
  const [activeModule, setActiveModule] = useState('overview');

  const techModules = [
    {
      id: 'ai',
      title: 'Community AI',
      description: 'Advanced analytics and predictive insights',
      icon: Brain,
      component: CommunityAI,
      status: 'active',
      metrics: { users: '2.4K', accuracy: '94%' }
    },
    {
      id: 'blockchain',
      title: 'Blockchain Integration',
      description: 'Decentralized identity and governance',
      icon: Shield,
      component: BlockchainIntegration,
      status: 'active',
      metrics: { transactions: '15.7K', nodes: '47' }
    },
    {
      id: 'fintech',
      title: 'Advanced FinTech',
      description: 'Smart financial services and microfinance',
      icon: Zap,
      component: AdvancedFintech,
      status: 'active',
      metrics: { volume: '$2.4M', loans: '892' }
    },
    {
      id: 'health',
      title: 'Health Technology',
      description: 'Telemedicine and traditional healing integration',
      icon: Cpu,
      component: HealthTech,
      status: 'active',
      metrics: { patients: '1.8K', consultations: '456' }
    }
  ];

  const platformStats = [
    { label: 'Total Users', value: '12,847', growth: '+23%' },
    { label: 'Active Communities', value: '156', growth: '+18%' },
    { label: 'Transactions', value: '$4.2M', growth: '+35%' },
    { label: 'AI Predictions', value: '94.7%', growth: '+2.1%' }
  ];

  const systemHealth = [
    { system: 'AI Analytics Engine', status: 'operational', uptime: '99.8%' },
    { system: 'Blockchain Network', status: 'operational', uptime: '99.9%' },
    { system: 'Payment Processing', status: 'operational', uptime: '99.7%' },
    { system: 'Health Systems', status: 'maintenance', uptime: '98.5%' },
    { system: 'Voice Recognition', status: 'operational', uptime: '99.6%' },
    { system: 'Cultural Database', status: 'operational', uptime: '99.9%' }
  ];

  const ActiveComponent = techModules.find(m => m.id === activeModule)?.component;

  return (
    <ResponsiveContainer maxWidth="full" className="py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center space-x-3">
          <Rocket className="w-8 h-8 text-primary" />
          <span>AEGIS ClanChain Super-Tech Platform</span>
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          Next-generation community governance powered by AI, blockchain, and cultural wisdom
        </p>
      </div>

      <Tabs value={activeModule} onValueChange={setActiveModule} className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-3' : 'grid-cols-5'} mb-8`}>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ai">AI Engine</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
          <TabsTrigger value="fintech">FinTech</TabsTrigger>
          <TabsTrigger value="health">HealthTech</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-8">
            {/* Platform Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Platform Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-6`}>
                  {platformStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-primary">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                      <div className="text-xs text-green-600 font-medium">{stat.growth}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Technology Modules */}
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-6`}>
              {techModules.map((module) => (
                <Card key={module.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <module.icon className="w-6 h-6 text-primary" />
                      <Badge variant={module.status === 'active' ? 'default' : 'secondary'}>
                        {module.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {module.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      {Object.entries(module.metrics).map(([key, value]) => (
                        <div key={key}>
                          <span className="text-muted-foreground capitalize">{key}: </span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => setActiveModule(module.id)}
                    >
                      Open Module
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* System Health Monitor */}
            <Card>
              <CardHeader>
                <CardTitle>System Health Monitor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemHealth.map((system, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          system.status === 'operational' ? 'bg-green-500' : 
                          system.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        <span className="font-medium">{system.system}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">
                          Uptime: {system.uptime}
                        </span>
                        <Badge variant={
                          system.status === 'operational' ? 'default' : 
                          system.status === 'maintenance' ? 'secondary' : 'destructive'
                        }>
                          {system.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Dynamic Module Content */}
        {techModules.map((module) => (
          <TabsContent key={module.id} value={module.id}>
            {ActiveComponent && <ActiveComponent />}
          </TabsContent>
        ))}
      </Tabs>
    </ResponsiveContainer>
  );
};
