import { wappClient } from "@/lib/wapp";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, route: { params: { id: string } }) {
  const { userId } = auth();
  const apiKey = process.env.CODE_CHAT_API_KEY as string;
  const instance = await wappClient.get(`/instance/connect/${route.params.id}`)

  return new NextResponse(JSON.stringify(instance.data), { status: 200 });
}