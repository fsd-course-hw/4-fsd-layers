import { UiModal } from "@/shared/ui/ui-modal";
import { UiButton } from "@/shared/ui/ui-button";
import { Controller, useForm } from "react-hook-form";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { CreateTaskData } from "@/entities/task";
import { useCreateTask } from "../model/use-create-task";
import { BoardMultiSelect } from "@/entities/board/ui/board-multi-select";

export function CreateTaskModal({ onClose }: { onClose: () => void }) {
  const { control, handleSubmit } = useForm<CreateTaskData>({
    defaultValues: {
      title: "",
      boardIds: [],
    },
  });

  const { createTask } = useCreateTask();

  const onSubmit = handleSubmit((data) => createTask(data, onClose));

  return (
    <UiModal isOpen onClose={onClose} width="md">
      <form onSubmit={onSubmit}>
        <UiModal.Header>
          <h1>Создание задачи</h1>
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
            name="boardIds"
            render={({ field: { value, onChange }, fieldState }) => (
              <BoardMultiSelect
                label="Выберите доску"
                boardIds={value}
                onChangeBoardIds={onChange}
                error={fieldState.error?.message}
                className="w-full" />
            )}
          />
        </UiModal.Body>
        <UiModal.Footer>
          <UiButton type="button" variant="outlined" onClick={onClose}>
            Отмена
          </UiButton>
          <UiButton type="submit" variant="primary">
            Создать
          </UiButton>
        </UiModal.Footer>
      </form>
    </UiModal>
  );
}
