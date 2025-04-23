// Types
import { TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";

// Task
import { LaunchBrowserTask } from "@/lib/workflow/task/LaunchBrowserTask";
import { PageToHTMLTask } from "@/lib/workflow/task/PageToHTMLTask";
import { ExtractTextFromElementTask } from "@/lib/workflow/task/ExtractTextFromElementTask";

type Registry = {
  [K in TaskType]: WorkflowTask & { type: K };
};

export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHTMLTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
};
