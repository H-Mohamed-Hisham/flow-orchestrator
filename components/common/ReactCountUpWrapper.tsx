"use client";

import { useState, useEffect } from "react";
import CountUp from "react-countup";

export function ReactCountUpWrapper({ value }: { value: number }) {
  const [mouted, setMouted] = useState(false);

  useEffect(() => {
    setMouted(true);
  }, []);

  if (!mouted) {
    return "-";
  }

  return <CountUp duration={0.5} preserveValue end={value} decimals={0} />;
}
