
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Languages, Globe, Search, Filter, Map, Users } from 'lucide-react';
import { useLanguage, AFRICAN_LANGUAGES, Language } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

export const LanguageSelector: React.FC = () => {
  const { currentLanguage, setLanguage, getLanguagesByRegion, getLanguagesByFamily } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState<'region' | 'family'>('region');
  const isMobile = useIsMobile();

  const regions = ['East Africa', 'West Africa', 'Southern Africa', 'Central Africa', 'North Africa', 'International'];
  const families = ['Niger-Congo', 'Afro-Asiatic', 'Nilo-Saharan', 'Khoisan', 'Austronesian', 'Indo-European', 'Creole', 'Sign Language'];

  const handleLanguageSelect = (language: Language) => {
    setLanguage(language);
    setIsOpen(false);
    setSearchQuery('');
  };

  const filteredLanguages = AFRICAN_LANGUAGES.filter(lang => 
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getGroupedLanguages = () => {
    if (filterBy === 'region') {
      return regions.map(region => ({
        name: region,
        languages: getLanguagesByRegion(region).filter(lang => 
          filteredLanguages.includes(lang)
        )
      }));
    } else {
      return families.map(family => ({
        name: family,
        languages: getLanguagesByFamily(family).filter(lang => 
          filteredLanguages.includes(lang)
        )
      }));
    }
  };

  const getLanguageFamilyIcon = (family: string) => {
    switch (family) {
      case 'Niger-Congo': return '🌳';
      case 'Afro-Asiatic': return '🏺';
      case 'Nilo-Saharan': return '🌊';
      case 'Khoisan': return '👆';
      case 'Austronesian': return '🏝️';
      case 'Indo-European': return '🌍';
      case 'Creole': return '🤝';
      case 'Sign Language': return '🤟';
      default: return '📜';
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className={`flex items-center space-x-2 ${currentLanguage.rtl ? 'flex-row-reverse' : ''}`}
          size={isMobile ? "sm" : "default"}
        >
          <Globe className="w-4 h-4" />
          <span className="text-lg">{currentLanguage.flag}</span>
          <span className={`${isMobile ? 'hidden' : 'hidden sm:inline'} truncate max-w-20`}>
            {currentLanguage.nativeName}
          </span>
          <span className="sm:hidden text-xs">{currentLanguage.code.toUpperCase()}</span>
          {currentLanguage.family && (
            <span className="text-xs opacity-60">
              {getLanguageFamilyIcon(currentLanguage.family)}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className={`w-80 sm:w-96 p-0 ${currentLanguage.rtl ? 'text-right' : 'text-left'}`} 
        align="end"
        side={isMobile ? "bottom" : "bottom"}
      >
        {/* Header */}
        <div className="p-4 border-b bg-gradient-to-r from-ochre-50 to-emerald-50">
          <div className="flex items-center space-x-2 mb-2">
            <Languages className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">African Languages</h3>
            <Badge variant="outline" className="text-xs">
              {AFRICAN_LANGUAGES.length}+ languages
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Choose your preferred language for the platform
          </p>
        </div>

        {/* Search and Filter */}
        <div className="p-3 border-b space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search languages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-sm"
            />
          </div>
          
          <Tabs value={filterBy} onValueChange={(value) => setFilterBy(value as 'region' | 'family')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="region" className="flex items-center space-x-1">
                <Map className="w-3 h-3" />
                <span className="text-xs">Region</span>
              </TabsTrigger>
              <TabsTrigger value="family" className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span className="text-xs">Family</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Languages List */}
        <ScrollArea className="h-80 sm:h-96">
          <div className="p-2">
            {getGroupedLanguages().map((group) => {
              if (group.languages.length === 0) return null;
              
              return (
                <div key={group.name} className="mb-4">
                  <div className="px-2 py-1 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
                    <Badge variant="outline" className="text-xs flex items-center space-x-1">
                      {filterBy === 'family' && (
                        <span>{getLanguageFamilyIcon(group.name)}</span>
                      )}
                      <span>{group.name}</span>
                      <span className="opacity-60">({group.languages.length})</span>
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    {group.languages.map((language) => (
                      <Button
                        key={language.code}
                        variant={currentLanguage.code === language.code ? "default" : "ghost"}
                        className={`w-full justify-start h-auto p-3 ${language.rtl ? 'text-right' : 'text-left'}`}
                        onClick={() => handleLanguageSelect(language)}
                      >
                        <div className={`flex items-center space-x-3 w-full ${language.rtl ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <span className="text-lg flex-shrink-0">{language.flag}</span>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{language.nativeName}</div>
                            <div className="text-xs text-muted-foreground truncate">
                              {language.name}
                              {language.family && (
                                <span className="ml-1 opacity-60">
                                  • {getLanguageFamilyIcon(language.family)} {language.family}
                                </span>
                              )}
                            </div>
                            {language.script && language.script !== 'Latin' && (
                              <div className="text-xs text-primary/60">
                                {language.script} script
                              </div>
                            )}
                          </div>
                          {currentLanguage.code === language.code && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                          )}
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              );
            })}
            
            {filteredLanguages.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No languages found</p>
                <p className="text-xs">Try adjusting your search terms</p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-3 border-t bg-muted/30">
          <div className="text-xs text-muted-foreground space-y-1">
            <p className="flex items-center justify-between">
              <span>Currently selected:</span>
              <Badge variant="secondary" className="text-xs">
                {currentLanguage.flag} {currentLanguage.nativeName}
              </Badge>
            </p>
            {currentLanguage.family && (
              <p className="flex items-center justify-between">
                <span>Language family:</span>
                <span>{getLanguageFamilyIcon(currentLanguage.family)} {currentLanguage.family}</span>
              </p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
