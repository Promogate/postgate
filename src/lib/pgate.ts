import axios from "axios";

export const pgateClient = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "https://pgate.app/" : "http://localhost:3001"
});
