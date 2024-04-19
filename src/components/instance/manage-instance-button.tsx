import { Settings, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { useState } from "react";
import Link from "next/link";

type ManageInstanceButtonProps = {
  instanceId: string;
}

export function ManageInstanceButton(props: ManageInstanceButtonProps) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Link href={`/contas/${props.instanceId}`}>
        <Button size="sm" variant="default" onClick={handleOpen}>
          <Settings size={12} />
        </Button>
      </Link>
    </>
  )
}