import { PageToHTMLTask } from "@/lib/workflow/task/PageToHTML";

// Types
import { ExecutionEnvironment } from "@/types/executor";

export async function PageToHTMLExecutor(
  environment: ExecutionEnvironment<typeof PageToHTMLTask>
): Promise<boolean> {
  try {
    const html = await environment.getPage()!.content();
    environment.setOutput("Html", html);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
