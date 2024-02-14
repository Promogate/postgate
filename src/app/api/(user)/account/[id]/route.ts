import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, route: { params: { id: string } }) {
  const userLimit = await prismaClient.userApiLimit.findUnique({
    where: { userId: route.params.id }
  }) 

  return new NextResponse(JSON.stringify(userLimit), { status: 200 });
}