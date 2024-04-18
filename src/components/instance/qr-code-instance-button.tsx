import { BadgeCheck, Pencil, QrCode, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { RotatingLines } from "react-loader-spinner";
import { DialogTitle } from "@radix-ui/react-dialog";

type QRCodeInstanceButtonProps = {
  instanceId: string;
  isAlreadyConnected: boolean;
}

export function QRCodeInstanceButton(props: QRCodeInstanceButtonProps) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true);
    if (!props.isAlreadyConnected) return  refetch()
  }

  const handleClose = () => {
    setOpen(false);
  }

  const { data, isLoading, isError, refetch } = useQuery<{ image: string }>({
    enabled: false,
    queryKey: ["get_qr_code", props.instanceId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/wapp/instance/qr-code/${props.instanceId}`)
      return {
        image: data.base64
      }
    },
    staleTime: 1000 * 30
  })

  return (
    <>
      <Button size="sm" variant="ghost" onClick={handleOpen}>
        <QrCode size={16} className="cursor-pointer" />
      </Button>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="flex justify-center items-center">
          {
            props.isAlreadyConnected ? (
              <div className="w-full h-96 flex flex-col items-center justify-center my-8 gap-y-4">
                <BadgeCheck />
                <span>Você já está conectado</span>
                <Button variant="outline" onClick={handleClose}>
                  Fechar
                </Button>
              </div>
            ) : isLoading ? (
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
            ) : isError ? (
              <div className="w-full h-96 flex flex-col items-center justify-center my-8 gap-y-4">
                <XCircle />
                <span>Ocorreu algum erro, tente novamente</span>
                <Button variant="outline" onClick={() => refetch()}>
                  Tentar novamente
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-y-4">
                <DialogHeader>
                  <DialogTitle className="text-lg">Leia o QRCode para inicar a sessão</DialogTitle>
                </DialogHeader>
                <Image src={data?.image as string} alt="qrCode" width={240} height={240} className="" />
                <span className="text-sm text-gray-600 font-light">
                  Após a sessão ser ativada no seu celular, basta clicar no X e você poderá utilizar os recursos da sessão
                </span>
                <Button variant="outline" onClick={() => refetch()}>
                  Gerar outro QRCode
                </Button>
              </div>
            )
          }
        </DialogContent>
      </Dialog>
    </>
  )
}