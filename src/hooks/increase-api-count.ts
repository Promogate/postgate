import { auth } from "@clerk/nextjs";

import prismaClient from "@/lib/prisma";
import { MAX_BEGINNER_MESSAGES, MAX_BUSINESS_MESSAGES, MAX_FREE_MESSAGES, MAX_PRO_MESSAGES } from "@/config";

export const increaseApiCount = async () => {
  const { userId } = auth();
  if (!userId) return;
  const apiLimit = await prismaClient.userApiLimit.findUnique({
    where: {
      userId: userId
    }
  })
  if (apiLimit) {
    await prismaClient.userApiLimit.update({
      where: { userId: userId },
      data: { count: apiLimit.count + 1 }
    })
  } else {
    await prismaClient.userApiLimit.create({
      data: { userId: userId, count: 1 }
    })
  }
};

export const checkApiLimit = async () => {
  const { userId } = auth();
  if (!userId) return false;
  const apiLimit = await prismaClient.userApiLimit.findUnique({
    where: {
      userId: userId
    }
  })
  if (!apiLimit || (apiLimit.count < MAX_FREE_MESSAGES || MAX_BEGINNER_MESSAGES || MAX_PRO_MESSAGES || MAX_BUSINESS_MESSAGES)) {
    return true;
  } else {
    return false;
  }
}

export const getApiLimitCount = async () => {
  const { userId } = auth();
  if(!userId) return 0;
  const apiLimit = await prismaClient.userApiLimit.findUnique({
    where: { userId: userId }
  })
  if(!apiLimit) return 0;
  return apiLimit.count;
}