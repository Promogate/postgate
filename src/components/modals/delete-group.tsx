"use client";

import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";

import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Group } from "@/@types";
import { Button } from "@/components/ui/button";


type DeleteGroupDialogProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  group: Group;
}

export function DeleteGroupDialog({ setOpen, group }: DeleteGroupDialogProps) {
  const { toast } = useToast();
  const query = useQueryClient();

  const { handleSubmit } = useForm({ mode: "onSubmit" });

  const handleDeleteRedirector = async () => {
    await axios.delete(`/api/group/${group.id}`);
  };

  const mutation = useMutation({
    mutationFn: async () => await handleDeleteRedirector(),
    onSuccess: () => {
      toast({
        title: "Redirecionador removido com sucesso!",
        variant: "default"
      });
      setOpen(false);

      query.invalidateQueries({ queryKey: ["redirector", group.redirectorId] });
    },
    onError: (error: any) => {
      toast({
        title: "Ops! algo deu errado",
        description: error.response.data.message,
        variant: "destructive"
      });
    }
  });

  const onSubmit = async () => {
    await mutation.mutateAsync();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Remover grupo?
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6 pl-1 pr-4 py-4">
        <div className="w-full py-10 my-10 h-32 flex flex-col justify-center items-center text-center">
          <h2>Você tem certeza que quer remover este grupo? Não é possível recuperar os dados após removê-lo</h2>
        </div>
        <div className="flex justify-between py-4">
          <Button type="submit" className="bg-red-500 text-white hover:bg-red-600">
            {mutation.isPending && <RotatingLines
              visible={true}
              width="16"
              strokeWidth="4"
              strokeColor="#FFFFFF"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />}
            Deletar grupo
          </Button>
          <Button type="button" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};