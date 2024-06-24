import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useEffect } from "react";
import { toast } from "../ui/use-toast";
import { Tooltip } from "../common/tooltip";

type ManageInstanceButtonProps = {
  instanceId: string;
  hasSession: boolean;
  isAlreadyConnected: boolean;
}

export function ManageInstanceButton(props: ManageInstanceButtonProps) {
  const syncQuery = useQuery({
    enabled: false,
    queryKey: ["synchronize", props.instanceId],
    queryFn: async () => {
      await api.get(`/codechat/sync/${props.instanceId}`);
      return "Success";
    }
  });

  const handleSync = async () => {
    await syncQuery.refetch();
  }

  useEffect(() => {
    if (syncQuery.isFetching) {
      toast({
        title: "Estamos sincronizando os seus contatos ativos no whatsapp",
        description: "Permaneça na página até finalizarmos o processo."
      });
    }
    if (syncQuery.isSuccess) {
      toast({
        title: "Estamos sincronizados.",
        description: "Comece a criar suas listas de disparo"
      });
    }
  }, [syncQuery.status]);

  return (
    <Tooltip content="Sincronizar">
      <Button size="sm" variant="default" onClick={handleSync} disabled={!props.isAlreadyConnected}>
        <RefreshCcw size={12} />
      </Button>
    </Tooltip>
  )
}