
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Languages, Globe } from 'lucide-react';
import { useLanguage, AFRICAN_LANGUAGES, Language } from '@/contexts/LanguageContext';

export const LanguageSelector: React.FC = () => {
  const { currentLanguage, setLanguage, getLanguagesByRegion } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const regions = ['East Africa', 'West Africa', 'Southern Africa', 'Central Africa', 'North Africa', 'International'];

  const handleLanguageSelect = (language: Language) => {
    setLanguage(language);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <Globe className="w-4 h-4" />
          <span className="text-lg">{currentLanguage.flag}</span>
          <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
          <span className="sm:hidden">{currentLanguage.code.toUpperCase()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <Languages className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">African Languages</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Choose your preferred language for the platform
          </p>
        </div>
        <ScrollArea className="h-96">
          <div className="p-2">
            {regions.map((region) => {
              const regionLanguages = getLanguagesByRegion(region);
              if (regionLanguages.length === 0) return null;
              
              return (
                <div key={region} className="mb-4">
                  <div className="px-2 py-1">
                    <Badge variant="outline" className="text-xs">
                      {region}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    {regionLanguages.map((language) => (
                      <Button
                        key={language.code}
                        variant={currentLanguage.code === language.code ? "default" : "ghost"}
                        className="w-full justify-start h-auto p-2"
                        onClick={() => handleLanguageSelect(language)}
                      >
                        <div className="flex items-center space-x-3 w-full">
                          <span className="text-lg">{language.flag}</span>
                          <div className="flex-1 text-left">
                            <div className="font-medium">{language.nativeName}</div>
                            <div className="text-xs text-muted-foreground">{language.name}</div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
