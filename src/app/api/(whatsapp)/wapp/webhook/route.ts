import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  console.log(request);
}

export async function POST(request: NextRequest) {
  console.log(request);
}