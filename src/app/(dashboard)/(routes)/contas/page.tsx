"use client";

import axios from "axios";
import { v4 as uuid } from "uuid";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { RotatingLines } from "react-loader-spinner";
import { useToast } from "@/components/ui/use-toast";
import { Instance } from "@/components/instance";
import { useInstances } from "@/hooks/instances/use-instances";
import { addYears } from "date-fns";

export default function Page() {
  const { userId } = useAuth();
  const query = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationKey: ["instance", userId],
    mutationFn: async () => {
      const instanceId = uuid();
      const { data } = await axios.post("/api/wapp/instance", { instanceName: instanceId, description: userId });
      return data;
    },
    onSuccess: () => {
      toast({ title: "Instância adicionada com sucesso, leio o QR code com seu aplicativo" })
      query.invalidateQueries({ queryKey: ["instances", userId] })
    }
  });

  const { data, isLoading, isError, refetch } = useInstances(userId);

  const handleInstance = async () => {
    await mutation.mutateAsync()
  }

  const handleRefetchInstances = () => {
    refetch();
  }

  if (isLoading) {
    return (
      <section className="p-4">
        <h1 className="text-xl font-bold text-gray-800">
          Contas
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

  if (isError) {
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
      <div className="flex items-center justify-between">
        <PageHeader>
          Contas
        </PageHeader>
        <div className="flex items-center gap-x-2">
          <Button variant="primary-action" onClick={handleInstance}>
            {mutation.isPending && <RotatingLines
              visible={true}
              width="12"
              strokeWidth="4"
              strokeColor="#FFFFFF"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />}
            Adicionar conta
          </Button >
          <Button variant="primary-outline" onClick={handleRefetchInstances}>
            {isLoading && <RotatingLines
              visible={true}
              width="12"
              strokeWidth="4"
              strokeColor="#FFFFFF"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />}
            Atualizar
          </Button >
        </div>
      </div>
      <section className="py-4">
        {
          data.length === 0 ?
            (
              <p>Você ainda não possui contas whatsapp conectadas.</p>
            ) : (
              <Instance.Root data={data} />
            )
        }
      </section>
    </section>
  )
}