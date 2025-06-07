
// Core Clan Types
export interface Clan {
  clan_id: string;
  name: string;
  region: string;
  elders: string[];
  members: string[];
  covenant_status: "active" | "dormant";
  created_at: string;
  updated_at: string;
}

export interface Member {
  uid: string;
  name: string;
  role: "elder" | "youth" | "women" | "diaspora" | "tech_steward";
  lineage: string[];
  rites_completed: string[];
  clan_id: string;
  join_date: string;
  status: "active" | "inactive";
}

export interface Vault {
  vault_id: string;
  clan_id: string;
  balance: number;
  currency: string;
  vault_type: "education" | "health" | "funeral" | "legal" | "emergency";
  rules: Record<string, any>;
  contributors: string[];
  target_amount?: number;
  created_at: string;
}

export interface Dispute {
  dispute_id: string;
  clan_id: string;
  type: "inheritance" | "land" | "marriage" | "debt" | "honor";
  title: string;
  description: string;
  status: "open" | "under_review" | "resolved" | "escalated";
  submitted_by: string;
  involved_parties: string[];
  testimonies: Testimony[];
  agent_simulations?: Record<string, any>;
  verdict?: DisputeVerdict;
  created_at: string;
  updated_at: string;
}

export interface Testimony {
  by: string;
  text: string;
  timestamp: string;
  verified: boolean;
}

export interface DisputeVerdict {
  case_id: string;
  agent: string;
  timestamp: string;
  summary: string;
  verdicts: VerdictOption[];
  final_decision?: string;
  elder_override?: boolean;
}

export interface VerdictOption {
  option: string;
  impact_score: number;
  scripture?: string;
  cultural_reference?: string;
  requires_override: boolean;
  reasoning: string;
}

export interface Rite {
  rite_id: string;
  clan_id: string;
  type: "birth" | "naming" | "marriage" | "burial" | "initiation" | "blessing";
  date: string;
  member_id: string;
  officiant: string;
  participants: string[];
  location: string;
  audio_url?: string;
  video_url?: string;
  photos?: string[];
  notes?: string;
  cultural_significance: string;
  status: "planned" | "completed" | "cancelled";
}

export interface ClanToken {
  token_id: string;
  member_id: string;
  action: string;
  tokens_earned: number;
  tokens_spent?: number;
  category: "community_service" | "cultural_preservation" | "education" | "elder_care";
  timestamp: string;
  verified: boolean;
  verified_by?: string;
}

export interface EthicsEntry {
  entry_id: string;
  clan_id: string;
  type: "contribution" | "violation" | "recognition" | "sanction";
  member_id: string;
  description: string;
  impact_score: number;
  witness?: string;
  timestamp: string;
  status: "pending" | "approved" | "disputed";
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
