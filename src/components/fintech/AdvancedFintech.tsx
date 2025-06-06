
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Smartphone, TrendingUp, DollarSign, PiggyBank, Zap } from 'lucide-react';
import { ResponsiveGrid, ResponsiveContainer } from '@/components/ui/responsive-layout';
import { useResponsive } from '@/hooks/use-responsive';

export const AdvancedFintech: React.FC = () => {
  const { isMobile } = useResponsive();
  const [selectedService, setSelectedService] = useState('microfinance');

  const financialServices = [
    {
      id: 'microfinance',
      title: 'AI Microfinance',
      description: 'Smart lending circles with cultural risk assessment',
      icon: PiggyBank,
      stats: { active: '247 loans', volume: '$45,670' }
    },
    {
      id: 'mobile',
      title: 'Mobile Payments',
      description: 'Multi-currency support with USSD integration',
      icon: Smartphone,
      stats: { transactions: '12,847', volume: '$234,500' }
    },
    {
      id: 'investment',
      title: 'Community Investment',
      description: 'Collective investment pools and diaspora remittances',
      icon: TrendingUp,
      stats: { pools: '8 active', returns: '12.4% avg' }
    },
    {
      id: 'savings',
      title: 'Digital Savings',
      description: 'Goal-based savings with cultural milestones',
      icon: DollarSign,
      stats: { savers: '892', total: '$178,900' }
    }
  ];

  const lendingCircles = [
    {
      name: 'Women Traders Circle',
      members: 12,
      contribution: '$50',
      nextPayout: 'Mary Nyong\'o',
      status: 'active',
      trustScore: 94
    },
    {
      name: 'Youth Entrepreneurs',
      members: 8,
      contribution: '$25',
      nextPayout: 'James Mwangi',
      status: 'active',
      trustScore: 87
    },
    {
      name: 'Farmers Collective',
      members: 15,
      contribution: '$75',
      nextPayout: 'Grace Wanjiku',
      status: 'active',
      trustScore: 98
    }
  ];

  const investments = [
    {
      name: 'Solar Energy Project',
      invested: '$5,000',
      returns: '+18.2%',
      duration: '6 months',
      risk: 'Medium'
    },
    {
      name: 'Agricultural Tech',
      invested: '$3,200',
      returns: '+24.7%',
      duration: '1 year',
      risk: 'High'
    },
    {
      name: 'Education Infrastructure',
      invested: '$2,800',
      returns: '+9.4%',
      duration: '2 years',
      risk: 'Low'
    }
  ];

  return (
    <ResponsiveContainer maxWidth="full" className="py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center space-x-2">
          <CreditCard className="w-6 h-6 text-primary" />
          <span>Advanced FinTech Services</span>
        </h2>
        <p className="text-muted-foreground">
          Culturally-aware financial technology for community prosperity
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} mb-6`}>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="lending">Lending</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="investment">Investment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ResponsiveGrid cols={{ mobile: 1, tablet: 2, desktop: 2 }} gap={6} className="mb-6">
            {financialServices.map((service) => (
              <Card key={service.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <service.icon className="w-6 h-6 text-primary" />
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {Object.entries(service.stats).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="capitalize">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </ResponsiveGrid>

          <Card>
            <CardHeader>
              <CardTitle>Financial Health Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveGrid cols={{ mobile: 2, tablet: 4, desktop: 4 }} gap={4}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">$12,847</div>
                  <div className="text-sm text-muted-foreground">Total Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">$5,200</div>
                  <div className="text-sm text-muted-foreground">Active Loans</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">$8,950</div>
                  <div className="text-sm text-muted-foreground">Investments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">847</div>
                  <div className="text-sm text-muted-foreground">Credit Score</div>
                </div>
              </ResponsiveGrid>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lending">
          <ResponsiveGrid cols={{ mobile: 1, tablet: 1, desktop: 2 }} gap={6}>
            <Card>
              <CardHeader>
                <CardTitle>Active Lending Circles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lendingCircles.map((circle, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{circle.name}</h4>
                        <Badge variant={circle.status === 'active' ? 'default' : 'secondary'}>
                          {circle.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Members: </span>
                          <span className="font-medium">{circle.members}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Monthly: </span>
                          <span className="font-medium">{circle.contribution}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Next Payout: </span>
                          <span className="font-medium">{circle.nextPayout}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Trust Score: </span>
                          <span className="font-medium text-green-600">{circle.trustScore}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4">
                  <PiggyBank className="w-4 h-4 mr-2" />
                  Join New Circle
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Loan Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2">Loan Recommendation</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Based on your financial profile, you qualify for a $500 business loan at 8.5% APR
                    </p>
                    <Button size="sm">Apply Now</Button>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="loan-amount">Loan Amount</Label>
                    <Input id="loan-amount" placeholder="Enter amount" />
                    
                    <Label htmlFor="loan-purpose">Purpose</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Business Expansion</option>
                      <option>Education</option>
                      <option>Agricultural Investment</option>
                      <option>Emergency</option>
                    </select>
                    
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm font-medium text-green-800">
                        Estimated Monthly Payment: $52
                      </div>
                      <div className="text-xs text-green-600">
                        Interest Rate: 8.5% APR • Term: 12 months
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      Submit Loan Application
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ResponsiveGrid>
        </TabsContent>

        <TabsContent value="payments">
          <ResponsiveGrid cols={{ mobile: 1, tablet: 2, desktop: 3 }} gap={6}>
            <Card>
              <CardHeader>
                <CardTitle>Quick Transfer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="recipient">Recipient</Label>
                    <Input id="recipient" placeholder="Phone number or name" />
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" placeholder="0.00" />
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>USD</option>
                      <option>KES</option>
                      <option>UGX</option>
                      <option>TZS</option>
                    </select>
                  </div>
                  <Button className="w-full">
                    <Zap className="w-4 h-4 mr-2" />
                    Send Money
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Mary Wanjiku</div>
                      <div className="text-xs text-muted-foreground">2 hours ago</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">+$25</div>
                      <div className="text-xs text-muted-foreground">Received</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-sm">School Fees</div>
                      <div className="text-xs text-muted-foreground">Yesterday</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-red-600">-$120</div>
                      <div className="text-xs text-muted-foreground">Payment</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Lending Circle</div>
                      <div className="text-xs text-muted-foreground">3 days ago</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-blue-600">$50</div>
                      <div className="text-xs text-muted-foreground">Contribution</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium text-sm">M-Pesa</div>
                        <div className="text-xs text-muted-foreground">+254 7XX XXX 847</div>
                      </div>
                    </div>
                    <Badge variant="default">Primary</Badge>
                  </div>
                  
                  <div className="p-3 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-sm">Bank Account</div>
                        <div className="text-xs text-muted-foreground">****4729</div>
                      </div>
                    </div>
                    <Badge variant="outline">Backup</Badge>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ResponsiveGrid>
        </TabsContent>

        <TabsContent value="investment">
          <ResponsiveGrid cols={{ mobile: 1, tablet: 2, desktop: 2 }} gap={6}>
            <Card>
              <CardHeader>
                <CardTitle>Investment Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investments.map((investment, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{investment.name}</h4>
                        <Badge variant={investment.risk === 'Low' ? 'default' : investment.risk === 'Medium' ? 'secondary' : 'destructive'}>
                          {investment.risk} Risk
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Invested: </span>
                          <span className="font-medium">{investment.invested}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Returns: </span>
                          <span className="font-medium text-green-600">{investment.returns}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Duration: </span>
                          <span className="font-medium">{investment.duration}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status: </span>
                          <span className="font-medium">Active</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investment Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium mb-2">Community Solar Farm</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Invest in renewable energy infrastructure for the local community
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div>Min Investment: $100</div>
                      <div>Expected Return: 15-20%</div>
                      <div>Duration: 18 months</div>
                      <div>Risk Level: Medium</div>
                    </div>
                    <Button size="sm" className="w-full">Invest Now</Button>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2">Youth Tech Training</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Fund digital skills training program with guaranteed social impact
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div>Min Investment: $50</div>
                      <div>Expected Return: 8-12%</div>
                      <div>Duration: 12 months</div>
                      <div>Risk Level: Low</div>
                    </div>
                    <Button size="sm" className="w-full">Invest Now</Button>
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
