import { Session, useSession } from "@/entities/session";
import { RemoveIcon } from "@/shared/ui/ui-icons";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { Task, useTasksStore } from "@/entities/task";

function canRemoveTask(task?: Task, session?: Session) {
  if (!task) return false;
  return session?.userId === task?.authorId;
}

function useCanRemoveTaskFn() {
  const session = useSession((s) => s.currentSession);
  const getTaskById = useTasksStore((s) => s.getTaskById);
  return (taskId: string) => {
    const board = getTaskById(taskId);
    return canRemoveTask(board, session);
  };
}

function useCanRemoveTask(taskId: string) {
  const task = useTasksStore((s) => s.getTaskById(taskId));
  const session = useSession((s) => s.currentSession);
  return canRemoveTask(task, session);
}

function useRemoveTask() {
  const getConfirmation = useGetConfirmation();
  const canRemoveFn = useCanRemoveTaskFn();

  const removeTask = useTasksStore( (s) => s.removeTask);

  return async (taskId: string) => {
    const confirmation = await getConfirmation({
      description: "Вы действительно хотите удалить задачу?",
    });

    if (canRemoveFn(taskId) && confirmation) {
      await removeTask(taskId);
    }
  };
}

export function RemoveTaskButton({ taskId }: { taskId: string }) {
  const canRemove = useCanRemoveTask(taskId);
  const removeTask = useRemoveTask();

  if (!canRemove) return null;
  return (
    <button onClick={() => removeTask(taskId)}>
      <RemoveIcon className="w-8 h-8 text-rose-500" />
    </button>
  );
}
