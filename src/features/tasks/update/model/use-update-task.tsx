import { useGetConfirmation } from "@/shared/lib/confirmation";
import { UpdateTaskData } from "@/entities/task";
import { useTasks } from "@/entities/task";

export function useUpdateTask(taskId: string) {
  const getConfirmation = useGetConfirmation();
  const updateModalRaw = useTasks((s) => s.updateTask);

  const updateTask = async (data: UpdateTaskData, onUpdate: () => void) => {
    
    const confirmation = await getConfirmation({
    description:
        "Вы действительно хотите изменить задачу?",
    });

    if (!confirmation) return;

    await updateModalRaw(taskId, data);
    onUpdate();
  };

  return { updateTask };
}
