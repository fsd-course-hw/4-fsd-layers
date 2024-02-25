import { UiSelect } from "@/shared/ui/ui-select-field";
import { BoardPartial, useBoards } from "@/entities/board";

export function BoardSelect({
    className,
    label,
    onChangeBoardId,
    boardId,
    required,
    error,
}: {
    className?: string;
    label?: string;
    onChangeBoardId: (id?: string) => void;
    boardId?: string;
    required?: boolean;
    error?: string;
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
            renderPreview={(board) =>
                board ? (
                    board.name
                ) : (
                    <div>Не выбрано</div>
                )
            }
            renderOption={(board) =>
                board ? (
                    board.name
                ) : (
                    <div>Не выбрано</div>
                )
            }
        />
    );
}