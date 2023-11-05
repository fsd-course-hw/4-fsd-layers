import { Session, useSession } from "@/entities/session";
import { BoardPartial, useBoards } from "@/entities/board";
import { RemoveIcon } from "@/shared/ui/ui-icons";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useTasks } from "@/entities/task";

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

function useRemoveBoard() {
  const session = useSession((s) => s.currentSession);
  const getConfirmation = useGetConfirmation();
  const canRemoveFn = useCanRemoveBoardFn();
  const { removeBoardFromTasks } = useTasks();

  const { removeBoard } = useBoards();

  return async (boardId: string) => {
    const confirmation = await getConfirmation({
      description: "Вы действительно хотите удалить доску?",
    });

    if (session?.userId) {
      await removeBoardFromTasks(session.userId, boardId);
    }

    if (canRemoveFn(boardId) && confirmation) {
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
