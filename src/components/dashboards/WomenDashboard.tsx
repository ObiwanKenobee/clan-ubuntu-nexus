
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Users, 
  Banknote, 
  BookOpen, 
  Shield, 
  Crown,
  Baby,
  Stethoscope
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export const WomenDashboard = () => {
  const { user } = useAuth();
  const { translate } = useLanguage();

  const healthMetrics = [
    { label: 'Health Checkups', value: '85%', icon: Stethoscope, color: 'text-pink-600' },
    { label: 'Economic Groups', value: 12, icon: Users, color: 'text-purple-600' },
    { label: 'Children Supported', value: 43, icon: Baby, color: 'text-blue-600' },
    { label: 'Leadership Roles', value: 8, icon: Crown, color: 'text-yellow-600' },
  ];

  const economicGroups = [
    { name: 'Ekerubo Women Group', members: 25, focus: 'Savings & Credit', status: 'active' },
    { name: 'Mama Mboga Collective', members: 18, focus: 'Market Trading', status: 'active' },
    { name: 'Nyaboke Tailors', members: 12, focus: 'Fashion & Design', status: 'growing' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-background to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-pink-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{translate('family_care')}</h1>
              <p className="text-muted-foreground">Welcome, {user?.name}</p>
            </div>
          </div>
          <Badge className="bg-pink-100 text-pink-800">Community Mother</Badge>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthMetrics.map((metric, index) => (
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

        <Tabs defaultValue="health" className="space-y-4">
          <TabsList>
            <TabsTrigger value="health">Health & Wellness</TabsTrigger>
            <TabsTrigger value="economic">Economic Groups</TabsTrigger>
            <TabsTrigger value="children">Child Welfare</TabsTrigger>
            <TabsTrigger value="leadership">Leadership</TabsTrigger>
          </TabsList>

          <TabsContent value="health" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Stethoscope className="w-5 h-5" />
                    <span>Community Health</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-800">Maternal Health Program</h4>
                      <p className="text-sm text-green-700">Next clinic: Thursday 9 AM</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-800">Nutrition Workshop</h4>
                      <p className="text-sm text-blue-700">Saturday 2 PM - Community Center</p>
                    </div>
                    <Button className="w-full">View All Health Programs</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>Traditional Medicine</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">Herbal Remedies Archive</h4>
                      <p className="text-sm text-muted-foreground">Traditional healing knowledge</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">Elder Healers Network</h4>
                      <p className="text-sm text-muted-foreground">Connect with traditional doctors</p>
                    </div>
                    <Button variant="outline" className="w-full">Access Archive</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="economic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Banknote className="w-5 h-5" />
                  <span>Women's Economic Groups</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {economicGroups.map((group, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{group.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {group.members} members • {group.focus}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={group.status === 'active' ? 'default' : 'secondary'}>
                          {group.status}
                        </Badge>
                        <Button size="sm" variant="outline">Join</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4">Create New Group</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="children" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Baby className="w-5 h-5" />
                    <span>Child Development</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">Early Education Program</h4>
                      <p className="text-sm text-muted-foreground">Ages 3-6 preparation</p>
                      <Button size="sm" className="mt-2">Enroll Child</Button>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">Nutrition Support</h4>
                      <p className="text-sm text-muted-foreground">Monthly food supplements</p>
                      <Button size="sm" className="mt-2" variant="outline">Apply</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Child Protection</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                      <h4 className="font-medium text-red-800">Emergency Contact</h4>
                      <p className="text-sm text-red-700">24/7 child protection hotline</p>
                      <Button size="sm" className="mt-2" variant="destructive">Contact Now</Button>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">Safety Education</h4>
                      <p className="text-sm text-muted-foreground">Teaching children about safety</p>
                      <Button size="sm" className="mt-2" variant="outline">Learn More</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="leadership" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Crown className="w-5 h-5" />
                  <span>Women's Leadership Council</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-800">Leadership Training</h4>
                    <p className="text-sm text-purple-700">Develop your leadership skills</p>
                    <Button size="sm" className="mt-2">Join Program</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">Mentorship Circle</h4>
                      <p className="text-sm text-muted-foreground">Connect with other leaders</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">Community Advocacy</h4>
                      <p className="text-sm text-muted-foreground">Voice for women's rights</p>
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
