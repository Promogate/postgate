import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, Image, Menu, MessageSquareText, Mic, X } from "lucide-react";
import { Tooltip } from "@/components/common/tooltip";
import { cn } from "@/lib/utils";

const IconList = ({ isOpen }: { isOpen: boolean }) => {
  const [isGrabbing, setIsGrabbing] = useState(false);
  
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const icons = [
    {
      icon: MessageSquareText,
      tip: "Mensagem de texto",
      type: "text",
      background: "bg-[#5528FF]"
    },
    {
      icon: Image,
      tip: "Imagem",
      type: "image",
      background: "bg-red-500"
    },
    {
      icon: Clock,
      tip: "Intervalo",
      type: "interval",
      background: "bg-amber-500"
    }
  ];

  return (
    <motion.ul
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-2 absolute py-2 rounded-md z-10 right-8"
    >
      {icons.map((icon, index) => (
        <motion.li key={index}>
        <div className={cn(`flex items-center py-1 p-4 ${icon.background} text-white rounded-full`, isGrabbing ? "cursor-grabbing" : "cursor-grab")} draggable onDragStart={(event) => onDragStart(event, icon.type)}>
            <Tooltip content={icon.tip}>
              <icon.icon
                onMouseDown={() => setIsGrabbing(true)}
                onMouseUp={() => setIsGrabbing(false)}
                onMouseLeave={() => setIsGrabbing(false)}
              />
            </Tooltip>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export const NavigationNodes = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        variant="primary-action"
        className="transition ease-in-out rounded-full flex items-center justify-center"
      >
        {isOpen ? <X size={16} /> : <Menu size={16} />}
      </Button>
      <IconList isOpen={isOpen} />
    </div>
  );
};