import {UpdateTaskData, useTasks} from "@/entities/task";
import {Controller, useForm} from "react-hook-form";
import {useUpdateTask} from "@/features/task/update/model/use-update-task";
import {UiModal} from "@/shared/ui/ui-modal";
import {UiButton} from "@/shared/ui/ui-button";
import {UiTextField} from "@/shared/ui/ui-text-field";
import {BoardSelect} from "@/entities/user/ui/board-select";

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
                              label="Описание"
                              inputProps={{ ...field }}
                              error={fieldState.error?.message}
                          />
                      )}
                  />
                  <Controller
                      control={control}
                      name="boardId"
                      rules={{ required: "Доска - обязательное поле" }}
                      render={({ field: { value, onChange }, fieldState }) => (
                          <BoardSelect
                              label="Пока не понятно"
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