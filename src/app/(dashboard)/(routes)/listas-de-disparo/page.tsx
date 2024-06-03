"use client";

import { ArrowRight, Plus, XCircle } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { RotatingLines } from "react-loader-spinner";
import { SendingList } from "@/@types";
import Link from "next/link";
import { api } from "@/lib/axios";
import useStore from "@/hooks/useStore";
import useAuthStore from "@/hooks/use-user";

export default function Page() {
  const { toast } = useToast();
  const store = useStore(useAuthStore, (state) => state);

  const sendingListQuery = useQuery<SendingList[]>({
    queryKey: ["sending_list_data", store?.user?.id],
    queryFn: async () => {
      const { data } = await api.get("/resources/sending-lists", { authorization: true });
      return data;
    },
    staleTime: 1000 * 60 * 5
  });

  const mutation = useMutation({
    mutationKey: ["sending_list_mutation", store?.user?.id],
    mutationFn: async () => {
      await api.post("/resources/sending-list/save", {}, { authorization: true });
    },
    onSuccess: () => {
      toast({
        title: "Lista criada com sucesso"
      })
      sendingListQuery.refetch()
    }
  })

  const handleCreateAList = async () => {
    await mutation.mutateAsync();
  }

  if (sendingListQuery.isLoading) {
    return (
      <section className="space-y-4 md:p-8">
        <h1 className="text-xl font-bold text-gray-800">
          Listas de disparo
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

  if (sendingListQuery.isError) {
    return (
      <section className="space-y-4 md:p-8">
        <h1 className="text-xl font-bold text-gray-800">
          Contas
        </h1>
        <div className="w-full h-96 flex flex-col items-center justify-center my-8 gap-y-4">
          <XCircle />
          <span>Ocorreu algum erro, tente novamente</span>
          <Button variant="outline" onClick={() => sendingListQuery.refetch()}>
            Recarregar página
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-4 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">
          Listas de disparo
        </h1>
        <Button variant="default" onClick={handleCreateAList} className="flex items-center gap-2">
          <Plus />
          Criar lista de disparo
        </Button >
      </div>
      <div className="my-4 grid grid-cols-3 gap-4">
        {sendingListQuery.data?.map((list) => {
          return (
            <div key={list.id} className="border p-2 rounded-md flex flex-col gap-2">
              <div className="">
                <p>{list.name ? list.name : list.id}</p>
              </div>
              <div className="flex items-center justify-end">
                <Link href={`/listas-de-disparo/${list.id}`}>
                  <Button size="icon" variant="default">
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}