
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Globe, 
  Calendar, 
  Music, 
  Book, 
  Users, 
  Star,
  MapPin,
  Languages
} from 'lucide-react';

const culturalRegions = [
  {
    id: 'east_africa',
    name: 'East Africa',
    countries: ['Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'Burundi'],
    languages: ['Swahili', 'Kikuyu', 'Luo', 'Kinyarwanda'],
    governance: 'Elder Council with Chief Elder',
    traditions: ['Harambee', 'Ubuntu Philosophy', 'Age Set Systems']
  },
  {
    id: 'west_africa',
    name: 'West Africa',
    countries: ['Nigeria', 'Ghana', 'Senegal', 'Mali', 'Burkina Faso'],
    languages: ['Yoruba', 'Igbo', 'Hausa', 'Akan', 'Wolof'],
    governance: 'Consensus-based with Royal Hierarchy',
    traditions: ['Griot Storytelling', 'Masquerade Festivals', 'Market Day Councils']
  },
  {
    id: 'southern_africa',
    name: 'Southern Africa',
    countries: ['South Africa', 'Zimbabwe', 'Botswana', 'Namibia', 'Zambia'],
    languages: ['Zulu', 'Xhosa', 'Shona', 'Tswana', 'Ndebele'],
    governance: 'Traditional Courts with Modern Integration',
    traditions: ['Lobola Negotiations', 'Rainmaking Ceremonies', 'Praise Poetry']
  },
  {
    id: 'central_africa',
    name: 'Central Africa',
    countries: ['DRC', 'Cameroon', 'CAR', 'Chad', 'Gabon'],
    languages: ['Lingala', 'Sango', 'Fang', 'Sara'],
    governance: 'Forest Council Systems',
    traditions: ['Ancestral Forest Rituals', 'Initiation Schools', 'Drum Communication']
  }
];

const culturalFeatures = [
  {
    category: 'Language',
    features: [
      'Multi-language interface (100+ African languages)',
      'Voice input in local dialects',
      'Cultural phrase translation',
      'Traditional greeting protocols'
    ]
  },
  {
    category: 'Governance',
    features: [
      'Customizable decision-making protocols',
      'Regional conflict resolution styles',
      'Traditional court procedures',
      'Consensus-building mechanisms'
    ]
  },
  {
    category: 'Ceremonies',
    features: [
      'Region-specific rite templates',
      'Cultural calendar integration',
      'Traditional music libraries',
      'Sacred space documentation'
    ]
  },
  {
    category: 'Social',
    features: [
      'Kinship mapping systems',
      'Age grade organization',
      'Gender role customization',
      'Diaspora connection protocols'
    ]
  }
];

export const CulturalAdaptations = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const currentRegion = culturalRegions.find(r => r.id === selectedRegion);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-6 h-6 text-primary" />
            <span>Cultural Adaptation Center</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Your Region</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose cultural region" />
                </SelectTrigger>
                <SelectContent>
                  {culturalRegions.map((region) => (
                    <SelectItem key={region.id} value={region.id}>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{region.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {currentRegion && (
              <div>
                <label className="block text-sm font-medium mb-2">Select Your Country</label>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose country" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentRegion.countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {currentRegion && (
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-3 flex items-center space-x-2">
                  <Star className="w-5 h-5 text-primary" />
                  <span>{currentRegion.name} Cultural Profile</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center space-x-1">
                      <Languages className="w-4 h-4" />
                      <span>Primary Languages</span>
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {currentRegion.languages.map((lang) => (
                        <Badge key={lang} variant="outline">{lang}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>Governance Style</span>
                    </h4>
                    <p className="text-sm text-muted-foreground">{currentRegion.governance}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium mb-2 flex items-center space-x-1">
                    <Book className="w-4 h-4" />
                    <span>Key Traditions</span>
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {currentRegion.traditions.map((tradition) => (
                      <Badge key={tradition} className="bg-primary/10 text-primary">{tradition}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {culturalFeatures.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {feature.category === 'Language' && <Languages className="w-5 h-5 text-blue-600" />}
                {feature.category === 'Governance' && <Users className="w-5 h-5 text-green-600" />}
                {feature.category === 'Ceremonies' && <Calendar className="w-5 h-5 text-purple-600" />}
                {feature.category === 'Social' && <Star className="w-5 h-5 text-orange-600" />}
                <span>{feature.category} Features</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {feature.features.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedRegion && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Activate Cultural Customization</h3>
              <p className="text-muted-foreground mb-4">
                Apply {currentRegion?.name} cultural settings to your clan platform
              </p>
              <Button className="mr-2">Apply Settings</Button>
              <Button variant="outline">Preview Changes</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
