
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SyncNode {
  id: string;
  name: string;
  location: string;
  type: 'kiosk' | 'mobile' | 'tablet';
  status: 'online' | 'offline' | 'syncing' | 'conflict';
  lastSync: string;
  batteryLevel: number;
  dataQueue: number;
  conflicts: string[];
}

interface ConflictLog {
  id: string;
  timestamp: string;
  nodes: string[];
  dataType: string;
  resolution: 'auto' | 'manual' | 'pending';
  description: string;
}

export const MeshSyncStatus = () => {
  const [nodes, setNodes] = useState<SyncNode[]>([
    {
      id: '1',
      name: 'Keroka Market Kiosk',
      location: 'Keroka Town Center',
      type: 'kiosk',
      status: 'online',
      lastSync: '2 minutes ago',
      batteryLevel: 85,
      dataQueue: 3,
      conflicts: []
    },
    {
      id: '2',
      name: 'Elder Grace Mobile',
      location: 'Mosocho Village',
      type: 'mobile',
      status: 'offline',
      lastSync: '2 hours ago',
      batteryLevel: 20,
      dataQueue: 12,
      conflicts: ['Family tree update conflict']
    },
    {
      id: '3',
      name: 'Youth Center Tablet',
      location: 'Nyamache Secondary',
      type: 'tablet',
      status: 'syncing',
      lastSync: 'Syncing now...',
      batteryLevel: 60,
      dataQueue: 8,
      conflicts: []
    }
  ]);

  const [conflictLogs] = useState<ConflictLog[]>([
    {
      id: '1',
      timestamp: '2024-01-15 10:30',
      nodes: ['Keroka Market Kiosk', 'Elder Grace Mobile'],
      dataType: 'Family member update',
      resolution: 'manual',
      description: 'Different marriage status recorded for James Moindi'
    },
    {
      id: '2',
      timestamp: '2024-01-14 15:45',
      nodes: ['Youth Center Tablet', 'Keroka Market Kiosk'],
      dataType: 'ClanToken transaction',
      resolution: 'auto',
      description: 'Duplicate token award resolved using timestamp priority'
    }
  ]);

  const [isHeartbeat, setIsHeartbeat] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsHeartbeat(prev => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: SyncNode['status']) => {
    const colors = {
      online: 'bg-emerald-500',
      offline: 'bg-red-500',
      syncing: 'bg-orange-500',
      conflict: 'bg-yellow-500'
    };
    return colors[status];
  };

  const getTypeIcon = (type: SyncNode['type']) => {
    const icons = {
      kiosk: '🏪',
      mobile: '📱',
      tablet: '📱'
    };
    return icons[type];
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/60 backdrop-blur-sm border-ochre-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-2xl">📡</span>
            <span>Mesh Sync Status</span>
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              isHeartbeat ? 'bg-emerald-500 scale-125' : 'bg-emerald-400 scale-100'
            }`} title="Sync Heartbeat" />
          </CardTitle>
          <p className="text-muted-foreground">
            Solar-powered offline-first sync across clan devices and kiosks
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="nodes" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6 bg-white/60">
              <TabsTrigger value="nodes">Sync Nodes</TabsTrigger>
              <TabsTrigger value="queue">Data Queue</TabsTrigger>
              <TabsTrigger value="conflicts">Conflicts</TabsTrigger>
              <TabsTrigger value="sovereignty">Data Vault</TabsTrigger>
            </TabsList>

            <TabsContent value="nodes">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Active Sync Network</h3>
                  <Button>Register New Node</Button>
                </div>

                <div className="grid gap-4">
                  {nodes.map(node => (
                    <Card key={node.id} className={`transition-all hover:shadow-md bg-white/80 border-l-4 ${
                      node.status === 'online' ? 'border-l-emerald-500' :
                      node.status === 'offline' ? 'border-l-red-500' :
                      node.status === 'syncing' ? 'border-l-orange-500' :
                      'border-l-yellow-500'
                    }`}>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{getTypeIcon(node.type)}</span>
                            <div>
                              <h4 className="font-semibold">{node.name}</h4>
                              <p className="text-sm text-muted-foreground">{node.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={`${getStatusColor(node.status)} text-white`}>
                              {node.status}
                            </Badge>
                            {node.status === 'syncing' && (
                              <div className="animate-spin w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full" />
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Battery</p>
                            <div className="flex items-center space-x-2">
                              <Progress value={node.batteryLevel} className="flex-1 h-2" />
                              <span className="text-sm font-medium">{node.batteryLevel}%</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Queue</p>
                            <p className="text-sm font-medium">{node.dataQueue} items</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Last Sync</p>
                            <p className="text-sm font-medium">{node.lastSync}</p>
                          </div>
                        </div>

                        {node.conflicts.length > 0 && (
                          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                            <p className="text-sm text-yellow-800">
                              ⚠️ {node.conflicts.length} conflicts need resolution
                            </p>
                          </div>
                        )}

                        <div className="flex space-x-2 mt-3">
                          <Button size="sm" variant="outline">Force Sync</Button>
                          <Button size="sm" variant="outline">Configure</Button>
                          {node.status === 'offline' && (
                            <Button size="sm" variant="outline">Remove</Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="queue">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Sync Queue Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-emerald-50 border-emerald-200">
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold text-emerald-600">23</div>
                      <div className="text-sm text-muted-foreground">Items synced today</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-orange-50 border-orange-200">
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold text-orange-600">23</div>
                      <div className="text-sm text-muted-foreground">Pending sync</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-red-50 border-red-200">
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold text-red-600">2</div>
                      <div className="text-sm text-muted-foreground">Failed sync</div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-white/80">
                  <CardHeader>
                    <CardTitle className="text-lg">Retry Failed Syncs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded">
                        <div>
                          <p className="font-medium">Family tree update - James Moindi</p>
                          <p className="text-sm text-muted-foreground">Failed: Network timeout</p>
                        </div>
                        <Button size="sm">Retry</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded">
                        <div>
                          <p className="font-medium">ClanToken transaction #1247</p>
                          <p className="text-sm text-muted-foreground">Failed: Validation error</p>
                        </div>
                        <Button size="sm">Retry</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="conflicts">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Conflict Detection & Resolution</h3>
                <div className="space-y-3">
                  {conflictLogs.map(conflict => (
                    <Card key={conflict.id} className="bg-white/80 border-l-4 border-l-yellow-500">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">{conflict.dataType}</h4>
                          <Badge variant={
                            conflict.resolution === 'auto' ? 'default' :
                            conflict.resolution === 'manual' ? 'secondary' : 'destructive'
                          }>
                            {conflict.resolution}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{conflict.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            {conflict.nodes.map((node, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {node}
                              </Badge>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{conflict.timestamp}</span>
                        </div>
                        {conflict.resolution === 'pending' && (
                          <div className="flex space-x-2 mt-3">
                            <Button size="sm">Resolve Manually</Button>
                            <Button size="sm" variant="outline">Use Elder Override</Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sovereignty">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Time-Stamped Data Sovereignty Vault</h3>
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold mb-4">🔐 Clan Data Ownership</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-2xl font-bold text-blue-600">256-bit</div>
                          <div className="text-sm text-muted-foreground">Encryption</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-600">100%</div>
                          <div className="text-sm text-muted-foreground">Clan-controlled</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-emerald-600">Local</div>
                          <div className="text-sm text-muted-foreground">Data sovereignty</div>
                        </div>
                      </div>
                      <div className="mt-6 space-y-2">
                        <Button className="w-full" variant="outline">Configure Data Access Permissions</Button>
                        <Button className="w-full" variant="outline">Export Clan Data Archive</Button>
                        <Button className="w-full" variant="outline">Generate Audit Report</Button>
                      </div>
                    </div>
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
