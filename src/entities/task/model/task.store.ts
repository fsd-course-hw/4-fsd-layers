import { create } from "zustand";
import { Task } from "./types";
import { tasksRepository } from "./task.repository";

export type TaskStore = {
  task: Task | undefined;
  isLoading?: boolean;
  error?: string;
  loadTask: () => Promise<void>;
  saveTask: (value: Task) => Promise<void>;
};

export const createTaskStore = ({ taskId }: { taskId: string }) => {
  return create<TaskStore>((set) => ({
    task: undefined,
    error: undefined,
    isLoading: false,
    loadTask: async () => {
      set({ isLoading: true });
      const task = await tasksRepository.getTask(taskId).finally(() => {
        set({ isLoading: false });
      });
      set({ task });
    },
    saveTask: async (value: Task) => {
      await tasksRepository.saveTask(value);
      set({ task: value });
    },
  }));
};
