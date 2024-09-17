"use client";

import { WappGroup } from "@/@types";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useInstances } from "@/hooks/instances/use-instances";
import useAuthStore from "@/hooks/use-user";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useStore } from "zustand";

export default function Page() {
  const [instanceId, setInstanceId] = useState<null | string>(null);
  const store = useStore(useAuthStore, (state) => state);
  const [filteredChats, setFilteredChats] = useState<WappGroup[]>([]);
  const instancesQuery = useInstances();

  const chatsQuery = useQuery<WappGroup[]>({
    enabled: false,
    queryKey: ["chats", store?.user?.id],
    queryFn: async () => {
      const { data } = await api.get(`/resources/chats/${instanceId}`, { authorization: true });
      return data;
    },
    staleTime: 1000 * 60 * 60,
  })

  const handleFindInstanceChats = async (instanceId: string) => {
    await chatsQuery.refetch().then((data) => {
      setFilteredChats(data.data as WappGroup[]);
    });
  }

  return (
    <section className="space-y-4">
      <PageHeader>
        Disparos Rápidos
      </PageHeader>
      <div className="flex items-center gap-x-4">
        <Select onValueChange={(value) => handleFindInstanceChats(value)}>
          <SelectTrigger >
            <SelectValue placeholder="Escolha uma conexão" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectGroup>
              <SelectLabel>Conexões</SelectLabel>
              {instancesQuery.data?.map((instance: any) => {
                return (
                  <SelectItem key={instance.id} value={instance.id}>
                    <div className="flex items-center gap-x-2">
                      <p>{instance.name}</p>
                    </div>
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-md p-6 flex flex-col items-center h-[calc(100vh-180px)]">
          <Button className="w-full bg-white border-2 border-dashed text-gray-700 py-8 hover:text-gray-700 hover:bg-white">
            <Plus size={16} /> Adicionar grupo
          </Button>
        </div>
        <div className="space-y-4 flex flex-col">
          <h3 className="text-lg">
            Mensagem
          </h3>
          <div className="flex flex-col items-center lg:min-h-[320px]">
            <Textarea className="h-96" />
          </div>
          <Button className="w-full">
            Iniciar Disparo
          </Button>
          <Button className="w-full" variant="outline">
            Salva Lista
          </Button>
        </div>
      </div>
    </section>
  )
}