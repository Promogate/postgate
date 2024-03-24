import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams;
  const instanceId = search.get("instanceId");
  if (!instanceId) throw new Error("Falha ao buscar informações");
  try {
    const result = await prismaClient.whatsappChat.findMany({
      where: {
        instanceId: instanceId
      }
    })
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}