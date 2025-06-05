
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Globe, Mail, Key } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const DiasporaAuth = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    clanKeyPhrase: '',
    elderInviteCode: ''
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
              role: 'diaspora',
              clan_key_phrase: formData.clanKeyPhrase,
              elder_invite_code: formData.elderInviteCode
            }
          }
        });

        if (error) throw error;

        toast({
          title: "Diaspora Connection Initiated",
          description: "Check your email to verify and connect to home",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast({
          title: "Welcome Home, Diaspora",
          description: "Connected to your clan network",
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
          <Globe className="w-5 h-5 text-primary" />
          <span>Diaspora Bridge</span>
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Badge className="bg-primary">Global Connector</Badge>
          <Badge variant="outline">Remote Supporter</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <Label htmlFor="diaspora-email">Email Address</Label>
            <Input
              id="diaspora-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@abroad.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="diaspora-password">Password</Label>
            <Input
              id="diaspora-password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter secure password"
              required
            />
          </div>

          <div>
            <Label htmlFor="clan-key-phrase">ClanKey Phrase</Label>
            <Input
              id="clan-key-phrase"
              type="text"
              value={formData.clanKeyPhrase}
              onChange={(e) => setFormData({ ...formData, clanKeyPhrase: e.target.value })}
              placeholder="Traditional phrase linking you to home"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Example: "Son of Moindi, blessed by ancestors"
            </p>
          </div>

          {isSignUp && (
            <div>
              <Label htmlFor="elder-invite">Elder Invite Code</Label>
              <Input
                id="elder-invite"
                type="text"
                value={formData.elderInviteCode}
                onChange={(e) => setFormData({ ...formData, elderInviteCode: e.target.value })}
                placeholder="Code provided by clan elder"
                required
              />
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Connecting...' : isSignUp ? 'Connect to Clan' : 'Access Diaspora Tools'}
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm"
            >
              {isSignUp ? 'Already connected? Sign In' : 'New diaspora member? Connect'}
            </Button>
          </div>
        </form>

        <div className="mt-6 p-3 bg-primary/10 rounded-md">
          <div className="flex items-start space-x-2">
            <Key className="w-4 h-4 text-primary mt-0.5" />
            <div className="text-xs">
              <p><strong>Diaspora Features:</strong></p>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>View clan milestone updates</li>
                <li>Remote financial support tools</li>
                <li>Live ritual participation</li>
                <li>Investment voting on projects</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
