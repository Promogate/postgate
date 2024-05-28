import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (body.event === "schedule.created") {
    console.log(body);
    console.log("Agendamento criado com sucesso!");
    return new NextResponse(JSON.stringify({ message: "ok" }), { status: 200 });
  }
}