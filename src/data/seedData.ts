
import { Clan, Member, Dispute, Vault, Rite, ClanToken, EthicsEntry } from '@/types/clanTypes';

// Realistic African Clans Data
export const seedClans: Clan[] = [
  {
    clan_id: "gusii_nyamira_001",
    name: "Abagusii ya Nyamira",
    region: "Nyamira County, Kenya",
    elders: ["elder_001", "elder_002", "elder_003"],
    members: ["member_001", "member_002", "member_003", "member_004", "member_005"],
    covenant_status: "active",
    created_at: "2024-01-15T08:00:00Z",
    updated_at: "2024-12-01T10:30:00Z"
  },
  {
    clan_id: "yoruba_lagos_002",
    name: "Egbe Omo Yoruba Lagos",
    region: "Lagos State, Nigeria",
    elders: ["elder_004", "elder_005"],
    members: ["member_006", "member_007", "member_008", "member_009"],
    covenant_status: "active",
    created_at: "2024-02-20T09:15:00Z",
    updated_at: "2024-11-28T14:20:00Z"
  },
  {
    clan_id: "kikuyu_kiambu_003",
    name: "Athuri a Kikuyu",
    region: "Kiambu County, Kenya",
    elders: ["elder_006", "elder_007", "elder_008"],
    members: ["member_010", "member_011", "member_012"],
    covenant_status: "active",
    created_at: "2024-03-10T11:00:00Z",
    updated_at: "2024-12-05T16:45:00Z"
  },
  {
    clan_id: "zulu_kwazulu_004",
    name: "Abantu Abamnyama",
    region: "KwaZulu-Natal, South Africa",
    elders: ["elder_009", "elder_010"],
    members: ["member_013", "member_014", "member_015", "member_016"],
    covenant_status: "active",
    created_at: "2024-04-05T07:30:00Z",
    updated_at: "2024-11-30T12:15:00Z"
  },
  {
    clan_id: "akan_ashanti_005",
    name: "Asante Kotoko",
    region: "Ashanti Region, Ghana",
    elders: ["elder_011", "elder_012"],
    members: ["member_017", "member_018", "member_019"],
    covenant_status: "dormant",
    created_at: "2023-11-20T13:45:00Z",
    updated_at: "2024-08-15T09:20:00Z"
  }
];

export const seedMembers: Member[] = [
  // Gusii Clan Members
  {
    uid: "elder_001",
    name: "Mzee Samuel Nyong'o",
    role: "elder",
    lineage: ["Nyong'o", "Magara", "Omweri"],
    rites_completed: ["birth", "naming", "initiation", "marriage"],
    clan_id: "gusii_nyamira_001",
    join_date: "2024-01-15T08:00:00Z",
    status: "active"
  },
  {
    uid: "elder_002",
    name: "Mama Grace Kemunto",
    role: "elder",
    lineage: ["Kemunto", "Bochaberi", "Omweri"],
    rites_completed: ["birth", "naming", "marriage", "blessing"],
    clan_id: "gusii_nyamira_001",
    join_date: "2024-01-15T08:30:00Z",
    status: "active"
  },
  {
    uid: "member_001",
    name: "Diana Moraa",
    role: "women",
    lineage: ["Moraa", "Kemunto", "Bochaberi"],
    rites_completed: ["birth", "naming", "initiation"],
    clan_id: "gusii_nyamira_001",
    join_date: "2024-02-01T10:00:00Z",
    status: "active"
  },
  {
    uid: "member_002",
    name: "James Momanyi",
    role: "youth",
    lineage: ["Momanyi", "Nyong'o", "Magara"],
    rites_completed: ["birth", "naming"],
    clan_id: "gusii_nyamira_001",
    join_date: "2024-03-15T14:20:00Z",
    status: "active"
  },
  {
    uid: "member_003",
    name: "Dr. Peter Bosire",
    role: "diaspora",
    lineage: ["Bosire", "Magara", "Omweri"],
    rites_completed: ["birth", "naming", "initiation", "marriage"],
    clan_id: "gusii_nyamira_001",
    join_date: "2024-04-01T09:15:00Z",
    status: "active"
  },

  // Yoruba Clan Members
  {
    uid: "elder_004",
    name: "Chief Adebayo Ogundimu",
    role: "elder",
    lineage: ["Ogundimu", "Adebayo", "Ogun"],
    rites_completed: ["birth", "naming", "initiation", "marriage", "chieftaincy"],
    clan_id: "yoruba_lagos_002",
    join_date: "2024-02-20T09:15:00Z",
    status: "active"
  },
  {
    uid: "member_006",
    name: "Folake Adeyemi",
    role: "women",
    lineage: ["Adeyemi", "Ogundimu", "Adebayo"],
    rites_completed: ["birth", "naming", "marriage"],
    clan_id: "yoruba_lagos_002",
    join_date: "2024-03-10T11:30:00Z",
    status: "active"
  },
  {
    uid: "member_007",
    name: "Taiwo Oladele",
    role: "youth",
    lineage: ["Oladele", "Adebayo", "Ogun"],
    rites_completed: ["birth", "naming", "initiation"],
    clan_id: "yoruba_lagos_002",
    join_date: "2024-05-20T15:45:00Z",
    status: "active"
  },

  // Kikuyu Clan Members
  {
    uid: "elder_006",
    name: "Mzee John Kamau",
    role: "elder",
    lineage: ["Kamau", "Njoroge", "Waiyaki"],
    rites_completed: ["birth", "naming", "initiation", "marriage", "eldership"],
    clan_id: "kikuyu_kiambu_003",
    join_date: "2024-03-10T11:00:00Z",
    status: "active"
  },
  {
    uid: "member_010",
    name: "Mary Wanjiku",
    role: "women",
    lineage: ["Wanjiku", "Kamau", "Njoroge"],
    rites_completed: ["birth", "naming", "marriage"],
    clan_id: "kikuyu_kiambu_003",
    join_date: "2024-04-15T08:20:00Z",
    status: "active"
  },
  {
    uid: "member_011",
    name: "Michael Githae",
    role: "tech_steward",
    lineage: ["Githae", "Waiyaki", "Kamau"],
    rites_completed: ["birth", "naming", "initiation"],
    clan_id: "kikuyu_kiambu_003",
    join_date: "2024-06-01T12:30:00Z",
    status: "active"
  }
];

export const seedDisputes: Dispute[] = [
  {
    dispute_id: "land_inheritance_001",
    clan_id: "gusii_nyamira_001",
    type: "inheritance",
    title: "Magara Family Land Dispute",
    description: "Dispute over 5-acre ancestral land inheritance between two branches of Magara family. The deceased left no written will, and both sons claim rightful inheritance through different traditional customs.",
    status: "under_review",
    submitted_by: "member_002",
    involved_parties: ["member_002", "member_003"],
    testimonies: [
      {
        by: "member_002",
        text: "I am the firstborn son and have cultivated this land for 10 years. According to Gusii tradition, the eldest son inherits the father's primary land.",
        timestamp: "2024-11-20T10:15:00Z",
        verified: true
      },
      {
        by: "member_003",
        text: "While my brother is older, I was the one who cared for our father in his final years and received his blessing. The land should go to who demonstrated responsibility.",
        timestamp: "2024-11-20T14:30:00Z",
        verified: true
      },
      {
        by: "elder_001",
        text: "Both sons showed dedication to the family. In our tradition, we consider both birth order and care provided to parents.",
        timestamp: "2024-11-21T09:45:00Z",
        verified: true
      }
    ],
    created_at: "2024-11-20T08:00:00Z",
    updated_at: "2024-11-21T09:45:00Z"
  },
  {
    dispute_id: "marriage_custom_002",
    clan_id: "yoruba_lagos_002",
    type: "marriage",
    title: "Bride Price Negotiation Dispute",
    description: "Disagreement over traditional bride price requirements between families. The groom's family believes the requested amount is excessive compared to community standards.",
    status: "open",
    submitted_by: "member_007",
    involved_parties: ["member_007", "member_006"],
    testimonies: [
      {
        by: "member_007",
        text: "The requested bride price of 500,000 Naira is beyond our family's means and exceeds what others in our community have paid recently.",
        timestamp: "2024-12-01T11:20:00Z",
        verified: false
      },
      {
        by: "member_006",
        text: "Our daughter is well-educated with a university degree. The bride price reflects her value and our family's investment in her education.",
        timestamp: "2024-12-01T15:45:00Z",
        verified: false
      }
    ],
    created_at: "2024-12-01T10:00:00Z",
    updated_at: "2024-12-01T15:45:00Z"
  },
  {
    dispute_id: "debt_resolution_003",
    clan_id: "kikuyu_kiambu_003",
    type: "debt",
    title: "Business Loan Repayment Issue",
    description: "Member borrowed money from clan vault for business but has failed to repay according to agreed terms due to business challenges during COVID-19.",
    status: "escalated",
    submitted_by: "elder_006",
    involved_parties: ["member_011", "elder_006"],
    testimonies: [
      {
        by: "member_011",
        text: "My tech business was severely affected by the pandemic. I need more time to recover and can propose a new payment plan.",
        timestamp: "2024-11-15T09:30:00Z",
        verified: true
      },
      {
        by: "elder_006",
        text: "While we understand the challenges, the clan vault needs these funds for other community projects. We must find a solution.",
        timestamp: "2024-11-15T14:15:00Z",
        verified: true
      }
    ],
    created_at: "2024-11-15T08:00:00Z",
    updated_at: "2024-11-15T14:15:00Z"
  }
];

export const seedVaults: Vault[] = [
  {
    vault_id: "education_vault_001",
    clan_id: "gusii_nyamira_001",
    balance: 250000,
    currency: "KES",
    vault_type: "education",
    rules: {
      min_contribution: 1000,
      max_withdrawal: 50000,
      approval_required: true,
      minimum_elders_approval: 2
    },
    contributors: ["elder_001", "elder_002", "member_001", "member_003"],
    target_amount: 500000,
    created_at: "2024-01-20T10:00:00Z"
  },
  {
    vault_id: "health_vault_002",
    clan_id: "gusii_nyamira_001",
    balance: 180000,
    currency: "KES",
    vault_type: "health",
    rules: {
      emergency_access: true,
      max_withdrawal: 100000,
      approval_required: false
    },
    contributors: ["elder_001", "elder_002", "member_001", "member_002", "member_003"],
    created_at: "2024-02-01T12:30:00Z"
  },
  {
    vault_id: "funeral_vault_003",
    clan_id: "yoruba_lagos_002",
    balance: 450000,
    currency: "NGN",
    vault_type: "funeral",
    rules: {
      automatic_payout: true,
      verification_required: true,
      max_withdrawal: 200000
    },
    contributors: ["elder_004", "elder_005", "member_006", "member_007"],
    target_amount: 1000000,
    created_at: "2024-03-15T09:45:00Z"
  },
  {
    vault_id: "legal_vault_004",
    clan_id: "kikuyu_kiambu_003",
    balance: 75000,
    currency: "KES",
    vault_type: "legal",
    rules: {
      court_case_support: true,
      elder_approval_required: true,
      documentation_required: true
    },
    contributors: ["elder_006", "elder_007", "member_010"],
    created_at: "2024-04-20T14:20:00Z"
  }
];

export const seedRites: Rite[] = [
  {
    rite_id: "naming_ceremony_001",
    clan_id: "gusii_nyamira_001",
    type: "naming",
    date: "2024-11-15T10:00:00Z",
    member_id: "new_member_001",
    officiant: "elder_001",
    participants: ["elder_001", "elder_002", "member_001", "member_002"],
    location: "Nyamira Community Center",
    cultural_significance: "Traditional Gusii naming ceremony following the 7-day observation period. Name chosen based on circumstances of birth and family lineage.",
    status: "completed",
    notes: "Beautiful ceremony with traditional songs and blessings. Child named Kerubo (born during harvest season)."
  },
  {
    rite_id: "marriage_ceremony_002",
    clan_id: "yoruba_lagos_002",
    type: "marriage",
    date: "2024-12-20T14:00:00Z",
    member_id: "member_007",
    officiant: "elder_004",
    participants: ["elder_004", "elder_005", "member_006", "member_007", "member_008"],
    location: "Lagos Cultural Center",
    cultural_significance: "Traditional Yoruba engagement ceremony (Idana) with proper family introductions and blessing exchange.",
    status: "planned",
    notes: "Families have completed negotiations and are preparing for the traditional ceremony."
  },
  {
    rite_id: "initiation_rite_003",
    clan_id: "kikuyu_kiambu_003",
    type: "initiation",
    date: "2024-10-30T06:00:00Z",
    member_id: "member_011",
    officiant: "elder_006",
    participants: ["elder_006", "elder_007", "member_011"],
    location: "Sacred Grove, Kiambu",
    cultural_significance: "Kikuyu age-set initiation marking transition to adult responsibilities within the community.",
    status: "completed",
    notes: "Successful completion of traditional rites including teachings on community responsibility and cultural heritage."
  },
  {
    rite_id: "blessing_ceremony_004",
    clan_id: "zulu_kwazulu_004",
    type: "blessing",
    date: "2024-12-10T09:00:00Z",
    member_id: "member_013",
    officiant: "elder_009",
    participants: ["elder_009", "elder_010", "member_013", "member_014"],
    location: "KwaZulu Traditional Grounds",
    cultural_significance: "Ancestral blessing ceremony for new business venture, seeking guidance and protection from the ancestors.",
    status: "planned"
  }
];

export const seedTokens: ClanToken[] = [
  {
    token_id: "token_001",
    member_id: "member_001",
    action: "Organized youth education workshop",
    tokens_earned: 50,
    category: "education",
    timestamp: "2024-11-01T14:30:00Z",
    verified: true,
    verified_by: "elder_001"
  },
  {
    token_id: "token_002",
    member_id: "member_002",
    action: "Helped with elder care duties",
    tokens_earned: 30,
    category: "elder_care",
    timestamp: "2024-11-05T09:15:00Z",
    verified: true,
    verified_by: "elder_002"
  },
  {
    token_id: "token_003",
    member_id: "member_003",
    action: "Documented traditional stories",
    tokens_earned: 40,
    category: "cultural_preservation",
    timestamp: "2024-11-10T16:45:00Z",
    verified: true,
    verified_by: "elder_001"
  },
  {
    token_id: "token_004",
    member_id: "member_006",
    action: "Community clean-up initiative",
    tokens_earned: 25,
    category: "community_service",
    timestamp: "2024-11-12T08:00:00Z",
    verified: false
  },
  {
    token_id: "token_005",
    member_id: "member_011",
    action: "Set up digital literacy training",
    tokens_earned: 60,
    category: "education",
    timestamp: "2024-11-18T11:20:00Z",
    verified: true,
    verified_by: "elder_006"
  }
];

export const seedEthics: EthicsEntry[] = [
  {
    entry_id: "ethics_001",
    clan_id: "gusii_nyamira_001",
    type: "contribution",
    member_id: "member_001",
    description: "Exceptional leadership in organizing community events and supporting clan unity",
    impact_score: 8,
    witness: "elder_001",
    timestamp: "2024-11-01T10:00:00Z",
    status: "approved"
  },
  {
    entry_id: "ethics_002",
    clan_id: "gusii_nyamira_001",
    type: "violation",
    member_id: "member_002",
    description: "Failed to attend mandatory clan meeting without proper notice",
    impact_score: -2,
    witness: "elder_002",
    timestamp: "2024-10-15T14:30:00Z",
    status: "approved"
  },
  {
    entry_id: "ethics_003",
    clan_id: "yoruba_lagos_002",
    type: "recognition",
    member_id: "member_007",
    description: "Outstanding respect shown to elders and commitment to cultural traditions",
    impact_score: 6,
    witness: "elder_004",
    timestamp: "2024-11-20T16:15:00Z",
    status: "approved"
  },
  {
    entry_id: "ethics_004",
    clan_id: "kikuyu_kiambu_003",
    type: "contribution",
    member_id: "member_011",
    description: "Innovative technology solutions that benefit the entire community",
    impact_score: 9,
    witness: "elder_006",
    timestamp: "2024-11-25T12:45:00Z",
    status: "pending"
  }
];

// Helper functions to get data by clan
export const getClanData = (clanId: string) => ({
  clan: seedClans.find(c => c.clan_id === clanId),
  members: seedMembers.filter(m => m.clan_id === clanId),
  disputes: seedDisputes.filter(d => d.clan_id === clanId),
  vaults: seedVaults.filter(v => v.clan_id === clanId),
  rites: seedRites.filter(r => r.clan_id === clanId),
  tokens: seedTokens.filter(t => {
    const member = seedMembers.find(m => m.uid === t.member_id);
    return member?.clan_id === clanId;
  }),
  ethics: seedEthics.filter(e => e.clan_id === clanId)
});

export const getAllClansData = () => ({
  clans: seedClans,
  members: seedMembers,
  disputes: seedDisputes,
  vaults: seedVaults,
  rites: seedRites,
  tokens: seedTokens,
  ethics: seedEthics
});

// Mock API responses
export const mockApiResponses = {
  getClans: () => ({ success: true, data: seedClans }),
  getClan: (id: string) => ({ 
    success: true, 
    data: seedClans.find(c => c.clan_id === id) 
  }),
  getClanMembers: (clanId: string) => ({ 
    success: true, 
    data: seedMembers.filter(m => m.clan_id === clanId) 
  }),
  getDisputes: (clanId: string) => ({ 
    success: true, 
    data: {
      data: seedDisputes.filter(d => d.clan_id === clanId),
      total: seedDisputes.filter(d => d.clan_id === clanId).length,
      page: 1,
      limit: 10,
      hasMore: false
    }
  }),
  getVaults: (clanId: string) => ({ 
    success: true, 
    data: seedVaults.filter(v => v.clan_id === clanId) 
  }),
  getRites: (clanId: string) => ({ 
    success: true, 
    data: {
      data: seedRites.filter(r => r.clan_id === clanId),
      total: seedRites.filter(r => r.clan_id === clanId).length,
      page: 1,
      limit: 20,
      hasMore: false
    }
  })
};
