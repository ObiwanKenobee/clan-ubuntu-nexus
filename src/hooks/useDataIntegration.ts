
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useClan, useClanMembers } from './useClanData';
import { useDisputes } from './useDisputeData';
import { getClanAnalytics } from '@/api/analyticsAPI';
import { getTasksByClan } from '@/api/taskAPI';
import { getVaultsByClan } from '@/api/vaultAPI';
import { getRitesByClan } from '@/api/ritesAPI';
import { toast } from 'sonner';

export const useDataIntegration = (clanId: string) => {
  const queryClient = useQueryClient();

  // Core clan data
  const { data: clan, isLoading: clanLoading } = useClan(clanId);
  const { data: members, isLoading: membersLoading } = useClanMembers(clanId);
  const { data: disputes, isLoading: disputesLoading } = useDisputes(clanId);

  // Extended data queries
  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['analytics', clanId],
    queryFn: async () => {
      const response = await getClanAnalytics(clanId);
      if (!response.success) throw new Error(response.error);
      return response.data!;
    },
    enabled: !!clanId,
  });

  const { data: tasks, isLoading: tasksLoading } = useQuery({
    queryKey: ['tasks', clanId],
    queryFn: async () => {
      const response = await getTasksByClan(clanId);
      if (!response.success) throw new Error(response.error);
      return response.data!;
    },
    enabled: !!clanId,
  });

  const { data: vaults, isLoading: vaultsLoading } = useQuery({
    queryKey: ['vaults', clanId],
    queryFn: async () => {
      const response = await getVaultsByClan(clanId);
      if (!response.success) throw new Error(response.error);
      return response.data!;
    },
    enabled: !!clanId,
  });

  const { data: rites, isLoading: ritesLoading } = useQuery({
    queryKey: ['rites', clanId],
    queryFn: async () => {
      const response = await getRitesByClan(clanId);
      if (!response.success) throw new Error(response.error);
      return response.data!;
    },
    enabled: !!clanId,
  });

  // Refresh all data
  const refreshAllData = useMutation({
    mutationFn: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['clan', clanId] }),
        queryClient.invalidateQueries({ queryKey: ['clan-members', clanId] }),
        queryClient.invalidateQueries({ queryKey: ['disputes', clanId] }),
        queryClient.invalidateQueries({ queryKey: ['analytics', clanId] }),
        queryClient.invalidateQueries({ queryKey: ['tasks', clanId] }),
        queryClient.invalidateQueries({ queryKey: ['vaults', clanId] }),
        queryClient.invalidateQueries({ queryKey: ['rites', clanId] }),
      ]);
    },
    onSuccess: () => {
      toast.success('Data refreshed successfully');
    },
    onError: () => {
      toast.error('Failed to refresh data');
    },
  });

  const isLoading = clanLoading || membersLoading || disputesLoading || 
                   analyticsLoading || tasksLoading || vaultsLoading || ritesLoading;

  return {
    // Data
    clan,
    members,
    disputes,
    analytics,
    tasks,
    vaults,
    rites,
    // States
    isLoading,
    // Actions
    refreshAllData: refreshAllData.mutate,
    isRefreshing: refreshAllData.isPending,
  };
};
