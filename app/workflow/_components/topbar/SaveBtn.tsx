"use client";

import { useReactFlow } from "@xyflow/react";
import { useMutation } from "@tanstack/react-query";

// Icons
import { CheckIcon } from "lucide-react";

// Actions
import { UpdateWorkflow } from "@/actions/workflows/updateWorkflow";

// UI
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SaveBtn({ workflowId }: { workflowId: string }) {
  const { toObject } = useReactFlow();

  const saveMutation = useMutation({
    mutationFn: UpdateWorkflow,
    onSuccess: () => {
      toast.success("Workflow saved successfully", { id: "save-workflow" });
    },
    onError: () => {
      toast.error("Something went wrong", { id: "save-workflow" });
    },
  });
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      disabled={saveMutation.isPending}
      onClick={() => {
        const workflowDefinition = JSON.stringify(toObject());
        toast.loading("Saving worklow...", { id: "save-workflow" });
        saveMutation.mutate({
          id: workflowId,
          definition: workflowDefinition,
        });
      }}
    >
      <CheckIcon size={16} className="stroke-green-400" />
      Save
    </Button>
  );
}
