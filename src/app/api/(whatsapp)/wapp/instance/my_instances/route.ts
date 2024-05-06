import prismaClient from "@/lib/prisma";
import { wappClient } from "@/lib/wapp";
import { auth } from "@/lib/auth";
import { WhatstappSession } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, route: { params: { id: string } }) {
  const session = await auth();
  const instances = await prismaClient.whatstappSession.findMany({
    where: {
      userId: session?.user?.id
    }
  })
  instances.map(async (instance: WhatstappSession) => {
    if (!instance.profilePicUrl || !instance.ownerJid) {
      const { data } = await wappClient.get("/instance/fetchInstances", {
        params: {
          instanceName: instance.instance
        }
      })
      await prismaClient.whatstappSession.update({
        where: { id: instance.id },
        data: {
          ownerJid: data[0].ownerJid,
          profilePicUrl: data[0].profilePicUrl,
          isConnected: data[0].connectionStatus === "ONLINE" ? true : false
        }
      })
    }
  })

  const result = await prismaClient.whatstappSession.findMany({
    where: {
      userId: session?.user?.id
    }
  })

  return new NextResponse(JSON.stringify(result), { status: 200 });
}