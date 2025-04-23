"use client";

import React, { useId, useState, useEffect } from "react";

// Types
import { ParamProps } from "@/types/appNode";
import { TaskParam } from "@/types/task";

// UI
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function StringParam({
  param,
  value,
  updateNodeParamValue,
  disabled,
}: ParamProps) {
  const id = useId();

  const [internalValue, setInternalValue] = useState(value);

  let Component: any = Input;
  if (param.variant === "textarea") {
    Component = Textarea;
  }

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      <Component
        id={id}
        placeholder="Enter value here"
        className="text-xs"
        disabled={disabled}
        value={internalValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInternalValue(e.target.value)
        }
        onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
          updateNodeParamValue(e.target.value)
        }
      />
      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
}
