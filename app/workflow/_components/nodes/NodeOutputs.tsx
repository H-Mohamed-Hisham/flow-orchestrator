"use client";

import { ReactNode } from "react";
import { Handle, Position } from "@xyflow/react";

// Types
import { TaskParam } from "@/types/task";

// Lib
import { cn } from "@/lib/utils";

// Components
import { ColorForHandle } from "@/app/workflow/_components/nodes/common";

export function NodeOutputs({ children }: { children: ReactNode }) {
  return <div className="flex flex-col divide-y gap-q">{children}</div>;
}

export function NodeOutput({ output }: { output: TaskParam }) {
  return (
    <div className="flex justify-end relative p-3 bg-secondary w-full">
      <p className="text-xs text-muted-foreground">{output.name}</p>
      <Handle
        id={output.name}
        type="source"
        position={Position.Right}
        className={cn(
          "!bg-muted-foreground !border-2 !border-background !-right-2 !w-4 !h-4",
          ColorForHandle[output.type]
        )}
      />
    </div>
  );
}
