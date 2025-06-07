
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  BookOpen, 
  Users, 
  Target, 
  TrendingUp, 
  Award,
  Lightbulb,
  Globe
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export const YouthDashboard = () => {
  const { user } = useAuth();
  const { translate } = useLanguage();

  const skillProgress = [
    { name: 'Digital Literacy', progress: 75, color: 'bg-blue-500' },
    { name: 'Leadership', progress: 60, color: 'bg-green-500' },
    { name: 'Financial Planning', progress: 45, color: 'bg-purple-500' },
    { name: 'Cultural Knowledge', progress: 80, color: 'bg-orange-500' },
  ];

  const opportunities = [
    { title: 'Tech Scholarship Program', deadline: '2 weeks', type: 'Education', status: 'open' },
    { title: 'Youth Leadership Summit', deadline: '1 month', type: 'Leadership', status: 'applying' },
    { title: 'Microfinance Training', deadline: '3 days', type: 'Finance', status: 'open' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-background to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-emerald-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{translate('youth_growth')}</h1>
              <p className="text-muted-foreground">Welcome, {user?.name}</p>
            </div>
          </div>
          <Badge className="bg-emerald-100 text-emerald-800">Rising Leader</Badge>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-6">
        {/* Achievement Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Skills Completed</p>
                  <p className="text-2xl font-bold">12/20</p>
                </div>
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Community Impact</p>
                  <p className="text-2xl font-bold">47 pts</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mentorship Hours</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="skills" className="space-y-4">
          <TabsList>
            <TabsTrigger value="skills">Skill Development</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="skills" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Your Learning Journey</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillProgress.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span>{skill.progress}%</span>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                  </div>
                ))}
                <Button className="w-full mt-4">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Continue Learning
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5" />
                  <span>Available Opportunities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {opportunities.map((opp, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{opp.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Deadline: {opp.deadline} • {opp.type}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={opp.status === 'open' ? 'default' : 'secondary'}>
                          {opp.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          {opp.status === 'open' ? 'Apply' : 'View'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mentorship" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Mentorship Network</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Your Mentor</h4>
                    <p className="text-sm text-muted-foreground">Elder Nyong'o</p>
                    <p className="text-xs text-muted-foreground">Business & Leadership</p>
                    <Button size="sm" className="mt-2">Schedule Meeting</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">You're Mentoring</h4>
                    <p className="text-sm text-muted-foreground">3 younger members</p>
                    <Button size="sm" className="mt-2" variant="outline">View Mentees</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Community Projects</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Digital Village Initiative</h4>
                    <p className="text-sm text-muted-foreground">
                      Bringing internet access to rural communities
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <Progress value={65} className="flex-1 mr-4" />
                      <span className="text-sm">65%</span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Youth Business Incubator</h4>
                    <p className="text-sm text-muted-foreground">
                      Supporting young entrepreneurs
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <Progress value={30} className="flex-1 mr-4" />
                      <span className="text-sm">30%</span>
                    </div>
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
