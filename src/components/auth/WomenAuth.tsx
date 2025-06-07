
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const WomenAuth = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    circleInvite: '',
    focusArea: ''
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
              role: 'women',
              circle_invite: formData.circleInvite,
              focus_area: formData.focusArea
            }
          }
        });

        if (error) throw error;

        toast({
          title: "Welcome to the Women's Circle",
          description: "Your voice strengthens our community",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast({
          title: "Welcome Back, Sister",
          description: "Continue empowering our community",
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
          <Heart className="w-5 h-5 text-primary" />
          <span>Women's Circle</span>
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">Community Pillar</Badge>
          <Badge variant="outline">Wisdom Keeper</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <Label htmlFor="women-email">Email Address</Label>
            <Input
              id="women-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="sister@community.org"
              required
            />
          </div>

          <div>
            <Label htmlFor="women-password">Password</Label>
            <Input
              id="women-password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter secure password"
              required
            />
          </div>

          <div>
            <Label htmlFor="circle-invite">Circle Invitation Code</Label>
            <Input
              id="circle-invite"
              type="text"
              value={formData.circleInvite}
              onChange={(e) => setFormData({ ...formData, circleInvite: e.target.value })}
              placeholder="Provided by women's group leader"
              required
            />
          </div>

          {isSignUp && (
            <div>
              <Label htmlFor="focus-area">Primary Focus Area</Label>
              <Input
                id="focus-area"
                type="text"
                value={formData.focusArea}
                onChange={(e) => setFormData({ ...formData, focusArea: e.target.value })}
                placeholder="Healthcare, Education, Business, etc."
                required
              />
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Connecting...' : isSignUp ? 'Join the Circle' : 'Enter Sacred Space'}
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm"
            >
              {isSignUp ? 'Already part of the circle? Sign In' : 'New sister? Join Us'}
            </Button>
          </div>
        </form>

        <div className="mt-6 p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-md">
          <div className="flex items-start space-x-2">
            <Star className="w-4 h-4 text-pink-600 mt-0.5" />
            <div className="text-xs">
              <p><strong>Women's Empowerment:</strong></p>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>Health & wellness programs</li>
                <li>Economic empowerment initiatives</li>
                <li>Child & family support systems</li>
                <li>Leadership development opportunities</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
