import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Form, FormField, FormLabel, FormMessage, FormItem, FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { useEditInstance, useInstanceData } from "@/hooks/instances/use-instances";

type EditInstanceButtonProps = {
  instanceId: string;
}

type FormInput = {
  name?: string;
  description?: string;
}

const schema = z.object({
  name: z.string({ required_error: "Nome para instância é obrigatório" }).optional(),
  description: z.string({ required_error: "Descrição para instância é obrigatório" }).optional()
})

export function EditInstanceButton(props: EditInstanceButtonProps) {
  const [open, setOpen] = useState(false)
  const query = useInstanceData(props.instanceId);
  const mutation = useEditInstance(props.instanceId);

  const handleOpen = () => {
    setOpen(true);
    query.refetch()
    // if (!query.isError) {
    //   form.setValue("name", query.data?.id ? query.data.instanceName as string : query.data?.instance as string);
    //   form.setValue("description", query.data?.description ? query.data.description : "");
    // }
  }

  const handleClose = () => {
    setOpen(false);
  }

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "teste",
      description: "teste"
    }
  });

  const handleEditInstance: SubmitHandler<FormInput> = async (values) => {
    await mutation.mutateAsync(values);
  }

  return (
    <>
      <Button size="sm" onClick={handleOpen} variant="outline">
        <Pencil size={12} />
      </Button>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(handleEditInstance)}>
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
              <Button variant="default" className="float-end" type="submit">
                Confirmar edição
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}