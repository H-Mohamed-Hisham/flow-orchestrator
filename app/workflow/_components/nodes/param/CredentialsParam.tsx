"use client";

import { useQuery } from "@tanstack/react-query";
import { useId } from "react";

// Actions
import { GetCredentialsForUser } from "@/actions/credentials/GetCredentialsForUser";

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

export function CredentialsParam({
  param,
  value,
  updateNodeParamValue,
}: ParamProps) {
  const id = useId();

  const query = useQuery({
    queryKey: ["credentials-for-user"],
    queryFn: () => GetCredentialsForUser(),
    refetchInterval: 10000, // 10 seconds
  });

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
          <SelectGroup>
            <SelectLabel>Credentials</SelectLabel>
            {query?.data?.map((credential) => (
              <SelectItem key={credential.id} value={credential.id}>
                {credential.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
