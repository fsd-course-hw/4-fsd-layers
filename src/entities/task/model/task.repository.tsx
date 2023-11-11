import {Task} from "@/entities/task/model/types";
import {persistStorage} from "@/shared/lib/persist-storage";

const TASK_STORAGE_KEY = "task_storage_key";

export const taskRepository = {
    getTasks: async (): Promise<Task[]> => {
        return persistStorage
            .getItemSafe<Task[]>(TASK_STORAGE_KEY, [])
            .then((tasks) =>
                tasks.map((task) => ({
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    authorId: task.authorId,
                    boardId: task.boardId,
                })),
            );
    },
    getTask: async (id: string): Promise<Task | undefined> => {
        return persistStorage
            .getItemSafe<Task[]>(TASK_STORAGE_KEY, [])
            .then((tasks) => tasks.find((task) => task.id === id));
    },
    saveTask: async (value: Task) => {
        const tasks = await taskRepository.getTasks();
        const taskIndex = tasks.findIndex((task) => task.id === value.id);

        if (taskIndex === -1) {
            tasks.push(value);
        } else {
            tasks[taskIndex] = value;
        }

        await persistStorage.setItemSafe(TASK_STORAGE_KEY, tasks);
    },
    removeTask: async (taskId: string) => {
        const tasks = await taskRepository.getTasks();
        await persistStorage.setItemSafe(
            TASK_STORAGE_KEY,
            tasks.filter((task) => task.id !== taskId),
        )
    }
}