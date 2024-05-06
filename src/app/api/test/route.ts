import prismaClient from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });
  await prismaClient.userApiLimit.create({
    data: {
      userId: session.user.id
    }
  })

  return new NextResponse("OK", { status: 200 });
}