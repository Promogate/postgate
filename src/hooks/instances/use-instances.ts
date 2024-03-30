import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchInstances = async () => {
  const { data } = await axios.get("/api/wapp/instance/my_instances");
  return data;
}

export const useInstances = (userId: string | null | undefined) => {
  if (!userId) throw new Error("Unauthorized");
  return useQuery({
    queryKey: ["instances", userId],
    queryFn: fetchInstances,
    staleTime: 1000 * 10 * 5
  })
}