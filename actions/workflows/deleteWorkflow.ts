"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

// Lib
import prisma from "@/lib/prisma";

export async function DeleteWorkflow(id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  await prisma.workflow.delete({
    where: {
      id,
      userId,
    },
  });

  revalidatePath("/workflows");
}
