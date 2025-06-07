
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Shield, 
  Users, 
  Gavel, 
  BookOpen, 
  TrendingUp, 
  AlertTriangle,
  Crown,
  Heart
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export const ElderDashboard = () => {
  const { user } = useAuth();
  const { translate } = useLanguage();
  const [activeDisputes] = useState(3);
  const [pendingApprovals] = useState(7);

  const elderMetrics = [
    { label: 'Active Disputes', value: activeDisputes, icon: Gavel, color: 'text-red-600' },
    { label: 'Pending Approvals', value: pendingApprovals, icon: Shield, color: 'text-yellow-600' },
    { label: 'Clan Members', value: 127, icon: Users, color: 'text-blue-600' },
    { label: 'Rites This Month', value: 12, icon: Crown, color: 'text-purple-600' },
  ];

  const recentDisputes = [
    { id: 1, type: 'Land Inheritance', parties: ['Nyambura Family', 'Momanyi Clan'], status: 'pending', priority: 'high' },
    { id: 2, type: 'Marriage Custom', parties: ['Kemunto Family'], status: 'review', priority: 'medium' },
    { id: 3, type: 'Debt Resolution', parties: ['Moraa Trading', 'Bosire Farmers'], status: 'mediation', priority: 'low' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ochre-50 via-background to-emerald-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-ochre-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{translate('elder_council')}</h1>
              <p className="text-muted-foreground">Welcome, Elder {user?.name}</p>
            </div>
          </div>
          <Badge className="bg-amber-100 text-amber-800">Council Authority</Badge>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {elderMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                  <metric.icon className={`w-8 h-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="disputes" className="space-y-4">
          <TabsList>
            <TabsTrigger value="disputes">Active Disputes</TabsTrigger>
            <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
            <TabsTrigger value="wisdom">Wisdom Archive</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
          </TabsList>

          <TabsContent value="disputes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gavel className="w-5 h-5" />
                  <span>Dispute Resolution Center</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {recentDisputes.map((dispute) => (
                      <div key={dispute.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{dispute.type}</h4>
                          <p className="text-sm text-muted-foreground">
                            Parties: {dispute.parties.join(', ')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(dispute.priority)}>
                            {dispute.priority}
                          </Badge>
                          <Button size="sm" variant="outline">Review</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approvals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Approval Queue</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Youth Council Formation</h4>
                      <p className="text-sm text-muted-foreground">New leadership structure proposal</p>
                    </div>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline">Approve</Button>
                      <Button size="sm" variant="ghost">Defer</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Vault Allocation Request</h4>
                      <p className="text-sm text-muted-foreground">Education fund distribution: KES 50,000</p>
                    </div>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline">Approve</Button>
                      <Button size="sm" variant="ghost">Review</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wisdom" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Ancestral Wisdom Archive</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-medium text-amber-800">Proverb of the Day</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      "Omogusii bware nyasae enkima" - A Gusii person carries God's blessing
                    </p>
                  </div>
                  <Button className="w-full" variant="outline">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Access Full Wisdom Library
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="governance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Crown className="w-5 h-5" />
                  <span>Governance Dashboard</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Council Meetings</h4>
                    <p className="text-sm text-muted-foreground">Next: Sunday, 2:00 PM</p>
                    <Button size="sm" className="mt-2">Join Virtual Meeting</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Voting Status</h4>
                    <p className="text-sm text-muted-foreground">3 active proposals</p>
                    <Button size="sm" className="mt-2" variant="outline">Review Proposals</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
