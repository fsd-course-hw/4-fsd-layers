import { useTasks } from "@/entities/task";
import { useCanCreateTask } from "./use-can-create-task";
import { useSession } from "@/entities/session";

export interface CreateTaskFormData {
  title: string;
}

export function useCreateTask() {
  const session = useSession((s) => s.currentSession);
  const canCreate = useCanCreateTask();
  const createTaskRaw = useTasks((s) => s.createTask);

  const createTask = async (data: CreateTaskFormData) => {
    if (!canCreate || !session?.userId) return;

    await createTaskRaw({ ...data, authorId: session.userId });
  };

  return { createTask };
}
