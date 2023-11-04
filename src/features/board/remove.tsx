import { Task, useTasks } from '@/entities/task';
import { Session, useSession } from "@/entities/session";
import { BoardPartial, useBoards } from "@/entities/board";
import { RemoveIcon } from "@/shared/ui/ui-icons";
import { useGetConfirmation } from "@/shared/lib/confirmation";

function canRemoveBoard(board?: BoardPartial, session?: Session) {
  if (!board) return false;
  return session?.userId === board?.ownerId;
}

function useCanRemoveBoardFn() {
  const session = useSession((s) => s.currentSession);
  const getBoardById = useBoards((s) => s.getBoardById);
  return (boardId: string) => {
    const board = getBoardById(boardId);
    return canRemoveBoard(board, session);
  };
}

function useCanRemoveBoard(boardId: string) {
  const board = useBoards((s) => s.getBoardById(boardId));
  const session = useSession((s) => s.currentSession);
  return canRemoveBoard(board, session);
}

function useUnassignBoardFromTaskFn() {
  const updateTask = useTasks((s) => s.updateTask);

  return async (task: Task) => {
    const newTask = {
      ...task,
      boardId: undefined
    };

    await updateTask(newTask.id, newTask);
  };
}

function useUnassignBoardFromTasksFn() {
  const unassignBoardFromTask = useUnassignBoardFromTaskFn();
  const tasks = useTasks((s) => s.tasks);

  return async (boardId: string) => {
    for await (const task of tasks) {
      if (task.boardId === boardId) {
        await unassignBoardFromTask(task);
      }
    }
  }
}

function useRemoveBoard() {
  const getConfirmation = useGetConfirmation();
  const canRemoveFn = useCanRemoveBoardFn();
  const unassignBoardFromTasks = useUnassignBoardFromTasksFn()

  const removeBoard = useBoards((s) => s.removeBoard);

  return async (boardId: string) => {
    const confirmation = await getConfirmation({
      description: "Вы действительно хотите удалить доску?",
    });

    if (canRemoveFn(boardId) && confirmation) {
      await unassignBoardFromTasks(boardId)
      await removeBoard(boardId);
    }
  };
}

export function RemoveBoardButton({ boardId }: { boardId: string }) {
  const canRemove = useCanRemoveBoard(boardId);
  const removeBoard = useRemoveBoard();

  if (!canRemove) return null;
  return (
    <button onClick={() => removeBoard(boardId)}>
      <RemoveIcon className="w-8 h-8 text-rose-500" />
    </button>
  );
}
