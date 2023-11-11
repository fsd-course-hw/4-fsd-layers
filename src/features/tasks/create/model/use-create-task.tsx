import { useSesson } from "@/entities/session";
import { CreateTaskData } from "@/entities/task";
import { useTasks } from "@/entities/task";

export function useCreateTask() {
    const createTaskRaw = useTasks((s) => s.createTask);
    const session = useSesson((s) => s.currentSesson);
    
    const createTask = async (data: CreateTaskData, onCreate: () => void) => {
        if (!session?.userId) return;

        await createTaskRaw({ ...data, authorId: session?.userId });

        onCreate();
    
    };

  return { createTask };
}
