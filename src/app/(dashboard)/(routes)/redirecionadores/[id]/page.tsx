"use client";

import { CreateGroupForm } from "@/components/forms/create-group";
import { Group } from "@/components/group";
import { Sheet } from "@/components/sheet";
import { Button } from "@/components/ui/button";
import { useSheet } from "@/hooks/use-sheet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronLeft, Plus, XCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { RotatingLines } from "react-loader-spinner";

export default function Page() {
  const { id } = useParams() as { id: string };
  const { onClose, onOpen } = useSheet();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["redirector", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/redirector/${id}`);
      return data.data;
    }
  })

  if (isLoading) {
    return (
      <section>
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
      <section>
        <h1 className="text-xl font-bold text-gray-800">
          Redirecionador - { }
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
    <section className="w-full flex flex-col">
      <div className="w-full flex justify-between">
        <div className="flex items-center gap-x-8">
          <Link href="/redirecionadores">
            <Button variant="outline">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-gray-800">
            {data.title}
          </h1>
        </div>
        <Button variant="primary-action" size="icon" onClick={onOpen}>
          <Plus />
        </Button >
        <Sheet.Root>
          <CreateGroupForm onClose={onClose} redirectorId={id} />
        </Sheet.Root>
      </div>
      <div className="my-8 flex flex-col gap-4">
        {data.groups.map((group: any) => {
          return <Group.Root key={group.id} data={group} />
        })}
      </div>
    </section>
  )
}