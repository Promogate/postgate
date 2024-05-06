import { auth } from "@/lib/auth";

import prismaClient from "@/lib/prisma";
import { MAX_BEGINNER_MESSAGES, MAX_BUSINESS_MESSAGES, MAX_FREE_MESSAGES, MAX_PRO_MESSAGES } from "@/config";

export const increaseApiCount = async () => {
  const session = await auth();
  if (!session?.user?.id) return;
  const apiLimit = await prismaClient.userApiLimit.findUnique({
    where: {
      userId: session.user.id
    }
  })
  if (apiLimit) {
    await prismaClient.userApiLimit.update({
      where: { userId: session.user.id },
      data: { count: apiLimit.count + 1 }
    })
  } else {
    await prismaClient.userApiLimit.create({
      data: { userId: session.user.id, count: 1 }
    })
  }
};

export const checkApiLimit = async () => {
  const session = await auth();
  if (!session?.user?.id) return false;
  const apiLimit = await prismaClient.userApiLimit.findUnique({
    where: {
      userId: session.user.id
    }
  })
  if (!apiLimit || (apiLimit.count < MAX_FREE_MESSAGES || MAX_BEGINNER_MESSAGES || MAX_PRO_MESSAGES || MAX_BUSINESS_MESSAGES)) {
    return true;
  } else {
    return false;
  }
}

export const getApiLimitCount = async () => {
  const session = await auth();
  if(!session?.user?.id) return 0;
  const apiLimit = await prismaClient.userApiLimit.findUnique({
    where: { userId: session.user.id }
  })
  if(!apiLimit) return 0;
  return apiLimit.count;
}