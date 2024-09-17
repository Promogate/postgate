import { Button } from "../ui/button";
import Link from "next/link";

export function Actions() {

  return (
    <div className="flex items-center gap-x-4">
      <Link href="/login">
        <Button variant="outline">
          Login
        </Button>
      </Link>
      <Link href="/cadastrar-se">
        <Button>
          Cadastrar-se
        </Button>
      </Link>
    </div>
  )
}