import { LogIn, Wifi } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { InstanceProps } from "./root";
import Link from "next/link";
import { Instance } from "@/@types";

type InstanceCardProps = Instance

export function InstanceCard(props: Instance) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>{props.instance}</h2>
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex items-center gap-x-4 justify-end">
        <Link href={`/qr-code/${props.instance}`} target="_blank">
          <Button size="icon" variant="primary-outline">
            <Wifi size={16} />
          </Button>
        </Link>
        <Link href={`/contas/${props.id}//?instanceId=${props.instance}`}>
          <Button size="icon" variant="default">
            <LogIn size={16} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}