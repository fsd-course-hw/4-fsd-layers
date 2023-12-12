import {User, useUsers} from "@/entities/user";
import {useBoards} from "@/entities/board";
import {UiSelect} from "@/shared/ui/ui-select-field";
import {BoardPreview} from "@/entities/user/ui/board-preview";

export function BoardSelect({
  className,
  label,
  onChangeBoardId,
  boardId,
  required,
  error,}: {
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

  const onChangeBoard = (user?: User) => {
    onChangeBoardId(user?.id);
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
            board ? (
               <BoardPreview size="sm" className="shrink-0 px-1" {...board}/>
            ) : (
               <div>Не выбрано</div>
            )
        }
        renderOption={(board) =>
            board ?  <BoardPreview size="sm" {...board}/> : <div>Не выбрано</div>
        }
    />
  );
}