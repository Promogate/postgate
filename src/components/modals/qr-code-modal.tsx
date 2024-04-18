import { useModal } from "@/hooks/use-modal";
import { Dialog, DialogContent } from "../ui/dialog";
import { GET_QRCODE_MODAL } from "@/config";
import { useQRCode } from "@/hooks/use-qr-code";
import { RotatingLines } from "react-loader-spinner";
import Image from "next/image";
import { XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect } from "react";

type QRCodeModalProps = {
  instanceId: string;
}

export function QRCodeModal(props: QRCodeModalProps) {
  const { isOpen, onClose } = useModal();
  const query = useQRCode({ instanceId: props.instanceId })

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose(`${GET_QRCODE_MODAL}_${props.instanceId}`)}>
      <DialogContent>
        <Button variant="outline" onClick={() => query.refetch()}>
          Gerar QRCode
        </Button>
        {
          query.isLoading ? (
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
          ) : query.isError ? (
            <div className="w-full h-96 flex flex-col items-center justify-center my-8 gap-y-4">
              <XCircle />
              <span>Ocorreu algum erro, tente novamente</span>
              <Button variant="outline" onClick={() => query.refetch()}>
                Tentar novamente
              </Button>
            </div>
          ) : query.isPending ? (
            <p>Paused</p>
          ) : (
            <Image src={query.data} alt="qrCode" width={500} height={500} className="text-[#5528ff]" />
          )
        }
      </DialogContent>
    </Dialog>
  )
}