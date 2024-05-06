import { auth } from "@/lib/auth"
import Image from "next/image";

export async function CurrentUser() {
  const session = await auth();

  if (!session) return null

  return (
    <div className="flex gap-x-4 text-sm items-center">
      <div className="text-right">
        <span className="text-xs text-gray-400">Logado como</span>
        <h3 className="font-medium text-gray-500">{session.user?.email}</h3>
      </div>
      <div className="relative w-10 h-10 rounded-full overflow-hidden">
        <Image src={session.user?.image as string} alt={session.user?.name as string} fill />
      </div>
    </div>
  )
}