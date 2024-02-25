import { ROUTER_PATHS } from "@/shared/constants/routes";
import { generatePath } from "react-router-dom";

export const getBoardUrl = (boardId: string | undefined) => {
    if (!boardId) {
        return ROUTER_PATHS.BOARDS
    }
    return generatePath(ROUTER_PATHS.HOME + ROUTER_PATHS.BOARD, { boardId });
};