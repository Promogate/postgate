import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, route: { params: { id: string } }) {
  const useId = req.nextUrl.searchParams.get("userId")
  try {
    const workflows = await prismaClient.workflow.findMany({
      where: { userId: route.params.id }
    }) 
    return new NextResponse(JSON.stringify({
      status:"success",
      data: workflows
    }), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ status: "error", error: error.message }), { status: 500 });
  }
}