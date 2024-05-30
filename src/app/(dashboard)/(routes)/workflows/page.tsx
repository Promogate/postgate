"use client";

import { Edit, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { CreateWorkflowForm } from "@/components/forms/create-workflow";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ADD_WORKFLOW_MODAL } from "@/config";
import { useModal } from "@/hooks/use-modal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { api } from "@/lib/axios";

export default function Page() {
  const { isOpen, onOpen, onClose } = useModal()
  const { data, isLoading, isError } = useQuery({
    queryKey: ["workflows"],
    queryFn: async () => {
      const { data } = await api.get("/resources/workflows", { authorization: true });
      return data;
    },
    staleTime: 1000 * 60 * 5,
  })

  if (isLoading) {
    return (
      <>
        <section className="space-y-4 md:p-8">
          <div className="flex items-center justify-between mt-8">
            <h1 className="text-xl font-bold text-gray-800">
              Workflows
            </h1>
            <Button variant="default" onClick={() => onOpen(ADD_WORKFLOW_MODAL)}>
              <Plus />
              Adicionar workflow
            </Button >
          </div>
          <div className="w-full flex justify-center">
            <p>Carregando...</p>
          </div>
        </section>
        <Dialog open={isOpen} onOpenChange={() => onClose(ADD_WORKFLOW_MODAL)}>
          <DialogContent>
            <CreateWorkflowForm onClose={onClose} />
          </DialogContent>
        </Dialog>
      </>
    )
  }

  if (isError) {
    return (
      <>
        <section className="space-y-4 md:p-8">
          <div className="flex items-center justify-between mt-8">
            <h1 className="text-xl font-bold text-gray-800">
              Workflows
            </h1>
            <Button variant="default" onClick={() => onOpen(ADD_WORKFLOW_MODAL)}>
              <Plus />
              Adicionar workflow
            </Button >
          </div>
          <div className="w-full flex justify-center">
            <p>Ocorreu um erro...</p>
          </div>
        </section>
        <Dialog open={isOpen} onOpenChange={() => onClose(ADD_WORKFLOW_MODAL)}>
          <DialogContent>
            <CreateWorkflowForm onClose={onClose} />
          </DialogContent>
        </Dialog>
      </>
    )
  }

  if (data.length === 0) {
    return (
      <>
        <section className="space-y-4 md:p-8">
          <div className="flex items-center justify-between mt-8">
            <h1 className="text-xl font-bold text-gray-800">
              Workflows
            </h1>
            <Button variant="default" onClick={() => onOpen(ADD_WORKFLOW_MODAL)}>
              <Plus />
              Adicionar workflow
            </Button >
          </div>
          <div className="w-full flex justify-center">
            <p>Você não possui fluxos ativos</p>
          </div>
        </section>
        <Dialog open={isOpen} onOpenChange={() => onClose(ADD_WORKFLOW_MODAL)}>
          <DialogContent>
            <CreateWorkflowForm onClose={onClose} />
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <>
      <section className="space-y-4 md:p-8">
        <div className="flex items-center justify-between mt-8">
          <h1 className="text-xl font-bold text-gray-800">
            Workflows
          </h1>
          <Button variant="default" onClick={() => onOpen(ADD_WORKFLOW_MODAL)}>
            <Plus />
            Adicionar workflow
          </Button >
        </div>
        <div>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 my-8">
            {data.map((workflow: any) => {
              return (
                <Card key={workflow.id}>
                  <CardHeader>
                    <CardTitle>
                      <h2>{workflow.title}</h2>
                    </CardTitle>
                    <CardDescription>
                      <p>{workflow.description}</p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex w-full justify-end">
                    <Link href={`/workflows/${workflow.id}`}>
                      <Button variant="default" size="icon">
                        <Edit size={16} />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
      <Dialog open={isOpen} onOpenChange={() => onClose(ADD_WORKFLOW_MODAL)}>
        <DialogContent>
          <CreateWorkflowForm onClose={onClose} />
        </DialogContent>
      </Dialog>
    </>
  )
}