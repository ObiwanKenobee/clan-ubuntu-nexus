
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Coins, Link, Fingerprint, Globe, Zap } from 'lucide-react';
import { ResponsiveGrid, ResponsiveContainer } from '@/components/ui/responsive-layout';
import { useResponsive } from '@/hooks/use-responsive';

export const BlockchainIntegration: React.FC = () => {
  const { isMobile } = useResponsive();
  const [walletConnected, setWalletConnected] = useState(false);

  const blockchainFeatures = [
    {
      title: 'Digital Identity NFTs',
      description: 'Immutable clan membership certificates',
      status: 'active',
      icon: Fingerprint,
      stats: '1,247 minted'
    },
    {
      title: 'Governance Tokens',
      description: 'Voting power based on community contribution',
      status: 'active',
      icon: Coins,
      stats: '12.4M CLAN tokens'
    },
    {
      title: 'Smart Contracts',
      description: 'Automated cultural protocols and agreements',
      status: 'beta',
      icon: Link,
      stats: '23 contracts deployed'
    },
    {
      title: 'Decentralized Storage',
      description: 'Cultural memories on IPFS network',
      status: 'active',
      icon: Globe,
      stats: '847 GB stored'
    }
  ];

  const transactions = [
    {
      type: 'Identity Verification',
      hash: '0x4a7b...c92f',
      amount: '0.05 CLAN',
      status: 'confirmed',
      timestamp: '2 minutes ago'
    },
    {
      type: 'Governance Vote',
      hash: '0x8e1d...4b6a',
      amount: '100 CLAN',
      status: 'confirmed',
      timestamp: '15 minutes ago'
    },
    {
      type: 'Elder Blessing',
      hash: '0x2c5f...9e8b',
      amount: '10 CLAN',
      status: 'pending',
      timestamp: '1 hour ago'
    }
  ];

  return (
    <ResponsiveContainer maxWidth="full" className="py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center space-x-2">
          <Shield className="w-6 h-6 text-primary" />
          <span>Blockchain Integration</span>
        </h2>
        <p className="text-muted-foreground">
          Decentralized identity, governance, and cultural preservation
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} mb-6`}>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="identity">Identity</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ResponsiveGrid cols={{ mobile: 1, tablet: 2, desktop: 2 }} gap={6} className="mb-6">
            {blockchainFeatures.map((feature, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <feature.icon className="w-5 h-5 text-primary" />
                    <Badge variant={feature.status === 'active' ? 'default' : 'secondary'}>
                      {feature.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    {feature.description}
                  </p>
                  <p className="text-sm font-medium text-primary">
                    {feature.stats}
                  </p>
                </CardContent>
              </Card>
            ))}
          </ResponsiveGrid>

          <Card>
            <CardHeader>
              <CardTitle>Recent Blockchain Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.map((tx, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{tx.type}</div>
                      <div className="text-xs text-muted-foreground">
                        {tx.hash} • {tx.timestamp}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{tx.amount}</div>
                      <Badge 
                        variant={tx.status === 'confirmed' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="identity">
          <ResponsiveGrid cols={{ mobile: 1, tablet: 2, desktop: 3 }} gap={6}>
            <Card>
              <CardHeader>
                <CardTitle>Your Digital Identity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Fingerprint className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-medium">Elder Moindi Nyamongo</h3>
                    <p className="text-sm text-muted-foreground">Clan ID: #4821</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Trust Score</span>
                      <span className="font-medium">847/1000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Governance Weight</span>
                      <span className="font-medium">2.4x</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cultural Tokens</span>
                      <span className="font-medium">1,250 CLAN</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Identity Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Biometric Scan</span>
                    <Badge variant="default">Verified</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Elder Blessing</span>
                    <Badge variant="default">Confirmed</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Community Witness</span>
                    <Badge variant="default">3/3 Confirmed</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ancestral Link</span>
                    <Badge variant="default">Traced 7 Generations</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>NFT Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-square bg-gradient-to-br from-ochre-200 to-ochre-400 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium">Elder Badge</span>
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-emerald-200 to-emerald-400 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium">Wisdom Keeper</span>
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/40 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium">Clan Founder</span>
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-accent/20 to-accent/40 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium">Peace Maker</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ResponsiveGrid>
        </TabsContent>

        <TabsContent value="governance">
          <ResponsiveGrid cols={{ mobile: 1, tablet: 2, desktop: 2 }} gap={6}>
            <Card>
              <CardHeader>
                <CardTitle>Active Proposals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Youth Education Fund</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Allocate 50,000 CLAN tokens for digital literacy training
                    </p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Progress</span>
                      <span className="text-sm font-medium">73% Yes</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '73%' }} />
                    </div>
                    <Button size="sm" className="w-full">Vote Now</Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Cultural Festival 2024</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Approve budget for annual cultural celebration
                    </p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Progress</span>
                      <span className="text-sm font-medium">92% Yes</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }} />
                    </div>
                    <Button size="sm" className="w-full" disabled>Voted</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Voting Power Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Elders Council</span>
                    <span className="text-sm font-medium">40%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-ochre-500 h-2 rounded-full" style={{ width: '40%' }} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Youth</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '25%' }} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Women Circle</span>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-sienna-500 h-2 rounded-full" style={{ width: '20%' }} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Diaspora</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '15%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </ResponsiveGrid>
        </TabsContent>

        <TabsContent value="contracts">
          <Card>
            <CardHeader>
              <CardTitle>Smart Contract Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveGrid cols={{ mobile: 1, tablet: 2, desktop: 3 }} gap={4}>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Marriage Contract</h4>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Automated dowry and ceremony protocols
                  </p>
                  <Button size="sm" variant="outline" className="w-full">View Details</Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Land Rights</h4>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Immutable land ownership and inheritance
                  </p>
                  <Button size="sm" variant="outline" className="w-full">View Details</Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Elder Succession</h4>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Leadership transition protocols
                  </p>
                  <Button size="sm" variant="outline" className="w-full">View Details</Button>
                </div>
              </ResponsiveGrid>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ResponsiveContainer>
  );
};
