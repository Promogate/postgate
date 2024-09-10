"use client"

import { Scheduling } from "@/@types";
import { ColumnDef } from "@tanstack/react-table";
import { Clock, Check, AlertOctagon } from "lucide-react";
import { Tooltip } from "../common/tooltip";
import { cn } from "@/lib/utils";
import formatDateToBrazilian from "../../../helpers/formatDate";

export const columns: ColumnDef<Scheduling>[] = [
  {
    accessorKey: "instanceName",
    header: "Agendado para",
    cell: ({ row }) => {
      return <p>
        {formatDateToBrazilian(row.original.startTime) ?? "Início imediato"}
      </p>
    }
  }, {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="w-full flex">
          {
            row.original.status === "SCHEDULED" ?
              <Tooltip content="Agendado">
                <Clock size={16} className={cn("cursor-pointer", "text-orange-400")} />
              </Tooltip> :
              row.original.status === "COMPLETED" ?
                <Tooltip content="Finalizado">
                  <Check size={16} className={cn("cursor-pointer", "text-green-400")} />
                </Tooltip> :
                <Tooltip content="Erro">
                  <AlertOctagon size={16} className={cn("cursor-pointer", "text-red-400")} />
                </Tooltip>
          }
        </div>
      )
    }
  },
  {
    accessorKey: "sending_list",
    header: "Lista de Disparo",
    cell: ({ row }) => {
      return (
        <div className="w-full flex">
          {row.original.sendingList.name}
        </div>
      )
    }
  },
  {
    accessorKey: "workflow",
    header: "Workflow",
    cell: ({ row }) => {
      return (
        <div className="w-full flex">
          {row.original.workflow.title}
        </div>
      )
    }
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 justify-end">

        </div>
      )
    }
  }
]