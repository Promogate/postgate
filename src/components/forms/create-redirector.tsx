"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

type CreateRedirectorInput = {
  title: string;
  descriptiont?: string;
}

const schema = z.object({
  title: z.string().min(1, "O título não pode estar vazio."),
  description: z.string().optional()
});

type createRedirectorSchema = z.infer<typeof schema>;

type CreateRedirectorFormProps = {
  onClose: () => void;
}

export function CreateRedirectorForm({ onClose }: CreateRedirectorFormProps) {
  const { toast } = useToast();
  const { userId } = useAuth();
  const query = useQueryClient();
  const form = useForm<createRedirectorSchema>({
    resolver: zodResolver(schema)
  });

  const mutation = useMutation({
    mutationFn: async (values: CreateRedirectorInput) => {
      await axios.post(`/api/redirector`, { ...values, userId });
    },
    onSuccess: () => {
      toast({
        title: "Redirecionador criado com sucesso!",
        variant: "default",
      });
      query.invalidateQueries({ queryKey: ["redirectors", userId] });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    }
  });

  const handleCreateRedirector: SubmitHandler<CreateRedirectorInput> = async (values) => {
    await mutation.mutateAsync(values);
  };

  return (
    <Form {...form}>
      <form className="w-full flex flex-col gap-4" onSubmit={form.handleSubmit(handleCreateRedirector)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Redirecionador de grupos de desconto" {...field} />
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
                <Input placeholder="Redirecionador com objetivo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="primary-action" type="submit" className="bg-[#5528FF] text-white flex items-center gap-x-2">
          {mutation.isPending && <RotatingLines
            visible={true}
            width="12"
            strokeWidth="4"
            strokeColor="#FFFFFF"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />}
          Criar redirecionador
        </Button>
      </form>
    </Form>
  );
}