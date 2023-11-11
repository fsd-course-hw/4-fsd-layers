import { useBoards } from "@/entities/board";
import { useTasks } from "@/entities/task";
import { RemoveTaskButton, UpdateTaskButton, useCanViewTaskFn } from "@/features/tasks";


export function TasksList({ className }: { className?: string }) {
  const { tasks } = useTasks();
  const { boards } = useBoards();
  const canViewTask = useCanViewTaskFn();
  return (
    <div className={className}>
      <h2 className="text-lg mb-2 font-semibold">Все задачи</h2>
      <table className="w-full">
        <thead>
          <th className="text-start">Название:</th>
          <th className="text-start">Доска:</th>
          <th className="text-start">Описание:</th>
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
                    {task.title}
                </td>
                <td className="p-2">
                    {boards.find((board) => board.id === task.boardId)?.name}
                </td>
                <td className="p-2">
                  {task.description}
                </td>
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
