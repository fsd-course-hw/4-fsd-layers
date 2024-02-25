import { Session, useSession } from "@/entities/session";
import { Task, useTasksStore } from "@/entities/task";

function canViewTask(task?: Task, session?: Session) {
  if (!task) return false;
  return (
    session &&
      task.authorId === session?.userId
  );
}

export function useCanViewTaskFn() {
  const session = useSession((s) => s.currentSession);
  const getTaskById = useTasksStore((s) => s.getTaskById);
  return (taskId: string) => {
    const board = getTaskById(taskId);
    return canViewTask(board, session);
  };
}