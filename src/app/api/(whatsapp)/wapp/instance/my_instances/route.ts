import prismaClient from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, route: { params: { id: string } }) {
  const { userId } = auth();
  const instances = await prismaClient.whatstappSession.findMany({
    where: {
      userId: userId
    }
  })

  return new NextResponse(JSON.stringify(instances), { status: 200 });
}