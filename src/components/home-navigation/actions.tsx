"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function Actions() {
  const router = useRouter();

  const handleLogin = (): void => {
    return router.push("/login");
  }

  const handleRegister = (): void => {
    return router.push("/cadastrar-se")
  }

  return (
    <div className="flex items-center gap-x-4">
      <Button variant="outline" onClick={handleLogin}>
        Login
      </Button>
      <Button onClick={handleRegister}>
        Cadastrar-se
      </Button>
    </div>
  )
}