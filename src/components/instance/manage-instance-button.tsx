import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import { Tooltip } from "../common/tooltip";

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
      const { data } = await api.get<{ chats: string, sessionToken: string }>(`/codechat/get_chats/${props.instanceId}`, { authorization: true });
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
    if (getChatsQuery.isSuccess) {
      const { chats, sessionToken } = getChatsQuery.data;
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
      <Button size="sm" variant="default" onClick={handleSync} disabled={!props.isAlreadyConnected}>
        <RefreshCcw size={12} />
      </Button>
    </Tooltip>
  )
}