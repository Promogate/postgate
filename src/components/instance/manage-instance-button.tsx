import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useEffect } from "react";
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
    toast({
      title: "Estamos sincronizando os seus contatos ativos no whatsapp",
      description: "Permaneça na página até finalizarmos o processo.",
      duration: 40000,
    });
    await getChatsQuery.refetch();
    toast({
      title: "Estamos sincronizados.",
      description: "Comece a criar suas listas de disparo"
    });
  }

  useEffect(() => {
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
    }
  }, [getChatsQuery.status]);

  return (
    <Tooltip content="Sincronizar">
      <Button size="sm" variant="default" onClick={handleSync} disabled={!props.isAlreadyConnected} className={cn("flex items-center gap-2", getChatsQuery.isFetching && "opacity-50 pointer-events-none")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("lucide lucide-refresh-cw", getChatsQuery.isFetching && "animate-spin")}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" /></svg>
        Sincronizar Grupos
      </Button>
    </Tooltip>
  )
}