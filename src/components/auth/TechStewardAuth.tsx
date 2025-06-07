
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Code, Shield, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const TechStewardAuth = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    techCredentials: '',
    specialization: ''
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
              role: 'tech_steward',
              tech_credentials: formData.techCredentials,
              specialization: formData.specialization
            }
          }
        });

        if (error) throw error;

        toast({
          title: "Tech Steward Access Granted",
          description: "Welcome to the digital infrastructure team",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast({
          title: "System Access Granted",
          description: "Digital guardian protocols activated",
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
          <Code className="w-5 h-5 text-primary" />
          <span>Tech Steward Portal</span>
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Badge className="bg-gradient-to-r from-green-500 to-teal-500 text-white">Digital Guardian</Badge>
          <Badge variant="outline">System Architect</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <Label htmlFor="tech-email">Email Address</Label>
            <Input
              id="tech-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="steward@techclan.dev"
              required
            />
          </div>

          <div>
            <Label htmlFor="tech-password">Password</Label>
            <Input
              id="tech-password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter secure password"
              required
            />
          </div>

          <div>
            <Label htmlFor="tech-credentials">Technical Credentials</Label>
            <Input
              id="tech-credentials"
              type="text"
              value={formData.techCredentials}
              onChange={(e) => setFormData({ ...formData, techCredentials: e.target.value })}
              placeholder="GitHub profile, certifications, etc."
              required
            />
          </div>

          {isSignUp && (
            <div>
              <Label htmlFor="specialization">Technical Specialization</Label>
              <Input
                id="specialization"
                type="text"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                placeholder="Blockchain, AI, Security, etc."
                required
              />
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Authenticating...' : isSignUp ? 'Join Tech Council' : 'Access System'}
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm"
            >
              {isSignUp ? 'Already a steward? Sign In' : 'Become a Tech Steward'}
            </Button>
          </div>
        </form>

        <div className="mt-6 p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-md">
          <div className="flex items-start space-x-2">
            <Shield className="w-4 h-4 text-green-600 mt-0.5" />
            <div className="text-xs">
              <p><strong>Tech Steward Responsibilities:</strong></p>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>Platform security & maintenance</li>
                <li>Smart contract deployment</li>
                <li>Data integrity monitoring</li>
                <li>System performance optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
