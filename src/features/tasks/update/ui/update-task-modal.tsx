import { UiModal } from "@/shared/ui/ui-modal";
import { UiButton } from "@/shared/ui/ui-button";
import { Controller, useForm } from "react-hook-form";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { useTasks, UpdateTaskData } from "@/entities/task";
import { useUpdateTask } from "../model/use-update-task";
import { BoardSelect } from "@/entities/board";

export function UpdateTaskModal({
  onClose,
  taskId,
}: {
  onClose: () => void;
  taskId: string;
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
                label="Описание задачи"
                inputProps={{ ...field }}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="boardId"
            render={({ field: {value, onChange}, fieldState }) => (
              <BoardSelect
                label="Выбор доски"
                boardId={value}
                error={fieldState.error?.message}
                onChangeBoardId={onChange}
              />
            )}
          />
          {/* <Controller
            control={control}
            name="authorId"
            rules={{
              required: "Администратор задачи - обязательное поле",
            }}
            render={({ field: { value, onChange }, fieldState }) => (
              <UserSelect
                label="Администратор"
                userId={value}
                onChangeUserId={onChange}
                error={fieldState.error?.message}
                required
                className="w-full"
              />
            )}
          /> */}
          {/* <Controller
            control={control}
            name="editorsIds"
            render={({ field: { value, onChange }, fieldState }) => (
              <UserMultiSelect
                label="Доски"
                userIds={value ?? []}
                onChangeUserIds={onChange}
                error={fieldState.error?.message}
                className="w-full"
              />
            )}
          /> */}
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
