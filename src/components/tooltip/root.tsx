import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

type Props = {
  icon: React.ReactNode;
  data: any,
  children: React.ReactNode;
}

export function Root({ icon, data, children }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span className="flex items-center gap-x-2">
            {icon}
            {data}
          </span>
        </TooltipTrigger>
        <TooltipContent className="bg-black">
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}