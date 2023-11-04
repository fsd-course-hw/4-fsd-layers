import { Controller, useForm } from "react-hook-form";
import { UiModal } from "@/shared/ui/ui-modal";
import { UiButton } from "@/shared/ui/ui-button";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { CreateTaskData } from '@/entities/task';
import { useCreateTask } from "../model/use-create-task.ts";

export function CreateTaskModal({ onClose }: { onClose: () => void }) {
  const { control, handleSubmit } = useForm<CreateTaskData>({
    defaultValues: {
      title: "",
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
