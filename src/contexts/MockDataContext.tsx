
import React, { createContext, useContext, useState } from 'react';
import { 
  seedClans, 
  seedMembers, 
  seedDisputes, 
  seedVaults, 
  seedRites, 
  seedTokens, 
  seedEthics,
  getAllClansData 
} from '@/data/seedData';
import { Clan, Member, Dispute, Vault, Rite, ClanToken, EthicsEntry } from '@/types/clanTypes';

interface MockDataContextType {
  clans: Clan[];
  members: Member[];
  disputes: Dispute[];
  vaults: Vault[];
  rites: Rite[];
  tokens: ClanToken[];
  ethics: EthicsEntry[];
  selectedClanId: string;
  setSelectedClanId: (clanId: string) => void;
  getCurrentClanData: () => {
    clan: Clan | undefined;
    members: Member[];
    disputes: Dispute[];
    vaults: Vault[];
    rites: Rite[];
    tokens: ClanToken[];
    ethics: EthicsEntry[];
  };
  addDispute: (dispute: Dispute) => void;
  updateDispute: (disputeId: string, updates: Partial<Dispute>) => void;
  addVaultContribution: (vaultId: string, amount: number, memberId: string) => void;
  addRite: (rite: Rite) => void;
  addTokens: (token: ClanToken) => void;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export const MockDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clans] = useState<Clan[]>(seedClans);
  const [members] = useState<Member[]>(seedMembers);
  const [disputes, setDisputes] = useState<Dispute[]>(seedDisputes);
  const [vaults, setVaults] = useState<Vault[]>(seedVaults);
  const [rites, setRites] = useState<Rite[]>(seedRites);
  const [tokens, setTokens] = useState<ClanToken[]>(seedTokens);
  const [ethics] = useState<EthicsEntry[]>(seedEthics);
  const [selectedClanId, setSelectedClanId] = useState<string>(seedClans[0]?.clan_id || '');

  const getCurrentClanData = () => {
    const clan = clans.find(c => c.clan_id === selectedClanId);
    const clanMembers = members.filter(m => m.clan_id === selectedClanId);
    const clanDisputes = disputes.filter(d => d.clan_id === selectedClanId);
    const clanVaults = vaults.filter(v => v.clan_id === selectedClanId);
    const clanRites = rites.filter(r => r.clan_id === selectedClanId);
    const clanTokens = tokens.filter(t => {
      const member = members.find(m => m.uid === t.member_id);
      return member?.clan_id === selectedClanId;
    });
    const clanEthics = ethics.filter(e => e.clan_id === selectedClanId);

    return {
      clan,
      members: clanMembers,
      disputes: clanDisputes,
      vaults: clanVaults,
      rites: clanRites,
      tokens: clanTokens,
      ethics: clanEthics
    };
  };

  const addDispute = (dispute: Dispute) => {
    setDisputes(prev => [...prev, dispute]);
  };

  const updateDispute = (disputeId: string, updates: Partial<Dispute>) => {
    setDisputes(prev => prev.map(d => 
      d.dispute_id === disputeId ? { ...d, ...updates } : d
    ));
  };

  const addVaultContribution = (vaultId: string, amount: number, memberId: string) => {
    setVaults(prev => prev.map(v => 
      v.vault_id === vaultId 
        ? { 
            ...v, 
            balance: v.balance + amount,
            contributors: v.contributors.includes(memberId) 
              ? v.contributors 
              : [...v.contributors, memberId]
          }
        : v
    ));
  };

  const addRite = (rite: Rite) => {
    setRites(prev => [...prev, rite]);
  };

  const addTokens = (token: ClanToken) => {
    setTokens(prev => [...prev, token]);
  };

  return (
    <MockDataContext.Provider value={{
      clans,
      members,
      disputes,
      vaults,
      rites,
      tokens,
      ethics,
      selectedClanId,
      setSelectedClanId,
      getCurrentClanData,
      addDispute,
      updateDispute,
      addVaultContribution,
      addRite,
      addTokens
    }}>
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (context === undefined) {
    throw new Error('useMockData must be used within a MockDataProvider');
  }
  return context;
};
