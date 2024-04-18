"use client";

import { useAuth } from "@clerk/nextjs";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { RotatingLines } from "react-loader-spinner";
import { Instance } from "@/components/instance";
import { useInstances } from "@/hooks/instances/use-instances";
import { useState } from "react";
import { CreateInstanceModal } from "@/components/modals/create-instance";

export default function Page() {
  const { userId } = useAuth();
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError, refetch } = useInstances(userId);

  const handleRefetchInstances = () => {
    refetch();
  }

  const handleCreateInstanceModal = () => {
    setOpen(true);
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
    <>
      <section className="p-4">
        <div className="flex items-center justify-between">
          <PageHeader>
            Contas
          </PageHeader>
          <div className="flex items-center gap-x-2">
            <Button variant="default" onClick={handleCreateInstanceModal}>
              Adicionar instância
            </Button >
            <Button variant="default" onClick={handleRefetchInstances}>
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
                <section className="p-4">
                  <div className="w-full flex flex-col items-center justify-center my-8 gap-y-4">
                    <span>Você ainda não possui uma conta instância criada</span>
                    <Button variant="outline" onClick={handleCreateInstanceModal}>
                      Adicionar primeira instância
                    </Button>
                  </div>
                </section>
              ) : (
                <Instance.Root data={data} />
              )
          }
        </section>
      </section>
      <CreateInstanceModal open={open} setOpen={setOpen} />
    </>
  )
}