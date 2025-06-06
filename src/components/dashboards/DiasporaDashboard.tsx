import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Coins, Video, Vote, Users, Heart, BookOpen, TrendingUp } from 'lucide-react';
import { TierUpgradeCard } from '@/components/business/TierUpgradeCard';
import { BusinessModelProvider } from '@/contexts/BusinessModelContext';
import { CulturalAdaptations } from '@/components/cultural/CulturalAdaptations';
import { VoiceInterface } from '@/components/voice/VoiceInterface';
import { useLanguage } from '@/contexts/LanguageContext';

export const DiasporaDashboard = () => {
  const { translate } = useLanguage();
  const [clanUpdates] = useState([
    { type: 'Education', title: '5 students received bursaries this month', time: '2 days ago', impact: 'high' },
    { type: 'Health', title: 'New clinic opened in Nyanchwa', time: '1 week ago', impact: 'medium' },
    { type: 'Celebration', title: 'John Onderi graduation ceremony', time: '2 weeks ago', impact: 'low' }
  ]);

  const [investmentOpportunities] = useState([
    { title: 'Nyanchwa Solar Clinic Project', amount: 150000, raised: 75000, supporters: 23 },
    { title: 'Secondary School Computer Lab', amount: 100000, raised: 45000, supporters: 15 },
    { title: 'Women\'s Cooperative Expansion', amount: 80000, raised: 30000, supporters: 12 }
  ]);

  const handleVoiceCommand = (command: string, language: string) => {
    console.log('Diaspora voice command:', command, language);
    // Process diaspora-specific voice commands for remote participation
  };

  return (
    <BusinessModelProvider>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{translate('diaspora_bridge')}</h1>
                <p className="text-muted-foreground">Global Connector • Remote Supporter • Cultural Bridge</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-primary">Global Connector</Badge>
              <Badge variant="outline">Remote Supporter</Badge>
              <Badge variant="outline">Qatar Branch</Badge>
            </div>
          </div>

          {/* Cultural & Voice Integration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <CulturalAdaptations archetype="diaspora" />
            <VoiceInterface
              mode="command"
              title="Remote Participation Voice"
              onVoiceCommand={handleVoiceCommand}
            />
          </div>

          {/* Business Model Integration */}
          <div className="mb-6">
            <TierUpgradeCard archetype="Diaspora Network" />
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="updates">Clan Updates</TabsTrigger>
              <TabsTrigger value="support">Support Family</TabsTrigger>
              <TabsTrigger value="participate">Participate</TabsTrigger>
              <TabsTrigger value="invest">Invest & Vote</TabsTrigger>
              <TabsTrigger value="business">Sponsorship Model</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Clan Health Dashboard */}
              <Card className="bg-gradient-to-r from-primary-100 to-blue-100 border-primary-200">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Your Branch Performance</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">2nd</div>
                      <p className="text-sm text-muted-foreground">Education Ranking</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">89%</div>
                      <p className="text-sm text-muted-foreground">Youth Active</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-ochre-600">156</div>
                      <p className="text-sm text-muted-foreground">Family Members</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-sienna-600">12</div>
                      <p className="text-sm text-muted-foreground">Recent Births</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Clan Updates */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span>Recent Clan Milestones</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clanUpdates.map((update, index) => (
                      <div key={index} className={`p-4 rounded-lg border-l-4 ${
                        update.impact === 'high' ? 'border-green-500 bg-green-50' :
                        update.impact === 'medium' ? 'border-blue-500 bg-blue-50' :
                        'border-gray-500 bg-gray-50'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge variant="outline" className="mb-2">{update.type}</Badge>
                            <p className="font-medium">{update.title}</p>
                            <p className="text-sm text-muted-foreground">{update.time}</p>
                          </div>
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="updates" className="space-y-6">
              {/* Clan Health Dashboard */}
              <Card className="bg-gradient-to-r from-primary-100 to-blue-100 border-primary-200">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Your Branch Performance</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">2nd</div>
                      <p className="text-sm text-muted-foreground">Education Ranking</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">89%</div>
                      <p className="text-sm text-muted-foreground">Youth Active</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-ochre-600">156</div>
                      <p className="text-sm text-muted-foreground">Family Members</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-sienna-600">12</div>
                      <p className="text-sm text-muted-foreground">Recent Births</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Clan Updates */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span>Recent Clan Milestones</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clanUpdates.map((update, index) => (
                      <div key={index} className={`p-4 rounded-lg border-l-4 ${
                        update.impact === 'high' ? 'border-green-500 bg-green-50' :
                        update.impact === 'medium' ? 'border-blue-500 bg-blue-50' :
                        'border-gray-500 bg-gray-50'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge variant="outline" className="mb-2">{update.type}</Badge>
                            <p className="font-medium">{update.title}</p>
                            <p className="text-sm text-muted-foreground">{update.time}</p>
                          </div>
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="support" className="space-y-6">
              {/* Support Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span>Support Your Family</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button className="h-24 flex flex-col items-center justify-center space-y-2">
                      <BookOpen className="w-6 h-6" />
                      <span>Education Fund</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
                      <Heart className="w-6 h-6" />
                      <span>Health Support</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
                      <Users className="w-6 h-6" />
                      <span>Emergency Aid</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
                      <Coins className="w-6 h-6" />
                      <span>General Vault</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Contributions */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Recent Contributions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded border-l-4 border-green-500">
                      <div>
                        <p className="font-medium">Education support for 3 students</p>
                        <p className="text-sm text-muted-foreground">Monthly recurring donation</p>
                      </div>
                      <span className="font-bold text-green-600">15,000 KSH</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                      <div>
                        <p className="font-medium">Clinic medicine fund</p>
                        <p className="text-sm text-muted-foreground">One-time donation</p>
                      </div>
                      <span className="font-bold text-blue-600">8,000 KSH</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="participate" className="space-y-6">
              {/* Live Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Video className="w-5 h-5 text-purple-500" />
                    <span>Live Clan Events</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Monthly Clan Council Meeting</h4>
                          <p className="text-sm text-muted-foreground">Discussing youth education initiatives</p>
                          <Badge className="mt-2 bg-purple-500">Live in 2 hours</Badge>
                        </div>
                        <Button>Join Stream</Button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Elder Mary's Remembrance Ceremony</h4>
                          <p className="text-sm text-muted-foreground">Celebrating her contributions to education</p>
                          <Badge variant="outline" className="mt-2">Tomorrow 3 PM</Badge>
                        </div>
                        <Button variant="outline">Set Reminder</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mentorship */}
              <Card>
                <CardHeader>
                  <CardTitle>Mentorship Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button className="h-20 flex flex-col items-center justify-center space-y-2">
                      <Users className="w-6 h-6" />
                      <span>Mentor Youth Members</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                      <BookOpen className="w-6 h-6" />
                      <span>Career Guidance Sessions</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="invest" className="space-y-6">
              {/* Investment Opportunities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Vote className="w-5 h-5 text-ochre-500" />
                    <span>Community Investment Projects</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {investmentOpportunities.map((project, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h4 className="font-medium">{project.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {project.raised.toLocaleString()} / {project.amount.toLocaleString()} KSH raised
                            </p>
                            <p className="text-xs text-muted-foreground">{project.supporters} diaspora supporters</p>
                          </div>
                          <div className="text-right">
                            <Badge className="mb-2">
                              {Math.round((project.raised / project.amount) * 100)}% funded
                            </Badge>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(project.raised / project.amount) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm">Invest & Vote</Button>
                          <Button size="sm" variant="outline">Learn More</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Voting Panel */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Diaspora Votes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Vote className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No active votes requiring diaspora input</p>
                    <Button className="mt-4" variant="outline">View Past Decisions</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="business" className="space-y-6">
              {/* Diaspora Sponsorship Impact */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Sponsorship Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-4 bg-primary-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">$2,340</div>
                      <p className="text-sm text-muted-foreground">Total Contributed</p>
                    </div>
                    <div className="text-center p-4 bg-emerald-50 rounded-lg">
                      <div className="text-2xl font-bold text-emerald-600">23</div>
                      <p className="text-sm text-muted-foreground">Students Supported</p>
                    </div>
                    <div className="text-center p-4 bg-ochre-50 rounded-lg">
                      <div className="text-2xl font-bold text-ochre-600">5</div>
                      <p className="text-sm text-muted-foreground">Projects Funded</p>
                    </div>
                    <div className="text-center p-4 bg-sienna-50 rounded-lg">
                      <div className="text-2xl font-bold text-sienna-600">89%</div>
                      <p className="text-sm text-muted-foreground">Impact Score</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Source for Clan */}
              <Card>
                <CardHeader>
                  <CardTitle>Diaspora Revenue Model</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-primary-100 to-blue-100 rounded-lg">
                      <h4 className="font-medium mb-2">Monthly Clan Support Plan</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Your recurring support helps maintain clan digital infrastructure
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Current Plan:</span> Federation Tier
                        </div>
                        <div>
                          <span className="font-medium">Monthly Cost:</span> $25 (shared)
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium mb-1">Family Dashboard Maintenance</h5>
                        <p className="text-sm text-muted-foreground">$15/month</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium mb-1">Remote Dispute Arbitration</h5>
                        <p className="text-sm text-muted-foreground">$10/month</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium mb-1">Shared Cloud Tree Access</h5>
                        <p className="text-sm text-muted-foreground">$8/month</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium mb-1">Live Ritual Streaming</h5>
                        <p className="text-sm text-muted-foreground">$12/month</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Global Network Growth */}
              <Card>
                <CardHeader>
                  <CardTitle>Global Network Expansion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded">
                      <div>
                        <p className="font-medium">Invite Diaspora Cousins</p>
                        <p className="text-sm text-muted-foreground">Expand global support network</p>
                      </div>
                      <Button size="sm">Send Invites</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-primary-50 rounded">
                      <div>
                        <p className="font-medium">Sponsor New Clan Onboarding</p>
                        <p className="text-sm text-muted-foreground">Help other clans join platform</p>
                      </div>
                      <Button size="sm" variant="outline">Sponsor</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </BusinessModelProvider>
  );
};
