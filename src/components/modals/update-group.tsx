"use client";

import { useToast } from "../ui/use-toast";
import { Dispatch, SetStateAction } from "react";
import { DialogContent, DialogHeader } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { UpdateGroupForm } from "../forms/update-group";
import { Group } from "@/@types";

type UpdateGroupDialogProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  group: Group;
}

export function UpdateGroupDialog({ setOpen, group }: UpdateGroupDialogProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Atualizar grupo
        </DialogTitle>
      </DialogHeader>
      <UpdateGroupForm setOpen={setOpen} group={group}/>
    </DialogContent>
  );
}