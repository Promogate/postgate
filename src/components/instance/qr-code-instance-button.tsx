import { QrCode } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { useState } from "react";
import QRCode from "qrcode.react";

type QRCodeInstanceButtonProps = {
  instanceId: string;
  isAlreadyConnected: boolean;
  qrCode: string | null;
}

export function QRCodeInstanceButton(props: QRCodeInstanceButtonProps) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Button size="sm" variant="ghost" onClick={handleOpen} disabled={!props.qrCode ? true : false}>
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
            <QRCode value={props.qrCode as string} renderAs="canvas" size={160} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}