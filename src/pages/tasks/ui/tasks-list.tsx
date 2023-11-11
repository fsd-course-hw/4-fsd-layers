import {generatePath, Link} from "react-router-dom";
import {ROUTER_PATHS} from "@/shared/constants/routes";
import {useTasks} from "@/entities/task";
import {useCanViewTaskFn} from "@/features/task/view";
import {UpdateTaskButton} from "@/features/task/update";
import {RemoveTaskButton} from "@/features/task/remove";
import {useBoards} from "@/entities/board";
import {BoardPreview} from "@/entities/user/ui/board-preview";

const taskUrl = (taskId: string) =>
    generatePath(ROUTER_PATHS.HOME + ROUTER_PATHS.TASKS, { taskId } );

export function TasksList({ className }: { className?: string }) {
    const { tasks } = useTasks();
    const boards = useBoards();

    const canViewTask = useCanViewTaskFn();

    return (
      <div className={className}>
        <h2 className="text-lg mb-2 font-semibold">Все задачи</h2>
        <table className="w-full">
            <thead>
               <tr>
                   <th className="text-start">Название:</th>
                   <th className="text-start">Описание:</th>
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
                        <td>
                            <BoardPreview size="md" {...boards.getBoardById(task.boardId)}/>
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
    )
}