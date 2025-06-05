
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Shield, Mic, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const ElderAuth = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    pin: '',
    voiceSignature: false
  });
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      toast({
        title: "Welcome, Elder",
        description: "Your council access has been granted",
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            role: 'elder',
            pin: formData.pin,
            voice_signature_enabled: formData.voiceSignature
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Elder Registration Initiated",
        description: "Please check your email to verify your council position",
      });
    } catch (error: any) {
      toast({
        title: "Registration Failed", 
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
          <Shield className="w-5 h-5 text-ochre-600" />
          <span>Elder Council Access</span>
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Badge className="elder-badge">Ethics Override Authority</Badge>
          <Badge variant="outline">Dispute Resolution</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
          <div>
            <Label htmlFor="elder-email">Council Email</Label>
            <Input
              id="elder-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="elder@clan.community"
              required
            />
          </div>

          <div>
            <Label htmlFor="elder-password">Secure Password</Label>
            <Input
              id="elder-password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your secure password"
              required
            />
          </div>

          {isSignUp && (
            <>
              <div>
                <Label htmlFor="elder-pin">Elder PIN (4-6 digits)</Label>
                <Input
                  id="elder-pin"
                  type="password"
                  value={formData.pin}
                  onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                  placeholder="Enter your secure PIN"
                  maxLength={6}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="voice-signature"
                  checked={formData.voiceSignature}
                  onChange={(e) => setFormData({ ...formData, voiceSignature: e.target.checked })}
                />
                <Label htmlFor="voice-signature" className="flex items-center space-x-2">
                  <Mic className="w-4 h-4" />
                  <span>Enable Voice Signature Recognition</span>
                </Label>
              </div>
            </>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Authenticating...' : isSignUp ? 'Register as Elder' : 'Access Council'}
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm"
            >
              {isSignUp ? 'Already an Elder? Sign In' : 'New Elder? Register'}
            </Button>
          </div>
        </form>

        <div className="mt-6 p-3 bg-ochre-50 rounded-md">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-ochre-600 mt-0.5" />
            <div className="text-xs">
              <p><strong>Elder Privileges:</strong></p>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>Ethics rule override permissions</li>
                <li>Dispute resolution authority</li>
                <li>Emergency fund access approval</li>
                <li>Youth task validation</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
