import axios from "axios";

export const wappClient = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "https://wapp.postgate.app/" : "http://localhost:8084"
});
