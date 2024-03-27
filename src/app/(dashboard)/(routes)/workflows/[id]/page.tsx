"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { CalendarDays, Save, Send, Settings } from "lucide-react";
import { useParams } from "next/navigation";
import { RotatingLines } from "react-loader-spinner";
import {
  Background,
  Controls,
  Panel,
  ReactFlow,
  ReactFlowProvider,
} from "reactflow";
import { shallow } from 'zustand/shallow';

import CustomEdge from "@/components/flow/custom-edge";
import { ImageNode } from "@/components/flow/custom-nodes/image";
import { TextNode } from "@/components/flow/custom-nodes/text";
import { NavigationNodes } from "@/components/flow/navigation-nodes";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useFlowContext } from "@/contexts/flow";
import { RFState, useFlowStore } from "@/hooks/use-flow-store";

import "reactflow/dist/style.css";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { FlowCalendar } from "@/components/flow/components/calendar";

const nodeTypes = {
  text: TextNode,
  image: ImageNode
}

const edgeTypes = {
  "custom-edge": CustomEdge,
};

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  saveFlow: state.saveFlow,
  setReactFlowInstance: state.setReactFlowInstance,
  onDrop: state.onDrop,
  onDragOver: state.onDragOver
});

export default function Page() {
  const { id } = useParams() as { id: string };
  const { toast } = useToast();

  const {
    reactFlowWrapper,
    handleGetWorkflow
  } = useFlowContext();
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    saveFlow,
    setReactFlowInstance,
    onDrop,
    onDragOver
  } = useFlowStore(selector, shallow);

  const mutation = useMutation({
    mutationKey: ["saving_flow", id],
    mutationFn: async () => {
      await saveFlow(id)
    }
  });

  const handleSave = async () => {
    await mutation.mutateAsync();
    toast({
      variant: "default",
      title: "Salvo com sucesso!"
    })
  };

  const query = useQuery({
    queryKey: ["flow_data", id],
    queryFn: async () => {
      const { nodes, edges } = await handleGetWorkflow(id);
      if (nodes !== null) {
        setNodes(nodes);
      }
      if (edges !== null) {
        setEdges(edges);
      }
      return { nodes, edges };
    },
    staleTime: 1000 * 60 * 60 * 24,
  })

  useEffect(() => {
    const savingInterval = setInterval(async () => {
      await mutation.mutateAsync();
    }, 15000)
    return () => clearInterval(savingInterval);
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
          >
            <Controls />
            <Background gap={12} size={1} />
            <Panel position="top-right">
              <NavigationNodes />
            </Panel>
            <Panel position="top-center">
              {mutation.isPending &&
                <Badge variant="secondary">
                  Salvando...
                </Badge>
              }
            </Panel>
            <Panel position="bottom-right">
              <div className="flex items-center gap-4">
                <FlowCalendar />
                <Button variant="primary-action" className="rounded-full flex items-center justify-center gap-4" onClick={handleSave}>
                  {mutation.isPending ? <RotatingLines
                    visible={true}
                    width="12"
                    strokeWidth="4"
                    strokeColor="#5528ff"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                  /> : <Send size={16} />}
                  Salvar
                </Button>
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  )
}