"use client";

import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { v4 as uuid } from "uuid";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

export function CreateInstanceModal() {
  const { userId } = useAuth();

  const { isLoading, isError, data} = useQuery({
    queryKey: ["instance", userId],
    queryFn: async () => {
      const instanceId = uuid();
      const { data } = await axios.post("/api/wapp/instance", { instanceName: instanceId });
      console.log(data)
      return data;
    },
    staleTime: 1000 * 60 * 60
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="primary-action">
          <Plus />
          Adicionar conta
        </Button >
      </DialogTrigger>
      <DialogContent className="xl:min-w-[960px]">
        {
          isLoading ? (
            <p>...carregando</p>
          ) :
          isError ? (
            <p>Error...</p>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: data }} />
          )
        }
      </DialogContent>
    </Dialog>
  )
}