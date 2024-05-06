"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Check, RefreshCw, XCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { RotatingLines } from "react-loader-spinner";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { WappGroup } from "@/@types";

export default function Page() {
  const { id } = useParams() as { id: string };
  const { toast } = useToast();

  const { data, isLoading, isError, refetch } = useQuery({
    enabled: false,
    staleTime: 1000 * 60 * 24,
    queryKey: ["groups_info", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/wapp/groups`, {
        params: {
          instanceId: id
        }
      });
      return data;
    },
    retryDelay: 2000,
    retry: 3
  })

  const fetchData = () => {
    refetch();
    chatQuery.refetch();
  }

  const chatQuery = useQuery<WappGroup[]>({
    enabled: false,
    staleTime: 1000 * 60 * 24,
    queryKey: ["groups_info_data", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/wapp/groups/get`, {
        params: {
          instanceId: id
        }
      });
      return data;
    },
    retryDelay: 2000,
    retry: 3
  })

  const syncMutation = useMutation({
    mutationKey: ["sync_mutation"],
    mutationFn: async (groupId: string) => {
      await axios.put(`/api/wapp/groups/sync`, {
        groupId: groupId,
        instanceId: id
      });
    },
    onSuccess: () => {
      chatQuery.refetch()
      toast({
        title: "Grupo sincronizado"
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Grupo indisponível"
      });
      chatQuery.refetch()
    }
  })

  const handleGroupSync = async (groupId: string) => {
    await syncMutation.mutateAsync(groupId);
  }

  if (chatQuery.isLoading || isLoading) {
    return (
      <section className="space-y-4 md:p-8">
        <h1 className="text-xl font-bold text-gray-800">
          Grupos
        </h1>
        <div className="w-full h-96 flex items-center justify-center my-8 ">
          <RotatingLines
            visible={true}
            width="80"
            strokeWidth="5"
            strokeColor="#5528ff"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      </section>
    )
  }

  if (chatQuery.isError) {
    return (
      <section className="p-4">
        <h1 className="text-xl font-bold text-gray-800">
          Contas
        </h1>
        <div className="w-full h-96 flex flex-col items-center justify-center my-8 gap-y-4">
          <XCircle />
          <span>Ocorreu algum erro, tente novamente</span>
          <Button variant="outline" onClick={() => refetch()}>
            Recarregar página
          </Button>
        </div>
      </section>
    )
  }
  
  return (
    <section className="p-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800 flex-1">
          Grupos
        </h1>
        <div className="flex w-full items-center justify-end gap-x-4">
          <Button onClick={() => chatQuery.refetch()} variant="outline">
            Atualizar
          </Button>
          <Button onClick={fetchData} variant="default">
            Encontrar grupos
          </Button>
        </div>
      </div>
      <div className="my-4 grid grid-cols-3 gap-4">
        {chatQuery.data?.map((chat) => {
          return (
            <div key={chat.id} className="border p-2 rounded-md flex flex-col gap-2">
              <p>{chat.subject ? chat.subject : chat.remoteJid}</p>
              <div className=" flex justify-end">
                {chat.subject ? (
                  <Button size="sm" variant="outline" className="flex items-center gap-x-2">
                    <Check size={16} />
                    Sincronizado
                  </Button>
                ) : (
                  <Button size="sm" variant="default" className="flex items-center gap-x-2" onClick={() => handleGroupSync(chat.remoteJid)}>
                    <RefreshCw size={16} />
                    Sincronizar
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section >
  )
}