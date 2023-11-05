import { nanoid } from "nanoid";
import { create } from "zustand";
import { CreateTaskData, Task, UpdateTaskData } from "./types";
import { tasksRepository } from "./tasks.repository";

export type TasksStore = {
  tasks: Task[];
  getTaskById: (id: string) => Task | undefined;
  loadTasks: () => Promise<void>;
  createTask: (data: CreateTaskData) => Promise<void>;
  updateTask: (id: string, data: UpdateTaskData) => Promise<void>;
  removeTask: (userId: string) => Promise<void>;
  removeBoardFromTasks: (userId: string, boardId: string) => Promise<void>;
  removeUserTasks: (userId: string) => Promise<void>;
};

export const useTasks = create<TasksStore>((set, get) => ({
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
    const newTask = { id: nanoid(), ...data, cols: [] };
    await tasksRepository.saveTask(newTask);
    set({
      tasks: await tasksRepository.getTasks(),
    });
  },
  updateTask: async (id, data) => {
    const task = await tasksRepository.getTask(id);
    if (!task) return;
    const newtask = { ...task, ...data };

    await tasksRepository.saveTask(newtask);
    set({
      tasks: await tasksRepository.getTasks(),
    });
  },
  removeTask: async (userId: string) => {
    await tasksRepository.removetask(userId);
    set({
      tasks: await tasksRepository.getTasks(),
    });
  },
  removeBoardFromTasks: async (userId: string, boardId: string) => {
    const tasksToUpdate = get().tasks.filter(
      (task) => task.authorId === userId && task.boardId === boardId,
    );

    for (const task of tasksToUpdate) {
      await tasksRepository.saveTask({
        ...task,
        boardId: undefined,
      });
    }

    set({
      tasks: await tasksRepository.getTasks(),
    });
  },
  removeUserTasks: async (userId: string) => {
    const tasksToRemove = get().tasks.filter(
      (task) => task.authorId === userId,
    );

    for (const task of tasksToRemove) {
      await tasksRepository.removetask(task.id);
    }
  },
}));
