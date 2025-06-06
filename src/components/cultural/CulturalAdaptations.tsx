
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Mic, Calendar, Users, Heart, 
  Sunrise, Moon, TreePine, Mountain,
  Drum, Music, BookOpen, Star
} from 'lucide-react';

interface CulturalFeature {
  icon: React.ComponentType<any>;
  titleKey: string;
  description: string;
  archetype: string[];
  culturalContext: string;
}

const culturalFeatures: CulturalFeature[] = [
  {
    icon: Mic,
    titleKey: 'oral_tradition_keeper',
    description: 'Voice-first interface respecting oral storytelling traditions',
    archetype: ['elder', 'women'],
    culturalContext: 'Ubuntu philosophy of collective wisdom'
  },
  {
    icon: Calendar,
    titleKey: 'lunar_calendar_sync',
    description: 'Sync clan activities with lunar phases and traditional calendars',
    archetype: ['elder', 'women', 'youth'],
    culturalContext: 'Traditional time-keeping and ceremonial planning'
  },
  {
    icon: TreePine,
    titleKey: 'ancestral_tree_navigator',
    description: 'Interactive family tree with ancestral blessing protocols',
    archetype: ['elder', 'diaspora'],
    culturalContext: 'Ancestral veneration and lineage respect'
  },
  {
    icon: Heart,
    titleKey: 'ubuntu_consensus_engine',
    description: 'Decision-making based on Ubuntu principles of collective humanity',
    archetype: ['elder', 'youth'],
    culturalContext: 'Ubuntu: "I am because we are"'
  },
  {
    icon: Drum,
    titleKey: 'ritual_rhythm_tracker',
    description: 'Audio-visual guidance for traditional ceremonies and rites',
    archetype: ['elder', 'youth', 'women'],
    culturalContext: 'Rhythm and music in African spiritual practice'
  },
  {
    icon: Mountain,
    titleKey: 'sacred_geography_mapper',
    description: 'Map sacred sites and traditional lands with GPS integration',
    archetype: ['elder', 'diaspora'],
    culturalContext: 'Connection to ancestral lands and sacred spaces'
  }
];

interface CulturalAdaptationsProps {
  archetype: string;
}

export const CulturalAdaptations: React.FC<CulturalAdaptationsProps> = ({ archetype }) => {
  const { translate, currentLanguage } = useLanguage();

  const relevantFeatures = culturalFeatures.filter(feature => 
    feature.archetype.includes(archetype)
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    const greetings: { [key: string]: { morning: string; afternoon: string; evening: string } } = {
      'sw': { morning: 'Habari za asubuhi', afternoon: 'Habari za mchana', evening: 'Habari za jioni' },
      'ha': { morning: 'Barka da safe', afternoon: 'Barka da rana', evening: 'Barka da yamma' },
      'yo': { morning: 'Ẹ káàrọ̀', afternoon: 'Ẹ káasàn', evening: 'Ẹ kálẹ́' },
      'zu': { morning: 'Sawubona ekuseni', afternoon: 'Sawubona emini', evening: 'Sawubona kusihlwa' },
      'am': { morning: 'እንደምን አደሩ', afternoon: 'እንደምን ዋሉ', evening: 'እንደምን አመሹ' },
      'en': { morning: 'Good morning', afternoon: 'Good afternoon', evening: 'Good evening' }
    };

    const langGreetings = greetings[currentLanguage.code] || greetings['en'];
    
    if (hour < 12) return langGreetings.morning;
    if (hour < 17) return langGreetings.afternoon;
    return langGreetings.evening;
  };

  return (
    <Card className="bg-gradient-to-r from-ochre-50 to-sienna-50 border-ochre-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-ochre-600" />
          <span>{getGreeting()}</span>
          <Badge className="ml-2 bg-ochre-500">{currentLanguage.nativeName}</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Cultural features adapted for your community
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relevantFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-4 bg-white/60 rounded-lg border border-ochre-100 hover:border-ochre-200 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-ochre-100 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-ochre-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-1">
                      {translate(feature.titleKey)}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {feature.description}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {feature.culturalContext}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 p-3 bg-primary/10 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="font-medium text-sm">Cultural Learning Path</span>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            Discover how ClanChain honors your cultural heritage through technology
          </p>
          <Button size="sm" variant="outline" className="text-xs">
            Explore Cultural Features
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
