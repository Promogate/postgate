"use client";

import axios from "axios";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";

export function Root() {
  const { isOpen, onClose } = useModal();

  const onSubscribe = async (planType: string) => {
    try {
      const response = await axios.get(`/api/stripe?plan_type=${planType}`)
      console.log(response)
      window.location.href = response.data.url;
    } catch (error: any) {
      console.log(error, "STRIPE_CLIENT_ERROR");
    } finally {
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose("upgrade")}>
      <DialogContent className="md:min-w-[88vw]">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            Upgrade Zapgate
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 p-4">
          <div className="space-y-6 flex flex-col items-center border rounded-lg p-4">
            <h3 className="text-xl font-semibold">
              Pacote Iniciante
            </h3>
            <div className="flex gap-x-1">
              <span>
                R$
              </span>
              <p className="text-7xl font-bold">
                49
              </p>
              <span className="text-sm top-auto flex flex-col justify-end pb-2">
                /mês
              </span>
            </div>
            <div className="space-y-4 mt-8 flex-1">
              <div className="flex items-center gap-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#5528ff]" />
                5 contas whatsapp
              </div>
              <div className="flex items-center gap-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#5528ff]" />
                Agendamentos
              </div>
              <div className="flex items-center gap-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#5528ff]" />
                Redirecionadores
              </div>
              <div className="flex items-center gap-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#5528ff]" />
                100.000 mensagens
              </div>
            </div>
            <Button variant="primary" size="xl" onClick={() => onSubscribe("beginner")}>
              Assinar
            </Button>
          </div>
          <div className="space-y-6 flex flex-col items-center border rounded-lg p-4">
            <h3 className="text-xl font-semibold">
              Pacote Profissional
            </h3>
            <div className="flex gap-x-1">
              <span>
                R$
              </span>
              <p className="text-7xl font-bold">
                99
              </p>
              <span className="text-sm top-auto flex flex-col justify-end pb-2">
                /mês
              </span>
            </div>
            <div className="space-y-4 mt-8 flex-1">
              <div className="flex items-center gap-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#5528ff]" />
                15 contas whatsapp
              </div>
              <div className="flex items-center gap-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#5528ff]" />
                Agendamentos
              </div>
              <div className="flex items-center gap-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#5528ff]" />
                Redirecionadores
              </div>
              <div className="flex items-center gap-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#5528ff]" />
                Estatísticas
              </div>
              <div className="flex items-center gap-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#5528ff]" />
                API
              </div>
              <div className="flex items-center gap-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#5528ff]" />
                500.000 mensagens
              </div>
            </div>
            <Button variant="primary" size="xl" onClick={() => onSubscribe("professional")}>
              Assinar
            </Button>
          </div>
          <div className="space-y-6 flex flex-col items-center border rounded-lg p-4">
            <h3 className="text-xl font-semibold">
              Plano Empresa
            </h3>
            <div className="flex gap-x-1">
              <span>
                R$
              </span>
              <p className="text-7xl font-bold">
                149
              </p>
              <span className="text-sm top-auto flex flex-col justify-end pb-2">
                /mês
              </span>
            </div>
            <div className="space-y-4 mt-8">
              <div className="flex items-center gap-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#5528ff]" />
                25 contas whatsapp
              </div>
              <div className="flex items-center gap-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#5528ff]" />
                Agendamentos
              </div>
              <div className="flex items-center gap-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#5528ff]" />
                Redirecionadores
              </div>
              <div className="flex items-center gap-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#5528ff]" />
                Estatísticas
              </div>
              <div className="flex items-center gap-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#5528ff]" />
                API
              </div>
              <div className="flex items-center gap-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#5528ff]" />
                Workflow
              </div>
              <div className="flex items-center gap-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#5528ff]" />
                1.000.000 mensagens
              </div>
            </div>
            <Button variant="primary" size="xl" onClick={() => onSubscribe("business")}>
              Assinar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}