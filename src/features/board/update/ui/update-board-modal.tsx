import { Controller, useForm } from "react-hook-form";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { useUpdateBoard } from "../model/use-update-board";
import { UpdateBoardData, useBoards } from "@/entities/board";
import { UserMultiSelect, UserSelect } from "@/entities/user";
import { UiModal1 } from "@/shared/ui/ui-modal-1";

export function UpdateBoardModal({
  onClose,
  boardId,
}: {
  onClose: () => void;
  boardId: string;
}) {
  const board = useBoards((s) => s.getBoardById(boardId));

  const { control, handleSubmit } = useForm<UpdateBoardData>({
    defaultValues: board,
  });

  const { updateBoard } = useUpdateBoard(boardId);

  const onSubmit = handleSubmit((data) => updateBoard(data, onClose));

  return (
    <UiModal1
      heading="Редактирование доски"
      onClose={onClose}
      onSubmit={onSubmit}
      renderBody={
        <>
          <Controller
            control={control}
            name="name"
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
            name="ownerId"
            rules={{
              required: "Администратор доски - обязательное поле",
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
          />
          <Controller
            control={control}
            name="editorsIds"
            render={({ field: { value, onChange }, fieldState }) => (
              <UserMultiSelect
                label="Редакторы"
                userIds={value ?? []}
                onChangeUserIds={onChange}
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
