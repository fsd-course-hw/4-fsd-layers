import { UiModal } from "@/shared/ui/ui-modal";
import { UiButton } from "@/shared/ui/ui-button";
import { Controller, useForm } from "react-hook-form";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { useUpdateTask } from "../model/use-update-task";
import { UpdateTaskData, useTasksStore } from "@/entities/task";
import { BoardSelect } from "@/entities/board";

export function UpdateBoardModal({
  onClose,
  taskId,
}: {
  onClose: () => void;
  taskId: string;
}) {
  const task = useTasksStore((s) => s.getTaskById(taskId));

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
            rules={{ required: "Название задачи - обязательное поле" }}
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
                textareaProps={{ ...field, rows: 5 }}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="boardId"
            rules={{
              required: "Администратор доски - обязательное поле",
            }}
            render={({ field: { value, onChange }, fieldState }) => (
              <BoardSelect
                label="Доска"
                boardId={value}
                onChangeBoardId={onChange}
                error={fieldState.error?.message}
                required
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
