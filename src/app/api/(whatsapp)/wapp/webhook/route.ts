import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log(request);
}

export async function POST(request: NextRequest) {
  console.log(await request.json());
  return new NextResponse(null, {status: 200 });
}