"use client";

import { ReactNode } from "react";
import { useReactFlow } from "@xyflow/react";

// Lib
import { cn } from "@/lib/utils";

// Hooks
import useFlowValidation from "@/hooks/useFlowValidation";

export function NodeCard({
  nodeId,
  isSelected,
  children,
}: {
  nodeId: string;
  isSelected: boolean;
  children: ReactNode;
}) {
  const { getNode, setCenter } = useReactFlow();
  const { invalidInputs } = useFlowValidation();

  const hasInvalidInputs = invalidInputs.some((node) => node.nodeId === nodeId);
  return (
    <div
      className={cn(
        "rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs gap-1 flex flex-col",
        isSelected && "border-primary",
        hasInvalidInputs && "border-destructive border-2"
      )}
      onDoubleClick={() => {
        const node = getNode(nodeId);
        if (!node) return;
        const { position, measured } = node;
        if (!position || !measured) return;
        const { width, height } = measured;
        const x = position.x + width! / 2;
        const y = position.y + height! / 2;
        if (x === undefined || y === undefined) return;
        setCenter(x, y, {
          zoom: 1,
          duration: 500,
        });
      }}
    >
      {children}
    </div>
  );
}
