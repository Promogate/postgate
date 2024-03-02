"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FlowProvider } from "@/contexts/flow";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <FlowProvider>
        {children}
      </FlowProvider>
    </QueryClientProvider>
  )
}