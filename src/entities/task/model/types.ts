export type Task = {
  id: string;
  title: string;
  description?: string;
  authorId?: string;
  boardId?: string;
}

export type CreateTaskData = {
  title: string;
  authorId: string;
};

export type UpdateTaskData = {
  title?: string;
  description?: string;
  boardId?: string;
};