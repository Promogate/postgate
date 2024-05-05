import prismaClient from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  await prismaClient.userApiLimit.create({
    data: {
      userId: userId
    }
  })

  return new NextResponse("OK", { status: 200 });
}