"use client";

import { Handle, NodeProps, Position } from "reactflow";
import { MessageSquareText, SquarePen, Trash, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useFlowContext } from "@/contexts/flow";
import { TextNodeProps } from "@/@types";
import { characterLimiter } from "@/utils/character-limiter";

type Input = {
  message: string
  previewLink: string;
}

const schema = z.object({
  message: z.string({ required_error: "É obrigatório" }),
  previewLink: z.string({ required_error: "É obrigatório" }).url("Precisa ser uma url válida."),
});

export function TextNode(data: NodeProps<TextNodeProps>) {
  const {
    handleNodeDelete,
    handleEditNodeData
  } = useFlowContext();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: data.data.message,
      previewLink: data.data.previewLink
    }
  });

  const editData: SubmitHandler<Input> = (values) => {
    handleEditNodeData(data.id, { previewLink: values.previewLink, message: values.message.replace(/\n/g, '\\r\\n') })
  }

  const deleteNode = () => {
    handleNodeDelete(data.id);
  }

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="bg-[#5528ff]"
      />
      <div className="xl:bg-white shadow-md w-64 rounded-md p-2 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 text-sm">
            <Button type="button" variant={"primary-action"} size="icon" className="rounded-full bg-[#5528ff] text-white">
              <MessageSquareText size={16} />
            </Button>
            <span className="font-semibold text-slate-700">Mensagem de Texto</span>
          </div>
          <Trash size={12} onClick={deleteNode} className="text-red-500 cursor-pointer" />
        </div>
        <div className="text-sm bg-slate-100 p-2 rounded-md flex items-center justify-between">
          {
            data.data.message ? 
            <p className="text-xs">
              {characterLimiter(data.data.message, 20)}...
            </p> :
            <p className="text-xs">Editar conteúdo</p>
          }
          <Popover>
            <PopoverTrigger>
              <Button size={"xs"} variant="primary-action" className="rounded-full">
                <SquarePen size={12} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="ml-6 w-[320px] -mt-[70px]" side="right" align="start" sideOffset={16}>
              <Form {...form}>
                <form className="w-full flex flex-col gap-4" onSubmit={form.handleSubmit(editData)}>
                  <FormField
                    control={form.control}
                    name="previewLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link para preview</FormLabel>
                        <FormControl>
                          <Input placeholder="https://shope.ee/3ffl8cxyz" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Ex.: Grupo de ofertas..." {...field} rows={16} className="resize-none" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" variant="primary-action">
                    Salvar mensagem
                  </Button>
                </form>
              </Form>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="bg-[#5528ff]"
      />
    </>
  )
}