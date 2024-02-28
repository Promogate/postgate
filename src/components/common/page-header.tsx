import React from "react";

export function PageHeader({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-xl font-bold text-gray-800">
      {children}
    </h1>
  )
}