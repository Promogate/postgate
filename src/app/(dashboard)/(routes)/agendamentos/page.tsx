"use client";

import { FlowCalendar } from "@/components/flow/components/calendar";

export default function Page() {
  return (
    <section className="space-y-4 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="md:text-xl font-bold text-gray-800">
          Agendamentos
        </h1>
        <FlowCalendar />
      </div>
    </section>
  )
}