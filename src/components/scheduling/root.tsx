import React from "react";
import { Scheduling } from "@/@types";
import { SchedulingDataTable } from "./data-table";
import { columns } from "./columns";

export type InstanceProps = {
  data: Scheduling[]
}

export function Root({ data }: InstanceProps) {  
  return <SchedulingDataTable columns={columns} data={data}/>
}