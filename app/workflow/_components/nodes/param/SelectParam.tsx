"use client";

import { useId } from "react";

// Types
import { ParamProps } from "@/types/appNode";

// UI
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type OptionType = {
  label: string;
  value: string;
};

export function SelectParam({
  param,
  value,
  updateNodeParamValue,
}: ParamProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400">*</p>}
      </Label>
      <Select
        defaultValue={value}
        onValueChange={(value) => {
          updateNodeParamValue(value);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {param.options.map((option: OptionType) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
