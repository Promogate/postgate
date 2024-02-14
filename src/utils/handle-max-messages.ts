import { MAX_BEGINNER_MESSAGES, MAX_BUSINESS_MESSAGES, MAX_FREE_MESSAGES, MAX_PRO_MESSAGES } from "@/config";

export const handleMaxMessagesNumber = (accountLevel: string) => {
  if (accountLevel === "FREE") {
    return MAX_FREE_MESSAGES;
  }
  if (accountLevel === "BEGINNER") {
    return MAX_BEGINNER_MESSAGES;
  }
  if (accountLevel === "PROFESSIONAL") {
    return MAX_PRO_MESSAGES;
  }
  if (accountLevel === "BUSINESS") {
    return MAX_BUSINESS_MESSAGES;
  }
  return MAX_FREE_MESSAGES;
}