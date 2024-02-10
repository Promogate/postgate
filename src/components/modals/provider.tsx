"use client";

import { useModal } from "@/hooks/use-modal";
import { useEffect, useState } from "react";
import { UpgradeModal } from "./upgrade-modal";

export function ModalsProvider() {
  const [isMounted, setIsMounted] = useState(false);
  const modal = useModal((state) => state.modal)

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  if (!modal) return null;

  if (modal === "upgrade") {
    return <UpgradeModal.Root />
  }
}