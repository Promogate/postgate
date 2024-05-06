import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

import prismaClient from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if(!session?.user?.id) throw new NextResponse(JSON.stringify({ status: "error" }), { status: 401 });
  const sendingLists = await prismaClient.sendingList.findMany({
    where: { userId: session.user.id }
  })
  return new NextResponse(JSON.stringify(sendingLists), { status: 200 });
}

export async function POST() {
  const session = await auth();
  if(!session?.user?.id) throw new NextResponse(JSON.stringify({ status: "error" }), { status: 401 });
  await prismaClient.sendingList.create({
    data: { userId: session.user.id }
  })
  return new NextResponse(null, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  if(!session?.user?.id) throw new NextResponse(JSON.stringify({ status: "error" }), { status: 401 });
  const search = request.nextUrl.searchParams;
  const listId = search.get("listId")
  if(!listId) throw new NextResponse(JSON.stringify({ status: "error" }), { status: 401 });
  const body = await request.json();
  await prismaClient.sendingList.update({
    where: { id: listId },
    data: body
  });
  return new NextResponse(null, { status: 200 });
}