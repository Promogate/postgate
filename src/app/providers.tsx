"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FlowProvider } from "@/contexts/flow";
import { ClerkProvider } from "@clerk/nextjs";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <FlowProvider>

          {children}
        </FlowProvider>
      </QueryClientProvider>
    </ClerkProvider>
  )
}