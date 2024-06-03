"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { handleMaxMessagesNumber, handlePlanTypeName } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";
import useStore from "@/hooks/useStore";
import useAuthStore from "@/hooks/use-user";

export function Root() {
  const [isMounted, setIsMounted] = useState(false);
  const store = useStore(useAuthStore, (state) => state);

  const { data, isLoading } = useQuery({
    queryKey: ["account_info", store?.user?.id],
    queryFn: async () => {
      const response = await axios.get("/api/account/" + store?.user?.id);
      return response.data;
    },
    staleTime: 1000 * 60 * 5
  })

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (isLoading) {
    return (
      <Card className="bg-[#5528ff] border-0">
        <CardHeader>
          <CardTitle>
            <div className="flex gap-x-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="py-6">
          <div className="flex flex-col items-center gap-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-[#5528ff] border-0">
      <CardHeader>
        <CardTitle>
          <h2 className="text-white text-sm flex gap-x-2">
            Pacote Ativo: <Badge variant="plan">{handlePlanTypeName(data.accountLevel)}</Badge>
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="py-6">
        <div className="text-center text-sm text-white mb-4 space-y-2">
          <p>
            {data.count} / {handleMaxMessagesNumber(data.accountLevel)} Envios
          </p>
          <Progress className="h-3" value={(data.count / handleMaxMessagesNumber(data.accountLevel)) * 100} />
        </div>
      </CardContent>
    </Card>
  );
}