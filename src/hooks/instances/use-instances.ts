import { toast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { v4 } from "uuid";

const fetchInstances = async () => {
  const { data } = await axios.get("/api/wapp/instance/my_instances");
  return data;
}

export const useInstances = (userId: string | null | undefined) => {
  if (!userId) throw new Error("Unauthorized");
  return useQuery({
    queryKey: ["instances", userId],
    queryFn: fetchInstances,
    staleTime: 1000 * 10 * 5
  })
}

export const useCreateInstance = (userId: string | null | undefined) => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: ["instance", userId],
    mutationFn: async () => {
      const instanceId = v4();
      const { data } = await axios.post("/api/wapp/instance", { instanceName: instanceId, description: userId });
      return data;
    },
    onSuccess: () => {
      toast({ title: "Instância adicionada com sucesso, leio o QR code com seu aplicativo" })
      query.invalidateQueries({ queryKey: ["instances", userId] })
    }
  })
}