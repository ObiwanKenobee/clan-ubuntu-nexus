
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
import { Home, Coins, Leaf, Globe, User, LogIn, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const ClanChainDashboard = () => {
  const [activeTab, setActiveTab] = useState('clan-tree');

  const navigationItems = [
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

  const allModules = [...navigationItems, ...advancedModules];

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
                <p className="text-sm text-muted-foreground">Abagusii Family Network</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link to="/auth">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <LogIn className="w-4 h-4" />
                  <span>AEGIS Login</span>
                </Button>
              </Link>
              <Link to="/super-tech">
                <Button size="sm" className="flex items-center space-x-2 bg-gradient-to-r from-primary to-accent">
                  <Zap className="w-4 h-4" />
                  <span>Super-Tech</span>
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <TabsList className="grid w-full grid-cols-5 mb-4 bg-white/60 backdrop-blur-sm">
              {navigationItems.map((item) => (
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

            {/* Advanced Modules */}
            <TabsList className="grid w-full grid-cols-4 mb-6 bg-white/60 backdrop-blur-sm">
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

          {/* Mobile Navigation Tabs */}
          <div className="md:hidden mb-6">
            <TabsList className="grid w-full grid-cols-3 mb-4 bg-white/60 backdrop-blur-sm">
              <TabsTrigger value="clan-tree">Core</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="governance">Governance</TabsTrigger>
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
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-ochre-200 z-50">
        <div className="grid grid-cols-5 h-16">
          {navigationItems.map((item) => (
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
