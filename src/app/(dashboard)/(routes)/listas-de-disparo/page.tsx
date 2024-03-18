"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Page() {

  return (
    <section className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">
          Listas de disparo
        </h1>
        <Button variant="primary-action" size="icon" onClick={() => {}}>
          <Plus />
        </Button >
      </div>
    </section>
  )
}