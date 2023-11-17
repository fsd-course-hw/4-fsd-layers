import { createStrictContext } from "@/shared/lib/react";

type UpdateTasksDeps = {
  canViewBoard: (boardId: string) => boolean;
};

export const updateTaskDepsContext = createStrictContext<UpdateTasksDeps>();
