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
      return <p>{
        row.original.instanceName
          ? row.original.instanceName
          : row.original.instance
      }</p>
    }
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => {
      return <p>{
        row.original.description
          ? row.original.description
          : null
      }</p>
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="w-full flex">
          <Tooltip content={row.original.isConnected ? "ONLINE" : "OFFLINE"}>
            <SignalHigh size={16} className={cn("cursor-pointer", row.original.isConnected ? "text-green-400" : "text-red-400")} />
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
              <QRCodeInstanceButton instanceId={row.original.instance} isAlreadyConnected={row.original.isConnected} />
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
      return (
        <div className="flex items-center gap-2 justify-end">
          <ManageInstanceButton instanceId={row.original.instance} />
          <EditInstanceButton instanceId={row.original.instance} />
          <EraseInstanceButton instanceId={row.original.instance} />
        </div>
      )
    }
  }
]