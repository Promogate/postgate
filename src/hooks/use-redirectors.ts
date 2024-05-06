import { CreateRedirectorInput } from "@/@types";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useUser } from "./use-user";

export const useRedirectors = () => {
  const userId = useUser(state => state.user);
  return useQuery({
    queryKey: ["redirectors", userId],
    queryFn: async () => {
      const response = await axios.get("/api/redirector");
      return response.data;
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useCreateRedirector = (onClose: () => void, values: CreateRedirectorInput) => {
  const query = useQueryClient();
  const userId = useUser(state => state.user);
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