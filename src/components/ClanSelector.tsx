
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMockData } from '@/contexts/MockDataContext';
import { Users, MapPin, Crown } from 'lucide-react';

export const ClanSelector = () => {
  const { clans, selectedClanId, setSelectedClanId, getCurrentClanData } = useMockData();
  const { clan, members, disputes, vaults } = getCurrentClanData();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Crown className="w-5 h-5" />
            <span>Select Your Clan</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedClanId} onValueChange={setSelectedClanId}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a clan to explore" />
            </SelectTrigger>
            <SelectContent>
              {clans.map((clan) => (
                <SelectItem key={clan.clan_id} value={clan.clan_id}>
                  <div className="flex items-center space-x-2">
                    <span>{clan.name}</span>
                    <Badge variant="outline">{clan.region}</Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {clan && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{clan.name}</span>
              <Badge className={clan.covenant_status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                {clan.covenant_status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{clan.region}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-2xl font-bold">{members.length}</p>
                <p className="text-sm text-muted-foreground">Members</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <p className="text-2xl font-bold">{disputes.length}</p>
                <p className="text-sm text-muted-foreground">Disputes</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <p className="text-2xl font-bold">{vaults.length}</p>
                <p className="text-sm text-muted-foreground">Vaults</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <p className="text-2xl font-bold">
                  {vaults.reduce((sum, v) => sum + v.balance, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Funds</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Recent Activity</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>• {disputes.filter(d => d.status === 'open').length} open disputes requiring attention</p>
                <p>• {members.filter(m => m.role === 'elder').length} elders providing guidance</p>
                <p>• Last updated: {new Date(clan.updated_at).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
