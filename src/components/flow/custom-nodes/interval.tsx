import { Clock, SquarePen, Trash } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Handle, NodeProps, Position } from "reactflow";
import { z } from "zod";

import { IntervalNodeProps } from "@/@types";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFlowContext } from "@/contexts/flow";

type Input = {
  interval: string;
  unity: string;
}

const schema = z.object({
  interval: z.string({ required_error: "É obrigatório" }),
  unity: z.string({ required_error: "É obrigatório" }).url("Precisa ser uma url válida."),
});

export function IntervalNode(data: NodeProps<IntervalNodeProps>) {
  const { handleNodeDelete, handleEditTextNodeData } = useFlowContext();

  const form = useForm<z.infer<typeof schema>>();

  const deleteNode = () => {
    handleNodeDelete(data.id);
  }

  const editData: SubmitHandler<Input> = (values) => {
    handleEditTextNodeData(data.id, values);
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
            <Button type="button" variant={"default"} size="icon" className="rounded-full bg-amber-500 text-white">
              <Clock size={16} />
            </Button>
            <span className="font-semibold text-slate-700">Intervalo</span>
          </div>
          <Trash size={12} onClick={deleteNode} className="text-red-500 cursor-pointer" />
        </div>
        <div className="text-sm bg-slate-100 p-2 rounded-md flex items-center justify-between">
          {
            data.data.interval && data.data.unity ? 
            <p className="text-xs">
              {data.data.interval}{data.data.unity}
            </p> :
            <p className="text-xs">Editar intervalo</p>
          }
          <Popover>
            <PopoverTrigger>
              <Button size={"sm"} variant="default" className="rounded-full">
                <SquarePen size={12} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="ml-6 w-[320px] -mt-[70px]" side="right" align="start" sideOffset={16}>
              <Form {...form}>
                <form className="w-full flex flex-col gap-4" onSubmit={form.handleSubmit(editData)}>
                  <div className="w-full flex gap-4">
                    <FormField
                      control={form.control}
                      name="interval"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Intervalo</FormLabel>
                          <FormControl>
                            <Input className="w-1/2" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="unity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unidade</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Unidade" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent >
                                <SelectItem value="seg" className="">seg</SelectItem>
                                <SelectItem value="min" className="w-1/2">min</SelectItem>
                                <SelectItem value="hrs" className="w-1/2">hrs</SelectItem>
                                <SelectItem value="dias" className="w-1/2">dias</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" variant="default" className="flex-1">
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