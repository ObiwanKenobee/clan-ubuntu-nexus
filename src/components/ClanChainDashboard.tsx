
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
import { Home, Coins, Leaf, Globe, User } from 'lucide-react';

const ClanChainDashboard = () => {
  const [activeTab, setActiveTab] = useState('clan-tree');

  const navigationItems = [
    { id: 'clan-tree', icon: Home, label: 'Clan Tree' },
    { id: 'vault', icon: Coins, label: 'Vault' },
    { id: 'growth', icon: Leaf, label: 'Growth' },
    { id: 'community', icon: Globe, label: 'Community' },
    { id: 'memory', icon: User, label: 'Memory' },
  ];

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
          <TabsList className="hidden md:grid w-full grid-cols-5 mb-6 bg-white/60 backdrop-blur-sm">
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

          <TabsContent value="clan-tree" className="animate-tree-grow">
            <ClanIDBuilder />
          </TabsContent>

          <TabsContent value="vault" className="animate-tree-grow">
            <ClanVaultPanel />
          </TabsContent>

          <TabsContent value="growth" className="animate-tree-grow">
            <YouthGrowthTracker />
          </TabsContent>

          <TabsContent value="community" className="animate-tree-grow">
            <CommunityPulseDashboard />
          </TabsContent>

          <TabsContent value="memory" className="animate-tree-grow">
            <CulturalMemoryWall />
          </TabsContent>
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
