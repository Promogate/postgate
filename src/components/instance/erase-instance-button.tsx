import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { useState } from "react";

type EraseInstanceButtonProps = {
  instanceId: string;
}

export function EraseInstanceButton(props: EraseInstanceButtonProps) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Button size="xs" className="bg-red-500 hover:bg-red-600 transition-all ease-in-out" onClick={handleOpen}>
        <Trash size={12} />
      </Button>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
          <p>{props.instanceId}</p>
          Erase
        </DialogContent>
      </Dialog>
    </>
  )
}