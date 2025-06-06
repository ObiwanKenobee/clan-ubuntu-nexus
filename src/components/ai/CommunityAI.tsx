
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, TrendingUp, AlertTriangle, Users, Zap, Target } from 'lucide-react';
import { ResponsiveGrid, ResponsiveContainer } from '@/components/ui/responsive-layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useResponsive } from '@/hooks/use-responsive';

export const CommunityAI: React.FC = () => {
  const { translate } = useLanguage();
  const { isMobile } = useResponsive();
  const [insights, setInsights] = useState({
    communityHealth: 92,
    economicTrend: 'positive',
    conflictRisk: 'low',
    suggestions: []
  });

  const aiInsights = [
    {
      type: 'economic',
      title: 'Microfinance Opportunity',
      description: 'AI detected 23 youth ready for group lending circles',
      confidence: 87,
      impact: 'high',
      icon: TrendingUp
    },
    {
      type: 'social',
      title: 'Elder Engagement Drop',
      description: 'Council participation down 15% - suggest cultural events',
      confidence: 94,
      impact: 'medium',
      icon: Users
    },
    {
      type: 'security',
      title: 'Identity Verification Alert',
      description: 'Unusual login patterns detected from diaspora members',
      confidence: 76,
      impact: 'high',
      icon: AlertTriangle
    }
  ];

  const predictiveMetrics = [
    { label: 'Community Cohesion', value: 92, trend: '+5%' },
    { label: 'Economic Growth', value: 78, trend: '+12%' },
    { label: 'Youth Retention', value: 85, trend: '+8%' },
    { label: 'Knowledge Transfer', value: 71, trend: '+3%' }
  ];

  return (
    <ResponsiveContainer maxWidth="full" className="py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center space-x-2">
          <Brain className="w-6 h-6 text-primary" />
          <span>Community AI Intelligence</span>
        </h2>
        <p className="text-muted-foreground">
          Advanced analytics and predictive insights for community governance
        </p>
      </div>

      <Tabs defaultValue="insights" className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} mb-6`}>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="insights">
          <ResponsiveGrid cols={{ mobile: 1, tablet: 2, desktop: 3 }} gap={6}>
            {aiInsights.map((insight, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <insight.icon className="w-5 h-5 text-primary" />
                    <Badge variant={insight.impact === 'high' ? 'destructive' : 'secondary'}>
                      {insight.confidence}% confident
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{insight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {insight.description}
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                    <Button size="sm">
                      Act Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </ResponsiveGrid>
        </TabsContent>

        <TabsContent value="predictions">
          <ResponsiveGrid cols={{ mobile: 1, tablet: 2, desktop: 2 }} gap={6}>
            <Card>
              <CardHeader>
                <CardTitle>Community Health Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {predictiveMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{metric.label}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${metric.value}%` }}
                          />
                        </div>
                        <span className="text-sm text-green-600">{metric.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-sm">Youth Skills Training</h4>
                    <p className="text-xs text-muted-foreground">
                      Launch digital literacy program for 45 youth members
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-sm">Elder Wisdom Archive</h4>
                    <p className="text-xs text-muted-foreground">
                      Record 12 elder stories before seasonal migration
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-sm">Conflict Mediation</h4>
                    <p className="text-xs text-muted-foreground">
                      Address land dispute before escalation (72h window)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ResponsiveGrid>
        </TabsContent>

        <TabsContent value="automation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Automated Community Functions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveGrid cols={{ mobile: 1, tablet: 2, desktop: 3 }} gap={4}>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Smart Dispute Resolution</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    AI-mediated conflict resolution with cultural protocols
                  </p>
                  <Badge variant="outline">Active</Badge>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Automatic Trust Scoring</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Dynamic reputation updates based on community actions
                  </p>
                  <Badge variant="outline">Active</Badge>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Ritual Reminders</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Cultural calendar with personalized notifications
                  </p>
                  <Badge variant="outline">Active</Badge>
                </div>
              </ResponsiveGrid>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <ResponsiveGrid cols={{ mobile: 1, tablet: 1, desktop: 2 }} gap={6}>
            <Card>
              <CardHeader>
                <CardTitle>Community Sentiment Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Overall Sentiment</span>
                    <Badge className="bg-green-500">Positive (87%)</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '87%' }} />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="text-green-600 font-medium">72%</div>
                      <div className="text-muted-foreground">Positive</div>
                    </div>
                    <div className="text-center">
                      <div className="text-yellow-600 font-medium">20%</div>
                      <div className="text-muted-foreground">Neutral</div>
                    </div>
                    <div className="text-center">
                      <div className="text-red-600 font-medium">8%</div>
                      <div className="text-muted-foreground">Negative</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Predictive Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm">Economic Stability</span>
                    <Badge variant="outline" className="bg-green-100">Low Risk</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm">Social Cohesion</span>
                    <Badge variant="outline" className="bg-yellow-100">Medium Risk</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm">Resource Access</span>
                    <Badge variant="outline" className="bg-green-100">Low Risk</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ResponsiveGrid>
        </TabsContent>
      </Tabs>
    </ResponsiveContainer>
  );
};
