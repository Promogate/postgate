"use client";

import { Settings2, Trash2 } from "lucide-react";
import { useState } from "react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UpdateGroupForm } from "@/components/forms/update-group";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { UpdateGroupDialog } from "@/components/modals/update-group";
import { DeleteGroupDialog } from "../modals/delete-group";

type Props = {
  data: any
}

export function Root({ data }: Props) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>
            {data.title}
          </CardTitle>
          <CardDescription>
            {data.description}
          </CardDescription>
        </div>
        <div className="flex items-center gap-x-4">
          <Dialog open={openDelete} onOpenChange={setOpenDelete}>
            <DialogTrigger>
              <Button className="bg-red-500 text-white hover:bg-red-600 transition-all duration-200 ease-in-out" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
              <DeleteGroupDialog setOpen={setOpenDelete} group={data} />
            </DialogTrigger>
          </Dialog>
          <Dialog open={openUpdate} onOpenChange={setOpenUpdate}>
            <DialogTrigger>
              <Button className="bg-[#5528ff] hover:bg-[#4521cc] text-white transition-all duration-200 ease-in-out" size={"icon"}>
                <Settings2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <UpdateGroupDialog group={data} setOpen={setOpenUpdate} />
          </Dialog>
        </div>
      </CardHeader>
    </Card >
  )
}