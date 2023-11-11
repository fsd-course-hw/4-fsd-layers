import {Task} from "./types";
import {create} from "zustand";
import {taskRepository} from "./task.repository";

export type TaskStore = {
    task: Task | undefined;
    isLoading?: boolean;
    error?: string;
    loadTask: () => Promise<void>;
    saveTask: (value: Task) => Promise<void>;
}

export const createTaskStore = ({ taskId }: { taskId: string}) => {
    return create<TaskStore>((set) => ({
        task: undefined,
        error: undefined,
        isLoading: false,
        loadTask: async () => {
            set({ isLoading: true });
            const task = await taskRepository.getTask(taskId).finally(() => {
                set( { isLoading: false });
            });
            set({ task })
        },
        saveTask: async  (value: Task) => {
            await taskRepository.saveTask(value);
            set({ task: value });
        },
    }));
};
