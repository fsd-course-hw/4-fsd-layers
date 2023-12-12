import {useCanUpdateTaskFn} from "@/features/task/update/model/use-can-update-task";
import {UpdateTaskData, useTasks} from "@/entities/task";

export function useUpdateTask(taskId: string) {
    const canUpdateFn = useCanUpdateTaskFn();

    const updateModalRaw = useTasks((s) => s.updateTask);

    const updateTask = async (data: UpdateTaskData, onUpdate: () => void) => {
        if (!canUpdateFn(taskId)) return;

        await updateModalRaw(taskId, data);

        onUpdate();
    }

    return { updateTask };
}