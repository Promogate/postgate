"use client";

import CustomEdge from "@/components/flow/custom-edge";
import { First } from "@/components/flow/custom-nodes/first";
import { NavigationNodes } from "@/components/flow/navigation-nodes";
import { Button } from "@/components/ui/button";
import { useFlowContext } from "@/contexts/flow";
import { cn } from "@/lib/utils";
import { Menu, Save, Settings, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  Background,
  Controls,
  Panel,
  ReactFlow,
  ReactFlowProvider
} from "reactflow";

import "reactflow/dist/style.css";

const nodeTypes = {
  first: First
}

export default function Page() {
  const { id } = useParams() as { id: string };

  const {
    edges,
    nodes,
    onConnect,
    onEdgesChange,
    onNodesChange,
    reactFlowWrapper,
    setReactFlowInstance,
    onDrop,
    onDragOver
  } = useFlowContext();

  const edgeTypes = {
    "custom-edge": CustomEdge,
  };

  return (
    <div className="xl:w-[calc(100vw-296px)] xl:h-[calc(100vh-72px)] flex flex-col h-full flex-1">
      <ReactFlowProvider>
        <div ref={reactFlowWrapper} className="flex-1 h-full">
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
                <Button variant="primary-outline" className="rounded-full flex items-center justify-center gap-4">
                  <Save size={16} />
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