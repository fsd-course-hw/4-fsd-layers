import { BoardPartial, useBoards } from "@/entities/board";
import { Session, useSession } from "@/entities/session";

export function canUpdateBoard(board?: BoardPartial, session?: Session) {
  if (!board) return false;
  return session?.userId === board?.ownerId;
}

export function useCanUpdateBoardFn() {
  const session = useSession((s) => s.currentSession);
  const getBoardById = useBoards((s) => s.getBoardById);
  return (boardId: string) => {
    const board = getBoardById(boardId);
    return canUpdateBoard(board, session);
  };
}

export function useCanUpdateBoard(boardId: string) {
  const board = useBoards((s) => s.getBoardById(boardId));
  const session = useSession((s) => s.currentSession);
  return canUpdateBoard(board, session);
}
