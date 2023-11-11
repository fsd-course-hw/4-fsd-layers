import { nanoid } from "nanoid";
import { create } from "zustand";
import {CreateTaskData, Task, UpdateTaskData} from "@/entities/task/model/types";
import {taskRepository} from "@/entities/task/model/task.repository";

export type TasksStore = {
    tasks: Task[];
    getTaskById: (id: string) => Task | undefined;
    loadTasks: () => Promise<void>;
    createTask: (data: CreateTaskData) => Promise<void>;
    updateTask: (id: string, data: UpdateTaskData) => Promise<void>;
    removeTask: (taskId: string) => Promise<void>;
}

export const useTasks = create<TasksStore>((set, get) => ({
   tasks: [],
   getTaskById: (id) => {
       return get().tasks.find((task) => task.id === id);
   },
    loadTasks: async () => {
       set({
           tasks: await taskRepository.getTasks(),
       });
    },
    createTask: async (data) => {
       const newTask = { id: nanoid(), ...data};
       await taskRepository.saveTask(newTask);
       set({
           tasks: await taskRepository.getTasks(),
       })
    },
    updateTask: async (id, data) => {
       const task = await taskRepository.getTask(id);

       if (!task) return;
       const newTask = {...task, ...data};
       await taskRepository.saveTask(newTask);
       set({
           tasks: await taskRepository.getTasks(),
       })
    },
    removeTask: async (taskId: string) => {
       await taskRepository.removeTask(taskId);
       set({
           tasks: await taskRepository.getTasks(),
       })
    }
}));