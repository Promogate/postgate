import { wappClient } from "@/lib/wapp";
import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";
import { RemoteWappGroup } from "@/@types";
import { auth } from "@clerk/nextjs";

export async function PUT(request: NextRequest) {
  const { userId } = auth();
  const body = await request.json() as { groupId: string, instanceId: string };
  const apiKey = process.env.CODE_CHAT_API_KEY as string;
  try {
    const groupInfo = await wappClient.get<RemoteWappGroup>(`/group/findGroupInfos/${body.instanceId}`, {
      params: {
        groupJid: body.groupId
      },
      headers: {
        "apiKey": apiKey
      }
    });
    if (groupInfo.status === 400) {
      
    }
    await prismaClient.whatsappChat.update({
      where: {
        remoteJid: body.groupId
      },
      data: {
        subject: groupInfo.data.subject,
        isCommunity: groupInfo.data.isCommunity,
        isCommunityAnnounce: groupInfo.data.isCommunityAnnounce,
        description: groupInfo.data.desc,
        isRaw: false,
        owner: userId,
        isRestrict: groupInfo.data.restrict,
      }
    })

    return new NextResponse(null, { status: 200 });
  } catch (error: any) {
    if (error.response.status === 400) {
      await prismaClient.whatsappChat.delete({
        where: {
          remoteJid: body.groupId
        }
      })
    }
    return new NextResponse(error.message, { status: error.response.status });
  }
}