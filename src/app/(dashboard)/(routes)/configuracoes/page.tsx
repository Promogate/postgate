import { PlanCounter } from "@/components/plan-counter";

export default function Page() {

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-bold text-gray-800">
        Configurações
      </h1>
      <div className="grid grid-cols-4 gap-x-4">
        <PlanCounter.Root />
      </div>
    </section>
  )
}