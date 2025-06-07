
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Building, Scale, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const CivicAuth = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    govId: '',
    jurisdiction: ''
  });
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const redirectUrl = `${window.location.origin}/`;
        
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              role: 'civic_partner',
              gov_id: formData.govId,
              jurisdiction: formData.jurisdiction
            }
          }
        });

        if (error) throw error;

        toast({
          title: "Civic Partnership Initiated",
          description: "Bridging traditional and modern governance",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast({
          title: "Civic Portal Access",
          description: "Connected to governance systems",
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
          <Building className="w-5 h-5 text-primary" />
          <span>Civic Partnership</span>
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">Government Partner</Badge>
          <Badge variant="outline">Policy Bridge</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <Label htmlFor="civic-email">Official Email</Label>
            <Input
              id="civic-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="official@government.ke"
              required
            />
          </div>

          <div>
            <Label htmlFor="civic-password">Password</Label>
            <Input
              id="civic-password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Secure government password"
              required
            />
          </div>

          <div>
            <Label htmlFor="gov-id">Government ID/Badge</Label>
            <Input
              id="gov-id"
              type="text"
              value={formData.govId}
              onChange={(e) => setFormData({ ...formData, govId: e.target.value })}
              placeholder="Official identification number"
              required
            />
          </div>

          {isSignUp && (
            <div>
              <Label htmlFor="jurisdiction">Jurisdiction/Department</Label>
              <Input
                id="jurisdiction"
                type="text"
                value={formData.jurisdiction}
                onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                placeholder="County, Ministry, or Department"
                required
              />
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Verifying...' : isSignUp ? 'Register Partnership' : 'Access Civic Tools'}
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm"
            >
              {isSignUp ? 'Existing partner? Sign In' : 'New partnership? Register'}
            </Button>
          </div>
        </form>

        <div className="mt-6 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md">
          <div className="flex items-start space-x-2">
            <Scale className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="text-xs">
              <p><strong>Civic Integration Features:</strong></p>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>Legal framework compliance</li>
                <li>Traditional law documentation</li>
                <li>Policy recommendation engine</li>
                <li>Community impact reports</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
