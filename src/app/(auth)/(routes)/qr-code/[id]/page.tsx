"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation"
import { useState } from "react";

export default function QRCodePage() {
  const { id } = useParams() as { id: string };
  const [qrCode, setQrCode] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ["get_instance", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/wapp/instance/qr-code/${id}`)
      setQrCode(data.base64);
      return data.base64
    },
    staleTime: 1000 * 30
  })

  return (
    <>
      { qrCode && <Image src={qrCode as string} alt="qrCode" width={500} height={500}/>}
    </>
  )
}