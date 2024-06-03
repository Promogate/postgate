"use client"

import { Instance } from "@/@types";
import { ColumnDef } from "@tanstack/react-table";
import { SignalHigh } from "lucide-react";
import { Tooltip } from "../common/tooltip";
import { cn } from "@/lib/utils";
import { EditInstanceButton } from "./edit-instance-button";
import { EraseInstanceButton } from "./erase-instance-button";
import { QRCodeInstanceButton } from "./qr-code-instance-button";
import { ManageInstanceButton } from "./manage-instance-button";

export const columns: ColumnDef<Instance>[] = [
  {
    accessorKey: "instanceName",
    header: "Instância",
    cell: ({ row }) => {
      const session = JSON.parse(row.original.session);

      return <p>
        {row.original.session ?
          `${session.info.pushname} - ${session.info.wid.user}` :
          row.original.name ?
            `${row.original.name} - ${row.original.description}` :
            row.original.id}
      </p>
    }
  }, {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="w-full flex">
          <Tooltip content={row.original.status === "CONNECTED" ? "ONLINE" : "OFFLINE"}>
            <SignalHigh size={16} className={cn("cursor-pointer", row.original.status === "CONNECTED" ? "text-green-400" : "text-red-400")} />
          </Tooltip>
        </div>
      )
    }
  },
  {
    accessorKey: "connect",
    header: "Conectar",
    cell: ({ row }) => {
      return (
        <>
          <div className="w-full flex">
            <Tooltip content="Mostrar QRCode">
              <QRCodeInstanceButton instanceId={row.original.id} isAlreadyConnected={row.original.status === "CONNECTED" ? true : false} />
            </Tooltip>
          </div>
        </>
      )
    }
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const hasSession = row.original.session ? true : false;
      return (
        <div className="flex items-center gap-2 justify-end">
          <ManageInstanceButton instanceId={row.original.id} hasSession={hasSession}/>
          <EditInstanceButton instanceId={row.original.id} />
          <EraseInstanceButton instanceId={row.original.id} />
        </div>
      )
    }
  }
]