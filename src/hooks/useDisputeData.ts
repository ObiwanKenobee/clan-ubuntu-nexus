
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getDisputesByClan, 
  createDispute, 
  addTestimony, 
  requestAgentVerdict,
  elderOverride,
  updateDisputeStatus 
} from '@/api/disputeAPI';
import { Dispute, Testimony } from '@/types/clanTypes';
import { toast } from 'sonner';

export const useDisputes = (clanId: string, status?: Dispute['status'], page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['disputes', clanId, status, page, limit],
    queryFn: async () => {
      const response = await getDisputesByClan(clanId, status, page, limit);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data!;
    },
    enabled: !!clanId,
  });
};

export const useCreateDispute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      clanId, 
      disputeData 
    }: { 
      clanId: string; 
      disputeData: Omit<Dispute, 'dispute_id' | 'created_at' | 'updated_at'> 
    }) => {
      const response = await createDispute(clanId, disputeData);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data!;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['disputes', data.clan_id] });
      toast.success('Dispute created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create dispute: ${error.message}`);
    },
  });
};

export const useAddTestimony = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      disputeId, 
      testimony 
    }: { 
      disputeId: string; 
      testimony: Omit<Testimony, 'timestamp' | 'verified'> 
    }) => {
      const response = await addTestimony(disputeId, testimony);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data!;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['disputes', data.clan_id] });
      toast.success('Testimony added successfully');
    },
    onError: (error) => {
      toast.error(`Failed to add testimony: ${error.message}`);
    },
  });
};

export const useRequestVerdict = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (disputeId: string) => {
      const response = await requestAgentVerdict(disputeId);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data!;
    },
    onSuccess: (_, disputeId) => {
      queryClient.invalidateQueries({ queryKey: ['disputes'] });
      toast.success('AI verdict requested successfully');
    },
    onError: (error) => {
      toast.error(`Failed to request verdict: ${error.message}`);
    },
  });
};

export const useElderOverride = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      disputeId, 
      decision, 
      elderIdm,
      reasoning 
    }: { 
      disputeId: string; 
      decision: string; 
      elderIdm: string; 
      reasoning: string; 
    }) => {
      const response = await elderOverride(disputeId, decision, elderIdm, reasoning);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data!;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['disputes', data.clan_id] });
      toast.success('Elder override applied successfully');
    },
    onError: (error) => {
      toast.error(`Failed to apply elder override: ${error.message}`);
    },
  });
};
