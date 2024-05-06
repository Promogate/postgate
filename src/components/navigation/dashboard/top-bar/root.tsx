import React from "react";

export function Root({children}: { children: React.ReactNode }) {
  return (
    <div className="h-16 flex items-center justify-end px-4 border-b">
      {children}
    </div>
  )
}