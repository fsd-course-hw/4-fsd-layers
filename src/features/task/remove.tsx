import {Task, useTasks} from "@/entities/task";
import {Session, useSession} from "@/entities/session";
import {useGetConfirmation} from "@/shared/lib/confirmation";
import {RemoveIcon} from "@/shared/ui/ui-icons";

function canRemoveTask(task?: Task, session?: Session) {
    if (!task) return false;
    return session?.userId === task?.authorId;
}

function useCanRemoveTaskFn() {
    const session = useSession((s) => s.currentSession);
    const getTaskById = useTasks((s) => s.getTaskById);
    return (taskId: string) => {
        const task = getTaskById(taskId);
        return canRemoveTask(task, session);
    };
}

function useCanRemoveTask(taskId: string) {
    const task = useTasks((s) => s.getTaskById(taskId));
    const session = useSession((s) => s.currentSession);
    return canRemoveTask(task, session);
}

function useRemoveTask() {
    const getConfirmation = useGetConfirmation();
    const canRemoveFn = useCanRemoveTaskFn();

    const { removeTask } = useTasks();

    return async (taskId: string) => {
        const confirmation = await getConfirmation({
            description: "Вы действительно хотите удалить задачу?",
        })

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
        <RemoveIcon className="w-8 h-8 text-rose-500"/>
      </button>
    );
}