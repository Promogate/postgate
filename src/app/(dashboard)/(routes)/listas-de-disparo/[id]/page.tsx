/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Pencil, X, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotatingLines } from "react-loader-spinner";
import { maskOwnerJid } from "@/utils/maskOwnerJid";
import { SendingList, WappGroup } from "@/@types";
import { useToast } from "@/components/ui/use-toast";

export default function Page() {
  const params = useParams() as { id: string };
  const { toast } = useToast();
  const { userId } = useAuth();
  const [isInput, setIsInput] = useState(false);
  const [instanceId, setInstanceId] = useState<null | string>(null);
  const [groupsInfo, setGroupsInfo] = useState<WappGroup[]>([]);
  const [list, setList] = useState<string[]>([]);

  function handleOnDrag(event: React.DragEvent, group: WappGroup) {
    const data = JSON.stringify(group);
    event.dataTransfer.setData("group", data);
  }

  function handleOnDrop(event: React.DragEvent) {
    const data = event.dataTransfer.getData("group") as string;
    const group = JSON.parse(data) as WappGroup;
    if (groupsInfo.some(groupInfo => groupInfo.id === group.id) && list.includes(group.remoteJid)) {
      toast({
        title: "Grupo já adicionado"
      });
      return;
    }

    setList([...list, group.remoteJid]);
    setGroupsInfo([...groupsInfo, group]);
  }

  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
  }

  const instancesQuery = useQuery({
    queryKey: ["sending_lists_instances", userId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/wapp/instance/my_instances`);
      return data;
    },
    staleTime: 1000 * 60 * 60
  })

  const listQuery = useQuery({
    queryKey: ["sending_list", userId],
    queryFn: async () => {
      const { data } = await axios.get<SendingList>(`/api/wapp/sending_list/${params.id}`);
      if (data.groupsInfo) {
        setGroupsInfo(JSON.parse(data.groupsInfo));
      }
      if (data.list) {
        setList(JSON.parse(data.list));
      }
      return data;
    },
    staleTime: 1000 * 60 * 60,
  })

  const chatsQuery = useQuery<WappGroup[]>({
    enabled: false,
    queryKey: ["chats", userId],
    queryFn: async () => {
      const { data } = await axios.get("/api/wapp/chats", {
        params: {
          instanceId: instanceId
        }
      })
      return data;
    },
    staleTime: 1000 * 60 * 60,
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
    mutationFn: async (values: { name: string | undefined }) => {
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

  const mutation = useMutation({
    mutationKey: ["save_sending_list", params.id],
    mutationFn: async () => {
      await axios.put(`/api/wapp/sending_list`, {
        instanceId: instanceId,
        list: JSON.stringify(list),
        groupsInfo: JSON.stringify(groupsInfo)
      }, {
        params: {
          listId: params.id
        }
      })
    },
    onSuccess: () => {
      toast({
        title: "Lista de disparo salva com sucesso!"
      })
    }
  })

  const handleNameSubmit: SubmitHandler<{ name: string | undefined }> = async (values) => {
    await nameMutation.mutateAsync(values);
  }

  const handleSaveList = async () => {
    await mutation.mutateAsync();
  }

  const handleReloadPage = () => {
    instancesQuery.refetch()
    listQuery.refetch()
  }

  const handleSelectInstanceConnection = (value: string) => {
    setInstanceId(value);
  }

  const handleFindInstanceGroups = () => {
    chatsQuery.refetch();
  }

  const handleDeleteGroup = (id: string, jid: string) => {
    const updatedList = list.filter(item => item !== jid);
    setList(updatedList);
    const updatedGrousInfo = groupsInfo.filter(group => group.id !== id);
    setGroupsInfo(updatedGrousInfo);
  }
  
  useEffect(() => {
    if (listQuery.data?.instanceId) {
      setInstanceId(listQuery.data?.instanceId)
    }
  }, [chatsQuery, listQuery.data?.instanceId])

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
                <span>{listQuery.data?.name ? listQuery.data.name : listQuery.data?.id}</span>
                <Pencil size={16} className="text-gray-300 cursor-pointer hover:text-gray-900 transition-all ease-in-out" onClick={handleShowInput} />
              </div>
            )
          }
        </form>
      </Form>
      <div className="flex items-center gap-x-4">
        <Select onValueChange={(value) => handleSelectInstanceConnection(value)} defaultValue={listQuery.data?.instanceId ?? undefined}>
          <SelectTrigger >
            <SelectValue placeholder="Escolha uma conexão" />
          </SelectTrigger>
          <SelectContent className="flex-1">
            <SelectGroup>
              <SelectLabel>Conexões</SelectLabel>
              {instancesQuery.data.map((instance: any) => {
                return (
                  <SelectItem key={instance.id} value={instance.instance}>
                    <div className="flex items-center gap-x-2">
                      <img src={instance.profilePicUrl} alt={instance.id} className="w-6 h-6 rounded-full overflow-hidden" />
                      <p>{maskOwnerJid(instance.ownerJid)}</p>
                    </div>
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button onClick={handleFindInstanceGroups} variant={"default"}>
          Encontrar grupos
        </Button>
      </div>
      <form>
        <div className="grid grid-cols-2 gap-x-2 my-4">
          <div className="bg-slate-50 min-h-full w-full border rounded-sm p-4">
            <span className="text-sm">
              Grupos da instância/conexão
            </span>
            <div className="my-4">
              {
                chatsQuery.isLoading ? (
                  <div className="w-full h-96 flex items-center justify-center my-8 ">
                    <RotatingLines
                      visible={true}
                      width="48"
                      strokeWidth="4"
                      strokeColor="#5528ff"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                    />
                  </div>
                ) : (
                  <div className="grid gap-y-2">
                    {
                      chatsQuery.data?.map((chat) => {
                        return (
                          <div
                            key={chat.id}
                            className="border rounded-sm p-4"
                            draggable
                            onDragStart={(event) => handleOnDrag(event, chat)}
                          >
                            <h3 className="text-sm">
                              {chat.subject}
                            </h3>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              }
            </div>
          </div>
          <div className="bg-slate-50 h-full w-full rounded-sm p-4" onDrop={handleOnDrop} onDragOver={handleDragOver}>
            <span className="text-sm">
              Grupos da lista de disparo
            </span>
            <div className="grid gap-y-2 my-4">
              {
                groupsInfo.map((chat) => {
                  return (
                    <div
                      key={chat.id}
                      className="border rounded-sm p-4 relative"
                      draggable
                      onDragStart={(event) => handleOnDrag(event, chat)}
                    >
                      <Button size="icon" variant="primary-outline" className="absolute rounded-full h-5 w-5 right-2"
                        onClick={() => handleDeleteGroup(chat.id, chat.remoteJid)}>
                        <X size={12} />
                      </Button>
                      <h3 className="text-sm">
                        {chat.subject}
                      </h3>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </form>
      <div className="mt-4 flex justify-end">
        <Button variant="default" onClick={handleSaveList}>
          Salvar lista
        </Button>
      </div>
    </section>
  )
}