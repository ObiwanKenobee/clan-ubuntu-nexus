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
import { LanguageSelector } from '@/components/ui/language-selector';
import { CulturalAdaptations } from '@/components/cultural/CulturalAdaptations';
import { ArchetypePersonalization } from '@/components/archetype/ArchetypePersonalization';
import { VoiceInterface } from '@/components/voice/VoiceInterface';
import { useLanguage, AFRICAN_LANGUAGES } from '@/contexts/LanguageContext';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { translate, currentLanguage } = useLanguage();
  const [selectedArchetype, setSelectedArchetype] = useState('elder');
  const [showPersonalization, setShowPersonalization] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Get user role from metadata and redirect to appropriate dashboard
          const userRole = session.user.user_metadata?.role;
          
          switch (userRole) {
            case 'elder':
              navigate('/elder-dashboard');
              break;
            case 'youth':
              navigate('/youth-dashboard');
              break;
            case 'women':
              navigate('/women-dashboard');
              break;
            case 'diaspora':
              navigate('/diaspora-dashboard');
              break;
            case 'tech_steward':
              navigate('/tech-dashboard');
              break;
            case 'civic':
              navigate('/civic-dashboard');
              break;
            default:
              navigate('/'); // Fallback to main dashboard
          }
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const userRole = session.user.user_metadata?.role;
        
        switch (userRole) {
          case 'elder':
            navigate('/elder-dashboard');
            break;
          case 'youth':
            navigate('/youth-dashboard');
            break;
          case 'women':
            navigate('/women-dashboard');
            break;
          case 'diaspora':
            navigate('/diaspora-dashboard');
            break;
          case 'tech_steward':
            navigate('/tech-dashboard');
            break;
          case 'civic':
            navigate('/civic-dashboard');
            break;
          default:
            navigate('/');
        }
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

  const handlePersonalization = (preferences: any) => {
    console.log('Personalization preferences:', preferences);
    // Store preferences in localStorage or send to backend
    localStorage.setItem('user-preferences', JSON.stringify(preferences));
    setShowPersonalization(false);
  };

  const handleVoiceCommand = (command: string, language: string) => {
    console.log('Voice command received:', command, 'in', language);
    // Process voice commands for accessibility
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ochre-50 via-background to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header with Language Selector */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 clan-gradient rounded-full flex items-center justify-center animate-pulse-ubuntu">
                <span className="text-white font-bold text-2xl">🌳</span>
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold text-foreground">AEGIS ClanChain</h1>
                <p className="text-muted-foreground">{translate('clan_dashboard')}</p>
              </div>
            </div>
            <LanguageSelector />
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Cultural Adaptations */}
          <div className="lg:col-span-1">
            <CulturalAdaptations archetype={selectedArchetype} />
          </div>
          
          {/* Voice Interface */}
          <div className="lg:col-span-1">
            <VoiceInterface
              mode="command"
              title="Voice Authentication"
              onVoiceCommand={handleVoiceCommand}
            />
          </div>
          
          {/* Personalization */}
          <div className="lg:col-span-1">
            {showPersonalization ? (
              <ArchetypePersonalization
                archetype={selectedArchetype}
                onPersonalize={handlePersonalization}
              />
            ) : (
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Personalize Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Customize your dashboard based on your role and cultural preferences
                  </p>
                  <Button onClick={() => setShowPersonalization(true)} className="w-full">
                    Start Personalization
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Role Selection Tabs */}
        <Tabs 
          defaultValue="elder" 
          className="w-full"
          onValueChange={setSelectedArchetype}
        >
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
              <span>Cultural & Accessibility Innovations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <p><strong>🗣️ Multi-Language Voice:</strong> {AFRICAN_LANGUAGES.length}+ African languages</p>
                <p><strong>🌍 Cultural Adaptation:</strong> Ubuntu, lunar calendars, oral traditions</p>
              </div>
              <div>
                <p><strong>🎭 Archetype Personalization:</strong> Role-based interfaces</p>
                <p><strong>🔊 Accessibility First:</strong> Voice navigation for all users</p>
              </div>
              <div>
                <p><strong>📱 Offline Cultural Sync:</strong> SMS and USSD integration</p>
                <p><strong>🕯️ Sacred Technology:</strong> Ritual-aware digital stewardship</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
