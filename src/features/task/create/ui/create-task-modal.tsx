import { Controller, useForm} from "react-hook-form";
import { CreateTaskData } from "@/entities/task"
import {useCreateTask} from "@/features/task/create/model/use-create-task";
import {UiModal} from "@/shared/ui/ui-modal";
import {UiTextField} from "@/shared/ui/ui-text-field";
import {UiButton} from "@/shared/ui/ui-button";
import {BoardSelect} from "@/entities/user/ui/board-select";

export function CreateTaskModal( { onClose }: { onClose: () => void }) {
    const { control, handleSubmit } = useForm<CreateTaskData>({
        defaultValues: {
            title: "",
            description: "",
            authorId: "",
            boardId: "",
        }
    });

    const { createTask } = useCreateTask();

    const onSubmit = handleSubmit((data) => createTask(data, onClose));

    return(
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
                          inputProps={{...field}}
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
                                inputProps={{...field}}
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
                        Создать
                    </UiButton>
                </UiModal.Footer>
            </form>
        </UiModal>
    );
}