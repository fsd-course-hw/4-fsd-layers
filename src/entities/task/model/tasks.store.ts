import { create } from "zustand";
import { CreateTaskData, Task, UpdateTaskData } from "./types";
import { tasksRepository } from "./tasks.repository";
import { nanoid } from "nanoid";

export type TasksStore = {
    tasks: Task[];
    getTaskById: (id: string) => Task | undefined;
    loadTasks: () => Promise<void>;
    createTask: (data: CreateTaskData) => Promise<void>;
    updateTask: (id: string, data: UpdateTaskData) => Promise<void>;
    removeTask: (id: string) => Promise<void>;
};

export const useTasksStore = create<TasksStore>((set, get) => ({
    tasks: [],
    getTaskById: (id) => {
        return get().tasks.find((task) => task.id === id);
    },
    loadTasks: async () => {
        set({
            tasks: await tasksRepository.getTasks(),
        });
    },
    createTask: async (data) => {
        const newTask = { id: nanoid(), ...data };
        await tasksRepository.saveTask(newTask);
        set({
            tasks: await tasksRepository.getTasks(),
        });
    },
    updateTask: async (id, data) => {
        const task = await tasksRepository.getTask(id);
        if (!task) return;
        const newTask = { ...task, ...data };

        await tasksRepository.saveTask(newTask);
        set({
            tasks: await tasksRepository.getTasks(),
        });
    },
    removeTask: async (id) => {
        await tasksRepository.removeTask(id);
        set({
            tasks: await tasksRepository.getTasks(),
        });
    },
}));