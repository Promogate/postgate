import axios from "axios";

export const wappClient = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_WHATSAPP_API_URL : "http://localhost:8084"
});
