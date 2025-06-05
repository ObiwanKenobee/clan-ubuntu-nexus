
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Phone, Mail, Users, Shield, Globe, Mic } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ElderAuth } from '@/components/auth/ElderAuth';
import { YouthAuth } from '@/components/auth/YouthAuth';
import { WomenAuth } from '@/components/auth/WomenAuth';
import { DiasporaAuth } from '@/components/auth/DiasporaAuth';
import { TechStewardAuth } from '@/components/auth/TechStewardAuth';
import { CivicAuth } from '@/components/auth/CivicAuth';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Redirect authenticated users to main dashboard
          navigate('/');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const roleDefinitions = [
    {
      id: 'elder',
      title: '🧓 Elders',
      description: 'Council leaders with override permissions',
      auth: 'PIN + Voice Signature',
      backup: 'Kiosk access + Clan Steward override',
      icon: Shield,
      color: 'bg-ochre-500'
    },
    {
      id: 'youth',
      title: '👩‍🦱 Youth',
      description: 'Growing members earning trust tokens',
      auth: 'Phone + OTP + Role Badge',
      backup: 'USSD flow with branch ID',
      icon: Users,
      color: 'bg-emerald-500'
    },
    {
      id: 'women',
      title: '👩‍🍼 Women/Mothers',
      description: 'Family health and memory keepers',
      auth: 'Phone + Assisted Face ID',
      backup: 'SMS + Elder Proxy Verification',
      icon: Phone,
      color: 'bg-sienna-500'
    },
    {
      id: 'diaspora',
      title: '🧑‍💼 Diaspora',
      description: 'Members abroad contributing remotely',
      auth: 'Email + OTP + ClanKey Phrase',
      backup: 'Mobile App + Elder invite verification',
      icon: Globe,
      color: 'bg-primary'
    },
    {
      id: 'tech',
      title: '🧑‍🔧 Tech Stewards',
      description: 'System administrators and sync managers',
      auth: 'Credentialed login + Multi-role switching',
      backup: 'Manual device pairing at Kiosk',
      icon: Shield,
      color: 'bg-secondary'
    },
    {
      id: 'civic',
      title: '🏛️ County/NGO',
      description: 'Government and NGO partners',
      auth: 'OAuth or API key via Government Portal',
      backup: 'Smart card login or admin whitelist',
      icon: Mail,
      color: 'bg-muted'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ochre-50 via-background to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-16 h-16 clan-gradient rounded-full flex items-center justify-center animate-pulse-ubuntu">
              <span className="text-white font-bold text-2xl">🌳</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">AEGIS ClanChain</h1>
              <p className="text-muted-foreground">Ethically Intelligent Access Design</p>
            </div>
          </div>
          
          {/* Principles Banner */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
            <Badge variant="outline" className="text-xs p-2">Ancestral Identity</Badge>
            <Badge variant="outline" className="text-xs p-2">Role-Based Access</Badge>
            <Badge variant="outline" className="text-xs p-2">Consent-First</Badge>
            <Badge variant="outline" className="text-xs p-2">Trust-Weighted</Badge>
            <Badge variant="outline" className="text-xs p-2">Offline Ready</Badge>
          </div>
        </div>

        {/* Role Selection Tabs */}
        <Tabs defaultValue="elder" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-6 bg-white/60 backdrop-blur-sm">
            {roleDefinitions.map((role) => (
              <TabsTrigger
                key={role.id}
                value={role.id}
                className="flex flex-col items-center space-y-1 p-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <role.icon className="w-4 h-4" />
                <span className="text-xs hidden sm:inline">{role.title.split(' ')[1]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Role Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {roleDefinitions.map((role) => (
              <Card key={role.id} className="bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 ${role.color} rounded-full flex items-center justify-center`}>
                      <role.icon className="w-4 h-4 text-white" />
                    </div>
                    <CardTitle className="text-sm">{role.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground mb-2">{role.description}</p>
                  <div className="space-y-1">
                    <p className="text-xs"><strong>Primary:</strong> {role.auth}</p>
                    <p className="text-xs"><strong>Backup:</strong> {role.backup}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Authentication Forms */}
          <TabsContent value="elder">
            <ElderAuth />
          </TabsContent>

          <TabsContent value="youth">
            <YouthAuth />
          </TabsContent>

          <TabsContent value="women">
            <WomenAuth />
          </TabsContent>

          <TabsContent value="diaspora">
            <DiasporaAuth />
          </TabsContent>

          <TabsContent value="tech">
            <TechStewardAuth />
          </TabsContent>

          <TabsContent value="civic">
            <CivicAuth />
          </TabsContent>
        </Tabs>

        {/* Innovation Features Footer */}
        <Card className="mt-6 bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-sm flex items-center space-x-2">
              <Mic className="w-4 h-4" />
              <span>Authentication Innovations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <p><strong>🔊 Voice Signature Recognition:</strong> Respects oral tradition</p>
                <p><strong>🛡️ Ethical Risk Flagging:</strong> Consensus-based overrides</p>
                <p><strong>📱 Offline Family Link:</strong> Text-based verification</p>
              </div>
              <div>
                <p><strong>🌟 RoleToken Engine:</strong> Evolving trust-based permissions</p>
                <p><strong>🔒 Ethics-First Consent:</strong> Transparent data sharing</p>
                <p><strong>🎭 Login-Ritual Feature:</strong> Cultural theme integration</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
