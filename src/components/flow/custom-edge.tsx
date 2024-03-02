import { Trash } from "lucide-react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getStraightPath,
  useReactFlow,
} from "reactflow";

import { Button } from "@/components/ui/button";
 
export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }: EdgeProps) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
 
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => setEdges((edges) => edges.filter((edge) => edge.id !== id))}
          style={{
            position: "absolute",
            pointerEvents: "all",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
          }}
          className="rounded-full"
        >
          <Trash size={12}/>
        </Button>
      </EdgeLabelRenderer>
    </>
  );
}