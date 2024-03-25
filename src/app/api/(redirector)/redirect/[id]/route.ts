import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, route: { params: { id: string; } }) {
  const redirectorId = route.params.id;
  try {
    const redirector = await prismaClient.redirector.findUnique({
      where: {  id: redirectorId },
      include: {
        groups: true,
      }
    })
    if (!redirector) return new NextResponse(JSON.stringify({ status: "error", message: "Not Found" }) , { status: 500 });
    if (redirector.groups[redirector.currentGroup].members < redirector.groups[redirector.currentGroup].limit) {
      const updatedMembersQuantity = redirector.groups[redirector.currentGroup].members + 1;
      await prismaClient.group.update({
        where: { id: redirector.groups[redirector.currentGroup].id },
        data: {
          members: updatedMembersQuantity
        }
      });
      const addedTimesClicked = redirector.timesClicked + 1;
      await prismaClient.redirector.update({
        where: { id: redirectorId },
        data: {
          timesClicked: addedTimesClicked
        }
      });
      return NextResponse.redirect(redirector.groups[redirector.currentGroup].destinationLink);
    }
    if (redirector.groups[redirector.currentGroup].members === redirector.groups[redirector.currentGroup].limit) {
      const newGroupPosition = redirector.currentGroup + 1;
      if (newGroupPosition > redirector.groups.length) {
        await prismaClient.redirector.update({
          where: { id: redirectorId },
          data: {
            redirectorStatus: "completed"
          }
        });
        return;
      }
      const addedTimesClicked = redirector.timesClicked + 1;
      await prismaClient.redirector.update({
        where: { id: redirectorId },
        data: {
          currentGroup: newGroupPosition,
          timesClicked: addedTimesClicked
        }
      });
      return NextResponse.redirect(redirector.groups[newGroupPosition].destinationLink);
    }
  } catch (error: any) {
    return new NextResponse( JSON.stringify({ status: "error" }) , { status: 500 });
  }
}
