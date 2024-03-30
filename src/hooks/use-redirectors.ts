import { CreateRedirectorInput } from "@/@types";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useRedirectors = (userId: string | null | undefined) => {
  if (!userId) throw new Error("Unauthorized");
  return useQuery({
    queryKey: ["redirectors", userId],
    queryFn: async () => {
      const response = await axios.get("/api/redirector");
      return response.data;
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useCreateRedirector = (userId: string | null | undefined, onClose: () => void, values: CreateRedirectorInput) => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await axios.post(`/api/redirector`, { ...values, userId });
    },
    onSuccess: () => {
      toast({
        title: "Redirecionador criado com sucesso!",
        variant: "default",
      });
      query.invalidateQueries({ queryKey: ["redirectors", userId] });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    }
  });
}