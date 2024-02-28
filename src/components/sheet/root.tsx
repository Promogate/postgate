"use client";

import React, { useEffect, useState } from "react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useSheet } from "@/hooks/use-sheet";

type Props = {
  children: React.ReactNode;
}

export function Root({ children }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onClose, onOpen } = useSheet();

  useEffect(() => {
    setIsMounted(true)
  }, []);

  if (!isMounted) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right">
        <div className="my-4">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  )
}