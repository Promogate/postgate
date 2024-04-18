import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { Button } from "@/components/ui/button";

type CreateGroupInput = {
  title: string;
  destinationLink: string;
  members: string;
  limit: string;
}

const schema = z.object({
  title: z.string({ required_error: "É obrigatório" }),
  destinationLink: z.string({ required_error: "É obrigatório" }).url("Insira um url válida"),
  members: z.string({ required_error: "É obrigatório" }).regex(/^(102[0-4]|10[0-1][0-9]|[1-9][0-9]{0,2}|0)$/, "O máximo são 1024 membros."),
  limit: z.string({ required_error: "É obrigatório" }).regex(/^(102[0-4]|10[0-1][0-9]|[1-9][0-9]{0,2}|0)$/, "O máximo são 1024 membros.")
});

type createGroupSchema = z.infer<typeof schema>;

type CreateGroupFormProps = {
  redirectorId: string;
  onClose: () => void;
}

export function CreateGroupForm({ onClose, redirectorId }: CreateGroupFormProps) {
  const { toast } = useToast();
  const form = useForm<createGroupSchema>({
    resolver: zodResolver(schema),
    mode: "onSubmit"
  });
  const query = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: CreateGroupInput) => {
      await axios.post(`/api/group`, { ...values, redirectorId: redirectorId });
    },
    onSuccess: () => {
      toast({
        title: "Grupo adicionado com sucesso!",
        variant: "default",
      });
      query.invalidateQueries({ queryKey: ["redirector", redirectorId] });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    }
  });

  const handleCreateRedirector: SubmitHandler<CreateGroupInput> = async (values) => {
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
              <FormLabel>Título do grupo</FormLabel>
              <FormControl>
                <Input placeholder="Ex.: Grupo de ofertas..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="destinationLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link do grupo</FormLabel>
              <FormControl>
                <Input placeholder="Link do grupo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-x-4">
          <FormField
            control={form.control}
            name="members"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qtn. de membros atuais</FormLabel>
                <FormControl>
                  <Input placeholder="Ex.: 105" {...field} type="text" inputMode="numeric" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Limite (padrão: 1024)</FormLabel>
                <FormControl>
                  <Input placeholder="Ex.: 512" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button variant="default" type="submit" className="bg-[#5528FF] text-white flex items-center gap-x-2">
          {mutation.isPending && <RotatingLines
            visible={true}
            width="16"
            strokeWidth="4"
            strokeColor="#FFFFFF"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />}
          Adicionar grupo ao redirecionador
        </Button>
      </form>
    </Form>
  );
}