
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Shield, Users, Heart, Globe, 
  Settings, Mic, Calendar, TreePine,
  Award, Target, TrendingUp, Star
} from 'lucide-react';

interface ArchetypeProfile {
  id: string;
  icon: React.ComponentType<any>;
  titleKey: string;
  description: string;
  primaryActions: string[];
  culturalRole: string;
  trustLevel: number;
  completedJourney: number;
}

const archetypeProfiles: { [key: string]: ArchetypeProfile } = {
  elder: {
    id: 'elder',
    icon: Shield,
    titleKey: 'elder_council',
    description: 'Sacred keeper of wisdom, traditions, and community governance',
    primaryActions: ['Record wisdom', 'Resolve disputes', 'Bless decisions', 'Guide youth'],
    culturalRole: 'Ancestral bridge and moral compass',
    trustLevel: 95,
    completedJourney: 78
  },
  youth: {
    id: 'youth',
    icon: Users,
    titleKey: 'youth_growth',
    description: 'Growing in wisdom, earning trust, building future leadership',
    primaryActions: ['Complete tasks', 'Learn traditions', 'Support elders', 'Build skills'],
    culturalRole: 'Future leader and cultural continuity',
    trustLevel: 67,
    completedJourney: 45
  },
  women: {
    id: 'women',
    icon: Heart,
    titleKey: 'family_care',
    description: 'Heartbeat of the family, keeper of health and harmony',
    primaryActions: ['Manage health', 'Preserve memory', 'Nurture family', 'Support community'],
    culturalRole: 'Life sustainer and wisdom keeper',
    trustLevel: 89,
    completedJourney: 72
  },
  diaspora: {
    id: 'diaspora',
    icon: Globe,
    titleKey: 'diaspora_bridge',
    description: 'Bridge between home and world, supporter of clan growth',
    primaryActions: ['Send support', 'Share knowledge', 'Connect networks', 'Invest in future'],
    culturalRole: 'Global ambassador and resource bridge',
    trustLevel: 82,
    completedJourney: 56
  }
};

interface ArchetypePersonalizationProps {
  archetype: string;
  onPersonalize?: (preferences: any) => void;
}

export const ArchetypePersonalization: React.FC<ArchetypePersonalizationProps> = ({ 
  archetype, 
  onPersonalize 
}) => {
  const { translate, currentLanguage } = useLanguage();
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  
  const profile = archetypeProfiles[archetype];
  if (!profile) return null;

  const Icon = profile.icon;

  const culturalPreferences = [
    { id: 'voice_first', icon: Mic, label: 'Voice-first interface' },
    { id: 'lunar_calendar', icon: Calendar, label: 'Lunar calendar integration' },
    { id: 'ancestral_tree', icon: TreePine, label: 'Ancestral tree focus' },
    { id: 'ubuntu_consensus', icon: Users, label: 'Ubuntu consensus model' },
    { id: 'ritual_guidance', icon: Star, label: 'Ritual guidance system' }
  ];

  const togglePreference = (prefId: string) => {
    setSelectedPreferences(prev => 
      prev.includes(prefId) 
        ? prev.filter(id => id !== prefId)
        : [...prev, prefId]
    );
  };

  const handlePersonalize = () => {
    if (onPersonalize) {
      onPersonalize({
        archetype,
        language: currentLanguage.code,
        preferences: selectedPreferences,
        profile
      });
    }
  };

  return (
    <Card className="bg-gradient-to-r from-primary/10 to-emerald/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl">{translate(profile.titleKey)}</h3>
            <p className="text-sm text-muted-foreground">{profile.description}</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Cultural Role & Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white/60 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-4 h-4 text-ochre-600" />
              <span className="font-medium text-sm">Cultural Role</span>
            </div>
            <p className="text-xs text-muted-foreground">{profile.culturalRole}</p>
          </div>
          <div className="p-4 bg-white/60 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span className="font-medium text-sm">Trust Level</span>
            </div>
            <div className="flex items-center space-x-2">
              <Progress value={profile.trustLevel} className="flex-1 h-2" />
              <span className="text-xs font-medium">{profile.trustLevel}%</span>
            </div>
          </div>
        </div>

        {/* Primary Actions */}
        <div>
          <h4 className="font-medium text-sm mb-3 flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>Your Primary Actions</span>
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {profile.primaryActions.map((action, index) => (
              <Badge key={index} variant="outline" className="justify-center p-2 text-xs">
                {action}
              </Badge>
            ))}
          </div>
        </div>

        {/* Cultural Preferences */}
        <div>
          <h4 className="font-medium text-sm mb-3 flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Personalize Your Experience</span>
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {culturalPreferences.map((pref) => {
              const PrefIcon = pref.icon;
              const isSelected = selectedPreferences.includes(pref.id);
              return (
                <Button
                  key={pref.id}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  className="justify-start h-auto p-3"
                  onClick={() => togglePreference(pref.id)}
                >
                  <PrefIcon className="w-4 h-4 mr-2" />
                  <span className="text-sm">{pref.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Journey Progress */}
        <div className="p-4 bg-gradient-to-r from-emerald-50 to-primary-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-sm">Your Cultural Journey</span>
            <span className="text-sm font-bold">{profile.completedJourney}%</span>
          </div>
          <Progress value={profile.completedJourney} className="h-3 mb-2" />
          <p className="text-xs text-muted-foreground">
            Continue growing in your role as a {profile.culturalRole.toLowerCase()}
          </p>
        </div>

        <Button 
          onClick={handlePersonalize} 
          className="w-full"
          disabled={selectedPreferences.length === 0}
        >
          Personalize My Dashboard
        </Button>
      </CardContent>
    </Card>
  );
};
