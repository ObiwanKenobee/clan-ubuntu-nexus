
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMockData } from '@/contexts/MockDataContext';
import { 
  Users, 
  Gavel, 
  Vault, 
  Crown, 
  Coins, 
  Shield,
  Calendar,
  MapPin,
  User
} from 'lucide-react';

export const DataPreview = () => {
  const { getCurrentClanData } = useMockData();
  const { clan, members, disputes, vaults, rites, tokens, ethics } = getCurrentClanData();

  if (!clan) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Please select a clan to view data</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'open': return 'bg-red-100 text-red-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'planned': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="members" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
          <TabsTrigger value="vaults">Vaults</TabsTrigger>
          <TabsTrigger value="rites">Rites</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="ethics">Ethics</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Clan Members ({members.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {members.map((member) => (
                    <div key={member.uid} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {member.lineage.join(' → ')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Joined: {new Date(member.join_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge className={getStatusColor(member.role)}>
                          {member.role}
                        </Badge>
                        <Badge variant="outline">
                          {member.rites_completed.length} rites
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disputes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gavel className="w-5 h-5" />
                <span>Active Disputes ({disputes.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {disputes.map((dispute) => (
                    <div key={dispute.dispute_id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{dispute.title}</h4>
                        <Badge className={getStatusColor(dispute.status)}>
                          {dispute.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {dispute.description.substring(0, 100)}...
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Type: {dispute.type}</span>
                        <span>{dispute.testimonies.length} testimonies</span>
                        <span>{new Date(dispute.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vaults" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Vault className="w-5 h-5" />
                <span>Clan Vaults ({vaults.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vaults.map((vault) => (
                  <div key={vault.vault_id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium capitalize">{vault.vault_type} Vault</h4>
                      <Badge variant="outline">{vault.currency}</Badge>
                    </div>
                    <p className="text-2xl font-bold mb-1">
                      {vault.balance.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {vault.contributors.length} contributors
                    </p>
                    {vault.target_amount && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(vault.balance / vault.target_amount) * 100}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rites" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Crown className="w-5 h-5" />
                <span>Traditional Rites ({rites.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {rites.map((rite) => (
                    <div key={rite.rite_id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium capitalize">{rite.type} Ceremony</h4>
                        <Badge className={getStatusColor(rite.status)}>
                          {rite.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {rite.cultural_significance}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(rite.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {rite.location}
                        </span>
                        <span>{rite.participants.length} participants</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tokens" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Coins className="w-5 h-5" />
                <span>Clan Tokens ({tokens.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {tokens.map((token) => (
                    <div key={token.token_id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium">{token.action}</h4>
                          <p className="text-sm text-muted-foreground">
                            {members.find(m => m.uid === token.member_id)?.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">
                            +{token.tokens_earned}
                          </p>
                          <Badge className={token.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {token.verified ? 'Verified' : 'Pending'}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="capitalize">{token.category}</span>
                        <span>{new Date(token.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ethics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Ethics Ledger ({ethics.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {ethics.map((entry) => (
                    <div key={entry.entry_id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium capitalize">{entry.type}</h4>
                          <p className="text-sm text-muted-foreground">
                            {entry.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Member: {members.find(m => m.uid === entry.member_id)?.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-bold ${entry.impact_score > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {entry.impact_score > 0 ? '+' : ''}{entry.impact_score}
                          </p>
                          <Badge className={getStatusColor(entry.status)}>
                            {entry.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Witness: {entry.witness}</span>
                        <span>{new Date(entry.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
