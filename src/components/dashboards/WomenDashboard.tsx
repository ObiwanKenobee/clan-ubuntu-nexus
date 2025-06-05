
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Phone, Baby, Coins, AlertTriangle, Users, Camera } from 'lucide-react';

export const WomenDashboard = () => {
  const [healthAlerts] = useState([
    { id: 1, type: 'Vaccination', message: 'Baby John vaccination due in 3 days', urgency: 'medium' },
    { id: 2, type: 'Pregnancy', message: 'Antenatal checkup scheduled for Friday', urgency: 'high' },
    { id: 3, type: 'Community', message: 'Flu outbreak reported in Nyanchwa village', urgency: 'low' }
  ]);

  const [familyFund] = useState({
    totalBalance: 45000,
    monthlyContribution: 5000,
    lastExpense: 'School fees - 8000 KSH',
    pendingRequests: 2
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sienna-50 via-background to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-sienna-500 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Family Care Center</h1>
              <p className="text-muted-foreground">Health Guardians • Cultural Stewards • Financial Coordinators</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-sienna-500">Health Keeper</Badge>
            <Badge variant="outline">Family Vault Access</Badge>
            <Badge variant="outline">Memory Guardian</Badge>
          </div>
        </div>

        <Tabs defaultValue="health" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="health">Health & Alerts</TabsTrigger>
            <TabsTrigger value="finance">Family Vault</TabsTrigger>
            <TabsTrigger value="family">Family Records</TabsTrigger>
            <TabsTrigger value="support">Support & Safety</TabsTrigger>
          </TabsList>

          <TabsContent value="health" className="space-y-6">
            {/* Health Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <span>Health Alerts & Reminders</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {healthAlerts.map(alert => (
                    <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                      alert.urgency === 'high' ? 'border-red-500 bg-red-50' :
                      alert.urgency === 'medium' ? 'border-orange-500 bg-orange-50' :
                      'border-blue-500 bg-blue-50'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge variant="outline" className="mb-2">{alert.type}</Badge>
                          <p className="font-medium">{alert.message}</p>
                        </div>
                        <Button size="sm">
                          {alert.urgency === 'high' ? 'Urgent' : 'Review'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Health Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Health Management Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Baby className="w-6 h-6" />
                    <span className="text-sm">Pregnancy Care</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Heart className="w-6 h-6" />
                    <span className="text-sm">Child Health</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Phone className="w-6 h-6" />
                    <span className="text-sm">Call Clinic</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <AlertTriangle className="w-6 h-6" />
                    <span className="text-sm">Emergency</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finance" className="space-y-6">
            {/* Family Vault Overview */}
            <Card className="bg-gradient-to-r from-sienna-100 to-orange-100 border-sienna-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">Family Vault Balance</h3>
                    <p className="text-3xl font-bold text-sienna-600">{familyFund.totalBalance.toLocaleString()} KSH</p>
                    <p className="text-sm text-muted-foreground">Monthly contribution: {familyFund.monthlyContribution.toLocaleString()} KSH</p>
                  </div>
                  <div className="text-right">
                    <Coins className="w-12 h-12 text-sienna-500 mb-2" />
                    <Badge>{familyFund.pendingRequests} pending requests</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Family Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">School fees - Mary</p>
                      <p className="text-sm text-muted-foreground">Education expense</p>
                    </div>
                    <span className="font-bold text-red-600">-8,000 KSH</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Medical checkup</p>
                      <p className="text-sm text-muted-foreground">Health expense</p>
                    </div>
                    <span className="font-bold text-red-600">-2,500 KSH</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <div>
                      <p className="font-medium">Monthly contribution</p>
                      <p className="text-sm text-muted-foreground">Family savings</p>
                    </div>
                    <span className="font-bold text-green-600">+5,000 KSH</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Family Vault Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-16">Request Education Support</Button>
                  <Button variant="outline" className="h-16">Add Medical Expense</Button>
                  <Button variant="outline" className="h-16">View Contribution History</Button>
                  <Button variant="outline" className="h-16">Emergency Fund Access</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="family" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Family Tree Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Baby className="w-6 h-6" />
                    <span>Add New Birth</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Heart className="w-6 h-6" />
                    <span>Record Marriage</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Users className="w-6 h-6" />
                    <span>Update Family Info</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cultural Memory Contributions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-16 flex flex-col items-center justify-center space-y-2">
                    <Camera className="w-6 h-6" />
                    <span>Record Family Story</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
                    <Heart className="w-6 h-6" />
                    <span>Share Wisdom</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-red-500" />
                  <span>Support & Safety Channels</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2">Emergency Support</h4>
                    <p className="text-sm text-red-700 mb-3">
                      Safe and confidential reporting channel with council oversight
                    </p>
                    <Button className="bg-red-600 hover:bg-red-700">Access Safe Channel</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-16">
                      Connect with Elder Council
                    </Button>
                    <Button variant="outline" className="h-16">
                      Women's Support Group
                    </Button>
                    <Button variant="outline" className="h-16">
                      Health Support Line
                    </Button>
                    <Button variant="outline" className="h-16">
                      Educational Guidance
                    </Button>
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
