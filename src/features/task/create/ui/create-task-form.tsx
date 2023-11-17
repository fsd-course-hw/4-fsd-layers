import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";

import { UiButton } from "@/shared/ui/ui-button";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { CreateTaskFormData, useCreateTask } from "../model/use-create-task";

export function CreateTaskForm({ className }: { className?: string }) {
  const { control, reset, handleSubmit } = useForm<CreateTaskFormData>({
    defaultValues: {
      title: "",
    },
  });

  const { createTask } = useCreateTask();

  return (
    <div className={className}>
      <h2 className="text-lg mb-2 font-semibold">Добавить задачу</h2>
      <form
        onSubmit={handleSubmit((data) => {
          createTask?.(data);
          reset();
        })}
        className={clsx("flex gap-4")}
      >
        <Controller
          control={control}
          name="title"
          rules={{ required: "Название задачи - обязательное поле" }}
          render={({ field, fieldState }) => (
            <UiTextField
              inputProps={{ ...field, placeholder: "Название задачи" }}
              className="grow"
              error={fieldState.error?.message}
            />
          )}
        />
        <UiButton variant="primary" type="submit">
          Создать
        </UiButton>
      </form>
    </div>
  );
}
