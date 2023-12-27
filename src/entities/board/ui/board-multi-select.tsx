import { BoardPartial, useBoards } from "@/entities/board";
import { UiMultipleSelect } from "@/shared/ui/ui-multiple-select";

export function BoardMultiSelect({
  className,
  boardIds,
  onChangeBoardIds,
  label,
  error,
}: {
  error?: string;
  className?: string;
  boardIds: string[];
  label?: string;
  onChangeBoardIds: (ids: string[]) => void;
}) {
  const boards = useBoards((s) => s.boards);
  const selectedBoards = boards.filter((b) => boardIds.includes(b.id));
  const onChangeBoards = (boards: BoardPartial[]) => {
    onChangeBoardIds(boards.map((b) => b.id));
  };

  return (
    <UiMultipleSelect
      error={error}
      className={className}
      label={label}
      options={boards}
      value={selectedBoards}
      onChange={onChangeBoards}
      getLabel={(board) => board.name}
      renderPreview={(boards) =>
        boards?.map((board) => <p>{board.name}</p>)
      }
      renderOption={(board) => <p>{board.name}</p>}
    />
  );
}
