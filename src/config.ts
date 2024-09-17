export const S3_ACCESS_KEY= process.env.S3_ACCESS_KEY as string
export const S3_SECRET_KEY= process.env.S3_SECRET_KEY as string
export const SCHEDULE_URL= process.env.NODE_ENV === "development" ? "http://localhost:5678/webhook-test/schedule" : "https://webhook.postgate.app/webhook/schedule"
export const N8N_API_KEY= process.env.CODE_CHAT_API_DEV_KEY as string;

export const MAX_FREE_MESSAGES = 1000;
export const MAX_BEGINNER_MESSAGES = 100000;
export const MAX_PRO_MESSAGES = 500000;
export const MAX_BUSINESS_MESSAGES = 1000000;

export const ACCOUNT_LEVEL= "FREE" || "BEGINNER" || "PROFESSIONAL" || "BUSINESS";
export const S3_BUCKET_NAME="postgate-web-storage"
export const ADD_WORKFLOW_MODAL = "add_workflow"
export const GET_QRCODE_MODAL = "get_qrcode"

export const API_URL = "http://localhost:8090"
