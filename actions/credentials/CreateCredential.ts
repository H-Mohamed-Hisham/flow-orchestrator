"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Schema
import {
  createCredentialSchema,
  createCredentialSchemaType,
} from "@/schema/credential";

// Lib
import prisma from "@/lib/prisma";
import { symmetricEncrypt } from "@/lib/encryption";

export async function CreateCredential(form: createCredentialSchemaType) {
  const { success, data } = createCredentialSchema.safeParse(form);

  if (!success) {
    throw new Error("Invalid form data");
  }

  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  // Encryot value
  const encryptValue = symmetricEncrypt(data.value);

  const result = await prisma.credential.create({
    data: {
      userId,
      name: data.name,
      value: encryptValue,
    },
  });

  if (!result) {
    throw new Error("Failed to create credential");
  }

  revalidatePath("/credentials");
}
