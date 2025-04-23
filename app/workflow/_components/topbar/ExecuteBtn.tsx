"use client";

import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";

// Icons
import { PlayIcon } from "lucide-react";

// Hooks
import useExecutionPlan from "@/hooks/useExecutionPlan";

// Actions
import { RunWorkflow } from "@/actions/workflows/runWorkflow";

// UI
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ExecuteBtn({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();

  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () => {
      toast.success("Execution started", { id: "flow-execution" });
    },
    onError: () => {
      toast.error("Something went wrong", { id: "flow-execution" });
    },
  });
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        const plan = generate();
        if (!plan) {
          // Client side validation
          return;
        }

        mutation.mutate({
          workflowId: workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
    >
      <PlayIcon size={16} className="stroke-orange-400" />
      Execute
    </Button>
  );
}
