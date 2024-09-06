import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import { Tooltip } from "../common/tooltip";
import { cn } from "@/lib/utils";

type ManageInstanceButtonProps = {
  instanceId: string;
  hasSession: boolean;
  isAlreadyConnected: boolean;
}

export function ManageInstanceButton(props: ManageInstanceButtonProps) {
  const getChatsQuery = useQuery({
    enabled: false,
    queryKey: ["synchronize", props.instanceId],
    queryFn: async () => {
      const { data } = await api.get<{ chats: string, sessionToken: string }>(`/whatsapp/sync_chats/${props.instanceId}`, { authorization: true });
      return data;
    }
  });

  const handleSync = async () => {
    await getChatsQuery.refetch();
  }

  useEffect(() => {
    if (getChatsQuery.isFetching) {
      toast({
        title: "Estamos sincronizando os seus contatos ativos no whatsapp",
        description: "Permaneça na página até finalizarmos o processo."
      });
    }
    if (getChatsQuery.data) {
      const { chats, sessionToken } = getChatsQuery.data;
      if (!chats) return;
      const syncData = async () => {
        await api.post(`/codechat/sync_chats/${props.instanceId}`, {
          instanceName: props.instanceId,
          token: sessionToken,
          chats: chats
        }, { authorization: true })
      }
      syncData();
      toast({
        title: "Estamos sincronizados.",
        description: "Comece a criar suas listas de disparo"
      });
    }
  }, [getChatsQuery.status]);

  return (
    <Tooltip content="Sincronizar">
      <Button size="sm" variant="default" onClick={handleSync} disabled={!props.isAlreadyConnected} className={cn(getChatsQuery.isFetching && "opacity-50 pointer-events-none")}>
        <svg fill="#FFFFFF" height="16px" width="16px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 489.645 489.645" className={cn(getChatsQuery.isFetching && "animate-spin")}>
          <g>
            <path d="M460.656,132.911c-58.7-122.1-212.2-166.5-331.8-104.1c-9.4,5.2-13.5,16.6-8.3,27c5.2,9.4,16.6,13.5,27,8.3
            c99.9-52,227.4-14.9,276.7,86.3c65.4,134.3-19,236.7-87.4,274.6c-93.1,51.7-211.2,17.4-267.6-70.7l69.3,14.5
            c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-122.8-25c-20.6-2-25,16.6-23.9,22.9l15.6,123.8
            c1,10.4,9.4,17.7,19.8,17.7c12.8,0,20.8-12.5,19.8-23.9l-6-50.5c57.4,70.8,170.3,131.2,307.4,68.2
            C414.856,432.511,548.256,314.811,460.656,132.911z"/>
          </g>
        </svg>
      </Button>
    </Tooltip>
  )
}