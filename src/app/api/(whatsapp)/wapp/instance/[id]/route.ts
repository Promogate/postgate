import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, route: { params: { id: string } }) {
  const instanceId = route.params.id;
  const instances = await prismaClient.whatstappSession.findFirst({
    where: {
      instance: instanceId
    }
  })

  return new NextResponse(JSON.stringify(instances), { status: 200 });
}

export async function PUT(req: NextRequest, route: { params: { id: string } }) {
  const instanceId = route.params.id;
  const body = await req.json() as { name: string, description: string };
  await prismaClient.whatstappSession.update({
    where: {
      id: instanceId
    },
    data: {
      instanceName: body.name,
      description: body.description
    }
  })
}