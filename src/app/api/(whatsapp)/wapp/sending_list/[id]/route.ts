import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

import prismaClient from "@/lib/prisma";

export async function GET(request: NextRequest, route: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) throw new NextResponse(JSON.stringify({ status: "error" }), { status: 401 });
  const sendingLists = await prismaClient.sendingList.findUnique({
    where: { id: route.params.id }
  })
  return new NextResponse(JSON.stringify(sendingLists), { status: 200 });
}
