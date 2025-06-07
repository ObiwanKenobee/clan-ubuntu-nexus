
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getClanById, getClanMembers, updateClan } from '@/api/clanAPI';
import { Clan, Member, ApiResponse } from '@/types/clanTypes';
import { toast } from 'sonner';

export const useClan = (clanId: string) => {
  return useQuery({
    queryKey: ['clan', clanId],
    queryFn: async () => {
      const response = await getClanById(clanId);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data!;
    },
    enabled: !!clanId,
  });
};

export const useClanMembers = (clanId: string) => {
  return useQuery({
    queryKey: ['clan-members', clanId],
    queryFn: async () => {
      const response = await getClanMembers(clanId);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data!;
    },
    enabled: !!clanId,
  });
};

export const useUpdateClan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ clanId, updates }: { clanId: string; updates: Partial<Clan> }) => {
      const response = await updateClan(clanId, updates);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data!;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['clan', data.clan_id] });
      toast.success('Clan updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update clan: ${error.message}`);
    },
  });
};

// Real-time clan data hook with WebSocket support
export const useRealtimeClanData = (clanId: string) => {
  const [realTimeData, setRealTimeData] = useState<Partial<Clan>>({});
  const { data: clan, isLoading, error } = useClan(clanId);

  useEffect(() => {
    if (!clanId) return;

    // WebSocket connection for real-time updates
    const wsUrl = `${import.meta.env.VITE_WS_URL || 'ws://localhost:3000'}/clan/${clanId}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log(`Connected to clan ${clanId} WebSocket`);
    };

    ws.onmessage = (event) => {
      try {
        const update = JSON.parse(event.data);
        setRealTimeData(prev => ({ ...prev, ...update }));
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log(`Disconnected from clan ${clanId} WebSocket`);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [clanId]);

  return {
    clan: clan ? { ...clan, ...realTimeData } : null,
    isLoading,
    error,
    realTimeData,
  };
};
