
import { HomeNavigation } from "@/components/home-navigation";
import React from "react";

export default function Home({ children }: { children: React.ReactNode }) {

  return (
    <main>
      <nav className="flex justify-center items-center h-24">
        <HomeNavigation.Root />
      </nav>
      {children}
    </main>
  );
}
