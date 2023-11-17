import { useBoards } from "@/entities/board";
import { useSession } from "@/entities/session";
import { useTasks } from "@/entities/task";
import { useUsers } from "@/entities/user";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { RemoveIcon } from "@/shared/ui/ui-icons";

function useRemoveUser() {
  const getConfirmation = useGetConfirmation();
  const { currentSession, removeSession } = useSession();
  const { removeAuthorFromBoards } = useBoards();
  const { removeUserTasks } = useTasks();
  const removeUser = useUsers((s) => s.removeUser);

  return async (userId: string) => {
    const confirmation = await getConfirmation({
      description: "Вы действительно хотите удалить пользователя?",
    });

    if (!confirmation) return;

    if (currentSession?.userId === userId) {
      await removeSession();
    }

    await removeAuthorFromBoards(userId);
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
