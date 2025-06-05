
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DiasporaMember {
  id: string;
  name: string;
  location: string;
  country: string;
  profession: string;
  lastContribution: string;
  totalContributions: number;
  participationScore: number;
  remittanceMatching: boolean;
  mentorshipActive: boolean;
}

interface LiveEvent {
  id: string;
  title: string;
  type: 'funeral' | 'wedding' | 'meeting' | 'ceremony';
  date: string;
  time: string;
  attendees: number;
  streamUrl?: string;
  status: 'upcoming' | 'live' | 'ended';
}

export const DiasporaBridgeModule = () => {
  const [diasporaMembers] = useState<DiasporaMember[]>([
    {
      id: '1',
      name: 'Dr. Sarah Bosire',
      location: 'London, UK',
      country: 'United Kingdom',
      profession: 'Surgeon',
      lastContribution: '2024-01-10',
      totalContributions: 85000,
      participationScore: 92,
      remittanceMatching: true,
      mentorshipActive: true
    },
    {
      id: '2',
      name: 'Engineer Paul Nyakundi',
      location: 'Boston, USA',
      country: 'United States',
      profession: 'Software Engineer',
      lastContribution: '2024-01-05',
      totalContributions: 120000,
      participationScore: 88,
      remittanceMatching: true,
      mentorshipActive: false
    },
    {
      id: '3',
      name: 'Teacher Mary Kemunto',
      location: 'Nairobi, Kenya',
      country: 'Kenya',
      profession: 'University Lecturer',
      lastContribution: '2024-01-15',
      totalContributions: 45000,
      participationScore: 95,
      remittanceMatching: false,
      mentorshipActive: true
    }
  ]);

  const [liveEvents] = useState<LiveEvent[]>([
    {
      id: '1',
      title: 'Mama Grace 80th Birthday Celebration',
      type: 'ceremony',
      date: '2024-01-20',
      time: '14:00 EAT',
      attendees: 45,
      streamUrl: 'https://meet.clan-chain.co/mama-grace-80',
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Monthly Clan Council Meeting',
      type: 'meeting',
      date: '2024-01-25',
      time: '19:00 EAT',
      attendees: 23,
      streamUrl: 'https://meet.clan-chain.co/council-jan-24',
      status: 'upcoming'
    }
  ]);

  const getCountryFlag = (country: string) => {
    const flags: { [key: string]: string } = {
      'United Kingdom': '🇬🇧',
      'United States': '🇺🇸',
      'Kenya': '🇰🇪',
      'Canada': '🇨🇦',
      'Australia': '🇦🇺'
    };
    return flags[country] || '🌍';
  };

  const getEventIcon = (type: LiveEvent['type']) => {
    const icons = {
      funeral: '🕊️',
      wedding: '💒',
      meeting: '🤝',
      ceremony: '🎉'
    };
    return icons[type];
  };

  const getParticipationColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 80) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/60 backdrop-blur-sm border-ochre-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-2xl">🌍</span>
            <span>Diaspora Bridge</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Connect, engage, and support clan members across the globe
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="members" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6 bg-white/60">
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="events">Live Events</TabsTrigger>
              <TabsTrigger value="remittance">Remittance</TabsTrigger>
              <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
            </TabsList>

            <TabsContent value="members">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Global Clan Network</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Register Diaspora Member</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Register New Diaspora Member</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" placeholder="Enter full name" />
                        </div>
                        <div>
                          <Label htmlFor="location">City, Country</Label>
                          <Input id="location" placeholder="e.g., Toronto, Canada" />
                        </div>
                        <div>
                          <Label htmlFor="profession">Profession</Label>
                          <Input id="profession" placeholder="Occupation or field" />
                        </div>
                        <div>
                          <Label htmlFor="relationship">Clan Relationship</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select relationship" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="child">Child of clan member</SelectItem>
                              <SelectItem value="spouse">Spouse of clan member</SelectItem>
                              <SelectItem value="sibling">Sibling</SelectItem>
                              <SelectItem value="cousin">Cousin</SelectItem>
                              <SelectItem value="other">Other relative</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full">Register & Send Invitation</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid gap-4">
                  {diasporaMembers.map(member => (
                    <Card key={member.id} className="hover:shadow-md transition-all bg-white/80">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{getCountryFlag(member.country)}</span>
                            <div>
                              <h4 className="font-semibold">{member.name}</h4>
                              <p className="text-sm text-muted-foreground">{member.profession}</p>
                              <p className="text-sm text-muted-foreground">{member.location}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-bold ${getParticipationColor(member.participationScore)}`}>
                              {member.participationScore}%
                            </div>
                            <div className="text-xs text-muted-foreground">Participation</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Total Contributions</p>
                            <p className="text-sm font-medium">KSh {member.totalContributions.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Last Contribution</p>
                            <p className="text-sm font-medium">{member.lastContribution}</p>
                          </div>
                        </div>

                        <div className="flex space-x-2 mb-3">
                          {member.remittanceMatching && (
                            <Badge className="bg-emerald-500 text-white">Remittance Matching</Badge>
                          )}
                          {member.mentorshipActive && (
                            <Badge className="bg-blue-500 text-white">Active Mentor</Badge>
                          )}
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Video Call</Button>
                          <Button size="sm" variant="outline">Send Message</Button>
                          <Button size="sm" variant="outline">View Profile</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Global Statistics */}
                <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-4">Global Clan Presence</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-emerald-600">17</div>
                        <div className="text-sm text-muted-foreground">Countries</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">89</div>
                        <div className="text-sm text-muted-foreground">Diaspora Members</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-ochre-600">KSh 2.4M</div>
                        <div className="text-sm text-muted-foreground">Total Remittances</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-sienna-600">92%</div>
                        <div className="text-sm text-muted-foreground">Avg. Engagement</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="events">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Live Events & Ceremonies</h3>
                <div className="space-y-3">
                  {liveEvents.map(event => (
                    <Card key={event.id} className="bg-white/80 border-l-4 border-l-blue-500">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{getEventIcon(event.type)}</span>
                            <div>
                              <h4 className="font-semibold">{event.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {event.date} at {event.time}
                              </p>
                            </div>
                          </div>
                          <Badge variant={event.status === 'live' ? 'default' : 'secondary'}>
                            {event.status}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-muted-foreground">
                            {event.attendees} attendees registered
                          </span>
                          {event.status === 'live' && (
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                              <span className="text-sm text-red-600 font-medium">LIVE</span>
                            </div>
                          )}
                        </div>

                        <div className="flex space-x-2">
                          {event.status === 'live' && (
                            <Button size="sm" className="bg-red-500 hover:bg-red-600">
                              Join Live Stream
                            </Button>
                          )}
                          {event.status === 'upcoming' && (
                            <>
                              <Button size="sm">RSVP</Button>
                              <Button size="sm" variant="outline">Add to Calendar</Button>
                            </>
                          )}
                          <Button size="sm" variant="outline">Share</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-4">🎥 Virtual Participation Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-3xl mb-2">📹</div>
                        <p className="text-sm font-medium">HD Video Streaming</p>
                        <p className="text-xs text-muted-foreground">Multi-angle ceremony views</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-2">💬</div>
                        <p className="text-sm font-medium">Live Chat</p>
                        <p className="text-xs text-muted-foreground">Real-time family interaction</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-2">🎁</div>
                        <p className="text-sm font-medium">Virtual Gifts</p>
                        <p className="text-xs text-muted-foreground">Digital contributions during events</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="remittance">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Remittance & Matching Program</h3>
                
                <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-4">💰 Diaspora Tax Credit System</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium mb-2">How It Works</h5>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Send money home through ClanChain</li>
                          <li>• Earn tax-deductible credits in your country</li>
                          <li>• Automatic matching for education/health funds</li>
                          <li>• Verified impact reports for tax filing</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Benefits</h5>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Up to 25% tax credit on contributions</li>
                          <li>• 2x matching for education bursaries</li>
                          <li>• Priority access to emergency funds</li>
                          <li>• Quarterly impact reports</li>
                        </ul>
                      </div>
                    </div>
                    <Button className="w-full mt-4">Set Up Automatic Remittance</Button>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-white/80">
                    <CardHeader>
                      <CardTitle className="text-lg">This Month's Matching</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Education Fund</span>
                          <span className="font-medium">KSh 45,000 + KSh 22,500 match</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Health Emergency</span>
                          <span className="font-medium">KSh 30,000 + KSh 15,000 match</span>
                        </div>
                        <div className="border-t pt-2">
                          <div className="flex justify-between font-semibold">
                            <span>Total Impact</span>
                            <span>KSh 112,500</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80">
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Send</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <Button size="sm" variant="outline">Emergency Fund</Button>
                          <Button size="sm" variant="outline">Education</Button>
                          <Button size="sm" variant="outline">Health Care</Button>
                          <Button size="sm" variant="outline">Custom Amount</Button>
                        </div>
                        <Button className="w-full">Send Money Home</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mentorship">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Global Mentorship Network</h3>
                
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-4">🎓 AI-Guided Mentorship Matching</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Connect diaspora professionals with home-based youth for career guidance, 
                      scholarship opportunities, and skills development.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-2">Active Mentorships</h5>
                        <div className="space-y-2">
                          <div className="p-3 bg-white rounded border">
                            <p className="text-sm font-medium">Dr. Sarah → James Moindi</p>
                            <p className="text-xs text-muted-foreground">Medical school preparation</p>
                          </div>
                          <div className="p-3 bg-white rounded border">
                            <p className="text-sm font-medium">Engineer Paul → Mary Kemunto</p>
                            <p className="text-xs text-muted-foreground">Software development basics</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">Mentorship Opportunities</h5>
                        <div className="space-y-2">
                          <div className="p-3 bg-emerald-50 rounded border border-emerald-200">
                            <p className="text-sm font-medium">Business Studies Student</p>
                            <p className="text-xs text-muted-foreground">Seeking accounting mentor</p>
                            <Button size="sm" className="mt-2">Offer Mentorship</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-white/80 text-center">
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-blue-600">24</div>
                      <div className="text-sm text-muted-foreground">Active Mentorships</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 text-center">
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-emerald-600">89%</div>
                      <div className="text-sm text-muted-foreground">Success Rate</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 text-center">
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-ochre-600">12</div>
                      <div className="text-sm text-muted-foreground">Scholarships Secured</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
