import { UpdateTaskData, useTasks } from "@/entities/task";
import {
  useFormContext,
  FormProvider,
  useForm,
  Controller,
} from "react-hook-form";
import { useUpdateTask } from "../model/use-update-task";
import { UiButton } from "@/shared/ui/ui-button";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { BoardSelect } from "@/entities/board";
import { useStrictContext } from "@/shared/lib/react";
import { updateTaskDepsContext } from "../lib/update-tasks-deps";

export function UpdateTaskForm({
  children,
  onSuccess,
  taskId,
}: {
  children?: React.ReactNode;
  onSuccess: () => void;
  taskId: string;
}) {
  const task = useTasks((s) => s.getTaskById(taskId));
  const form = useForm<UpdateTaskData>({
    defaultValues: task,
  });

  const { updateTask } = useUpdateTask(taskId);

  const handleSumit = form.handleSubmit((data) => {
    return updateTask(data, onSuccess);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSumit}>{children}</form>;
    </FormProvider>
  );
}

UpdateTaskForm.Fields = function Fields() {
  const { control } = useFormContext<UpdateTaskData>();
  const { canViewBoard } = useStrictContext(updateTaskDepsContext);

  return (
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
        name="description"
        render={({ field, fieldState }) => (
          <UiTextField
            multiline
            label="Описание"
            textAreaProps={{ ...field, rows: 4 }}
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="boardId"
        render={({ field: { value, onChange }, fieldState }) => (
          <BoardSelect
            label="Доска"
            boardId={value}
            onChangeBoardId={onChange}
            error={fieldState.error?.message}
            className="w-full"
            filterOptions={(b) => canViewBoard(b.id)}
          />
        )}
      />
    </>
  );
};

UpdateTaskForm.SubmitButton = function SubmitButton() {
  return (
    <UiButton type="submit" variant="primary">
      Обновить
    </UiButton>
  );
};
