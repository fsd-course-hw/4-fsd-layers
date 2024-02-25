import { persistStorage } from "@/shared/lib/persist-storage";
import { Task } from "./types";

const TASKS_STORAGE_KEY = "tasks_storsage";
export const tasksRepository = {
    getTasks: async (): Promise<Task[]> => {
        return persistStorage
            .getItemSafe<Task[]>(TASKS_STORAGE_KEY, [])
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
        const tasks = await tasksRepository.getTasks();
        return tasks.find((task) => task.id === id);
    },
    saveTask: async (task: Task) => {
        const tasks = await tasksRepository.getTasks();
        const taskIndex = tasks.findIndex((t) => t.id === task.id);

        if (taskIndex === -1) {
            tasks.push(task);
        } else {
            tasks[taskIndex] = task;
        }

        await persistStorage.setItemSafe(TASKS_STORAGE_KEY, tasks);
    },
    removeTask: async (id: string) => {
        const tasks = await tasksRepository.getTasks();
        await persistStorage.setItemSafe(
            TASKS_STORAGE_KEY,
            tasks.filter((t) => t.id !== id),
        );
    },
};