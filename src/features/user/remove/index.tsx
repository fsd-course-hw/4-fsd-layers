import { RemoveIcon } from "@/shared/ui/ui-icons";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useTasks } from '@/entities/task';
import { useUsers } from "@/entities/user";
import { useBoards } from "@/entities/board";
import { useSession } from "@/entities/session";

function useUpdateRemovedUserBoardsFn() {
  const { boards, removeBoard, updateBoard } = useBoards();

  return async (userId: string) => {
    for await (const board of boards) {
      const newBoard = {
        ...board,
        editorsIds: board.editorsIds.filter((id) => id !== userId),
      };

      if (newBoard.ownerId === userId) {
        await removeBoard(newBoard.id);
      } else {
        await updateBoard(newBoard.id, newBoard);
      }
    }
  }
}

function useRemoveUserTasksFn() {
  const { tasks, removeTask } = useTasks();

  return async (userId: string) => {
    for await (const task of tasks) {
      if (task.authorId === userId) {
        await removeTask(task.id);
      }
    }
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
