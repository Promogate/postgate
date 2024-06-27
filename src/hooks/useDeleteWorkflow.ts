import { toast } from "@/components/ui/use-toast";
import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteWorkflow = (id: string) => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: ["delete_workflow"],
    mutationFn: async (id: string) => {
      await api.delete(`/resources/workflows/${id}`, { authorization: true });
    },
    onSuccess: () => {
      toast({
        title: "Excluído com sucesso"
      });
      query.invalidateQueries({ queryKey: ["workflows", id] })
    }
  });
};