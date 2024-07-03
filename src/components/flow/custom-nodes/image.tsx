"use client";

import { Handle, NodeProps, Position } from "reactflow";
import { ChevronDown, Image as LucideImage, SquarePen, Trash, X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { ImageNodeProps } from "@/@types";
import { characterLimiter } from "@/utils/character-limiter";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { useFlowStore } from "@/hooks/use-flow-store";
import { RotatingLines } from "react-loader-spinner";

type FormInput = {
  message?: string;
}

const schema = z.object({
  message: z.string().optional(),
});

export function ImageNode(data: NodeProps<ImageNodeProps>) {
  const deleteNode = useFlowStore(state => state.deleteNode);
  const editImageNode = useFlowStore(state => state.editImageNode);
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(data.data.image as string);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: data.data.message ? data.data.message.replace(/\\r\\n/g, '\n') : "",
    }
  });

  const editData: SubmitHandler<FormInput> = (values) => {
    setLoading(true);
    editImageNode(data.id, {
      userId: "_",
      image: imageFile as File,
      message: values.message?.replace(/\n/g, '\\r\\n') as string
    });
    setLoading(false);
  }

  const handleDeleteNode = () => {
    deleteNode(data.id);
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageFile(file);
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{
          marginTop: "-3px",
          width: "16px",
          height: "16px",
          backgroundColor: "#84cc16",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ChevronDown
          size={12}
          className="text-white"
        />
      </Handle>
      <div className="xl:bg-white shadow-md w-64 rounded-md p-2 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 text-sm">
            <Button type="button" variant={"default"} size="icon" className="rounded-full bg-red-500 text-white">
              <LucideImage size={16} />
            </Button>
            <span className="font-semibold text-slate-700">Imagem</span>
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
          <Popover onOpenChange={setOpen} open={open}>
            <PopoverTrigger>
              <Button size={"sm"} variant="default" className="rounded-full" onClick={() => setOpen(true)}>
                <SquarePen size={12} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="ml-6 w-[320px] -mt-[70px]" side="right" align="start" sideOffset={16}>
              {
                imagePreview ? (
                  <>
                    <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">Imagem</p>
                    <div className="relative w-full min-h-40 border mb-4">
                      <Button size="sm" className="rounded-full absolute z-20 -right-1 -top-1" variant="destructive" onClick={() => setImagePreview(null)}>
                        <X size={12} />
                      </Button>
                      <Image src={imagePreview as string} alt="preview" fill objectFit="contain" />
                    </div>
                  </>
                ) : (
                  <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                    <Label htmlFor="picture">Imagem</Label>
                    <Input id="picture" type="file" onChange={handleImageChange} />
                  </div>
                )
              }
              <Form {...form}>
                <form className="w-full flex flex-col gap-4" onSubmit={form.handleSubmit(editData)}>
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
                  <Button type="submit" variant="default" className="flex justify-center items-center gap-x-4">
                    {
                      loading &&
                      <RotatingLines
                        visible={true}
                        width="12"
                        strokeWidth="4"
                        strokeColor="#FFFFFF"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                      />
                    }
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