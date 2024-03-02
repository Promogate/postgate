import { randomUUID } from "crypto";
import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import { addEdge, applyEdgeChanges, applyNodeChanges } from "reactflow";
import { v4 } from "uuid";

type FlowContextProps = {
  nodes: any;
  edges: any;
  onNodesChange: any;
  onEdgesChange: any;
  onConnect: any;
  onDragOver: any;
  onDrop: any;
  reactFlowWrapper: any;
  setReactFlowInstance: any;
}

const FlowContext = createContext<FlowContextProps>({} as FlowContextProps);

export function useFlowContext() {
  if (!FlowContext) throw new Error("Flow context must be initiated.");
  return useContext(FlowContext);
}

export function FlowProvider({ children }: { children: React.ReactNode }) {
  const initialNodes = [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
    { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
    { id: "3", position: { x: 0, y: 200 }, data: { label: "3" } },
  ];
  // const initialEdges = [{ id: "e1-2", type: "custom-edge", source: "1", target: "2" }];
  const initialEdges: any[] = [];

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useState<any>(initialNodes);
  const [edges, setEdges] = useState<any>(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: any) => setEdges((eds: any) => addEdge(connection, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNodeId = v4();
      const newNode = {
        id: newNodeId,
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds: any) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  const values = {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDragOver,
    onDrop,
    reactFlowWrapper,
    setReactFlowInstance
  }

  return (
    <FlowContext.Provider value={values}>
      {children}
    </FlowContext.Provider>
  )
}