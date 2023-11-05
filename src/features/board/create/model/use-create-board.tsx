import { CreateBoardData, useBoards } from "@/entities/board";
import { useCanCreateBoard } from "./use-can-create-board";
import { useSession } from "@/entities/session";

export function useCreateBoard() {
  const session = useSession((s) => s.currentSession);
  const canCreate = useCanCreateBoard();
  const createBoardRaw = useBoards((s) => s.createBoard);

  const createBoard = async (data: CreateBoardData, onCreate: () => void) => {
    if (!canCreate || !session?.userId) return;

    await createBoardRaw({ ...data, ownerId: session.userId });

    onCreate();
  };

  return { createBoard };
}
