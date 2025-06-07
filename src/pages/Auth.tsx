
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Globe, Shield, Users, Zap } from 'lucide-react';
import { LanguageSelector } from '@/components/ui/language-selector';
import { useLanguage } from '@/contexts/LanguageContext';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'elder' | 'youth' | 'women' | 'diaspora' | 'tech_steward'>('youth');
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();
  const { translate } = useLanguage();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await login(email, password);
    if (success) {
      navigate('/');
    }
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await register({ email, password, name, role });
    if (success) {
      navigate('/');
    }
    setIsLoading(false);
  };

  const roles = [
    { value: 'elder', label: 'Elder Council', icon: Shield, color: 'bg-amber-500' },
    { value: 'youth', label: 'Youth Growth', icon: Zap, color: 'bg-emerald-500' },
    { value: 'women', label: 'Women Leadership', icon: Users, color: 'bg-pink-500' },
    { value: 'diaspora', label: 'Diaspora Bridge', icon: Globe, color: 'bg-blue-500' },
    { value: 'tech_steward', label: 'Tech Steward', icon: Zap, color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ochre-50 via-background to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 clan-gradient rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">🌳</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">AEGIS Portal</h1>
          <p className="text-muted-foreground">{translate('welcome')} to ClanChain</p>
          <div className="mt-4">
            <LanguageSelector />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Access Your Clan Network</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-name">Full Name</Label>
                    <Input
                      id="reg-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role in Community</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {roles.map((roleOption) => (
                        <Button
                          key={roleOption.value}
                          type="button"
                          variant={role === roleOption.value ? "default" : "outline"}
                          className={`w-full justify-start ${role === roleOption.value ? roleOption.color : ''}`}
                          onClick={() => setRole(roleOption.value as any)}
                        >
                          <roleOption.icon className="w-4 h-4 mr-2" />
                          {roleOption.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Badge variant="outline">Secure • Decentralized • Cultural</Badge>
        </div>
      </div>
    </div>
  );
};

export default Auth;
