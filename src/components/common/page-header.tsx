import React from "react";

export function PageHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-800">
        {children}
      </h1>
    </div>
  )
}