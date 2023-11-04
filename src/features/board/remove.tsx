import { Task, useTasks } from '@/entities/task';
import { Session, useSesson } from "@/entities/session";
import { BoardPartial, useBoards } from "@/entities/board";
import { RemoveIcon } from "@/shared/ui/ui-icons";
import { useGetConfirmation } from "@/shared/lib/confirmation";

function canRemoveBoard(board?: BoardPartial, session?: Session) {
  if (!board) return false;
  return session?.userId === board?.ownerId;
}

function useCanRemoveBoardFn() {
  const session = useSesson((s) => s.currentSesson);
  const getBoardById = useBoards((s) => s.getBoardById);
  return (boardId: string) => {
    const board = getBoardById(boardId);
    return canRemoveBoard(board, session);
  };
}

function useCanRemoveBoard(boardId: string) {
  const board = useBoards((s) => s.getBoardById(boardId));
  const session = useSesson((s) => s.currentSesson);
  return canRemoveBoard(board, session);
}

function useUnassignBoardFromTaskFn() {
  const updateTask = useTasks((s) => s.updateTask);

  return async (task: Task) => {
    await updateTask(task.id, {
      ...task,
      boardId: undefined
    })
  };
}

function useUnassignBoardFromTasksFn() {
  const unassignBoardFromTask = useUnassignBoardFromTaskFn();
  const tasks = useTasks((s) => s.tasks);

  return async (boardId: string) => Promise.all(tasks.map((task) => {
    if (task.boardId === boardId) {
      return unassignBoardFromTask(task);
    }

    return Promise.resolve();
  }))
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
      await Promise.all([removeBoard(boardId), unassignBoardFromTasks(boardId)]);
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
