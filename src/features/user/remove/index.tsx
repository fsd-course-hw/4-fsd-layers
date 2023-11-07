import { useBoards } from "@/entities/board";
import { useTasks } from "@/entities/task";
import { useSession } from "@/entities/session";
import { useUsers } from "@/entities/user";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { RemoveIcon } from "@/shared/ui/ui-icons";

function useRemoveUser() {
  const getConfirmation = useGetConfirmation();
  const { currentSession, removeSession } = useSession();
  const { boards, removeBoard, updateBoard } = useBoards();
  const { tasks, removeTask, updateTask } = useTasks();
  const removeUser = useUsers((s) => s.removeUser);

  return async (userId: string) => {
    const confirmation = await getConfirmation({
      description: "Вы действительно хотите удалить пользователя?",
    });

    if (!confirmation) return;

    if (currentSession?.userId === userId) {
      await removeSession();
    }

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

    for await (const task of tasks) {
      const newTask = {
        ...task,
        authorId: task.authorId,
      };

      if (newTask.authorId === userId) {
        await removeTask(newTask.id);
      } else {
        await updateTask(newTask.id, newTask);
      }
    }

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
