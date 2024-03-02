import { NextRequest, NextResponse } from "next/server";

import prismaClient from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const workflow = await prismaClient.workflow.create({
      data: {
        title: body.title,
        userId: body.userId
      }
    });
    return new NextResponse(JSON.stringify({ status: "success", data: { workflow: workflow.id }}), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ status: "error", error: error.message }), { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") as string;
  try {
    const workflows = await prismaClient.workflow.findMany({
      where: { userId: userId }
    });
    return new NextResponse(JSON.stringify({
      status:"success",
      workflows
    }), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ status: "error", error: error.message }), { status: 500 });
  }
}