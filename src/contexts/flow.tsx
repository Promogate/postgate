import axios from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState
} from "react";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useEdgesState,
  useNodesState
} from "reactflow";
import { v4 } from "uuid";

import { useToast } from "@/components/ui/use-toast";
import {
  ImageNodeProps,
  TextNodeProps
} from "@/@types";

type FlowContextProps = {
  nodes: any;
  edges: any;
  setNodes: React.Dispatch<any>;
  setEdges: React.Dispatch<any>;
  onNodesChange: any;
  onEdgesChange: any;
  onConnect: any;
  onDragOver: any;
  onDrop: any;
  reactFlowWrapper: any;
  setReactFlowInstance: any;
  handleSaveWorkflow: (id: string) => Promise<void>;
  handleGetWorkflow: (id: string) => Promise<{ nodes: any, edges: any }>
  handleNodeDelete: (id: string) => void,
  handleEditNodeData: (id: string, values: any) => void
  handleEditImageNodeData: (id: string, values: any) => void
}

type NodeProps = {
  id: string;
  position: {
    x: number;
    y: number;
  },
  type: string;
  data: unknown;
}

type EdgeProps = {
  id: string;
  type: string;
  source: string;
  target: string;
}

const FlowContext = createContext<FlowContextProps>({} as FlowContextProps);

export function useFlowContext() {
  if (!FlowContext) throw new Error("Flow context must be initiated.");
  return useContext(FlowContext);
}

export function FlowProvider({ children }: { children: React.ReactNode }) {
  const initialNodes: NodeProps[] = [];
  const initialEdges: EdgeProps[] = [];

  const { toast } = useToast();
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useNodesState<any>(initialNodes);
  const [edges, setEdges] = useEdgesState<any>(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onNodesChange = useCallback(
    (changes: any) => {
      setNodes((prevNodes: any) => applyNodeChanges(changes, prevNodes));
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: any) => {
      setEdges((eds: any) => applyEdgeChanges(changes, eds))
    },
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
        data: { label: `${type}_node` },
      };

      setNodes((nds: any) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
  );

  const handleSaveWorkflow = async (id: string) => {
    await axios.put(`/api/workflow/${id}`, { nodes, edges })
    toast({
      title: "Salvo com sucesso!"
    });
  }

  const handleGetWorkflow = async (id: string) => {
    try {
      const { data } = await axios.get(`/api/workflow/${id}`);
      const flow = data.data;
      setNodes(JSON.parse(flow.nodes));
      setEdges(JSON.parse(flow.edges));
      return {
        nodes: JSON.parse(flow.nodes),
        edges: JSON.parse(flow.edges)
      };
    } catch (error: any) {
      toast({
        title: "Erro ao buscar informações do fluxo",
        variant: "destructive",
      })
      throw new Error(error.message);
    }
  }

  const handleNodeDelete = useCallback(
    (nodeId: string) => {
      setNodes((prevNodes: any) => {
        const updatedNodes = prevNodes.filter((node: any) => {
          const { type, id, parentNode } = node
          if (type === 'buttonsChildNode' && parentNode === nodeId) return
          return id !== nodeId
        })

        setEdges((prevEdges: any) =>
          prevEdges.filter((edge: any) => edge.source !== nodeId && edge.target !== nodeId),
        )

        return updatedNodes
      })
    },
    [setNodes, setEdges],
  )

  const handleEditNodeData = useCallback((nodeId: string, values: TextNodeProps) => {
    setNodes((prevNodes: any) => {
      return prevNodes.map((node: any) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            ...values
          }
        }
        return node;
      });
    })
  }, [setNodes]);

  const handleEditImageNodeData = useCallback(async (nodeId: string, values: ImageNodeProps) => {
    let bodyFormData = new FormData();
    bodyFormData.append("userId", values.userId);
    bodyFormData.append("image", values.image);
    bodyFormData.append("message", values.message)
    const result = await axios.post("/api/s3-upload", bodyFormData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    setNodes((prevNodes: any) => {
      return prevNodes.map((node: any) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            image: result.data.url,
            message: values.message
          }
        }
        return node;
      });
    })
  }, [setNodes]);

  const values = {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDragOver,
    onDrop,
    reactFlowWrapper,
    setReactFlowInstance,
    handleSaveWorkflow,
    handleGetWorkflow,
    handleNodeDelete,
    handleEditNodeData,
    handleEditImageNodeData
  }

  return (
    <FlowContext.Provider value={values}>
      {children}
    </FlowContext.Provider>
  )
}