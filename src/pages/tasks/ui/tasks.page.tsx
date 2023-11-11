import { CreateTaskButton } from "@/features/tasks";
import { UiCetnerContentLayout } from "@/shared/ui/layouts/ui-center-content-layout";
import { TasksList } from "./tasks-list";

export function TasksPage() {

  return (
    <UiCetnerContentLayout className="py-10">
      <h1 className="text-3xl ">Задачи</h1>
      <CreateTaskButton className="mt-10"/>
      {/* {canCreate ? (
        body
      ) : (
        <div className="mt-5 text-xl">
          У вас нет прав для работы с этой страницей
        </div>
      )} */}
      <TasksList className="mt-10"/>
    </UiCetnerContentLayout>
  );
}
