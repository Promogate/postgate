import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    await prismaClient.group.create({
      data: {
        destinationLink: body.destinationLink,
        title: body.title,
        redirectorId: body.redirectorId,
        limit: Number(body.limit),
        members: Number(body.members),
      }
    });

    return NextResponse.json({ status: "success", message: "Grupo atualizado com sucesso!" });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({
      status: "error",
      message: error.message
    }), { status: 500 });
  }
}
