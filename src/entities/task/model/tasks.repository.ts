import { persistStorage } from "@/shared/lib/persist-storage";
import { Task } from "./types";

const TASKS_STORAGE_KEY = "tasks_storage";
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
          boardIds: task.boardIds,
        })),
      );
  },
  getTask: async (id: string): Promise<Task | undefined> => {
    return persistStorage
      .getItemSafe<Task[]>(TASKS_STORAGE_KEY, [])
      .then((tasks) => tasks.find((task) => task.id === id));
  },
  saveTask: async (value: Task) => {
    const tasks = await tasksRepository.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === value.id);

    if (taskIndex === -1) {
      tasks.push(value);
    } else {
      tasks[taskIndex] = value;
    }

    await persistStorage.setItemSafe(TASKS_STORAGE_KEY, tasks);
  },
  removeTask: async (taskId: string) => {
    const tasks = await tasksRepository.getTasks();
    await persistStorage.setItemSafe(
      TASKS_STORAGE_KEY,
      tasks.filter((task) => task.id !== taskId),
    );
  },
};
