import { onGetUserAction } from "@/actions/on-get-user-action";
import WhoAmIServerAction from "@/components/auth/who-am-i-server-action";
import { Topbar } from "@/components/navigation/dashboard/top-bar";
import { Sidebar } from "@/components/sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    return redirect("/");
  }

  return (
    <WhoAmIServerAction onGetUserAction={onGetUserAction}>
      <div className="h-full relative">
        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
          <Sidebar.Root />
        </div>
        <main className="md:pl-72">
          <div>
            <Topbar.Root>
              <Topbar.CurrentUser />
            </Topbar.Root>
            {children}
          </div>
        </main>
      </div>
    </WhoAmIServerAction>
  )
}