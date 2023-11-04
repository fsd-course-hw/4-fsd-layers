import { UiSelect } from "@/shared/ui/ui-select-field";
import { useBoards, BoardPartial } from "@/entities/board";

export function BoardSelect({
                             className,
                             label,
                             onChangeBoardId,
                             boardId,
                             boards = [],
                             required,
                             error,
                           }: {
  error?: string;
  className?: string;
  boardId?: string;
  boards?: BoardPartial[];
  label?: string;
  onChangeBoardId: (id?: string) => void;
  required?: boolean;
}) {
  const board = useBoards((s) => (boardId ? s.getBoardById(boardId) : undefined));

  const options = (required ? boards : [undefined, ...boards]);

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
      renderPreview={(board) =>
        <div className={'px-2'}>{board?.name ?? 'Не выбрано'}</div>
      }
      renderOption={(board) =>
        <div className={'px-2'}>{board?.name ?? 'Не выбрано'}</div>
      }
    />
  );
}
