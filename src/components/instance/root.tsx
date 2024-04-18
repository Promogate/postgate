import React from "react";
import { Instance } from "@/@types";
import { InstancesDataTable } from "./data-table";
import { columns } from "./columns";
import { QRCodeModal } from "../modals/qr-code-modal";

export type InstanceProps = {
  data: Instance[]
}

export function Root({ data }: InstanceProps) {  
  return <InstancesDataTable columns={columns} data={data}/>
}