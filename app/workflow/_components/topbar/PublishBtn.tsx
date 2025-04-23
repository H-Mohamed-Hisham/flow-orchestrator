"use client";

import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";

// Icons
import { UploadIcon } from "lucide-react";

// Hooks
import useExecutionPlan from "@/hooks/useExecutionPlan";

// Actions
import { PublishWorkflow } from "@/actions/workflows/publishWorkflow";

// UI
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function PublishBtn({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();

  const mutation = useMutation({
    mutationFn: PublishWorkflow,
    onSuccess: () => {
      toast.success("Workflow published", { id: workflowId });
    },
    onError: () => {
      toast.error("Something went wrong", { id: workflowId });
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

        toast.loading("Publishing workflow...", { id: workflowId });
        mutation.mutate({
          id: workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
    >
      <UploadIcon size={16} className="stroke-green-400" />
      Publish
    </Button>
  );
}
