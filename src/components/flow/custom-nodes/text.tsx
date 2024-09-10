"use client";

import { Handle, NodeProps, Position } from "reactflow";
import { ChevronDown, MessageSquareText, SquarePen, Trash, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { TextNodeProps } from "@/@types";
import { characterLimiter } from "@/utils/character-limiter";
import { useRef, useState } from "react";
import { useFlowStore } from "@/hooks/use-flow-store";
import { SheetContent, SheetTrigger, Sheet, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

type Input = {
  message: string
}

const schema = z.object({
  message: z.string({ required_error: "É obrigatório" }),
});

export function TextNode(data: NodeProps<TextNodeProps>) {
  const editTextNode = useFlowStore(state => state.editTextNode);
  const deleteNode = useFlowStore(state => state.deleteNode);
  const [open, setOpen] = useState(false);
  const outputRef = useRef(null)

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: data.data.message.replace(/\\r\\n/g, '\n'),
    }
  });

  const editData: SubmitHandler<Input> = (values) => {
    editTextNode(data.id, { message: values.message.replace(/\n/g, '\\r\\n') });
    setOpen(false);
  }

  const handleDeleteNode = () => {
    deleteNode(data.id);
  }

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{
          width: "16%",
          height: "16%",
          backgroundColor: "#cbd5e1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
          marginTop: "-12px"
        }}
      >
        <ChevronDown
          size={12}
          className="text-gray-800"
        />
      </Handle>
      <div className="xl:bg-white shadow-md w-64 rounded-md p-2 space-y-2" onDoubleClick={() => setOpen(true)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 text-sm">
            <Button type="button" variant={"default"} size="icon" className="rounded-full bg-[#5528ff] text-white">
              <MessageSquareText size={16} />
            </Button>
            <span className="font-semibold text-slate-700">Mensagem de Texto</span>
          </div>
          <Trash size={12} onClick={handleDeleteNode} className="text-red-500 cursor-pointer" />
        </div>
        <div className="text-sm bg-slate-100 p-2 rounded-md flex items-center justify-between">
          {
            data.data.message ?
              <p className="text-xs">
                {characterLimiter(data.data.message, 20)}...
              </p> :
              <p className="text-xs">Editar conteúdo</p>
          }
          <Sheet onOpenChange={setOpen} open={open}>
            <SheetTrigger>
              <Button size={"sm"} variant="default" className="rounded-full" onClick={() => setOpen(true)}>
                <SquarePen size={12} />
              </Button>
            </SheetTrigger>
            <SheetContent className="ml-6 md:w-96" side="right">
              <SheetHeader>
                <SheetTitle>
                  Editor de Mensagem
                </SheetTitle>
                <SheetDescription>
                  Edite a sua mensagem e ao final salve para que seja atualizada
                </SheetDescription>
              </SheetHeader>
              <Form {...form}>
                <form className="w-full flex flex-col gap-4 my-4" onSubmit={form.handleSubmit(editData)}>
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
                  <Button type="submit" variant="default">
                    Salvar mensagem
                  </Button>
                </form>
              </Form>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          width: "16%",
          height: "16%",
          backgroundColor: "#cbd5e1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          marginBottom: "-12px",
          zIndex: 10
        }}
      >
        <ChevronDown
          size={12}
          className="text-gray-800"
          pointerEvents={"none"}
        />
      </Handle>
    </>
  )
}