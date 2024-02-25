import { Session, useSession } from "@/entities/session";
import { Task, useTasksStore } from "@/entities/task";

export function canUpdateTask(task?: Task, session?: Session) {
  if (!task) return false;
  return session?.userId === task?.authorId;
}

export function useCanUpdateTaskFn() {
  const session = useSession((s) => s.currentSession);
  const getTaskById = useTasksStore((s) => s.getTaskById);
  return (taskId: string) => {
    const task = getTaskById(taskId);
    return canUpdateTask(task, session);
  };
}

export function useCanUpdateBoard(taskId: string) {
  const board = useTasksStore((s) => s.getTaskById(taskId));
  const session = useSession((s) => s.currentSession);
  return canUpdateTask(board, session);
}
