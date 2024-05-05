import { SignInButton, SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Actions() {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex items-center gap-x-8">
      <SignedIn>
        <UserButton showName/>
      </SignedIn>
      <SignedOut>
        <SignInButton> 
          <Button>
            Login
          </Button>
        </SignInButton>
      </SignedOut>
    </div>
  )
}