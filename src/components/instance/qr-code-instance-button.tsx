import { QrCode } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { useState } from "react";
import QRCode from "qrcode.react";
import { useQuery } from "@tanstack/react-query";
import useStore from "@/hooks/useStore";
import useAuthStore from "@/hooks/use-user";
import { api } from "@/lib/axios";
import { RotatingLines } from "react-loader-spinner";

type QRCodeInstanceButtonProps = {
  instanceId: string;
  isAlreadyConnected: boolean;
  qrCode: string | null;
}

export function QRCodeInstanceButton(props: QRCodeInstanceButtonProps) {
  const [open, setOpen] = useState(false)
  const user = useStore(useAuthStore, (state) => state);

  const handleOpen = () => {
    setOpen(true);
    query.refetch();
  }

  const handleClose = () => {
    setOpen(false);
  }

  const query = useQuery({
    enabled: false,
    queryKey: ["qr-code", user?.user?.id, props.instanceId],
    queryFn: async () => {
      const { data } = await api.get(`/whatsapp/qrcode/${props.instanceId}`, { authorization: true });
      return data;
    },
    staleTime: 1000 * 60 * 5
  });

  return (
    <>
      <Button size="sm" variant="ghost" onClick={handleOpen} disabled={props.isAlreadyConnected ? true : false}>
        <QrCode size={16} className="cursor-pointer" />
      </Button>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <h1 className="text-xl font-bold">
              Leia com seu aplicativo para autenticar
            </h1>
            <span className="text-sm">
              Verifique o seu aplicativo, ao finalizar a leitura feche o modal.
            </span>
          </DialogHeader>
          <div className="w-full flex justify-center">
            {
              query.isLoading ?
                <RotatingLines
                  visible={true}
                  width="64"
                  strokeWidth="4"
                  strokeColor="#5528ff"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                /> :
                <QRCode value={query.data?.code as string} renderAs="canvas" size={160} />
            }
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}