import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Actions() {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex items-center gap-x-8">
      {
        isSignedIn ? (
          <div className="flex items-center gap-x-4">
            <UserButton
              afterSignOutUrl="/"
              showName
            />
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
          </div>
        ) : (
          <Link href={"/sign-in"}>
            <Button variant={"outline"}>
              Login
            </Button>
          </Link>
        )
      }
    </div>
  )
}