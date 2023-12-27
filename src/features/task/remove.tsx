import { useTasks } from "@/entities/task";
import { RemoveIcon } from "@/shared/ui/ui-icons";

function useRemoveTask() {
  const { removeTask } = useTasks();

  return async (taskId: string) => {
    await removeTask(taskId);
  };
}

export function RemoveTaskButton({ taskId }: { taskId: string }) {
  const removeTask = useRemoveTask();

  return (
    <button onClick={() => removeTask(taskId)}>
      <RemoveIcon className="w-8 h-8 text-rose-500" />
    </button>
  );
}
