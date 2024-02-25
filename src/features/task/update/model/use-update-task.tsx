import { useCanUpdateTaskFn } from "./use-can-update-task";
import { UpdateTaskData, useTasksStore } from "@/entities/task";

export function useUpdateTask(taskId: string) {
  const canUpdateFn = useCanUpdateTaskFn();

  const updateModalRaw = useTasksStore((s) => s.updateTask);

  const updateTask = async (data: UpdateTaskData, onUpdate: () => void) => {
    if (!canUpdateFn(taskId)) return;
    await updateModalRaw(taskId, data);
    onUpdate();
  };

  return { updateTask };
}
