import { TooltipProvider, Tooltip as Container, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import React from "react";

export function Tooltip({ children, content }: { children: React.ReactNode, content: React.ReactNode }) {
  return (
    <TooltipProvider>
      <Container>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="bg-black text-white">
          {content}
        </TooltipContent>
      </Container>
    </TooltipProvider>
  )
}