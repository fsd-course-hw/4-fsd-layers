import { generatePath } from 'react-router-dom';
import { ROUTER_PATHS } from '@/shared/constants/routes.ts';

export const boardUrl = (boardId: string): string =>
  generatePath(ROUTER_PATHS.HOME + ROUTER_PATHS.BOARD, { boardId });