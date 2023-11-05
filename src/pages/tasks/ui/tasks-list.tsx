import { useBoards } from "@/entities/board";
import { useTasks } from "@/entities/task";
import { RemoveTaskButton } from "@/features/task/remove";
import { UpdateTaskButton } from "@/features/task/update";
import { useCanViewTaskFn } from "@/features/task/view";

export function TasksList({ className }: { className?: string }) {
  const { tasks } = useTasks();
  const { getBoardById } = useBoards();

  const canViewTask = useCanViewTaskFn();

  const getBoardName = (boardId?: string) => {
    if (!boardId) return "";
    const board = getBoardById(boardId);
    if (!board) return "";
    return board.name;
  };

  return (
    <div className={className}>
      <h2 className="text-lg mb-2 font-semibold">Все доски</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-start">Название:</th>
            <th className="text-start">Доска:</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks
            .filter((task) => canViewTask(task.id))
            .map((task) => (
              <tr
                key={task.id}
                className="px-5 py-2 border-b border-b-slate-3 "
              >
                <td className="p-2">{task.title}</td>
                <td className="p-2">{getBoardName(task.boardId)}</td>
                <td className="p-2">
                  <div className="flex gap-2 ml-auto">
                    <UpdateTaskButton taskId={task.id} />
                    <RemoveTaskButton taskId={task.id} />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
