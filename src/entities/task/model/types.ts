export type Task = {
  id: string;
  title: string;
  description?: string;
  authorId?: string;
  boardIds?: string[];
};

export type CreateTaskData = {
  title: string;
  authorId?: string;
  boardIds: string[];
};

export type UpdateTaskData = {
  title: string;
  description?: string;
  boardIds?: string[];
  authorId?: string;
};
