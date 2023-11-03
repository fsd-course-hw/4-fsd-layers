import { Controller, useForm } from "react-hook-form";
import { UiModal } from "@/shared/ui/ui-modal";
import { UiButton } from "@/shared/ui/ui-button";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { BoardPartial, BoardSelect} from "@/entities/board";
import { useTasks, UpdateTaskData } from '@/entities/task';
import { useUpdateTask } from "../model/use-update-task.tsx";

export function UpdateTaskModal({
  onClose,
  taskId, boards
}: {
  onClose: () => void;
  taskId: string;
  boards: BoardPartial[]
}) {

  const task = useTasks((s) => s.getTaskById(taskId));

  const { control, handleSubmit } = useForm<UpdateTaskData>({
    defaultValues: task,
  });

  const { updateTask } = useUpdateTask(taskId);

  const onSubmit = handleSubmit((data) => updateTask(data, onClose));

  return (
    <UiModal isOpen onClose={onClose} width="md">
      <form onSubmit={onSubmit}>
        <UiModal.Header>
          <h1>Редактирование задачи</h1>
        </UiModal.Header>
        <UiModal.Body className="flex flex-col gap-4">
          <Controller
            control={control}
            name="title"
            rules={{ required: "Название доски - обязательное поле" }}
            render={({ field, fieldState }) => (
              <UiTextField
                label="Название"
                inputProps={{ ...field }}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field, fieldState }) => (
              <UiTextField
                label="Описание"
                inputProps={{ ...field }}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="boardId"
            render={({ field: { value, onChange } }) => (
              <BoardSelect
                label="Доска"
                boardId={value}
                boards={boards}
                onChangeBoardId={onChange}
                className="w-full"
              />
            )}
          />
        </UiModal.Body>
        <UiModal.Footer>
          <UiButton type="button" variant="outlined" onClick={onClose}>
            Отмена
          </UiButton>
          <UiButton type="submit" variant="primary">
            Обновить
          </UiButton>
        </UiModal.Footer>
      </form>
    </UiModal>
  );
}
