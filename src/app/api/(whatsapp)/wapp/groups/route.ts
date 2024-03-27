import { wappClient } from "@/lib/wapp";
import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { WappChat } from "@/@types";

type Participant = {
  id: string,
  admin: null | string
}

export async function GET(req: NextRequest, route: { params: { id: string } }) {
  const { userId } = auth();
  const search = req.nextUrl.searchParams;
  const instanceId = search.get("instanceId")
  if (!instanceId) throw new Error("Missing Instance Id");
  const apiKey = process.env.CODE_CHAT_API_KEY as string;
  const allChats = await wappClient.get<WappChat[]>(`/chat/findChats/${instanceId}`, {
    headers: {
      "apiKey": apiKey
    }
  });
  const onlyGroupChats = allChats.data.filter((chat: WappChat) => chat.remoteJid.includes("@g.us"));
  const promise = new Promise((resolve) => {
    onlyGroupChats.forEach(async (chat) => {
      await prismaClient.whatsappChat.upsert({
        where: {
          remoteJid: chat.remoteJid
        },
        update: {
          remoteJid: chat.remoteJid,
          instanceId: instanceId
        },
        create: {
          remoteJid: chat.remoteJid,
          instanceId: instanceId
        }
      })
    });
    resolve("resolved");
  });
  await Promise.all([promise])
  const result = await prismaClient.whatsappChat.findMany({
    where: {
      instanceId: instanceId
    }
  })

  return new NextResponse(JSON.stringify(result), { status: 200 });
}