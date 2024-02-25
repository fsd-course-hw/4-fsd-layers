import { getBoardUrl, useBoards } from "@/entities/board";
import { AvatarsList, UserPreview, useUsers } from "@/entities/user";
import { RemoveBoardButton } from "@/features/board/remove";
import { UpdateBoardButton } from "@/features/board/update";
import { useCanViewBoardFn } from "@/features/board/view";
import { Link } from "react-router-dom";

export function BoardsList({ className }: { className?: string }) {
  const { boards } = useBoards();
  const users = useUsers((s) => s.usersMap());

  const canViewBoard = useCanViewBoardFn();

  return (
    <div className={className}>
      <h2 className="text-lg mb-2 font-semibold">Все доски</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-start">Название:</th>
            <th className="text-start">Админ:</th>
            <th className="text-start">Редакторы:</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {boards
            .filter((board) => canViewBoard(board.id))
            .map((board) => (
              <tr
                key={board.id}
                className="px-5 py-2 border-b border-b-slate-3 "
              >
                <td className="p-2">
                  <Link
                    to={getBoardUrl(board.id)}
                    className="text-xl text-blue-500"
                  >
                    {board.name}
                  </Link>
                </td>
                <td className="p-2">
                  <UserPreview size="md" {...users[board.ownerId]} />
                </td>
                <td className="p-2">
                  <AvatarsList
                    avatarsIds={board.editorsIds.map(
                      (id) => users[id].avatarId,
                    )}
                  />
                </td>
                <td className="p-2">
                  <div className="flex gap-2 flex-row-reverse">
                    <UpdateBoardButton boardId={board.id} />
                    <RemoveBoardButton boardId={board.id} />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div >
  );
}
