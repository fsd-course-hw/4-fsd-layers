import { UiSelect } from "@/shared/ui/ui-select-field";
import { BoardPartial, useBoards } from "..";

export function BoardSelect({
  className,
  label,
  onChangeBoardId,
  boardId,
  required,
  error,
}: {
  error?: string;

  className?: string;
  boardId?: string;
  label?: string;
  onChangeBoardId: (id?: string) => void;
  required?: boolean;
}) {
  const board = useBoards((s) => (boardId ? s.getBoardById(boardId) : undefined));
  const boards = useBoards((s) => s.boards);

  const options = required ? boards : [undefined, ...boards];

  const onChangeBoard = (board?: BoardPartial) => {
    onChangeBoardId(board?.id);
  };

  return (
    <UiSelect
      error={error}
      className={className}
      label={label}
      options={options}
      value={board}
      onChange={onChangeBoard}
      getLabel={(board) => board?.name ?? ""}
      renderOption={(board) =>
        board ? <div>{board.name}</div> : <div>Не выбрано</div>
      }
    />
  );
}
