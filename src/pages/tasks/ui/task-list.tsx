import { getBoardUrl, useBoards } from "@/entities/board";
import { useTasksStore } from "@/entities/task";
import { RemoveTaskButton } from "@/features/task/remove";
import { UpdateTaskButton } from "@/features/task/update";
import { useCanViewTaskFn } from "@/features/task/view";
import { Link } from "react-router-dom";

export function TaskList({ className }: { className?: string }) {
  const { tasks } = useTasksStore();
  const boards = useBoards((s) => s.boards);

  const canViewTask = useCanViewTaskFn();

  return (
    <div className={className}>
      <h2 className="text-lg mb-2 font-semibold">Все задачи</h2>
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
                <td className="p-2">
                  {task.title}
                </td>
                <td className="p-2">
                  <Link to={getBoardUrl(task.boardId)}>
                    {boards.find((board) => board.id === task.boardId)?.name}
                  </Link>
                </td>
                <td className="p-2">
                  <div className="flex gap-2 flex-row-reverse">
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
