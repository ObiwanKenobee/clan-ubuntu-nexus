
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const CulturalMemoryWall = () => {
  const memories = [
    {
      id: 1,
      title: 'The Great Migration of 1963',
      contributor: 'Mzee Joseph Ongeri',
      type: 'story',
      icon: '📜',
      preview: 'When our family first moved from the hills to establish our current homestead...',
      date: '1963',
      verified: true
    },
    {
      id: 2,
      title: 'Traditional Wedding Ceremony',
      contributor: 'Mama Grace Nyakundi',
      type: 'photo',
      icon: '📸',
      preview: 'Original photos from the union ceremony of 1965',
      date: '1965',
      verified: true
    },
    {
      id: 3,
      title: 'Healing Herb Knowledge',
      contributor: 'Elder Mary Kemunto',
      type: 'voice',
      icon: '🎵',
      preview: 'Audio recording of traditional medicine practices',
      date: '2023',
      verified: false
    },
    {
      id: 4,
      title: 'Land Boundary Stories',
      contributor: 'Mzee Peter Nyakundi',
      type: 'map',
      icon: '🗺️',
      preview: 'Oral history of how the land was divided among brothers',
      date: '1970s',
      verified: true
    }
  ];

  const rituals = [
    { name: 'Naming Ceremony', icon: '👶', description: 'Traditional child naming rites' },
    { name: 'Coming of Age', icon: '🌱', description: 'Youth transition ceremonies' },
    { name: 'Marriage Rites', icon: '💕', description: 'Traditional wedding customs' },
    { name: 'Elder Honor', icon: '👑', description: 'Celebration of wisdom keepers' },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white/60 backdrop-blur-sm border-ochre-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-2xl">🕊️</span>
            <span>Cultural Memory Wall</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Preserve and share our ancestral wisdom, stories, and traditions
          </p>
        </CardHeader>
        <CardContent>
          {/* Upload Section */}
          <Card className="mb-6 bg-gradient-to-r from-ochre-50 to-sienna-50 border-ochre-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">🖼️ Share a Memory</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
                    <span className="text-2xl">📸</span>
                    <span className="text-sm">Photo</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
                    <span className="text-2xl">🎵</span>
                    <span className="text-sm">Voice</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
                    <span className="text-2xl">📜</span>
                    <span className="text-sm">Story</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
                    <span className="text-2xl">🗺️</span>
                    <span className="text-sm">Location</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Memory Timeline */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">📚 Family Heritage</h3>
            <div className="space-y-4">
              {memories.map(memory => (
                <Card key={memory.id} className="hover:shadow-md transition-all bg-white/80">
                  <CardContent className="pt-4">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{memory.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{memory.title}</h4>
                          {memory.verified && <span className="text-emerald-500">✓</span>}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{memory.preview}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{memory.type}</Badge>
                            <span className="text-xs text-muted-foreground">by {memory.contributor}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{memory.date}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Ritual Calendar */}
          <Card className="bg-gradient-to-r from-emerald-50 to-ochre-50 border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>🛕</span>
                <span>Cultural Rituals & Ceremonies</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rituals.map((ritual, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                    <span className="text-2xl">{ritual.icon}</span>
                    <div>
                      <h4 className="font-medium">{ritual.name}</h4>
                      <p className="text-sm text-muted-foreground">{ritual.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline">View Ritual Calendar</Button>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
