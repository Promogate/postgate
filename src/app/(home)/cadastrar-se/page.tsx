"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const schema = z.object({
  name: z.string().optional(),
  email: z.string({ required_error: "Email é obrigatório" }).email("Insira um email válido"),
  password: z.string({ required_error: "Senha é obrigatório" }).min(6, "Sua senha precisar ter pelo menos 6 caracteres"),
  confirmPassword: z.string({ required_error: "Senha é obrigatório" })
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Precisa ser igual a senha"
})

export default function Page() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema)
  });

  const mutation = useMutation({
    mutationKey: ["create.user"],
    mutationFn: async (input: z.infer<typeof schema>) => {
      const { data } = await api.post("/user/create", input);
      return data;
    },
    onSuccess: (data) => {
      setCookie("__postgate.session", data.token);
      toast({
        title: "Cadastrado com sucesso!"
      })
      router.push("/dashboard");
    }
  });

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (values) => {
    await mutation.mutateAsync(values)
  }

  const handleShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <div className="items-center w-full mx-10 2xl:max-w-screen-2xl 2xl:mx-auto">
      <Form {...form}>
        <form className="w-96 mx-auto my-20 space-y-16" onSubmit={form.handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold">
            Cadastrar-se
          </h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input {...field} type={isPasswordVisible ? "text" : "password"} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar senha</FormLabel>
                  <FormControl>
                    <Input {...field} type={isPasswordVisible ? "text" : "password"} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="sm" variant="ghost" onClick={handleShowPassword} type="button" className="gap-x-2">
              {
                isPasswordVisible ? (
                  <>
                    <EyeOff size={16} />
                    <span>Esconder senhas</span>
                  </>
                ) : (
                  <>
                    <Eye size={16} />
                    <span>Mostrar senhas</span>
                  </>
                )
              }
            </Button>
          </div>
          <Button className="w-full" type="submit">
            Criar conta
          </Button>
        </form>
      </Form>
    </div>
  );
}