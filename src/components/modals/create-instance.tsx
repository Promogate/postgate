"use client";

import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { v4 as uuid } from "uuid";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { useCreateInstance } from "@/hooks/instances/use-instances";
import { Dispatch, SetStateAction } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type CreateInstanceModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

type FormInput = {
  name: string;
  description: string;
}

const schema = z.object({
  name: z.string({ required_error: "Nome para instância é obrigatório" }),
  description: z.string({ required_error: "Descrição para instância é obrigatório" })
})

export function CreateInstanceModal(props: CreateInstanceModalProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: ""
    }
  });
  const mutation = useCreateInstance()

  const handleCreateInstance: SubmitHandler<FormInput> = async (values) => {
    const { name, description } = form.getValues();
    await mutation.mutateAsync({ name, description })
  }

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(handleCreateInstance)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da instância</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="primary-action" className="float-end" type="submit">
              Criar instância
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}