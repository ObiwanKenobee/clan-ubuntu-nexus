
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Zap, Users, Lightbulb } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const YouthAuth = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    sponsorCode: '',
    skillArea: ''
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
              role: 'youth',
              sponsor_code: formData.sponsorCode,
              skill_area: formData.skillArea
            }
          }
        });

        if (error) throw error;

        toast({
          title: "Youth Account Created",
          description: "Welcome to the next generation of clan builders!",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast({
          title: "Welcome Back, Future Leader",
          description: "Continue building your clan legacy",
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
          <Zap className="w-5 h-5 text-primary" />
          <span>Youth Portal</span>
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">Future Leader</Badge>
          <Badge variant="outline">Innovation Driver</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <Label htmlFor="youth-email">Email Address</Label>
            <Input
              id="youth-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="youth@example.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="youth-password">Password</Label>
            <Input
              id="youth-password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Create strong password"
              required
            />
          </div>

          <div>
            <Label htmlFor="sponsor-code">Elder Sponsor Code</Label>
            <Input
              id="sponsor-code"
              type="text"
              value={formData.sponsorCode}
              onChange={(e) => setFormData({ ...formData, sponsorCode: e.target.value })}
              placeholder="Provided by your elder mentor"
              required
            />
          </div>

          {isSignUp && (
            <div>
              <Label htmlFor="skill-area">Primary Skill Area</Label>
              <Input
                id="skill-area"
                type="text"
                value={formData.skillArea}
                onChange={(e) => setFormData({ ...formData, skillArea: e.target.value })}
                placeholder="Technology, Arts, Business, etc."
                required
              />
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Connecting...' : isSignUp ? 'Join Youth Network' : 'Access Youth Hub'}
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm"
            >
              {isSignUp ? 'Already have an account? Sign In' : 'New member? Join Now'}
            </Button>
          </div>
        </form>

        <div className="mt-6 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-md">
          <div className="flex items-start space-x-2">
            <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="text-xs">
              <p><strong>Youth Opportunities:</strong></p>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>Innovation challenges & rewards</li>
                <li>Skill development programs</li>
                <li>Mentorship from elders</li>
                <li>Technology advancement projects</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
