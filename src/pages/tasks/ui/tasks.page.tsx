import { UiCetnerContentLayout } from "@/shared/ui/layouts/ui-center-content-layout";
import { TasksList } from "./tasks-list";
import { CreateTaskForm, useCanCreateTask } from "@/features/task/create";
import { updateTaskDepsContext } from "@/features/task/update";
import { useCanViewBoardFn } from "@/features/board/view";

export function TasksPage() {
  const canCreate = useCanCreateTask();
  const canViewBoard = useCanViewBoardFn();

  const body = (
    <>
      <CreateTaskForm />
      <TasksList className="mt-10" />
    </>
  );

  return (
    <updateTaskDepsContext.Provider
      value={{
        canViewBoard: canViewBoard,
      }}
    >
      <UiCetnerContentLayout className="py-10">
        <h1 className="text-3xl mb-10">Задачи</h1>
        {canCreate ? (
          body
        ) : (
          <div className="mt-5 text-xl">
            У вас нет прав для работы с этой страницей
          </div>
        )}
      </UiCetnerContentLayout>
    </updateTaskDepsContext.Provider>
  );
}
