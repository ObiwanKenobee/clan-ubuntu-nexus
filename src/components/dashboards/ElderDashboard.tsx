
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Gavel, Users, Mic, FileText, AlertCircle } from 'lucide-react';

export const ElderDashboard = () => {
  const [pendingVotes, setPendingVotes] = useState([
    { id: 1, type: 'Youth Task', title: 'Approve Maria\'s school support', urgency: 'high' },
    { id: 2, type: 'Ethics Rule', title: 'New grazing land protocol', urgency: 'medium' },
    { id: 3, type: 'Override Request', title: 'Emergency medical fund access', urgency: 'high' }
  ]);

  const recentChanges = [
    { type: 'Rule Added', title: 'Water sharing protocol updated', time: '2 hours ago' },
    { type: 'Dispute Resolved', title: 'Land boundary case #34', time: '1 day ago' },
    { type: 'Youth Progress', title: '5 tasks completed this week', time: '2 days ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ochre-50 via-background to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-ochre-500 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Elder Council Dashboard</h1>
              <p className="text-muted-foreground">Governance • Ethics • Dispute Resolution</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="elder-badge">Council Authority</Badge>
            <Badge variant="outline">Override Permissions</Badge>
            <Badge variant="outline">Voice Authentication</Badge>
          </div>
        </div>

        <Tabs defaultValue="governance" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="governance">Governance</TabsTrigger>
            <TabsTrigger value="ethics">Ethics & Rules</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
            <TabsTrigger value="memory">Cultural Memory</TabsTrigger>
          </TabsList>

          <TabsContent value="governance" className="space-y-6">
            {/* Pending Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  <span>Pending Council Actions ({pendingVotes.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingVotes.map(vote => (
                    <div key={vote.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={vote.urgency === 'high' ? 'destructive' : 'default'}>
                            {vote.type}
                          </Badge>
                          <span className="font-medium">{vote.title}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Review</Button>
                        <Button size="sm">Vote</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Changes */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Clan Changes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentChanges.map((change, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border-l-4 border-primary bg-primary/5">
                      <div>
                        <p className="font-medium">{change.title}</p>
                        <p className="text-sm text-muted-foreground">{change.type}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{change.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ethics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Ethics Ledger Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="h-24 flex flex-col items-center justify-center space-y-2">
                    <Mic className="w-6 h-6" />
                    <span>Record New Rule (Voice)</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
                    <FileText className="w-6 h-6" />
                    <span>Write Rule (Text)</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
                    <Gavel className="w-6 h-6" />
                    <span>Review Amendments</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
                    <Users className="w-6 h-6" />
                    <span>Council Voting</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disputes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Land & Inheritance Disputes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Gavel className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No active disputes requiring elder intervention</p>
                  <Button className="mt-4">Open Inheritance Simulator</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="memory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cultural Memory Preservation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="h-24 flex flex-col items-center justify-center space-y-2">
                    <Mic className="w-6 h-6" />
                    <span>Record Oral History</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
                    <Users className="w-6 h-6" />
                    <span>Add Ancestor Story</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">23</div>
                <p className="text-sm text-muted-foreground">Active Rules</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">156</div>
                <p className="text-sm text-muted-foreground">Youth Members</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-ochre-600">12</div>
                <p className="text-sm text-muted-foreground">Pending Votes</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-sienna-600">89%</div>
                <p className="text-sm text-muted-foreground">Ethics Compliance</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
