
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer } from '@/components/ui/responsive-layout';
import { ElderAuth } from '@/components/auth/ElderAuth';
import { YouthAuth } from '@/components/auth/YouthAuth';
import { WomenAuth } from '@/components/auth/WomenAuth';
import { DiasporaAuth } from '@/components/auth/DiasporaAuth';
import { TechStewardAuth } from '@/components/auth/TechStewardAuth';
import { CivicAuth } from '@/components/auth/CivicAuth';
import { Crown, Zap, Heart, Globe, Code, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const Auth = () => {
  const [activeRole, setActiveRole] = useState('elder');

  const authRoles = [
    { id: 'elder', label: 'Elder', icon: Crown, component: ElderAuth },
    { id: 'youth', label: 'Youth', icon: Zap, component: YouthAuth },
    { id: 'women', label: 'Women', icon: Heart, component: WomenAuth },
    { id: 'diaspora', label: 'Diaspora', icon: Globe, component: DiasporaAuth },
    { id: 'tech', label: 'Tech', icon: Code, component: TechStewardAuth },
    { id: 'civic', label: 'Civic', icon: Building, component: CivicAuth }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ochre-50 via-background to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-ochre-200">
        <ResponsiveContainer maxWidth="2xl" className="py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-4">
              <div className="w-10 h-10 clan-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌳</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">ClanChain</h1>
                <p className="text-xs text-muted-foreground">Authentication Portal</p>
              </div>
            </Link>
          </div>
        </ResponsiveContainer>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to ClanChain</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your role to access specialized features designed for your community position
          </p>
        </div>

        <Tabs value={activeRole} onValueChange={setActiveRole} className="max-w-4xl mx-auto">
          {/* Role Selection Tabs */}
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8 bg-white/60 backdrop-blur-sm">
            {authRoles.map((role) => (
              <TabsTrigger
                key={role.id}
                value={role.id}
                className="flex flex-col items-center space-y-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <role.icon className="w-4 h-4" />
                <span className="text-xs">{role.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Authentication Components */}
          {authRoles.map((role) => {
            const AuthComponent = role.component;
            return (
              <TabsContent key={role.id} value={role.id} className="animate-fade-in">
                <AuthComponent />
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Information Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-primary" />
                <span>Traditional Governance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Elders guide community decisions through time-tested wisdom and cultural protocols.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-primary" />
                <span>Innovation & Growth</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Youth drive technological advancement while preserving cultural heritage.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-primary" />
                <span>Global Connection</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Diaspora members bridge continents, sharing resources and maintaining bonds.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Auth;
