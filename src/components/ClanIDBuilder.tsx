
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FamilyMember {
  id: string;
  name: string;
  role: 'elder' | 'parent' | 'youth' | 'child';
  birthYear: number;
  location: string;
  relationship: string;
  verified: boolean;
  stories: string[];
}

const initialMembers: FamilyMember[] = [
  {
    id: '1',
    name: 'Mama Grace Nyakundi',
    role: 'elder',
    birthYear: 1945,
    location: 'Kisii Central',
    relationship: 'Clan Matriarch',
    verified: true,
    stories: ['Led the family through the coffee boom of the 1970s', 'Keeper of traditional medicine knowledge']
  },
  {
    id: '2',
    name: 'Mzee Joseph Ongeri',
    role: 'elder',
    birthYear: 1940,
    location: 'Keroka',
    relationship: 'Clan Patriarch',
    verified: true,
    stories: ['First in family to get formal education', 'Built the first permanent house in 1968']
  },
  {
    id: '3',
    name: 'Dr. Sarah Bosire',
    role: 'parent',
    birthYear: 1975,
    location: 'Nairobi',
    relationship: 'Daughter of Grace',
    verified: true,
    stories: ['First family member to become a doctor', 'Established clinic in Keroka']
  },
  {
    id: '4',
    name: 'James Moindi',
    role: 'youth',
    birthYear: 2000,
    location: 'University of Nairobi',
    relationship: 'Son of Sarah',
    verified: false,
    stories: ['Engineering student', 'Youth representative in clan meetings']
  }
];

export const ClanIDBuilder = () => {
  const [members, setMembers] = useState<FamilyMember[]>(initialMembers);
  const [viewMode, setViewMode] = useState<'tree' | 'timeline' | 'inheritance'>('tree');
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  const getRoleColor = (role: FamilyMember['role']) => {
    switch (role) {
      case 'elder': return 'bg-ochre-500 text-white';
      case 'parent': return 'bg-sienna-500 text-white';
      case 'youth': return 'bg-emerald-500 text-white';
      case 'child': return 'bg-emerald-300 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const ViewModeToggle = () => (
    <div className="flex space-x-2 mb-6">
      <Button
        variant={viewMode === 'tree' ? 'default' : 'outline'}
        onClick={() => setViewMode('tree')}
        className="flex items-center space-x-2"
      >
        <span>🌳</span>
        <span>Family Tree</span>
      </Button>
      <Button
        variant={viewMode === 'timeline' ? 'default' : 'outline'}
        onClick={() => setViewMode('timeline')}
        className="flex items-center space-x-2"
      >
        <span>📅</span>
        <span>Timeline</span>
      </Button>
      <Button
        variant={viewMode === 'inheritance' ? 'default' : 'outline'}
        onClick={() => setViewMode('inheritance')}
        className="flex items-center space-x-2"
      >
        <span>🏠</span>
        <span>Property</span>
      </Button>
    </div>
  );

  const FamilyTreeView = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">Abagusii Family Lineage</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {members
            .filter(member => member.role === 'elder')
            .map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-medium mb-3 text-center">Parents & Adults</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {members
              .filter(member => member.role === 'parent')
              .map(member => (
                <MemberCard key={member.id} member={member} />
              ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-3 text-center">Youth & Children</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {members
              .filter(member => ['youth', 'child'].includes(member.role))
              .map(member => (
                <MemberCard key={member.id} member={member} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const MemberCard = ({ member }: { member: FamilyMember }) => (
    <Card 
      className="w-64 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm"
      onClick={() => setSelectedMember(member)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{member.name}</CardTitle>
          {member.verified && <span className="text-emerald-500">✓</span>}
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={getRoleColor(member.role)}>{member.role}</Badge>
          <span className="text-sm text-muted-foreground">Born {member.birthYear}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">📍 {member.location}</p>
        <p className="text-sm font-medium">{member.relationship}</p>
        {member.stories.length > 0 && (
          <div className="mt-2">
            <span className="text-xs text-emerald-600">{member.stories.length} stories</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card className="bg-white/60 backdrop-blur-sm border-ochre-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-2xl">🌳</span>
            <span>Clan ID Builder</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Build and maintain your family lineage, relationships, and cultural heritage
          </p>
        </CardHeader>
        <CardContent>
          <ViewModeToggle />
          
          {viewMode === 'tree' && <FamilyTreeView />}
          
          {viewMode === 'timeline' && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-4">Family Timeline</h3>
              <div className="space-y-4">
                {members
                  .sort((a, b) => a.birthYear - b.birthYear)
                  .map(member => (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-white rounded-lg border-l-4 border-emerald-500">
                      <div>
                        <span className="font-medium">{member.birthYear}</span> - <span className="font-semibold">{member.name}</span>
                      </div>
                      <Badge className={getRoleColor(member.role)}>{member.role}</Badge>
                    </div>
                  ))}
              </div>
            </div>
          )}
          
          {viewMode === 'inheritance' && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-4">Property & Inheritance Chain</h3>
              <div className="bg-amber-50 border-l-4 border-ochre-600 p-6 rounded-lg">
                <p className="text-lg font-medium">🏠 Ancestral Land Documentation</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Digital records of land titles, inheritance patterns, and property transfers within the clan
                </p>
                <Button className="mt-4" variant="outline">
                  Upload Land Documents
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Member Detail Dialog */}
      {selectedMember && (
        <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
          <DialogContent className="max-w-md bg-white/95 backdrop-blur-sm">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <span>{selectedMember.name}</span>
                {selectedMember.verified && <span className="text-emerald-500">✓ Verified by Elder</span>}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Badge className={getRoleColor(selectedMember.role)}>{selectedMember.role}</Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Born {selectedMember.birthYear} • {selectedMember.location}
                </p>
                <p className="font-medium">{selectedMember.relationship}</p>
              </div>
              
              {selectedMember.stories.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Family Stories & Legacy</h4>
                  <div className="space-y-2">
                    {selectedMember.stories.map((story, index) => (
                      <p key={index} className="text-sm bg-emerald-50 p-3 rounded-lg border-l-4 border-emerald-500">
                        {story}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">Edit Details</Button>
                <Button size="sm" variant="outline">Add Story</Button>
                <Button size="sm" variant="outline">Upload Photo</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
