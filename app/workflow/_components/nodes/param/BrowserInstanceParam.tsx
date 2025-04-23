"use client";

import React from "react";

// Types
import { ParamProps } from "@/types/appNode";

export function BrowserInstanceParam({ param }: ParamProps) {
  return <p className="text-xs">{param.name}</p>;
}
