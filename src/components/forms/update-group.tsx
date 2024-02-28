import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { Group } from "@/@types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "../ui/button";
import { RotatingLines } from "react-loader-spinner";

type UpdateGroupInput = {
  title?: string;
  destinationLink?: string;
  members?: string;
  limit?: string;
}

const schema = z.object({
  title: z.string().optional(),
  destinationLink: z.string().url("Insira um url válida").optional(),
  members: z.string().regex(/^(102[0-4]|10[0-1][0-9]|[1-9][0-9]{0,2}|0)$/, "O máximo são 1024 membros.").optional(),
  limit: z.string().regex(/^(102[0-4]|10[0-1][0-9]|[1-9][0-9]{0,2}|0)$/, "O máximo são 1024 membros.").optional()
});

type updateGroupSchema = z.infer<typeof schema>;

type UpdateGroupFormProps = {
  setOpen: (value: boolean) => void;
  group: Group
}

export function UpdateGroupForm({ setOpen, group }: UpdateGroupFormProps) {
  const { toast } = useToast();
  const query = useQueryClient();
  const form = useForm<updateGroupSchema>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    values: {
      destinationLink: group.destinationLink,
      limit: String(group.limit),
      members: String(group.members),
      title: group.title
    }
  });

  const mutation = useMutation({
    mutationFn: async (values: UpdateGroupInput) => {
      await axios.put(`/api/group/${group.id}`, {
        ...values,
        limit: Number(values.limit),
        members: Number(values.members)
      });
    },
    onSuccess: () => {
      toast({
        title: "Grupo atualizado com sucesso!",
        variant: "default",
      });
      setOpen(false);
      query.invalidateQueries({ queryKey: ["redirector", group.redirectorId] });
    },
    onError: (error: any) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    }
  });

  const handleCreateRedirector: SubmitHandler<UpdateGroupInput> = async (values) => {
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
                <Input placeholder="Redirecionador de grupos de desconto" {...field} />
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
        <Button variant="primary-action" type="submit" className="bg-[#5528FF] text-white">
          {mutation.isPending && <RotatingLines
            visible={true}
            width="16"
            strokeWidth="4"
            strokeColor="#FFFFFF"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />}
          Atualizar grupo
        </Button>
      </form>
    </Form>
  );
}