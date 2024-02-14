import axios from "axios";

export const pgateClient = axios.create({
  baseURL: "https://pgate.app/"
});
