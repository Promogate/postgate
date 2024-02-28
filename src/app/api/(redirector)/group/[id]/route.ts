import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, route: { params: { id: string } }) {
  const groupId = route.params.id;
  const body = await req.json();
  try {
    const result = await prismaClient.group.update({
      where: { id: groupId },
      data: body
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({
      status: "error",
      message: error.message
    }), { status: 500 });
  }
}

export async function DELETE(req: NextRequest, route: { params: { id: string } }) {
  const groupId = route.params.id;
  try {
    await prismaClient.group.delete({
      where: { id: groupId }
    });

    return NextResponse.json({ status: "success", message: `Grupo ${groupId} excluído com sucesso!` });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({
      status: "error",
      message: error.message
    }), { status: 500 });
  }
}