
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useDataIntegration } from '@/hooks/useDataIntegration';
import { useAuth } from '@/contexts/AuthContext';
import { createClan, updateClan, addClanMember } from '@/api/clanAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Users, Plus, Settings, Crown } from 'lucide-react';

interface ClanManagementProps {
  clanId?: string;
}

export const ClanManagement: React.FC<ClanManagementProps> = ({ clanId }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { clan, members, isLoading } = useDataIntegration(clanId || '');
  
  const [newClanData, setNewClanData] = useState({
    name: '',
    region: '',
  });

  const [newMemberData, setNewMemberData] = useState({
    name: '',
    role: 'youth' as const,
    lineage: [] as string[],
  });

  const createClanMutation = useMutation({
    mutationFn: createClan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clan'] });
      toast.success('Clan created successfully');
      setNewClanData({ name: '', region: '' });
    },
    onError: (error: Error) => {
      toast.error(`Failed to create clan: ${error.message}`);
    },
  });

  const addMemberMutation = useMutation({
    mutationFn: ({ clanId, memberData }: { clanId: string; memberData: any }) =>
      addClanMember(clanId, memberData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clan-members'] });
      toast.success('Member added successfully');
      setNewMemberData({ name: '', role: 'youth', lineage: [] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to add member: ${error.message}`);
    },
  });

  const handleCreateClan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClanData.name || !newClanData.region) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    createClanMutation.mutate({
      ...newClanData,
      elders: user?.uid ? [user.uid] : [],
      members: user?.uid ? [user.uid] : [],
      covenant_status: 'active' as const,
    });
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clanId || !newMemberData.name) {
      toast.error('Please fill in required fields');
      return;
    }

    addMemberMutation.mutate({
      clanId,
      memberData: {
        ...newMemberData,
        clan_id: clanId,
        status: 'active' as const,
        rites_completed: [],
      },
    });
  };

  if (isLoading) {
    return <div className="animate-pulse">Loading clan data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Clan Management</h2>
        {!clanId && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create Clan</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Clan</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateClan} className="space-y-4">
                <div>
                  <Label htmlFor="clan-name">Clan Name</Label>
                  <Input
                    id="clan-name"
                    value={newClanData.name}
                    onChange={(e) => setNewClanData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter clan name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="clan-region">Region</Label>
                  <Select
                    value={newClanData.region}
                    onValueChange={(value) => setNewClanData(prev => ({ ...prev, region: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="west-africa">West Africa</SelectItem>
                      <SelectItem value="east-africa">East Africa</SelectItem>
                      <SelectItem value="central-africa">Central Africa</SelectItem>
                      <SelectItem value="southern-africa">Southern Africa</SelectItem>
                      <SelectItem value="diaspora">Diaspora</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" disabled={createClanMutation.isPending}>
                  {createClanMutation.isPending ? 'Creating...' : 'Create Clan'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {clan && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Crown className="w-5 h-5" />
                  <span>{clan.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Region</p>
                    <p className="text-sm text-muted-foreground">{clan.region}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <Badge variant={clan.covenant_status === 'active' ? 'default' : 'secondary'}>
                      {clan.covenant_status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Members</p>
                    <p className="text-sm text-muted-foreground">{members?.length || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Elders</p>
                    <p className="text-sm text-muted-foreground">{clan.elders.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Clan Members</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Member</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Member</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddMember} className="space-y-4">
                    <div>
                      <Label htmlFor="member-name">Name</Label>
                      <Input
                        id="member-name"
                        value={newMemberData.name}
                        onChange={(e) => setNewMemberData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter member name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="member-role">Role</Label>
                      <Select
                        value={newMemberData.role}
                        onValueChange={(value: any) => setNewMemberData(prev => ({ ...prev, role: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="elder">Elder</SelectItem>
                          <SelectItem value="youth">Youth</SelectItem>
                          <SelectItem value="women">Women</SelectItem>
                          <SelectItem value="diaspora">Diaspora</SelectItem>
                          <SelectItem value="tech_steward">Tech Steward</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full" disabled={addMemberMutation.isPending}>
                      {addMemberMutation.isPending ? 'Adding...' : 'Add Member'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {members?.map((member) => (
                <Card key={member.uid}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {member.role} • Joined {new Date(member.join_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                        {member.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Clan Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Clan settings and configuration options will be available here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
