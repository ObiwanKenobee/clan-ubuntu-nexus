
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, 
  Plane, 
  DollarSign, 
  Video, 
  Heart, 
  Users,
  MapPin,
  Calendar
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export const DiasporaDashboard = () => {
  const { user } = useAuth();
  const { translate } = useLanguage();

  const connectionMetrics = [
    { label: 'Remittances Sent', value: '$2,340', icon: DollarSign, color: 'text-green-600' },
    { label: 'Family Connections', value: 47, icon: Users, color: 'text-blue-600' },
    { label: 'Virtual Events', value: 12, icon: Video, color: 'text-purple-600' },
    { label: 'Days Since Visit', value: 243, icon: Calendar, color: 'text-orange-600' },
  ];

  const upcomingEvents = [
    { title: 'Virtual Family Reunion', date: 'Dec 25', time: '3:00 PM EAT', type: 'Family' },
    { title: 'Diaspora Investment Talk', date: 'Jan 15', time: '7:00 PM GMT', type: 'Business' },
    { title: 'Cultural Heritage Night', date: 'Feb 2', time: '6:00 PM EST', type: 'Culture' },
  ];

  const remittanceHistory = [
    { recipient: 'Mother - Mary Nyong\'o', amount: '$200', date: 'Dec 1', purpose: 'Monthly Support' },
    { recipient: 'Education Fund', amount: '$500', date: 'Nov 15', purpose: 'School Fees' },
    { recipient: 'Community Project', amount: '$150', date: 'Nov 1', purpose: 'Water Well' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{translate('diaspora_bridge')}</h1>
              <p className="text-muted-foreground">Welcome back, {user?.name}</p>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Toronto, Canada</span>
                <span>•</span>
                <span>GMT-5</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge className="bg-blue-100 text-blue-800">Global Connector</Badge>
            <p className="text-sm text-muted-foreground mt-1">Online</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-6">
        {/* Connection Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {connectionMetrics.map((metric, index) => (
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

        <Tabs defaultValue="family" className="space-y-4">
          <TabsList>
            <TabsTrigger value="family">Family Connection</TabsTrigger>
            <TabsTrigger value="remittances">Remittances</TabsTrigger>
            <TabsTrigger value="events">Virtual Events</TabsTrigger>
            <TabsTrigger value="investment">Investment</TabsTrigger>
          </TabsList>

          <TabsContent value="family" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Video className="w-5 h-5" />
                    <span>Live Family Feed</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                          MN
                        </div>
                        <div>
                          <h4 className="font-medium text-green-800">Mom is online</h4>
                          <p className="text-sm text-green-700">Available for video call</p>
                        </div>
                      </div>
                      <Button size="sm" className="mt-2">
                        <Video className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">Recent Family Updates</h4>
                      <p className="text-sm text-muted-foreground">Sister graduated from university</p>
                      <p className="text-sm text-muted-foreground">Uncle's farm had great harvest</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Upcoming Events</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {event.date} at {event.time} • {event.type}
                        </p>
                        <Button size="sm" className="mt-2" variant="outline">Join Event</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="remittances" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5" />
                    <span>Send Money Home</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-800">Quick Send</h4>
                      <p className="text-sm text-blue-700">To saved recipients</p>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full">Send to Family</Button>
                      <Button variant="outline" className="w-full">Send to Community Project</Button>
                      <Button variant="outline" className="w-full">Education Fund</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {remittanceHistory.map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{transaction.recipient}</h4>
                          <p className="text-xs text-muted-foreground">{transaction.purpose}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{transaction.amount}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Video className="w-5 h-5" />
                  <span>Virtual Community Center</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Live Streams</h4>
                    <p className="text-sm text-muted-foreground">Community events happening now</p>
                    <Button size="sm" className="mt-2">Join Live Stream</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Cultural Workshops</h4>
                    <p className="text-sm text-muted-foreground">Learn traditional practices</p>
                    <Button size="sm" className="mt-2" variant="outline">Browse Workshops</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Youth Mentorship</h4>
                    <p className="text-sm text-muted-foreground">Guide the next generation</p>
                    <Button size="sm" className="mt-2" variant="outline">Become Mentor</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Investment Circles</h4>
                    <p className="text-sm text-muted-foreground">Collaborative funding</p>
                    <Button size="sm" className="mt-2" variant="outline">Join Circle</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investment" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Plane className="w-5 h-5" />
                    <span>Investment Opportunities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">Agricultural Cooperative</h4>
                      <p className="text-sm text-muted-foreground">Expected ROI: 12% annually</p>
                      <Button size="sm" className="mt-2" variant="outline">Learn More</Button>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">Tech Startup Fund</h4>
                      <p className="text-sm text-muted-foreground">Supporting local innovation</p>
                      <Button size="sm" className="mt-2" variant="outline">Invest</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5" />
                    <span>Community Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-800">Your Impact</h4>
                      <p className="text-sm text-green-700">5 families supported this year</p>
                      <p className="text-sm text-green-700">2 students sponsored</p>
                    </div>
                    <Button className="w-full">View Impact Report</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
