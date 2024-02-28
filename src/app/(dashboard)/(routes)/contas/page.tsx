import { PageHeader } from "@/components/common/page-header";
import { CreateInstanceModal } from "@/components/modals/create-instance";
import { Sheet } from "@/components/sheet";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Page() {

  return (
    <section>
      <div className="flex items-center justify-between mt-8">
        <PageHeader>
          Contas
        </PageHeader>
        <CreateInstanceModal />
      </div>
    </section>
  )
}