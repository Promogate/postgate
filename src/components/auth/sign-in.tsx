import { signInWithGoogle } from "@/actions/sign-in";
import { Button } from "../ui/button";

export function SignIn() {
  
  return (
    <form
      action={signInWithGoogle}
    >
      <Button type="submit" variant="outline">
        Signin with Google
      </Button>
    </form>
  )
} 