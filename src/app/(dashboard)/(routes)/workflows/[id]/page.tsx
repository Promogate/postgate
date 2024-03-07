"use client";

import CustomEdge from "@/components/flow/custom-edge";
import { IntervalNode } from "@/components/flow/custom-nodes/interval";
import { TextNode } from "@/components/flow/custom-nodes/text";
import { NavigationNodes } from "@/components/flow/navigation-nodes";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useFlowContext } from "@/contexts/flow";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Menu, Save, Settings, X } from "lucide-react";
import { useParams } from "next/navigation";
import { RotatingLines } from "react-loader-spinner";
import {
  Background,
  Controls,
  Panel,
  ReactFlow,
  ReactFlowProvider
} from "reactflow";

import "reactflow/dist/style.css";

const nodeTypes = {
  text: TextNode,
  interval: IntervalNode
}

const edgeTypes = {
  "custom-edge": CustomEdge,
};

export default function Page() {
  const { id } = useParams() as { id: string };
  const { toast } = useToast();

  const {
    edges,
    nodes,
    onConnect,
    onEdgesChange,
    onNodesChange,
    reactFlowWrapper,
    setReactFlowInstance,
    onDrop,
    onDragOver,
    handleSaveWorkflow,
    handleGetWorkflow
  } = useFlowContext();

  const mutation = useMutation({
    mutationKey: ["saving_flow", id],
    mutationFn: async () => {
      await handleSaveWorkflow(id)
    },
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Salvo com sucesso!"
      })
    }
  });

  const handleSave = () => mutation.mutateAsync();

  const query = useQuery({
    queryKey: ["flow_data", id],
    queryFn: async () => await handleGetWorkflow(id),
    staleTime: 1000 * 60 * 60 * 24,
  })

  return (
    <div className="xl:w-[calc(100vw-288px)] xl:h-[calc(100vh-65px)] flex flex-col h-full flex-1">
      <ReactFlowProvider>
        <div ref={reactFlowWrapper} className="flex-1 h-full bg-slate-100">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
            <Background gap={12} size={1} />
            <Panel position="top-right">
              <NavigationNodes />
            </Panel>
            <Panel position="bottom-right">
              <div className="flex items-center gap-4">
                <Button variant="primary-outline" className="rounded-full flex items-center justify-center gap-4" onClick={handleSave}>
                  {mutation.isPending ? <RotatingLines
                    visible={true}
                    width="12"
                    strokeWidth="4"
                    strokeColor="#5528ff"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                  /> : <Save size={16} />}
                  Salvar
                </Button>
                <Button variant="primary-action" className="rounded-full flex items-center justify-center gap-4">
                  <Settings size={16} />
                </Button>
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  )
}