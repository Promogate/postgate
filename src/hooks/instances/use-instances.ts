import { Instance } from "@/@types";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { v4 } from "uuid";
import useAuthStore from "../use-user";
import { api } from "@/lib/axios";
import useStore from "../useStore";

type CreateInstanceInput = {
  name: string;
  description: string;
}

type EditInstanceInput = {
  name?: string;
  description?: string;
}

const fetchInstances = async () => {
  const { data } = await api.get("/whatsapp/sessions", { authorization: true });
  return data;
}

export const useInstances = () => {
  const store = useStore(useAuthStore, (state) => state);
  return useQuery({
    queryKey: ["instances", store?.user?.id],
    queryFn: fetchInstances,
    staleTime: 1000 * 10
  })
}

export const useInstanceData = (instanceId: string) => {
  if (!instanceId) throw new Error("Id da instâcia não informado");
  return useQuery<Instance>({
    enabled: false,
    queryKey: ["instance_data", instanceId],
    queryFn: async () => {
      const { data, status } = await axios.get(`/api/wapp/instance/${instanceId}`)
      if (status !== 200) {
        toast({
          variant: "destructive",
          title: "Erro ao buscar informações da instância"
        })
      }
      return data;
    }
  })
}

export const useCreateInstance = () => {
  const query = useQueryClient();
  const store = useStore(useAuthStore, (state) => state);
  return useMutation({
    mutationKey: ["instances", store?.user?.id],
    mutationFn: async (input: CreateInstanceInput) => {
      const { data } = await api.post("/whatsapp/session/create", {
        name: input.name,
        description: input.description,
      }, { authorization: true });
      return data;
    },
    onSuccess: () => {
      toast({ title: "Instância adicionada com sucesso, leio o QR code com seu aplicativo" });
      query.invalidateQueries({ queryKey: ["instances", store?.user?.id] });
    },
    onError: (error: AxiosError<any>) => {
      toast({ title: error.response?.data?.message })
    }
  })
}

export const useEditInstance = (instanceId: string) => {
  const query = useQueryClient();
  const store = useStore(useAuthStore, (state) => state);
  return useMutation({
    mutationKey: ["edit_instance", instanceId],
    mutationFn: async (input: EditInstanceInput) => {
      const instanceId = v4();
      const { data } = await axios.put(`/api/wapp/instance/${instanceId}`, {
        instanceName: input.name,
        description: input.description,
      });
      return data;
    },
    onSuccess: () => {
      toast({ title: "Instância adicionada com sucesso, leio o QR code com seu aplicativo" })
      query.invalidateQueries({ queryKey: ["instances", store?.user?.id] })
    },
    onError: (error: AxiosError<any>) => {
      toast({ title: "Error ao tentar editar a instância", variant: "destructive" })
    }
  })
}

export const useDeleteInstance = (instanceId: string) => {
  const query = useQueryClient();
  const store = useStore(useAuthStore, (state) => state);
  return useMutation({
    mutationKey: ["edit_instance", instanceId],
    mutationFn: async () => {
      const { data } = await api.delete(`/whatsapp/session/${instanceId}`, { authorization: true });
      return data;
    },
    onSuccess: () => {
      toast({ title: "Instância removida com sucesso." })
      query.invalidateQueries({ queryKey: ["instances", store?.user?.id] })
    },
    onError: (error: AxiosError<any>) => {
      toast({ title: "Error ao tentar editar a instância", variant: "destructive" })
    }
  })
}