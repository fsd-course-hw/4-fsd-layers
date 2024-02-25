import { useSession } from "@/entities/session";
import { useCanCreateTask } from "./use-can-create-task";
import { CreateTaskData, useTasksStore } from "@/entities/task";

export function useCreateTask() {
    const session = useSession((s) => s.currentSession);
    const canCreate = useCanCreateTask();
    const createTaskRaw = useTasksStore((s) => s.createTask);

    const createTask = async (data: CreateTaskData, onCreate: () => void) => {
        if (!canCreate || !session?.userId) return;

        await createTaskRaw({ ...data, authorId: session.userId });

        onCreate();
    };

    return { createTask };
}
