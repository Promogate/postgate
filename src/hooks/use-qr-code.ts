import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Input = {
  instanceId: string;
}

export function useQRCode(input: Input) {
  return useQuery({
    enabled: false,
    queryKey: ["qr_code", input.instanceId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/wapp/instance/qr-code/${input.instanceId}`)
      return data.base64
    },
    staleTime: 1000 * 60 * 5
  })
}