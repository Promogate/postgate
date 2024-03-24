import React from "react";
import { InstanceCard } from "./card";

export type InstanceProps = {
  id: string,
  hash:string,
  userId: string,
  instance: string,
  isConnected: boolean,
  createdAt: string,
  updatedAt: string
}

export function Root({ data }: { data: InstanceProps[] }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {data.map((instance) => {
        return (
          <InstanceCard
            key={instance.id}
            props={instance}
          />
        )
      })}
    </div>
  )
}