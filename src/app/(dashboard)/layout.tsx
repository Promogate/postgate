import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
        <Sidebar.Root />
      </div>
      <main className="md:pl-72">
        <Navbar.Root />
        <div className="mb-8 space-y-4">
          <div className="px-4 md:px-8 space-y-4">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}