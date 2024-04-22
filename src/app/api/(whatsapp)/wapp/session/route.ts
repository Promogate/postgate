import prismaClient from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const search = request.nextUrl.searchParams;
    const instanceId = search.get("instanceId");
    if (!instanceId) return new NextResponse(JSON.stringify({ message: "Instance id missing" }), { status: 400 });
    const result = await prismaClient.whatstappSession.findUnique({ where: { instance: instanceId } })
    if (!result) return new NextResponse(JSON.stringify({ message: "Instance not found" }), { status: 422 });
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
  }
}