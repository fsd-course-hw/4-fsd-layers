import { Link, generatePath } from "react-router-dom";
import { ROUTER_PATHS } from "@/shared/constants/routes";
import { useTasks } from "@/entities/task";
import { useBoards } from "@/entities/board";
import { useCanViewTaskFn } from "@/features/task/view";

const taskUrl = (taskId: string) =>
  generatePath(ROUTER_PATHS.HOME + ROUTER_PATHS.TASK, { taskId });

export function TasksList({ className }: { className?: string }) {
  const { tasks } = useTasks();
  const getBoardById = useBoards((s) => s.getBoardById);
  const canViewTask = useCanViewTaskFn();

  return (
    <div className={className}>
      <h2 className="text-lg mb-2 font-semibold">Все задачи</h2>
      <table className="w-full">
        <thead>
          <th className="text-start">Название:</th>
          <th className="text-start">Описание:</th>
          <th className="text-start">Доска:</th>
          <th></th>
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
                  <Link
                    to={taskUrl(task.id)}
                    className="text-xl text-blue-500"
                  >
                    {task.title}
                  </Link>
                </td>
                <td className="p-2">
                  {task.description}
                </td>
                <td className="p-2">
                  {(task.boardId && getBoardById(task.boardId)?.name) ?? 'Доска не назначена' }
                </td>
                <td className="p-2">
                  <div className="flex gap-2 ml-auto">
                    UpdateBoardButton
                    RemoveBoardButton
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
