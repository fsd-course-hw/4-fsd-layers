import { Link } from "react-router-dom";
import { useTasks, taskUrl } from "@/entities/task";
import { useBoards } from "@/entities/board";
import { useCanViewTaskFn } from "@/features/task/view";
import { UpdateTaskButton } from '@/features/task/update';
import { RemoveTaskButton } from '@/features/task/remove';
import { useCanViewBoardFn } from '@/features/board/view';
import { TaskBoardPreview } from './task-board-preview.tsx';
import { TaskAuthorPreview } from './task-author-preview.tsx';

export function TasksList({ className }: { className?: string }) {
  const canViewTask = useCanViewTaskFn();
  const tasks = useTasks((s) => s.tasks);
  const canViewBoard = useCanViewBoardFn();
  const boards = useBoards((s) => s.boards).filter((board) => canViewBoard(board.id));

  return (
    <div className={className}>
      <h2 className="text-lg mb-2 font-semibold">Все задачи</h2>
      <table className="w-full">
        <thead>
          <th className="text-start">Название:</th>
          <th className="text-start">Описание:</th>
          <th className="text-start">Автор:</th>
          <th className="text-start">Доска:</th>
          <th></th>
        </thead>
        <tbody>
          {tasks
            .filter((task) => canViewTask(task.id))
            .map((task) => (
              <tr key={task.id} className="px-5 py-2 border-b border-b-slate-3">
                <td className="p-2">
                  <Link to={taskUrl(task.id)} className="text-xl text-blue-500">
                    {task.title}
                  </Link>
                </td>
                <td className="p-2">
                  {task.description}
                </td>
                <td className="p-2">
                  <TaskAuthorPreview authorId={task.authorId} />
                </td>
                <td className="p-2">
                  <TaskBoardPreview boardId={task.boardId} />
                </td>
                <td className="p-2">
                  <div className="flex gap-2 ml-auto">
                    <UpdateTaskButton taskId={task.id} boards={boards} />
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
