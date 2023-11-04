import { UiCetnerContentLayout } from "@/shared/ui/layouts/ui-center-content-layout";
import { CreateTaskButton, useCanCreateTask} from "@/features/task/create";
import { TasksList } from "./tasks-list.tsx";

export function TasksPage() {
  const canCreate = useCanCreateTask();

  const body = (
    <>
      <div className="flex gap-2 mt-10">
        <CreateTaskButton />
      </div>
      <TasksList className="mt-10" />
    </>
  );

  return (
    <UiCetnerContentLayout className="py-10">
      <h1 className="text-3xl ">Задачи</h1>
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
