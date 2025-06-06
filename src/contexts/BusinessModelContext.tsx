
import React, { createContext, useContext, useState } from 'react';

export type ClanTier = 'seed' | 'clan' | 'federation';
export type ServicePackage = 'genesis' | 'council' | 'vault' | 'ethics' | 'kiosk' | 'covenant';

interface BusinessModelContextType {
  currentTier: ClanTier;
  activePackages: ServicePackage[];
  tierFeatures: Record<ClanTier, string[]>;
  packagePricing: Record<ServicePackage, number>;
  upgradeTier: (tier: ClanTier) => void;
  addPackage: (pkg: ServicePackage) => void;
}

const BusinessModelContext = createContext<BusinessModelContextType | null>(null);

export const useBusinessModel = () => {
  const context = useContext(BusinessModelContext);
  if (!context) {
    throw new Error('useBusinessModel must be used within BusinessModelProvider');
  }
  return context;
};

export const BusinessModelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTier, setCurrentTier] = useState<ClanTier>('seed');
  const [activePackages, setActivePackages] = useState<ServicePackage[]>(['genesis']);

  const tierFeatures = {
    seed: ['1 family tree', 'Up to 10 members', '1 vault', '1 elder role', 'Offline mode'],
    clan: ['Up to 50 members', '3 vaults', 'Dispute module', 'SMS onboarding', 'Youth module'],
    federation: ['5+ interconnected clans', 'Shared ethics councils', 'Civic export', 'Diaspora portal']
  };

  const packagePricing = {
    genesis: 0, // Free
    council: 15,
    vault: 10,
    ethics: 20,
    kiosk: 50,
    covenant: 25
  };

  const upgradeTier = (tier: ClanTier) => {
    setCurrentTier(tier);
  };

  const addPackage = (pkg: ServicePackage) => {
    if (!activePackages.includes(pkg)) {
      setActivePackages([...activePackages, pkg]);
    }
  };

  return (
    <BusinessModelContext.Provider value={{
      currentTier,
      activePackages,
      tierFeatures,
      packagePricing,
      upgradeTier,
      addPackage
    }}>
      {children}
    </BusinessModelContext.Provider>
  );
};
