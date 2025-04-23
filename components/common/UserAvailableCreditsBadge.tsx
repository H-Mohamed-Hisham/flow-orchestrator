"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { GetAvaialbleCredits } from "@/actions/billing/getAvailableCredits";
import { CoinsIcon, Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactCountUpWrapper } from "@/components/common/ReactCountUpWrapper";
import { buttonVariants } from "@/components/ui/button";

export function UserAvailableCreditsBadge() {
  const query = useQuery({
    queryKey: ["user-available-credits"],
    queryFn: () => GetAvaialbleCredits(),
    refetchInterval: 30 * 1000, // 30 Seconds
  });
  return (
    <Link
      href={"/billing"}
      className={cn(
        "w-full space-x-2 items-center",
        buttonVariants({
          variant: "outline",
        })
      )}
    >
      <CoinsIcon size={20} className="text-primary" />
      <span className="font-semibold capitalize">
        {query.isLoading && <Loader2Icon className="w-4 h-4 animate-spin" />}
        {!query.isLoading && query.data && (
          <ReactCountUpWrapper value={query.data} />
        )}
        {!query.isLoading && !query.data === undefined && query.data}
      </span>
    </Link>
  );
}
