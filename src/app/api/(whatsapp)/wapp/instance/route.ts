import { NextRequest, NextResponse } from "next/server";

import { wappClient } from "@/lib/wapp";
import prismaClient from "@/lib/prisma";

type Body = {
  instanceName: string;
  instanceId: string;
  description: string;
  userId: string;
}

export async function POST(request: NextRequest) {
  const body = await request.json() as Body;
  try {
    const { data, status } = await wappClient.post("/instance/create", {
      instanceName: body.instanceId,
      description: body.userId
    });
    if (status === 201) {
      await prismaClient.whatstappSession.create({
        data: {
          instance: data.name,
          description: body.description,
          userId: data.description,
          instanceName: body.instanceName,
          hash: data.Auth.token
        }
      })
    }
    return new NextResponse(null, { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
  }
}