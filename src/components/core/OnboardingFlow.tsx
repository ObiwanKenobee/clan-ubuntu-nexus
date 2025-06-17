
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { searchClans, createClan } from '@/api/clanAPI';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ArrowRight, ArrowLeft, Users, Crown, Globe } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const { user, updateUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({
    role: '',
    region: '',
    clanChoice: 'existing',
    selectedClan: '',
    newClanName: '',
    interests: [] as string[],
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const { data: availableClans } = useQuery({
    queryKey: ['search-clans', onboardingData.region],
    queryFn: async () => {
      if (!onboardingData.region) return { data: [] };
      const response = await searchClans('', onboardingData.region);
      return response.success ? response.data : [];
    },
    enabled: !!onboardingData.region && onboardingData.clanChoice === 'existing',
  });

  const createClanMutation = useMutation({
    mutationFn: createClan,
    onSuccess: (data) => {
      if (data.success && data.data) {
        updateUser({ clan_id: data.data.clan_id });
        toast.success('Clan created successfully!');
        onComplete();
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to create clan: ${error.message}`);
    },
  });

  const handleStepComplete = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleOnboardingComplete();
    }
  };

  const handleOnboardingComplete = () => {
    if (onboardingData.clanChoice === 'new') {
      createClanMutation.mutate({
        name: onboardingData.newClanName,
        region: onboardingData.region,
        elders: user?.uid ? [user.uid] : [],
        members: user?.uid ? [user.uid] : [],
        covenant_status: 'active',
      });
    } else {
      // Join existing clan logic would go here
      updateUser({ clan_id: onboardingData.selectedClan });
      toast.success('Welcome to your clan!');
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return onboardingData.role;
      case 2:
        return onboardingData.region;
      case 3:
        return onboardingData.clanChoice === 'new' 
          ? onboardingData.newClanName 
          : onboardingData.selectedClan;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <Crown className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">Choose Your Role</h2>
              <p className="text-muted-foreground">
                Select the role that best represents your position in the community
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 'elder', label: 'Elder', description: 'Community leader and decision maker' },
                { value: 'youth', label: 'Youth', description: 'Young community member' },
                { value: 'women', label: 'Women', description: 'Women\'s group representative' },
                { value: 'diaspora', label: 'Diaspora', description: 'Living away from homeland' },
              ].map((role) => (
                <Button
                  key={role.value}
                  variant={onboardingData.role === role.value ? 'default' : 'outline'}
                  className="h-auto p-4 text-left"
                  onClick={() => setOnboardingData(prev => ({ ...prev, role: role.value }))}
                >
                  <div>
                    <div className="font-medium">{role.label}</div>
                    <div className="text-sm text-muted-foreground">{role.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <Globe className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">Select Your Region</h2>
              <p className="text-muted-foreground">
                Choose the region where your community is located
              </p>
            </div>
            <Select
              value={onboardingData.region}
              onValueChange={(value) => setOnboardingData(prev => ({ ...prev, region: value }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="west-africa">West Africa</SelectItem>
                <SelectItem value="east-africa">East Africa</SelectItem>
                <SelectItem value="central-africa">Central Africa</SelectItem>
                <SelectItem value="southern-africa">Southern Africa</SelectItem>
                <SelectItem value="diaspora">Diaspora</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">Join or Create Clan</h2>
              <p className="text-muted-foreground">
                Join an existing clan or create a new one
              </p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={onboardingData.clanChoice === 'existing' ? 'default' : 'outline'}
                  onClick={() => setOnboardingData(prev => ({ ...prev, clanChoice: 'existing' }))}
                >
                  Join Existing
                </Button>
                <Button
                  variant={onboardingData.clanChoice === 'new' ? 'default' : 'outline'}
                  onClick={() => setOnboardingData(prev => ({ ...prev, clanChoice: 'new' }))}
                >
                  Create New
                </Button>
              </div>

              {onboardingData.clanChoice === 'existing' && (
                <Select
                  value={onboardingData.selectedClan}
                  onValueChange={(value) => setOnboardingData(prev => ({ ...prev, selectedClan: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a clan to join" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableClans?.map((clan) => (
                      <SelectItem key={clan.clan_id} value={clan.clan_id}>
                        {clan.name} ({clan.members.length} members)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {onboardingData.clanChoice === 'new' && (
                <div>
                  <Label htmlFor="clan-name">Clan Name</Label>
                  <Input
                    id="clan-name"
                    value={onboardingData.newClanName}
                    onChange={(e) => setOnboardingData(prev => ({ ...prev, newClanName: e.target.value }))}
                    placeholder="Enter your clan name"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Crown className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Welcome to ClanChain!</h2>
            <p className="text-muted-foreground">
              You're all set up and ready to start your journey with the community.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2">Your Profile</h3>
              <p className="text-sm text-muted-foreground">
                Role: {onboardingData.role} • Region: {onboardingData.region}
              </p>
              <p className="text-sm text-muted-foreground">
                Clan: {onboardingData.clanChoice === 'new' ? onboardingData.newClanName : 'Selected clan'}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ochre-50 to-emerald-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderStep()}

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <Button
              onClick={handleStepComplete}
              disabled={!canProceed() || createClanMutation.isPending}
              className="flex items-center space-x-2"
            >
              <span>
                {currentStep === totalSteps 
                  ? (createClanMutation.isPending ? 'Setting up...' : 'Complete') 
                  : 'Next'
                }
              </span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
