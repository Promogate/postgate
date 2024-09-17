"use client";

import { Copy, Group, MousePointerClick, Plus, XCircle } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Tooltip } from "@/components/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { copyToClipboard } from "@/utils/copy-to-clipboard";
import { Sheet } from "@/components/sheet";
import { CreateRedirectorForm } from "@/components/forms/create-redirector";
import { useSheet } from "@/hooks/use-sheet";
import { useRedirectors } from "@/hooks/use-redirectors";

export default function Page() {
  const ref = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { onClose, onOpen } = useSheet();
  const { data, isLoading, isError, refetch } = useRedirectors();

  const handleCopyShortlink = () => {
    if (ref.current) {
      copyToClipboard(ref.current.value);
      toast({
        title: "Link copiado com sucesso!",
        variant: "default",
      });
    }
  }

  if (isLoading) {
    return (
      <section className="space-y-4 md:p-8">
        <h1 className="text-xl font-bold text-gray-800 p-4">
          Redirecionadores
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
      <section className="space-y-4 md:p-8">
        <h1 className="text-xl font-bold text-gray-800 p-4">
          Redirecionadores
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
    <section className="space-y-4 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">
          Redirecionadores
        </h1>
        <Button variant="default" size="icon" onClick={onOpen}>
          <Plus />
        </Button >
        <Sheet.Root>
          <CreateRedirectorForm onClose={onClose} />
        </Sheet.Root>
      </div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 mt-4">
        {
          data.length === 0 ?
            (
              <section className="p-4">
                <div className="w-full flex flex-col items-center justify-center my-8 gap-y-4">
                  <span>Você ainda não possui redirecionadores</span>
                  <Button variant="outline" onClick={onOpen}>
                    Adicionar primeiro redirecionador
                  </Button>
                </div>
              </section>
            ) :
            data?.map((redirector: any) => {
              return (
                <Card key={redirector.id}>
                  <CardHeader>
                    <Link href={`/redirecionadores/${redirector.id}`}>
                      <CardTitle>
                        {redirector.title}
                      </CardTitle>
                    </Link>

                    <CardDescription>
                      {redirector.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between">
                    <div className="">
                      <Tooltip.Root icon={<Group className="h-4 w-4" />} data={redirector.currentGroup}>
                        <span>
                          Grupos
                        </span>
                      </Tooltip.Root>
                      <Tooltip.Root icon={<MousePointerClick className="h-4 w-4" />} data={redirector.timesClicked}>
                        <span>
                          Cliques
                        </span>
                      </Tooltip.Root>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <Input type="text" value={redirector.redirectorLink} readOnly ref={ref} />
                      <Button variant="outline" onClick={handleCopyShortlink}>
                        <Copy />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
      </div>
    </section>
  )
}