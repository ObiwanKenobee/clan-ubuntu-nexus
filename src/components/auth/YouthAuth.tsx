
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Users, Phone, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const YouthAuth = () => {
  const [formData, setFormData] = useState({
    phone: '',
    otp: '',
    roleBadge: '',
    branchId: '',
    dateOfBirth: ''
  });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();

  const handleSendOTP = async () => {
    setLoading(true);
    try {
      // Simulate OTP sending
      setTimeout(() => {
        setOtpSent(true);
        setLoading(false);
        toast({
          title: "OTP Sent",
          description: `Verification code sent to ${formData.phone}`,
        });
      }, 1000);
    } catch (error) {
      setLoading(false);
      toast({
        title: "OTP Failed",
        description: "Failed to send verification code",
        variant: "destructive",
      });
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: `${formData.phone}@youth.clan`,
          password: formData.otp + formData.branchId,
          options: {
            data: {
              role: 'youth',
              phone: formData.phone,
              role_badge: formData.roleBadge,
              branch_id: formData.branchId,
              date_of_birth: formData.dateOfBirth
            }
          }
        });

        if (error) throw error;

        toast({
          title: "Youth Registration Success",
          description: "Welcome to your growth journey!",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: `${formData.phone}@youth.clan`,
          password: formData.otp + formData.branchId,
        });

        if (error) throw error;

        toast({
          title: "Welcome Back, Youth",
          description: "Ready to continue your tasks?",
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
          <Users className="w-5 h-5 text-emerald-600" />
          <span>Youth Growth Access</span>
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Badge className="bg-emerald-500">Task Achiever</Badge>
          <Badge variant="outline">Token Earner</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <Label htmlFor="youth-phone">Phone Number</Label>
            <div className="flex space-x-2">
              <Input
                id="youth-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+254700123456"
                required
              />
              <Button
                type="button"
                onClick={handleSendOTP}
                disabled={!formData.phone || otpSent || loading}
                className="whitespace-nowrap"
              >
                <Phone className="w-4 h-4 mr-1" />
                {otpSent ? 'Sent' : 'Send OTP'}
              </Button>
            </div>
          </div>

          {otpSent && (
            <div>
              <Label htmlFor="youth-otp">Verification Code</Label>
              <Input
                id="youth-otp"
                type="text"
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                placeholder="Enter 6-digit code"
                maxLength={6}
                required
              />
            </div>
          )}

          <div>
            <Label htmlFor="role-badge">Role Badge</Label>
            <select
              id="role-badge"
              value={formData.roleBadge}
              onChange={(e) => setFormData({ ...formData, roleBadge: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select your role</option>
              <option value="firstborn">Firstborn</option>
              <option value="lastborn">Lastborn</option>
              <option value="middle_child">Middle Child</option>
              <option value="only_child">Only Child</option>
              <option value="adopted">Adopted</option>
            </select>
          </div>

          {isSignUp && (
            <>
              <div>
                <Label htmlFor="branch-id">Branch ID (Family Line)</Label>
                <Input
                  id="branch-id"
                  type="text"
                  value={formData.branchId}
                  onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                  placeholder="e.g., Moindi-Nyanchwa-001"
                  required
                />
              </div>

              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  required
                />
              </div>
            </>
          )}

          <Button type="submit" className="w-full" disabled={loading || !otpSent}>
            {loading ? 'Authenticating...' : isSignUp ? 'Join Youth Network' : 'Access Tasks'}
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm"
            >
              {isSignUp ? 'Already registered? Sign In' : 'New youth? Register'}
            </Button>
          </div>
        </form>

        <div className="mt-6 p-3 bg-emerald-50 rounded-md">
          <div className="flex items-start space-x-2">
            <Star className="w-4 h-4 text-emerald-600 mt-0.5" />
            <div className="text-xs">
              <p><strong>Youth Features:</strong></p>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>Growth progress tracking</li>
                <li>Task completion rewards</li>
                <li>Mentor connection access</li>
                <li>Bursary eligibility scoring</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
