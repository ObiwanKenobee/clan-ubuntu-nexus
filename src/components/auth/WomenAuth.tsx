
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Heart, Phone, Camera } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const WomenAuth = () => {
  const [formData, setFormData] = useState({
    phone: '',
    smsCode: '',
    elderProxy: '',
    faceIdEnabled: false
  });
  const [smsCodeSent, setSmsCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();

  const handleSendSMS = async () => {
    setLoading(true);
    try {
      // Simulate SMS sending
      setTimeout(() => {
        setSmsCodeSent(true);
        setLoading(false);
        toast({
          title: "SMS Sent",
          description: `Verification code sent to ${formData.phone}`,
        });
      }, 1000);
    } catch (error) {
      setLoading(false);
      toast({
        title: "SMS Failed",
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
          email: `${formData.phone}@women.clan`,
          password: formData.smsCode + formData.elderProxy,
          options: {
            data: {
              role: 'women',
              phone: formData.phone,
              elder_proxy: formData.elderProxy,
              face_id_enabled: formData.faceIdEnabled
            }
          }
        });

        if (error) throw error;

        toast({
          title: "Welcome, Sister",
          description: "Your family care access is ready",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: `${formData.phone}@women.clan`,
          password: formData.smsCode + formData.elderProxy,
        });

        if (error) throw error;

        toast({
          title: "Welcome Back",
          description: "Access to family health and memory tools",
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
          <Heart className="w-5 h-5 text-sienna-600" />
          <span>Women & Family Care</span>
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Badge className="bg-sienna-500">Health Keeper</Badge>
          <Badge variant="outline">Memory Guardian</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <Label htmlFor="women-phone">Phone Number</Label>
            <div className="flex space-x-2">
              <Input
                id="women-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+254700123456"
                required
              />
              <Button
                type="button"
                onClick={handleSendSMS}
                disabled={!formData.phone || smsCodeSent || loading}
                className="whitespace-nowrap"
              >
                <Phone className="w-4 h-4 mr-1" />
                {smsCodeSent ? 'Sent' : 'Send SMS'}
              </Button>
            </div>
          </div>

          {smsCodeSent && (
            <div>
              <Label htmlFor="women-sms">SMS Verification Code</Label>
              <Input
                id="women-sms"
                type="text"
                value={formData.smsCode}
                onChange={(e) => setFormData({ ...formData, smsCode: e.target.value })}
                placeholder="Enter SMS code"
                maxLength={6}
                required
              />
            </div>
          )}

          {isSignUp && (
            <>
              <div>
                <Label htmlFor="elder-proxy">Elder Proxy (Optional)</Label>
                <Input
                  id="elder-proxy"
                  type="text"
                  value={formData.elderProxy}
                  onChange={(e) => setFormData({ ...formData, elderProxy: e.target.value })}
                  placeholder="Elder name for verification support"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="face-id"
                  checked={formData.faceIdEnabled}
                  onChange={(e) => setFormData({ ...formData, faceIdEnabled: e.target.checked })}
                />
                <Label htmlFor="face-id" className="flex items-center space-x-2">
                  <Camera className="w-4 h-4" />
                  <span>Enable Assisted Face ID (Optional)</span>
                </Label>
              </div>
            </>
          )}

          <Button type="submit" className="w-full" disabled={loading || !smsCodeSent}>
            {loading ? 'Authenticating...' : isSignUp ? 'Join Family Network' : 'Access Family Tools'}
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm"
            >
              {isSignUp ? 'Already registered? Sign In' : 'New member? Register'}
            </Button>
          </div>
        </form>

        <div className="mt-6 p-3 bg-sienna-50 rounded-md">
          <div className="flex items-start space-x-2">
            <Heart className="w-4 h-4 text-sienna-600 mt-0.5" />
            <div className="text-xs">
              <p><strong>Family Care Features:</strong></p>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>Health alerts and vaccination tracking</li>
                <li>Shared family vault access</li>
                <li>Birth and marriage record keeping</li>
                <li>Safe reporting channels</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
