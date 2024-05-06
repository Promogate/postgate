import { SignIn } from "../auth/sign-in";

export function Actions() {
  return (
    <div className="flex items-center gap-x-8">
      <SignIn />
    </div>
  )
}