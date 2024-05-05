import { randomUUID } from "crypto";

import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { pgateClient } from "@/lib/pgate";
import { absoluteUrl } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const { id } = await prismaClient.redirector.create({
      data: {
        title: body.title,
        userId: body.userId,
        description: body.description,
        redirectorLink: randomUUID(),
        timesClicked: 0
      }
    });

    const { data } = await pgateClient.post("/create", {
      redirectorId: id,
      destinationLink: absoluteUrl(`/api/redirect/${id}`),
      type: "redirector"
    })

    const result = await prismaClient.redirector.update({
      where: { id },
      data: { redirectorLink: data.data.shortLink }
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({
      status: "error",
      message: error.message
    }), { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { userId } = auth();
  try {
    const redirectors = await prismaClient.redirector.findMany({
      where: { userId: userId }
    });
    return new NextResponse(JSON.stringify(redirectors), { status: 200 });
  } catch (error: any) {
    return new NextResponse( JSON.stringify({ status: "error" }) , { status: 500 });
  }
}