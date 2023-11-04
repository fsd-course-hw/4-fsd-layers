import { Link } from 'react-router-dom';
import { boardUrl, useBoards } from '@/entities/board';

export function TaskBoardPreview({ boardId } : {boardId: string | undefined}) {
  const getBoardById = useBoards((s) => s.getBoardById);

  const board = boardId ? getBoardById(boardId) : null;

  if (!board) {
    return <div>Доска не назначена</div>;
  }

  return <Link to={boardUrl(board.id)} className="text-xl text-blue-500">{board.name}</Link>;
}