import { wappClient } from "@/lib/wapp";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, route: { params: { id: string } }) {
  const instance = await wappClient.get(`/instance/connect/${route.params.id}`)

  return new NextResponse(JSON.stringify(instance.data), { status: 200 });
}