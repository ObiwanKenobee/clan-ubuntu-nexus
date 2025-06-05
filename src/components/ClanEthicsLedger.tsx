
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EthicsRule {
  id: string;
  title: string;
  category: 'education' | 'land' | 'conflict' | 'health' | 'marriage' | 'inheritance';
  description: string;
  elderVotes: { name: string; vote: 'approve' | 'reject'; comment: string; timestamp: string }[];
  status: 'draft' | 'active' | 'superseded' | 'archived';
  createdBy: string;
  amendments: { date: string; change: string; reason: string }[];
  faithAlignment: { christian: boolean; traditional: boolean; muslim: boolean };
}

interface PolicySimulation {
  id: string;
  scenario: string;
  impact: string;
  stakeholders: string[];
  outcome: 'positive' | 'negative' | 'neutral';
}

export const ClanEthicsLedger = () => {
  const [rules, setRules] = useState<EthicsRule[]>([
    {
      id: '1',
      title: 'Land Inheritance Protocol',
      category: 'land',
      description: 'Sons inherit equally, widows retain use rights until remarriage or death',
      elderVotes: [
        { name: 'Mzee Joseph', vote: 'approve', comment: 'Follows traditional wisdom', timestamp: '2024-01-15' },
        { name: 'Mama Grace', vote: 'approve', comment: 'Protects widows properly', timestamp: '2024-01-15' }
      ],
      status: 'active',
      createdBy: 'Elder Council',
      amendments: [],
      faithAlignment: { christian: true, traditional: true, muslim: false }
    },
    {
      id: '2',
      title: 'Education Fund Priority',
      category: 'education',
      description: 'Girls receive equal education funding priority as boys',
      elderVotes: [
        { name: 'Mzee Joseph', vote: 'approve', comment: 'Times have changed for the better', timestamp: '2024-02-01' },
        { name: 'Elder Mary', vote: 'approve', comment: 'Education is for all children', timestamp: '2024-02-01' }
      ],
      status: 'active',
      createdBy: 'Youth Council',
      amendments: [
        { date: '2024-02-15', change: 'Added provision for vocational training', reason: 'Include practical skills' }
      ],
      faithAlignment: { christian: true, traditional: false, muslim: true }
    }
  ]);

  const [simulations] = useState<PolicySimulation[]>([
    {
      id: '1',
      scenario: 'What if we allow daughters to inherit land?',
      impact: 'Increased women empowerment but potential family disputes',
      stakeholders: ['Elders', 'Married daughters', 'Sons', 'Widows'],
      outcome: 'neutral'
    },
    {
      id: '2',
      scenario: 'What if we require youth participation in elder council?',
      impact: 'Fresh perspectives but potential resistance from traditionalists',
      stakeholders: ['Youth', 'Elders', 'Clan unity'],
      outcome: 'positive'
    }
  ]);

  const getCategoryColor = (category: EthicsRule['category']) => {
    const colors = {
      education: 'bg-emerald-500',
      land: 'bg-ochre-500',
      conflict: 'bg-red-500',
      health: 'bg-blue-500',
      marriage: 'bg-purple-500',
      inheritance: 'bg-sienna-500'
    };
    return colors[category];
  };

  const getFaithIcons = (faith: EthicsRule['faithAlignment']) => {
    const icons = [];
    if (faith.christian) icons.push('✝️');
    if (faith.traditional) icons.push('🛕');
    if (faith.muslim) icons.push('☪️');
    return icons.join(' ');
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/60 backdrop-blur-sm border-ochre-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-2xl">📜</span>
            <span>Clan Ethics Ledger</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Digital governance through elder wisdom and community consensus
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="constitution" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6 bg-white/60">
              <TabsTrigger value="constitution">Constitution</TabsTrigger>
              <TabsTrigger value="voting">Elder Voting</TabsTrigger>
              <TabsTrigger value="simulator">Policy Simulator</TabsTrigger>
              <TabsTrigger value="audit">Audit Trail</TabsTrigger>
            </TabsList>

            <TabsContent value="constitution">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Clan Constitution</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Add New Rule</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Ethics Rule</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Rule Title</Label>
                          <Input id="title" placeholder="Enter rule title" />
                        </div>
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="land">Land</SelectItem>
                              <SelectItem value="conflict">Conflict</SelectItem>
                              <SelectItem value="health">Health</SelectItem>
                              <SelectItem value="marriage">Marriage</SelectItem>
                              <SelectItem value="inheritance">Inheritance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" placeholder="Describe the rule in detail" />
                        </div>
                        <div>
                          <Label>Faith Alignment</Label>
                          <div className="flex space-x-4 mt-2">
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" />
                              <span>✝️ Christian</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" />
                              <span>🛕 Traditional</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" />
                              <span>☪️ Muslim</span>
                            </label>
                          </div>
                        </div>
                        <Button className="w-full">Submit for Elder Review</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid gap-4">
                  {rules.map(rule => (
                    <Card key={rule.id} className="bg-white/80 border-l-4 border-l-ochre-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Badge className={`${getCategoryColor(rule.category)} text-white`}>
                              {rule.category}
                            </Badge>
                            <h4 className="font-semibold">{rule.title}</h4>
                            <span className="text-lg">{getFaithIcons(rule.faithAlignment)}</span>
                          </div>
                          <Badge variant={rule.status === 'active' ? 'default' : 'secondary'}>
                            {rule.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">{rule.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-muted-foreground">
                              {rule.elderVotes.length} elder votes
                            </span>
                            {rule.amendments.length > 0 && (
                              <Badge variant="outline" className="text-xs">
                                {rule.amendments.length} amendments
                              </Badge>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="outline">Archive</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="voting">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Elder Council Digital Voting</h3>
                <div className="grid gap-4">
                  {rules.filter(rule => rule.status === 'draft' || rule.elderVotes.length < 3).map(rule => (
                    <Card key={rule.id} className="bg-gradient-to-r from-ochre-50 to-emerald-50">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold">{rule.title}</h4>
                          <Badge>Needs Votes</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{rule.description}</p>
                        <div className="space-y-2">
                          {rule.elderVotes.map((vote, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-white rounded">
                              <span className="text-sm font-medium">{vote.name}</span>
                              <div className="flex items-center space-x-2">
                                <Badge variant={vote.vote === 'approve' ? 'default' : 'destructive'}>
                                  {vote.vote}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{vote.timestamp}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button size="sm" className="bg-emerald-500">Approve</Button>
                          <Button size="sm" variant="destructive">Reject</Button>
                          <Button size="sm" variant="outline">Add Comment</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="simulator">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">AI-Guided Policy Simulator</h3>
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-4">🤖 "What if we..." Scenario Generator</h4>
                    <div className="space-y-3">
                      <Input placeholder="Type a policy scenario (e.g., 'What if we allow remote voting?')" />
                      <Button className="w-full">Run AI Simulation</Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-4">
                  {simulations.map(sim => (
                    <Card key={sim.id} className="bg-white/80">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">{sim.scenario}</h4>
                          <Badge variant={
                            sim.outcome === 'positive' ? 'default' : 
                            sim.outcome === 'negative' ? 'destructive' : 'secondary'
                          }>
                            {sim.outcome}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{sim.impact}</p>
                        <div className="flex flex-wrap gap-2">
                          {sim.stakeholders.map((stakeholder, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {stakeholder}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="audit">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Immutable Audit Trail</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded">
                    <p className="text-sm">
                      <strong>2024-01-15 14:30:</strong> Rule "Land Inheritance Protocol" approved by Elder Council (3/3 votes)
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                    <p className="text-sm">
                      <strong>2024-02-01 09:15:</strong> Amendment proposed for "Education Fund Priority" by Youth Council
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
                    <p className="text-sm">
                      <strong>2024-02-15 16:45:</strong> Amendment approved and rule updated with vocational training provision
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
