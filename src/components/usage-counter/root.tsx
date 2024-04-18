"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_MESSAGES } from "@/config";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { useAuth } from "@clerk/nextjs";

type RootProps = {
  limitCount: number;
}

const apiCount = 125;

export function Root() {
  const { onOpen } = useModal();
  const [isMounted, setIsMounted] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {
    setIsMounted(true)
  },[])

  if (!isMounted) return null;

  return (
    <div className="px-3">
      <Card className="bg-[#5528ff] border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiCount} / {MAX_FREE_MESSAGES} Envios gratuitos
            </p>
            <Progress className="h-3" value={(apiCount / MAX_FREE_MESSAGES) * 100} />
          </div>
          <Button className="w-full text-gray-900 border-0" variant="default" onClick={() => onOpen("upgrade")}>
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-gray-900"/>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}