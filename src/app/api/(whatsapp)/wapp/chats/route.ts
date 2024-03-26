import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams;
  const instanceId = search.get("instanceId");
  if (!instanceId) return new NextResponse(JSON.stringify({ message: "Something went wrong" }), { status: 400 });
  const chats = await prismaClient.whatsappChat.findMany({
    where: {
      instanceId: instanceId
    }
  })
  return new NextResponse(JSON.stringify(chats), { status: 200 });
}