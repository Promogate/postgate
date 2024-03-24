"use client";

import { useParams } from "next/navigation";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Pencil, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotatingLines } from "react-loader-spinner";

export default function Page() {
  const params = useParams() as { id: string };
  const { userId } = useAuth();
  const [isInput, setIsInput] = useState(false);

  const instancesQuery = useQuery({
    queryKey: ["sending_lists_instances", userId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/wapp/instance/my_instances`);
      return data;
    },
    staleTime: 1000 * 60 * 5
  })

  const listQuery = useQuery({
    queryKey: ["sending_list", userId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/wapp/sending_list/${params.id}`)
      return data;
    },
    staleTime: 1000 * 60 * 5
  })

  const nameForm = useForm({
    defaultValues: {
      name: params.id,
    }
  });

  const handleShowInput = () => {
    setIsInput(true);
  }

  const cancelShowInput = () => {
    setIsInput(false);
  }

  const nameMutation = useMutation({
    mutationKey: ["update_name", params.id],
    mutationFn: async (values: { name: string }) => {
      await axios.put(`/api/wapp/sending_list`, {
        name: values.name
      }, {
        params: {
          listId: params.id
        }
      })
    },
    onSuccess: () => {
      listQuery.refetch();
      setIsInput(false);
    }
  });

  const handleNameSubmit: SubmitHandler<{ name: string }> = async (values) => {
    await nameMutation.mutateAsync(values);
  }

  const handleReloadPage = () => {
    instancesQuery.refetch()
    listQuery.refetch()
  }

  if (instancesQuery.isLoading || listQuery.isLoading) {
    return (
      <section className="p-4">
        <div className="w-full h-96 flex items-center justify-center my-8 ">
          <RotatingLines
            visible={true}
            width="80"
            strokeWidth="5"
            strokeColor="#5528ff"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      </section>
    )
  }

  if (instancesQuery.isError || listQuery.isError) {
    return (
      <section className="p-4">
        <h1 className="text-xl font-bold text-gray-800">
          Contas
        </h1>
        <div className="w-full h-96 flex flex-col items-center justify-center my-8 gap-y-4">
          <XCircle />
          <span>Ocorreu algum erro, tente novamente</span>
          <Button variant="outline" onClick={handleReloadPage}>
            Recarregar página
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="p-4">
      <Form {...nameForm}>
        <form onSubmit={nameForm.handleSubmit(handleNameSubmit)}>
          {
            isInput ? (
              <div className="flex items-center gap-x-4 mb-8">
                <FormField
                  control={nameForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" size="sm" variant="outline">
                  Atualizar
                </Button>
                <Button type="submit" size="sm" variant="destructive" onClick={cancelShowInput}>
                  Cancelar
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-x-2 mb-8 h-[36px]">
                <span>{listQuery.data.name ? listQuery.data.name : listQuery.data.id}</span>
                <Pencil size={16} className="text-gray-300 cursor-pointer hover:text-gray-900 transition-all ease-in-out" onClick={handleShowInput} />
              </div>
            )
          }
        </form>
      </Form>
      <form>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Escolha uma conexão" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Conexões</SelectLabel>
              {instancesQuery.data.map((instance: any) => {
                return (
                  <SelectItem key={instance.id} value={instance.id}>{instance.id}</SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </form>
    </section>
  )
}