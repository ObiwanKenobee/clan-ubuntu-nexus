
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Shield, Settings, Wifi } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const TechStewardAuth = () => {
  const [formData, setFormData] = useState({
    credentials: '',
    password: '',
    devicePairingCode: '',
    multiRoleEnabled: false
  });
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: `${formData.credentials}@tech.clan`,
          password: formData.password,
          options: {
            data: {
              role: 'tech_steward',
              credentials: formData.credentials,
              device_pairing_code: formData.devicePairingCode,
              multi_role_enabled: formData.multiRoleEnabled
            }
          }
        });

        if (error) throw error;

        toast({
          title: "Tech Steward Registered",
          description: "System administration access granted",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: `${formData.credentials}@tech.clan`,
          password: formData.password,
        });

        if (error) throw error;

        toast({
          title: "System Access Granted",
          description: "Tech steward dashboard ready",
        });
      }
    } catch (error: any) {
      toast({
        title: "Authentication Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-secondary" />
          <span>Tech Steward Portal</span>
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Badge className="bg-secondary">System Admin</Badge>
          <Badge variant="outline">Sync Manager</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <Label htmlFor="tech-credentials">Steward Credentials</Label>
            <Input
              id="tech-credentials"
              type="text"
              value={formData.credentials}
              onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
              placeholder="tech.steward.id"
              required
            />
          </div>

          <div>
            <Label htmlFor="tech-password">System Password</Label>
            <Input
              id="tech-password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter system password"
              required
            />
          </div>

          {isSignUp && (
            <>
              <div>
                <Label htmlFor="device-pairing">Device Pairing Code</Label>
                <Input
                  id="device-pairing"
                  type="text"
                  value={formData.devicePairingCode}
                  onChange={(e) => setFormData({ ...formData, devicePairingCode: e.target.value })}
                  placeholder="Kiosk pairing code"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="multi-role"
                  checked={formData.multiRoleEnabled}
                  onChange={(e) => setFormData({ ...formData, multiRoleEnabled: e.target.checked })}
                />
                <Label htmlFor="multi-role" className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Enable Multi-Role Switching</span>
                </Label>
              </div>
            </>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Authenticating...' : isSignUp ? 'Register Steward' : 'Access System'}
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm"
            >
              {isSignUp ? 'Existing steward? Sign In' : 'New steward? Register'}
            </Button>
          </div>
        </form>

        <div className="mt-6 p-3 bg-secondary/10 rounded-md">
          <div className="flex items-start space-x-2">
            <Wifi className="w-4 h-4 text-secondary mt-0.5" />
            <div className="text-xs">
              <p><strong>Steward Responsibilities:</strong></p>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>Sync node status monitoring</li>
                <li>Conflict resolution between kiosks</li>
                <li>Role badge management</li>
                <li>Secure data export assistance</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
