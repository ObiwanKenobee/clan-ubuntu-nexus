
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  Users, 
  Heart,
  MessageSquare,
  BarChart3
} from 'lucide-react';

const communityInsights = [
  {
    type: 'trend',
    title: 'Rising Youth Engagement',
    description: 'Youth participation in clan activities has increased by 34% this month',
    impact: 'positive',
    confidence: 87,
    actionable: true
  },
  {
    type: 'concern',
    title: 'Dispute Resolution Backlog',
    description: '12 disputes pending elder review, 3 approaching cultural deadline',
    impact: 'negative',
    confidence: 95,
    actionable: true
  },
  {
    type: 'opportunity',
    title: 'Diaspora Remittance Pattern',
    description: 'Optimal timing identified for diaspora contribution campaigns',
    impact: 'positive',
    confidence: 78,
    actionable: true
  }
];

const aiRecommendations = [
  {
    category: 'Governance',
    title: 'Weekly Elder Circles',
    description: 'Schedule regular elder meetings to address dispute backlog',
    priority: 'high',
    effort: 'medium'
  },
  {
    category: 'Engagement',
    title: 'Youth Mentorship Program',
    description: 'Pair active youth with elders for knowledge transfer',
    priority: 'medium',
    effort: 'low'
  },
  {
    category: 'Finance',
    title: 'Automated Savings Goals',
    description: 'Set up automatic contributions based on seasonal patterns',
    priority: 'low',
    effort: 'low'
  }
];

export const CommunityAI = () => {
  const [activeTab, setActiveTab] = useState('insights');

  const getImpactColor = (impact: string) => {
    return impact === 'positive' ? 'text-green-600' : 'text-red-600';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-primary" />
            <span>Community AI Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="insights">Live Insights</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="analytics">Predictive Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="space-y-4 mt-6">
              {communityInsights.map((insight, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {insight.type === 'trend' && <TrendingUp className="w-4 h-4 text-blue-600" />}
                        {insight.type === 'concern' && <AlertTriangle className="w-4 h-4 text-red-600" />}
                        {insight.type === 'opportunity' && <Lightbulb className="w-4 h-4 text-green-600" />}
                        <h4 className="font-semibold">{insight.title}</h4>
                      </div>
                      <Badge variant="outline">{insight.confidence}% confident</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{insight.description}</p>
                    <div className="flex items-center space-x-2">
                      <Badge className={insight.impact === 'positive' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {insight.impact}
                      </Badge>
                      {insight.actionable && (
                        <Button size="sm" variant="outline">
                          View Actions
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4 mt-6">
              {aiRecommendations.map((rec, index) => (
                <Card key={index}>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{rec.title}</h4>
                        <Badge variant="outline" className="mt-1">{rec.category}</Badge>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge className={getPriorityColor(rec.priority)}>
                          {rec.priority} priority
                        </Badge>
                        <span className="text-xs text-muted-foreground">{rec.effort} effort</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{rec.description}</p>
                    <div className="flex space-x-2">
                      <Button size="sm">Implement</Button>
                      <Button size="sm" variant="outline">Learn More</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <Users className="w-5 h-5" />
                      <span>Engagement Forecast</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Next 30 days</span>
                        <span className="text-green-600">+15% growth</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Peak activity day</span>
                        <span className="font-medium">Saturdays</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Optimal meeting time</span>
                        <span className="font-medium">6-8 PM</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <Heart className="w-5 h-5" />
                      <span>Community Health</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Harmony Index</span>
                        <span className="text-green-600">92/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Knowledge Transfer</span>
                        <span className="text-blue-600">Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Risk Assessment</span>
                        <span className="text-green-600">Low</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
