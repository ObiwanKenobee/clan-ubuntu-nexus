
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Crown, Shield, Key } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const ElderAuth = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    clanVerificationCode: '',
    lineageProof: ''
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
              role: 'elder',
              clan_verification_code: formData.clanVerificationCode,
              lineage_proof: formData.lineageProof
            }
          }
        });

        if (error) throw error;

        toast({
          title: "Elder Registration Initiated",
          description: "Check your email to verify your elder status",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast({
          title: "Welcome, Elder",
          description: "Access granted to clan governance tools",
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
          <Crown className="w-5 h-5 text-primary" />
          <span>Elder Access</span>
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Badge className="bg-primary">Wisdom Keeper</Badge>
          <Badge variant="outline">Governance Leader</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <Label htmlFor="elder-email">Email Address</Label>
            <Input
              id="elder-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="elder@clanname.community"
              required
            />
          </div>

          <div>
            <Label htmlFor="elder-password">Password</Label>
            <Input
              id="elder-password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter secure password"
              required
            />
          </div>

          <div>
            <Label htmlFor="clan-verification">Clan Verification Code</Label>
            <Input
              id="clan-verification"
              type="text"
              value={formData.clanVerificationCode}
              onChange={(e) => setFormData({ ...formData, clanVerificationCode: e.target.value })}
              placeholder="Provided by clan council"
              required
            />
          </div>

          {isSignUp && (
            <div>
              <Label htmlFor="lineage-proof">Lineage Documentation</Label>
              <Input
                id="lineage-proof"
                type="text"
                value={formData.lineageProof}
                onChange={(e) => setFormData({ ...formData, lineageProof: e.target.value })}
                placeholder="Traditional lineage verification phrase"
                required
              />
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Verifying...' : isSignUp ? 'Register as Elder' : 'Access Elder Portal'}
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm"
            >
              {isSignUp ? 'Already registered? Sign In' : 'New elder? Register'}
            </Button>
          </div>
        </form>

        <div className="mt-6 p-3 bg-primary/10 rounded-md">
          <div className="flex items-start space-x-2">
            <Shield className="w-4 h-4 text-primary mt-0.5" />
            <div className="text-xs">
              <p><strong>Elder Privileges:</strong></p>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>Dispute resolution authority</li>
                <li>Vault management oversight</li>
                <li>Rite certification powers</li>
                <li>Community governance voting</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
