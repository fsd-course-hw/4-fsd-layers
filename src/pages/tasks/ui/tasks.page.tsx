import {CreateTaskButton, useCanCreateTask} from "@/features/task/create";
import {TasksList} from "@/pages/tasks/ui/tasks-list";
import {UiCetnerContentLayout} from "@/shared/ui/layouts/ui-center-content-layout";

export function TasksPage() {
    const canCreate = useCanCreateTask();
    console.log("can create ", canCreate);

    const body = (
      <>
          <div className="flex gap-2 mt-10">
              <CreateTaskButton/>
          </div>
          <TasksList className="mt-10"/>
      </>
    );

    return (
        <UiCetnerContentLayout className="py-10">
            <h1 className="tex-3xl ">Задачи</h1>
            {canCreate ? (
                body
            ) : (
              <div className="mt-5 text-xl">
                  У вас нет прав для работы с этой страницей
              </div>
            )}
        </UiCetnerContentLayout>
    );
}