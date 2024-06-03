import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { useState } from "react";
import { useDeleteInstance } from "@/hooks/instances/use-instances";

type EraseInstanceButtonProps = {
  instanceId: string;
}

export function EraseInstanceButton(props: EraseInstanceButtonProps) {
  const [open, setOpen] = useState(false)
  const mutation = useDeleteInstance(props.instanceId);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleDeleteInstance = async () => {
    await mutation.mutateAsync()
  }

  return (
    <>
      <Button size="sm" className="bg-red-500 hover:bg-red-600 transition-all ease-in-out" onClick={handleOpen}>
        <Trash size={12} />
      </Button>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="flex flex-col items-center">
          <div className="text-center">
            <h2 className="text-lg font-semibold" >Você quer mesmo apagar esta instância?</h2>
            <span className="text-sm">Esta ação é irreversível.</span>
          </div>
          <Button onClick={handleDeleteInstance} variant="destructive">
            Apagar Instância
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}