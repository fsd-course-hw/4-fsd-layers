import { UpdateTaskData, useTasks } from "@/entities/task";
import { useCanUpdateTaskFn } from "./use-can-update-task.tsx";

export function useUpdateTask(boardId: string) {
  const canUpdateFn = useCanUpdateTaskFn();

  const updateModalRaw = useTasks((s) => s.updateTask);

  const updateTask = async (data: UpdateTaskData, onUpdate: () => void) => {
    if (!canUpdateFn(boardId)) return;

    await updateModalRaw(boardId, data);
    onUpdate();
  };

  return { updateTask };
}
