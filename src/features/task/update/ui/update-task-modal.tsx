import { Controller, useForm } from "react-hook-form";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { useUpdateTask } from "../model/use-update-task";
import { UpdateTaskData, useTasks } from "@/entities/task";
import { BoardMultiSelect } from "@/entities/board/ui/board-multi-select";
import { UiModal1 } from "@/shared/ui/ui-modal-1";

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
    <UiModal1
      heading="Редактирование задачи"
      onClose={onClose}
      onSubmit={onSubmit}
      renderBody={
        <>
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
                boardIds={value ?? []}
                onChangeBoardIds={onChange}
                error={fieldState.error?.message}
                className="w-full"
              />
            )}
          />
        </>
      }
    />
  );
}
