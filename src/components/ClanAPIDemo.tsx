
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useClan, useClanMembers } from '@/hooks/useClanData';
import { useDisputes, useCreateDispute } from '@/hooks/useDisputeData';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Shield, Coins, Calendar } from 'lucide-react';

interface ClanAPIDemoProps {
  clanId: string;
}

export const ClanAPIDemo: React.FC<ClanAPIDemoProps> = ({ clanId }) => {
  const { user } = useAuth();
  const { data: clan, isLoading: clanLoading } = useClan(clanId);
  const { data: members, isLoading: membersLoading } = useClanMembers(clanId);
  const { data: disputes, isLoading: disputesLoading } = useDisputes(clanId);
  const createDispute = useCreateDispute();

  const [activeTab, setActiveTab] = useState('overview');

  const handleCreateSampleDispute = () => {
    if (!user) return;

    createDispute.mutate({
      clanId,
      disputeData: {
        clan_id: clanId,
        type: 'inheritance',
        title: 'Land Inheritance Dispute',
        description: 'Disagreement over ancestral land inheritance rights',
        status: 'open',
        submitted_by: user.uid,
        involved_parties: [user.uid],
        testimonies: [],
      },
    });
  };

  if (clanLoading) {
    return <div className="flex items-center justify-center p-8">Loading clan data...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>ClanChain API Integration Demo</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <Users className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
              <div className="text-2xl font-bold">{members?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Members</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Shield className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">{disputes?.data?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Active Disputes</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Coins className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold">KSh 45,000</div>
              <div className="text-sm text-muted-foreground">Vault Balance</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-muted-foreground">Upcoming Rites</div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="disputes">Disputes</TabsTrigger>
              <TabsTrigger value="api">API Demo</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {clan && (
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">{clan.name}</h3>
                  <p className="text-muted-foreground mb-2">Region: {clan.region}</p>
                  <Badge variant={clan.covenant_status === 'active' ? 'default' : 'secondary'}>
                    {clan.covenant_status}
                  </Badge>
                </div>
              )}
            </TabsContent>

            <TabsContent value="members" className="space-y-4">
              {membersLoading ? (
                <div>Loading members...</div>
              ) : (
                <div className="space-y-2">
                  {members?.map((member) => (
                    <div key={member.uid} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.role}</div>
                      </div>
                      <Badge variant="outline">{member.status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="disputes" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Clan Disputes</h3>
                <Button onClick={handleCreateSampleDispute} disabled={createDispute.isPending}>
                  {createDispute.isPending ? 'Creating...' : 'Create Sample Dispute'}
                </Button>
              </div>
              
              {disputesLoading ? (
                <div>Loading disputes...</div>
              ) : (
                <div className="space-y-2">
                  {disputes?.data?.map((dispute) => (
                    <div key={dispute.dispute_id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{dispute.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{dispute.description}</p>
                          <div className="mt-2 text-xs text-muted-foreground">
                            Type: {dispute.type} • Testimonies: {dispute.testimonies.length}
                          </div>
                        </div>
                        <Badge variant={dispute.status === 'open' ? 'destructive' : 'default'}>
                          {dispute.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="api" className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-4">API Endpoints Status</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>GET /clans/{clanId}</span>
                    <Badge variant="default">✓ Connected</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>GET /clans/{clanId}/members</span>
                    <Badge variant="default">✓ Connected</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>GET /clans/{clanId}/disputes</span>
                    <Badge variant="default">✓ Connected</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>POST /clans/{clanId}/disputes</span>
                    <Badge variant="default">✓ Connected</Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
