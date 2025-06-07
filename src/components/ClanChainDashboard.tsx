
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClanIDBuilder } from './ClanIDBuilder';
import { ClanVaultPanel } from './ClanVaultPanel';
import { CommunityPulseDashboard } from './CommunityPulseDashboard';
import { YouthGrowthTracker } from './YouthGrowthTracker';
import { CulturalMemoryWall } from './CulturalMemoryWall';
import { ClanEthicsLedger } from './ClanEthicsLedger';
import { MeshSyncStatus } from './MeshSyncStatus';
import { DiasporaBridgeModule } from './DiasporaBridgeModule';
import { CivicConnector } from './CivicConnector';
import { CommunityAI } from './ai/CommunityAI';
import { CulturalAdaptations } from './cultural/CulturalAdaptations';
import { ServicePackagesGrid } from './business/ServicePackagesGrid';
import { MissionMetrics } from './business/MissionMetrics';
import { TierUpgradeCard } from './business/TierUpgradeCard';
import { Home, Coins, Leaf, Globe, User, LogIn, Zap, Brain, Languages, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const ClanChainDashboard = () => {
  const [activeTab, setActiveTab] = useState('clan-tree');

  // Sample usage data for tier upgrade component
  const sampleUsage = {
    members: { current: 87, limit: 100 },
    storage: { current: 0.8, limit: 1 },
    disputes: { current: 12, limit: 15 }
  };

  const coreModules = [
    { id: 'clan-tree', icon: Home, label: 'Clan Tree', component: ClanIDBuilder },
    { id: 'vault', icon: Coins, label: 'Vault', component: ClanVaultPanel },
    { id: 'growth', icon: Leaf, label: 'Growth', component: YouthGrowthTracker },
    { id: 'community', icon: Globe, label: 'Community', component: CommunityPulseDashboard },
    { id: 'memory', icon: User, label: 'Memory', component: CulturalMemoryWall },
  ];

  const advancedModules = [
    { id: 'ethics', label: 'Ethics Ledger', component: ClanEthicsLedger },
    { id: 'sync', label: 'Mesh Sync', component: MeshSyncStatus },
    { id: 'diaspora', label: 'Diaspora Bridge', component: DiasporaBridgeModule },
    { id: 'civic', label: 'Civic Connector', component: CivicConnector },
  ];

  const aiModules = [
    { id: 'ai-insights', label: 'AI Insights', component: CommunityAI },
    { id: 'cultural', label: 'Cultural Adapt', component: CulturalAdaptations },
  ];

  const businessModules = [
    { id: 'packages', label: 'Service Packages', component: ServicePackagesGrid },
    { id: 'metrics', label: 'Mission Metrics', component: MissionMetrics },
  ];

  const allModules = [...coreModules, ...advancedModules, ...aiModules, ...businessModules];

  const getComponentForTab = (tabId: string) => {
    const module = allModules.find(m => m.id === tabId);
    return module?.component || ClanIDBuilder;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ochre-50 via-background to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-ochre-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 clan-gradient rounded-full flex items-center justify-center animate-pulse-ubuntu">
                <span className="text-white font-bold text-xl">🌳</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">ClanChain</h1>
                <p className="text-sm text-muted-foreground">African Community Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link to="/data-explorer">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Brain className="w-4 h-4" />
                  <span>Data Explorer</span>
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <LogIn className="w-4 h-4" />
                  <span>AEGIS Login</span>
                </Button>
              </Link>
              <Badge className="elder-badge">Elder Status</Badge>
              <div className="w-8 h-8 bg-emerald-500 rounded-full animate-pulse" title="Sync Active">
                <div className="w-2 h-2 bg-white rounded-full mx-auto mt-3"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Desktop Navigation */}
              <div className="hidden md:block space-y-4">
                {/* Core Modules */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Core Modules</h3>
                  <TabsList className="grid w-full grid-cols-5 bg-white/60 backdrop-blur-sm">
                    {coreModules.map((item) => (
                      <TabsTrigger
                        key={item.id}
                        value={item.id}
                        className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{item.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {/* Advanced Modules */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Advanced Features</h3>
                  <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm">
                    {advancedModules.map((module) => (
                      <TabsTrigger
                        key={module.id}
                        value={module.id}
                        className="flex items-center space-x-2 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
                      >
                        <span className="hidden sm:inline">{module.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {/* AI & Cultural Modules */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">AI & Cultural</h3>
                  <TabsList className="grid w-full grid-cols-2 bg-white/60 backdrop-blur-sm">
                    {aiModules.map((module) => (
                      <TabsTrigger
                        key={module.id}
                        value={module.id}
                        className="flex items-center space-x-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                      >
                        {module.id === 'ai-insights' && <Brain className="w-4 h-4" />}
                        {module.id === 'cultural' && <Languages className="w-4 h-4" />}
                        <span className="hidden sm:inline">{module.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {/* Business Modules */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Business & Growth</h3>
                  <TabsList className="grid w-full grid-cols-2 bg-white/60 backdrop-blur-sm">
                    {businessModules.map((module) => (
                      <TabsTrigger
                        key={module.id}
                        value={module.id}
                        className="flex items-center space-x-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                      >
                        <Briefcase className="w-4 h-4" />
                        <span className="hidden sm:inline">{module.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </div>

              {/* Mobile Navigation Tabs */}
              <div className="md:hidden mb-6">
                <TabsList className="grid w-full grid-cols-4 mb-4 bg-white/60 backdrop-blur-sm">
                  <TabsTrigger value="clan-tree">Core</TabsTrigger>
                  <TabsTrigger value="ai-insights">AI</TabsTrigger>
                  <TabsTrigger value="packages">Business</TabsTrigger>
                  <TabsTrigger value="ethics">Advanced</TabsTrigger>
                </TabsList>
              </div>

              {/* Tab Content */}
              {allModules.map((module) => {
                const Component = module.component;
                return (
                  <TabsContent key={module.id} value={module.id} className="animate-tree-grow">
                    <Component />
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <TierUpgradeCard currentTier="Community" usage={sampleUsage} />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Active Members</span>
                    <Badge variant="outline">847</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Resolved Disputes</span>
                    <Badge className="bg-green-100 text-green-800">23</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Cultural Events</span>
                    <Badge className="bg-purple-100 text-purple-800">12</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">AI Insights</span>
                    <Badge className="bg-blue-100 text-blue-800">5 New</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Platform Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Status</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Sync</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI Services</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-ochre-200 z-50">
        <div className="grid grid-cols-5 h-16">
          {coreModules.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center h-full space-y-1 ${
                activeTab === item.id
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </nav>

      {/* Mobile padding bottom to avoid nav overlap */}
      <div className="md:hidden h-16"></div>
    </div>
  );
};

export default ClanChainDashboard;
