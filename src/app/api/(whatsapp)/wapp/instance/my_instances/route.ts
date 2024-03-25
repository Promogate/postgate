import prismaClient from "@/lib/prisma";
import { wappClient } from "@/lib/wapp";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, route: { params: { id: string } }) {
  const { userId } = auth();
  const instances = await prismaClient.whatstappSession.findMany({
    where: {
      userId: userId
    }
  })
  const apiKey = process.env.CODE_CHAT_API_KEY as string;
  instances.map(async (instance) => {
    if (!instance.profilePicUrl || !instance.ownerJid) {
      const { data } = await wappClient.get("/instance/fetchInstances", {
        params: {
          instanceName: instance.instance
        },
        headers: {
          "apiKey": apiKey
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
      userId: userId
    }
  })

  return new NextResponse(JSON.stringify(result), { status: 200 });
}