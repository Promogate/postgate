import { CreateRedirectorInput } from "@/@types";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "./use-user";
import useStore from "./useStore";

export const useRedirectors = () => {
  const store = useStore(useAuthStore, (state) => state);
  return useQuery({
    queryKey: ["redirectors", store?.user?.id],
    queryFn: async () => {
      const response = await axios.get("/api/redirector");
      return response.data;
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useCreateRedirector = (onClose: () => void, values: CreateRedirectorInput) => {
  const query = useQueryClient();
  const store = useStore(useAuthStore, (state) => state);
  return useMutation({
    mutationFn: async () => {
      await axios.post(`/api/redirector`, { ...values, userId: store?.user?.id });
    },
    onSuccess: () => {
      toast({
        title: "Redirecionador criado com sucesso!",
        variant: "default",
      });
      query.invalidateQueries({ queryKey: ["redirectors", store?.user?.id] });
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