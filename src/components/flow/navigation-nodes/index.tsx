import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Image, Menu, MessageSquareText, X } from "lucide-react";
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
      background: "bg-[#5528FF]",
      active: true
    },
    {
      icon: Image,
      tip: "Imagem e Texto",
      type: "image",
      background: "bg-red-500",
      active: true
    }
  ];

  return (
    <motion.ul
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col md:min-w-[400px] gap-2 absolute py-2 rounded-md z-10 left-8 bg-white"
    >
      <div className="grid grid-cols-2 gap-4 p-4">
        {icons.map((icon, index) => (
          <motion.li key={index}>
            <div
              className={cn(`flex items-center gap-x-2 text-xs py-1 p-4 border rounded-lg`, isGrabbing ? "cursor-grabbing" : "cursor-grab")}
              draggable
              onDragStart={(event) => onDragStart(event, icon.type)}
            >
              <Tooltip content={icon.tip}>
                <icon.icon
                  size={16}
                  onMouseDown={() => setIsGrabbing(true)}
                  onMouseUp={() => setIsGrabbing(false)}
                  onMouseLeave={() => setIsGrabbing(false)}
                />
              </Tooltip>
              <p>{icon.tip}</p>
            </div>
          </motion.li>
        ))}
      </div>
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
        variant="default"
        className="transition ease-in-out rounded-full flex items-center justify-center"
      >
        {isOpen ? <X size={16} /> : <Menu size={16} />}
      </Button>
      <IconList isOpen={isOpen} />
    </div>
  );
};