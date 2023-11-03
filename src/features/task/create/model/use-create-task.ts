import { CreateTaskData, useTasks } from "@/entities/task";
import { useCanCreateTask } from "./use-can-create-task";
import { useSesson } from "@/entities/session";

export function useCreateTask() {
  const session = useSesson((s) => s.currentSesson);
  const canCreate = useCanCreateTask();
  const createTaskRaw = useTasks((s) => s.createTask);

  const createTask = async (data: CreateTaskData, onCreate: () => void) => {
    if (!canCreate || !session?.userId) return;

    await createTaskRaw({ ...data, authorId: session.userId });

    onCreate();
  };

  return { createTask };
}
