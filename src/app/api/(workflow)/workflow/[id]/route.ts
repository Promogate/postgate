import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, route: { params: { id: string } }) {
  try {
    const workflow = await prismaClient.workflow.findUnique({
      where: { id: route.params.id }
    }) 
    return new NextResponse(JSON.stringify({
      status:"success",
      data: workflow
    }), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ status: "error", error: error.message }), { status: 500 });
  }
}

export async function PUT(req: NextRequest, route: { params: { id: string } }) {
  const body = await req.json();
  const nodes = JSON.stringify(body.nodes);
  const edges = JSON.stringify(body.edges);
  try {
    const workflows = await prismaClient.workflow.update({
      where: { id: route.params.id },
      data: {
        nodes: nodes,
        edges: edges,
      }
    }) 
    return new NextResponse(JSON.stringify({
      status:"success",
      data: workflows
    }), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ status: "error", error: error.message }), { status: 500 });
  }
}