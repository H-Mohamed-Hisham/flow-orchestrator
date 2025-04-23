import { Node } from "@xyflow/react";

// Types
import { TaskParam, TaskType } from "@/types/task";

export interface FlowNodeData {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: any;
}

export interface FlowNode extends Node {
  data: FlowNodeData;
}

export interface ParamProps {
  param: TaskParam;
  value: string;
  updateNodeParamValue: (newValue: string) => void;
  disabled?: boolean;
}

export type FlowNodeMissingInputs = {
  nodeId: string;
  inputs: string[];
};
