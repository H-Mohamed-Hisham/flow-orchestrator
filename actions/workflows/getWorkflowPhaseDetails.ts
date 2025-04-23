"use server";

import { auth } from "@clerk/nextjs/server";

// Lib
import prisma from "@/lib/prisma";

export async function GetWorkflowPhaseDetails(phaseId: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  return prisma.executionPhase.findUnique({
    where: {
      id: phaseId,
      execution: {
        userId,
      },
    },
    include: {
      logs: {
        orderBy: {
          timeStamp: "asc",
        },
      },
    },
  });
}
