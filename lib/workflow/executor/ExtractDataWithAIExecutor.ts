import { symmetricDecrypt } from "@/lib/encryption";
import prisma from "@/lib/prisma";
import { ExtractDataWithAITask } from "@/lib/workflow/task/ExtractDataWithAI";

// Types
import { ExecutionEnvironment } from "@/types/executor";

export async function ExtractDataWithAIExecutor(
  environment: ExecutionEnvironment<typeof ExtractDataWithAITask>
): Promise<boolean> {
  try {
    const credentials = environment.getInput("Credentials");
    if (!credentials) {
      environment.log.error("input->credentials not defined");
    }

    const prompt = environment.getInput("Prompt");
    if (!prompt) {
      environment.log.error("input->prompt not defined");
    }

    const content = environment.getInput("Content");
    if (!content) {
      environment.log.error("input->content not defined");
    }

    // Get credentials from DB
    const credential = await prisma.credential.findUnique({
      where: { id: credentials },
    });

    if (!credential) {
      environment.log.error("credential not found");
      return false;
    }

    const plainCredentialValue = symmetricDecrypt(credential.value);

    if (!plainCredentialValue) {
      environment.log.error("cannot decrypt credential");
      return false;
    }

    // Use mock data
    const mockExtractedData = {
      usernameSelector: "#username",
      passwordSelector: "#password",
      loginSelector: ".btn",
    };

    environment.setOutput("Extracted data", JSON.stringify(mockExtractedData));

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
