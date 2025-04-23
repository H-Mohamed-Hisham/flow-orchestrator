"use server";

import { auth } from "@clerk/nextjs/server";

// Lib
import prisma from "@/lib/prisma";

export async function GetWorkflow(workflowId: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  return prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });
}
