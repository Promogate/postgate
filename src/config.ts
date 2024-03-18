export const MAX_FREE_MESSAGES = 1000;
export const MAX_BEGINNER_MESSAGES = 100000;
export const MAX_PRO_MESSAGES = 500000;
export const MAX_BUSINESS_MESSAGES = 1000000;
export const ACCOUNT_LEVEL= "FREE" || "BEGINNER" || "PROFESSIONAL" || "BUSINESS";
export const S3_ACCESS_KEY= process.env.S3_ACCESS_KEY as string
export const S3_SECRET_KEY= process.env.S3_SECRET_KEY as string
export const S3_BUCKET_NAME="postgate-web-storage"

export const ADD_WORKFLOW_MODAL = "add_workflow"