"use client";

import { useUser } from "@/hooks/use-user";
import { ReactNode, useEffect, useState } from "react";

export default function WhoAmIServerAction({ children, onGetUserAction }: {
  children: ReactNode,
  onGetUserAction: () => Promise<string | null>
}) {
  const setUser = useUser(state => state.setUser);

  useEffect(() => {
    onGetUserAction().then((user) => {
      setUser(user as string);
    });
  }, [])

  return (
    <>
      {children};
    </>
  )
}