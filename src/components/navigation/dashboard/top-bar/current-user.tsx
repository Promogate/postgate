"use client";

import useAuthStore from "@/hooks/use-user";
import useStore from "@/hooks/useStore";


export function CurrentUser() {
  const store = useStore(useAuthStore, (state) => state);

  return (
    <div className="flex gap-x-4 text-sm items-center min-h-16">
      <div className="text-right">
        <span className="text-xs text-gray-400">Logado como</span>
        <h3 className="font-medium text-gray-500">{store?.user?.email}</h3>
      </div>
      <div className="relative w-10 h-10 rounded-full overflow-hidden">
        
      </div>
    </div>
  )
}