import { RemoveIcon } from "@/shared/ui/ui-icons";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useTasks } from '@/entities/task';
import { useUsers } from "@/entities/user";
import { useBoards } from "@/entities/board";
import { useSession } from "@/entities/session";

function useUpdateRemovedUserBoardsFn() {
  const { boards, removeBoard, updateBoard } = useBoards();

  return async (userId: string) => {
    return Promise.all(boards.map((board) => {
      if (board.ownerId === userId) {
        return removeBoard(board.id);
      }

      const newBoard = {
        ...board,
        editorsIds: board.editorsIds.filter((id) => id !== userId),
      };

      return updateBoard(newBoard.id, newBoard);
    }))
  }
}

function useRemoveUserTasksFn() {
  const { tasks, removeTask } = useTasks();

  return async (userId: string) => {
    return Promise.all(tasks.map((task) => {
      if (task.authorId === userId) {
        return removeTask(task.id);
      }

      return Promise.resolve();
    }))
  }
}

function useRemoveUser() {
  const getConfirmation = useGetConfirmation();
  const { currentSession, removeSession } = useSession();
  const removeUser = useUsers((s) => s.removeUser);
  const updateRemovedUserBoards = useUpdateRemovedUserBoardsFn();
  const removeUserTasks = useRemoveUserTasksFn();

  return async (userId: string) => {
    const confirmation = await getConfirmation({
      description: "Вы действительно хотите удалить пользователя?",
    });

    if (!confirmation) return;

    if (currentSession?.userId === userId) {
      await removeSession();
    }

    await updateRemovedUserBoards(userId);

    await removeUserTasks(userId);

    await removeUser(userId);
  };
}

export function RemoveUserButton({ userId }: { userId: string }) {
  const removeUser = useRemoveUser();
  return (
    <button onClick={() => removeUser(userId)}>
      <RemoveIcon className="w-8 h-8 text-rose-500" />
    </button>
  );
}
