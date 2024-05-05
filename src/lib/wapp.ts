import axios from "axios";

export const wappClient = axios.create(process.env.NODE_ENV === "development" ? {
  baseURL: process.env.NEXT_PUBLIC_WHATSAPP_API_DEV_URL,
  headers: {
    apiKey: process.env.CODE_CHAT_API_DEV_KEY
  }
} : {
  baseURL: process.env.NEXT_PUBLIC_WHATSAPP_API_URL,
  headers: {
    apiKey: process.env.CODE_CHAT_API_KEY
  }
});
