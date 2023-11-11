import {Task, useTasks} from "@/entities/task";
import {Session, useSession} from "@/entities/session";

export function canUpdateTask(task?: Task, session?: Session) {
    if (!task) return false;
    return session?.userId === task.authorId;
}

export function useCanUpdateTaskFn() {
    const session = useSession((s) => s.currentSession);
    const getTaskById = useTasks((s) => s.getTaskById);
    return (taskId: string) => {
        const task = getTaskById(taskId);
        return canUpdateTask(task, session);
    }
}

export function useCanUpdateTask(taskId: string) {
    const task = useTasks((s) => s.getTaskById(taskId));
    const session = useSession((s) => s.currentSession);
    return canUpdateTask(task, session);
}