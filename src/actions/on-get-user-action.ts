"use server"

import { auth } from "@/lib/auth"

export async function onGetUserAction() {
  const session = await auth();
  return session?.user?.id as string;
}