
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Building, Key, CreditCard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const CivicAuth = () => {
  const [formData, setFormData] = useState({
    organization: '',
    apiKey: '',
    smartCardId: '',
    authMethod: 'oauth'
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleOAuthLogin = async () => {
    setLoading(true);
    try {
      // Simulate OAuth flow
      setTimeout(() => {
        setLoading(false);
        toast({
          title: "OAuth Authentication",
          description: "Redirecting to government portal...",
        });
      }, 1000);
    } catch (error) {
      setLoading(false);
      toast({
        title: "OAuth Failed",
        description: "Failed to connect to government portal",
        variant: "destructive",
      });
    }
  };

  const handleApiKeyAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: `${formData.organization}@civic.portal`,
        password: formData.apiKey,
      });

      if (error) throw error;

      toast({
        title: "Civic Access Granted",
        description: "Connected to ClanChain metrics portal",
      });
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
          <Building className="w-5 h-5 text-muted-foreground" />
          <span>Civic & NGO Portal</span>
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">Government Access</Badge>
          <Badge variant="outline">NGO Partner</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>Authentication Method</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Button
                variant={formData.authMethod === 'oauth' ? 'default' : 'outline'}
                onClick={() => setFormData({ ...formData, authMethod: 'oauth' })}
                className="w-full"
              >
                OAuth Portal
              </Button>
              <Button
                variant={formData.authMethod === 'api' ? 'default' : 'outline'}
                onClick={() => setFormData({ ...formData, authMethod: 'api' })}
                className="w-full"
              >
                API Key
              </Button>
            </div>
          </div>

          {formData.authMethod === 'oauth' ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="County Government / NGO Name"
                  required
                />
              </div>

              <Button onClick={handleOAuthLogin} className="w-full" disabled={loading}>
                {loading ? 'Connecting...' : 'Connect via Government Portal'}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleApiKeyAuth} className="space-y-4">
              <div>
                <Label htmlFor="civic-org">Organization ID</Label>
                <Input
                  id="civic-org"
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="org.county.kenya.001"
                  required
                />
              </div>

              <div>
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  value={formData.apiKey}
                  onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                  placeholder="Enter secure API key"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Authenticating...' : 'Access Civic Dashboard'}
              </Button>
            </form>
          )}

          <div className="text-center">
            <div className="flex items-center space-x-2 justify-center mt-4">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Smart Card Login Available</span>
            </div>
          </div>
        </div>

        <div className="mt-6 p-3 bg-muted/30 rounded-md">
          <div className="flex items-start space-x-2">
            <Key className="w-4 h-4 text-muted-foreground mt-0.5" />
            <div className="text-xs">
              <p><strong>Civic Portal Features:</strong></p>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>Read-only metrics and analytics</li>
                <li>Funding opportunity submissions</li>
                <li>Project verification and evidence</li>
                <li>Social trust and conflict mapping</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
