import { UpdateIcon } from "@/shared/ui/ui-icons";
import clsx from "clsx";
import { useState } from "react";
import { UpdateBoardModal } from "./update-task-modal";
import { useCanUpdateBoard } from "../model/use-can-update-task";

export function UpdateTaskButton({
  className,
  taskId,
}: {
  className?: string;
  taskId: string;
}) {
  const canUpdate = useCanUpdateBoard(taskId);
  const [open, setOpen] = useState(false);

  if (!canUpdate) return null;
  return (
    <>
      <button className={clsx(className)} onClick={() => setOpen(true)}>
        <UpdateIcon className="w-8 h-8 text-teal-600" />
      </button>
      {open && (
        <UpdateBoardModal taskId={taskId} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
