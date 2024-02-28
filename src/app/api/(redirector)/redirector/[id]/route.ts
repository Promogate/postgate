import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, route: { params: { id: string } }) {
  const redirectorId = route.params.id;
  try {
    const result = await prismaClient.redirector.findUnique({
      where: { id: redirectorId },
      include: {
        groups: true,
      }
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({
      status: "error",
      message: error.message
    }), { status: 500 });
  }
}