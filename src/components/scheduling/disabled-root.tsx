import React from "react";
import { Scheduling } from "@/@types";
import { columns } from "./columns";
import { DisabledSchedulingDataTable } from "./disabled-data-table";

export type InstanceProps = {
  data: Scheduling[]
}

export function DisabledRoot({ data }: InstanceProps) {  
  return <DisabledSchedulingDataTable columns={columns} data={data}/>
}