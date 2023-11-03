import { Task, useTasks } from "@/entities/task";
import { Session, useSesson } from "@/entities/session";

export function canUpdateTask(task?: Task, session?: Session) {
  if (!task) return false;
  if (!session) return false;
  return session.userId === task.authorId;
}

export function useCanUpdateTaskFn() {
  const session = useSesson((s) => s.currentSesson);
  const getTaskById = useTasks((s) => s.getTaskById);
  return (taskId: string) => {
    const task = getTaskById(taskId);
    return canUpdateTask(task, session);
  };
}

export function useCanUpdateTask(taskId: string) {
  const task = useTasks((s) => s.getTaskById(taskId));
  const session = useSesson((s) => s.currentSesson);
  return canUpdateTask(task, session);
}
