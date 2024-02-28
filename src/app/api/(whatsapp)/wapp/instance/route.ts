import { NextRequest, NextResponse } from "next/server";

import { wappClient } from "@/lib/wapp";
import prismaClient from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function POST(request: NextRequest) {
  const { userId } = auth();
  const body = await request.json();
  const apiKey = process.env.CODE_CHAT_API_KEY as string;
  try {
    const { data } = await wappClient.post("/instance/create", body, { headers: { apikey: apiKey } });
    await prismaClient.whatstappSession.create({
      data: {
        userId: userId,
        hash: data.hash.jwt
      }
    })
    const qrCode = await wappClient.get("/instance/qrcode/" + body.instanceName, { headers: { apikey: apiKey } });
    return new NextResponse(JSON.stringify(qrCode.data), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
  }
}