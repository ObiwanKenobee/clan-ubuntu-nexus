
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SavingGroup {
  id: string;
  name: string;
  purpose: string;
  currentAmount: number;
  targetAmount: number;
  contributors: number;
  icon: string;
  color: string;
  urgency: 'low' | 'medium' | 'high';
  recentActivity: string;
}

interface ClanToken {
  id: string;
  memberName: string;
  action: string;
  tokensEarned: number;
  timestamp: string;
  verified: boolean;
}

const savingGroups: SavingGroup[] = [
  {
    id: '1',
    name: 'Education Fund',
    purpose: 'School fees and university bursaries',
    currentAmount: 125000,
    targetAmount: 200000,
    contributors: 12,
    icon: '🎓',
    color: 'emerald',
    urgency: 'high',
    recentActivity: 'James Moindi tuition payment due'
  },
  {
    id: '2',
    name: 'Health & Medical',
    purpose: 'Medical emergencies and elder care',
    currentAmount: 89000,
    targetAmount: 150000,
    contributors: 18,
    icon: '🏥',
    color: 'blue',
    urgency: 'medium',
    recentActivity: 'Mama Grace check-up completed'
  },
  {
    id: '3',
    name: 'Funeral & Burial',
    purpose: 'End of life ceremonies and support',
    currentAmount: 67000,
    targetAmount: 100000,
    contributors: 22,
    icon: '🕊️',
    color: 'purple',
    urgency: 'low',
    recentActivity: 'Monthly contribution received'
  },
  {
    id: '4',
    name: 'Land & Court',
    purpose: 'Legal matters and land documentation',
    currentAmount: 45000,
    targetAmount: 80000,
    contributors: 8,
    icon: '⚖️',
    color: 'orange',
    urgency: 'medium',
    recentActivity: 'Land survey documents filed'
  }
];

const recentTokens: ClanToken[] = [
  {
    id: '1',
    memberName: 'James Moindi',
    action: 'Helped elder with shopping',
    tokensEarned: 5,
    timestamp: '2 hours ago',
    verified: true
  },
  {
    id: '2',
    memberName: 'Mary Bosire',
    action: 'Tutored younger cousin in Math',
    tokensEarned: 8,
    timestamp: '5 hours ago',
    verified: true
  },
  {
    id: '3',
    memberName: 'Peter Nyakundi',
    action: 'Attended clan meeting',
    tokensEarned: 3,
    timestamp: '1 day ago',
    verified: false
  }
];

export const ClanVaultPanel = () => {
  const [selectedGroup, setSelectedGroup] = useState<SavingGroup | null>(null);

  const getUrgencyColor = (urgency: SavingGroup['urgency']) => {
    switch (urgency) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-orange-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getProgressColor = (group: SavingGroup) => {
    const percentage = (group.currentAmount / group.targetAmount) * 100;
    if (percentage >= 80) return 'bg-emerald-500';
    if (percentage >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const SavingGroupCard = ({ group }: { group: SavingGroup }) => {
    const percentage = (group.currentAmount / group.targetAmount) * 100;
    
    return (
      <Card 
        className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm hover:scale-105"
        onClick={() => setSelectedGroup(group)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{group.icon}</span>
              <div>
                <CardTitle className="text-lg">{group.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{group.purpose}</p>
              </div>
            </div>
            <Badge className={getUrgencyColor(group.urgency)}>
              {group.urgency}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{percentage.toFixed(0)}%</span>
            </div>
            <Progress value={percentage} className="h-3" />
            <div className="flex justify-between text-sm">
              <span className="font-semibold">KSh {group.currentAmount.toLocaleString()}</span>
              <span className="text-muted-foreground">of KSh {group.targetAmount.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{group.contributors} contributors</span>
              <span className="text-xs text-emerald-600">{group.recentActivity}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const ClanTokensList = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center space-x-2">
        <span>🪙</span>
        <span>Recent ClanToken Activity</span>
      </h3>
      <div className="space-y-3">
        {recentTokens.map(token => (
          <div key={token.id} className="flex items-center justify-between p-4 bg-white rounded-lg border-l-4 border-emerald-500">
            <div>
              <p className="font-medium">{token.memberName}</p>
              <p className="text-sm text-muted-foreground">{token.action}</p>
              <p className="text-xs text-muted-foreground">{token.timestamp}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-emerald-600">+{token.tokensEarned} 🪙</p>
              {token.verified ? (
                <Badge className="bg-emerald-100 text-emerald-800">Verified</Badge>
              ) : (
                <Badge variant="outline">Pending</Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card className="bg-white/60 backdrop-blur-sm border-ochre-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-2xl">🏦</span>
            <span>Clan Vault</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Community savings, microfinance, and clan-based economic cooperation
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="savings" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/60">
              <TabsTrigger value="savings">Saving Groups</TabsTrigger>
              <TabsTrigger value="tokens">ClanTokens</TabsTrigger>
              <TabsTrigger value="credit">Credit</TabsTrigger>
            </TabsList>

            <TabsContent value="savings" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savingGroups.map(group => (
                  <SavingGroupCard key={group.id} group={group} />
                ))}
              </div>

              {/* Total Overview */}
              <Card className="bg-gradient-to-r from-emerald-50 to-ochre-50 border-emerald-200">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-emerald-600">
                        KSh {savingGroups.reduce((sum, group) => sum + group.currentAmount, 0).toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">Total Saved</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-ochre-600">
                        {savingGroups.reduce((sum, group) => sum + group.contributors, 0)}
                      </p>
                      <p className="text-sm text-muted-foreground">Active Contributors</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-sienna-600">4</p>
                      <p className="text-sm text-muted-foreground">Saving Groups</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-emerald-600">78%</p>
                      <p className="text-sm text-muted-foreground">Avg. Progress</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tokens">
              <ClanTokensList />
            </TabsContent>

            <TabsContent value="credit">
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-4">🌳 Ethics-Based Credit</h3>
                <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-lg">
                  <p className="text-lg font-medium">Your Trust Score: 850/1000</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Credit limit increases as your contributions to family and community grow
                  </p>
                  <div className="mt-4 space-y-2">
                    <Progress value={85} className="h-3" />
                    <p className="text-sm">Available Credit: KSh 25,000</p>
                  </div>
                  <Button className="mt-4" variant="outline">
                    Apply for Microloan
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
