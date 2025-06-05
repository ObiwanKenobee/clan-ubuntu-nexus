
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ServiceRequest {
  id: string;
  title: string;
  category: 'water' | 'health' | 'education' | 'infrastructure' | 'security';
  description: string;
  priority: 'low' | 'medium' | 'high' | 'emergency';
  status: 'submitted' | 'under_review' | 'approved' | 'in_progress' | 'completed' | 'rejected';
  submittedBy: string;
  dateSubmitted: string;
  estimatedCost: number;
  beneficiaries: number;
  responses: { organization: string; message: string; date: string }[];
}

interface BudgetSimulation {
  scenario: string;
  currentBudget: number;
  proposedIncrease: number;
  expectedOutcome: string;
  beneficiaryClans: string[];
  impact: 'high' | 'medium' | 'low';
}

export const CivicConnector = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([
    {
      id: '1',
      title: 'Clean Water Borehole - Mosocho Village',
      category: 'water',
      description: 'Community needs access to clean water. Current source is 3km away and often contaminated during rainy season.',
      priority: 'high',
      status: 'in_progress',
      submittedBy: 'Abagusii Clan Council',
      dateSubmitted: '2024-01-10',
      estimatedCost: 450000,
      beneficiaries: 150,
      responses: [
        { organization: 'Kisii County Water Dept', message: 'Request approved. Drilling scheduled for February.', date: '2024-01-15' },
        { organization: 'World Vision', message: 'We can provide 30% co-funding.', date: '2024-01-12' }
      ]
    },
    {
      id: '2',
      title: 'Mobile Health Clinic Schedule',
      category: 'health',
      description: 'Request monthly mobile clinic visits for maternal health and immunizations.',
      priority: 'medium',
      status: 'approved',
      submittedBy: 'Elder Council',
      dateSubmitted: '2024-01-05',
      estimatedCost: 80000,
      beneficiaries: 200,
      responses: [
        { organization: 'Ministry of Health', message: 'Approved for quarterly visits starting March.', date: '2024-01-18' }
      ]
    }
  ]);

  const [simulations] = useState<BudgetSimulation[]>([
    {
      scenario: '3x Health Funding for Abagusii Clans',
      currentBudget: 500000,
      proposedIncrease: 1500000,
      expectedOutcome: 'Reduce infant mortality by 40%, increase immunization coverage to 95%',
      beneficiaryClans: ['Nyakundi', 'Ongeri', 'Bosire', 'Moindi'],
      impact: 'high'
    },
    {
      scenario: 'Education Infrastructure Investment',
      currentBudget: 800000,
      proposedIncrease: 2400000,
      expectedOutcome: 'Build 2 new classrooms, provide digital learning tools',
      beneficiaryClans: ['All registered clans in Keroka Ward'],
      impact: 'high'
    }
  ]);

  const getCategoryIcon = (category: ServiceRequest['category']) => {
    const icons = {
      water: '💧',
      health: '🏥',
      education: '🎓',
      infrastructure: '🛤️',
      security: '🛡️'
    };
    return icons[category];
  };

  const getPriorityColor = (priority: ServiceRequest['priority']) => {
    const colors = {
      low: 'bg-green-500',
      medium: 'bg-orange-500',
      high: 'bg-red-500',
      emergency: 'bg-red-700'
    };
    return colors[priority];
  };

  const getStatusColor = (status: ServiceRequest['status']) => {
    const colors = {
      submitted: 'bg-blue-500',
      under_review: 'bg-yellow-500',
      approved: 'bg-emerald-500',
      in_progress: 'bg-orange-500',
      completed: 'bg-green-600',
      rejected: 'bg-red-500'
    };
    return colors[status];
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/60 backdrop-blur-sm border-ochre-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-2xl">🏛️</span>
            <span>Civic Connector</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Connect with government services, NGOs, and municipal authorities
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="requests" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6 bg-white/60">
              <TabsTrigger value="requests">Service Requests</TabsTrigger>
              <TabsTrigger value="tracking">Progress Tracking</TabsTrigger>
              <TabsTrigger value="ngo">NGO Portal</TabsTrigger>
              <TabsTrigger value="budget">Budget Simulations</TabsTrigger>
            </TabsList>

            <TabsContent value="requests">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Community Service Requests</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Submit New Request</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Submit Service Request</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Request Title</Label>
                          <Input id="title" placeholder="Brief description of service needed" />
                        </div>
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select service category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="water">Water & Sanitation</SelectItem>
                              <SelectItem value="health">Health Services</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="infrastructure">Infrastructure</SelectItem>
                              <SelectItem value="security">Security</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="priority">Priority Level</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="emergency">Emergency</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="description">Detailed Description</Label>
                          <Textarea 
                            id="description" 
                            placeholder="Provide detailed information about the service request, location, and urgency"
                            rows={4}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="beneficiaries">Number of Beneficiaries</Label>
                            <Input id="beneficiaries" type="number" placeholder="Estimated people affected" />
                          </div>
                          <div>
                            <Label htmlFor="cost">Estimated Cost (KSh)</Label>
                            <Input id="cost" type="number" placeholder="Approximate budget needed" />
                          </div>
                        </div>
                        <Button className="w-full">Submit Request to Authorities</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid gap-4">
                  {requests.map(request => (
                    <Card key={request.id} className="bg-white/80 border-l-4 border-l-blue-500">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{getCategoryIcon(request.category)}</span>
                            <div>
                              <h4 className="font-semibold">{request.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                Submitted by {request.submittedBy} on {request.dateSubmitted}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Badge className={`${getPriorityColor(request.priority)} text-white`}>
                              {request.priority}
                            </Badge>
                            <Badge className={`${getStatusColor(request.status)} text-white`}>
                              {request.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">{request.description}</p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Estimated Cost</p>
                            <p className="text-sm font-medium">KSh {request.estimatedCost.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Beneficiaries</p>
                            <p className="text-sm font-medium">{request.beneficiaries} people</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Responses</p>
                            <p className="text-sm font-medium">{request.responses.length} organizations</p>
                          </div>
                        </div>

                        {request.responses.length > 0 && (
                          <div className="space-y-2 mb-3">
                            <h5 className="text-sm font-medium">Recent Responses:</h5>
                            {request.responses.slice(0, 2).map((response, index) => (
                              <div key={index} className="p-2 bg-emerald-50 border border-emerald-200 rounded text-sm">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium">{response.organization}</p>
                                    <p className="text-muted-foreground">{response.message}</p>
                                  </div>
                                  <span className="text-xs text-muted-foreground">{response.date}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">View Details</Button>
                          <Button size="sm" variant="outline">Upload Documents</Button>
                          <Button size="sm" variant="outline">Contact Officials</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tracking">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Request Progress Tracking</h3>
                
                <div className="grid gap-4">
                  <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-4">📊 Request Status Overview</h4>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-blue-600">3</div>
                          <div className="text-sm text-muted-foreground">Submitted</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-yellow-600">2</div>
                          <div className="text-sm text-muted-foreground">Under Review</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-emerald-600">4</div>
                          <div className="text-sm text-muted-foreground">Approved</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-orange-600">2</div>
                          <div className="text-sm text-muted-foreground">In Progress</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">8</div>
                          <div className="text-sm text-muted-foreground">Completed</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80">
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Updates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 border-l-4 border-emerald-500 bg-emerald-50">
                          <p className="text-sm font-medium">Borehole Project - Mosocho</p>
                          <p className="text-xs text-muted-foreground">
                            Drilling equipment arrived on site. Expected completion: March 15
                          </p>
                          <span className="text-xs text-emerald-600">Updated 2 hours ago</span>
                        </div>
                        <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                          <p className="text-sm font-medium">Mobile Health Clinic</p>
                          <p className="text-xs text-muted-foreground">
                            First visit scheduled for February 20. Immunization supplies confirmed.
                          </p>
                          <span className="text-xs text-blue-600">Updated 1 day ago</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ngo">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">NGO & Partner Portal</h3>
                
                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-4">🤝 Active Partnerships</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white rounded border">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            WV
                          </div>
                          <div>
                            <h5 className="font-semibold">World Vision Kenya</h5>
                            <p className="text-sm text-muted-foreground">Water & Education Partner</p>
                          </div>
                        </div>
                        <div className="text-sm space-y-1">
                          <p><strong>Active Projects:</strong> 3</p>
                          <p><strong>Total Funding:</strong> KSh 2.4M</p>
                          <p><strong>Next Meeting:</strong> Feb 25, 2024</p>
                        </div>
                        <Button size="sm" className="mt-3 w-full" variant="outline">Contact Partner</Button>
                      </div>

                      <div className="p-4 bg-white rounded border">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                            MH
                          </div>
                          <div>
                            <h5 className="font-semibold">Ministry of Health</h5>
                            <p className="text-sm text-muted-foreground">Healthcare Services</p>
                          </div>
                        </div>
                        <div className="text-sm space-y-1">
                          <p><strong>Active Programs:</strong> 2</p>
                          <p><strong>Service Coverage:</strong> 95%</p>
                          <p><strong>Last Visit:</strong> Jan 18, 2024</p>
                        </div>
                        <Button size="sm" className="mt-3 w-full" variant="outline">View Programs</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80">
                  <CardHeader>
                    <CardTitle className="text-lg">Partnership Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 border border-dashed border-gray-300 rounded">
                        <h5 className="font-medium">Youth Skills Development Program</h5>
                        <p className="text-sm text-muted-foreground">
                          USAID seeking local partners for vocational training initiative
                        </p>
                        <div className="flex space-x-2 mt-2">
                          <Badge variant="outline">Education</Badge>
                          <Badge variant="outline">Youth Development</Badge>
                        </div>
                        <Button size="sm" className="mt-2">Express Interest</Button>
                      </div>
                      <div className="p-3 border border-dashed border-gray-300 rounded">
                        <h5 className="font-medium">Climate-Smart Agriculture</h5>
                        <p className="text-sm text-muted-foreground">
                          GIZ offering training and equipment for sustainable farming practices
                        </p>
                        <div className="flex space-x-2 mt-2">
                          <Badge variant="outline">Agriculture</Badge>
                          <Badge variant="outline">Environment</Badge>
                        </div>
                        <Button size="sm" className="mt-2">Learn More</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="budget">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Pre-Budget Impact Simulations</h3>
                
                <Card className="bg-gradient-to-r from-ochre-50 to-emerald-50 border-ochre-200">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-4">🧮 "What If" Budget Modeling</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Simulate the impact of increased government funding on clan welfare and development outcomes.
                    </p>
                    
                    <div className="space-y-4">
                      {simulations.map((sim, index) => (
                        <div key={index} className="p-4 bg-white rounded border">
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="font-semibold">{sim.scenario}</h5>
                            <Badge className={`${
                              sim.impact === 'high' ? 'bg-emerald-500' :
                              sim.impact === 'medium' ? 'bg-orange-500' : 'bg-gray-500'
                            } text-white`}>
                              {sim.impact} impact
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Current Budget</p>
                              <p className="text-lg font-bold">KSh {sim.currentBudget.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Proposed Budget</p>
                              <p className="text-lg font-bold text-emerald-600">
                                KSh {(sim.currentBudget + sim.proposedIncrease).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <p className="text-sm font-medium">Expected Outcome:</p>
                            <p className="text-sm text-muted-foreground">{sim.expectedOutcome}</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {sim.beneficiaryClans.map((clan, i) => (
                              <Badge key={i} variant="outline" className="text-xs">{clan}</Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full mt-4">Generate Custom Simulation</Button>
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
