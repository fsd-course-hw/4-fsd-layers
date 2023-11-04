import clsx from "clsx";
import { useState } from "react";
import { UpdateIcon } from "@/shared/ui/ui-icons";
import { BoardPartial } from '@/entities/board';
import { useCanUpdateTask } from "../model/use-can-update-task.tsx";
import { UpdateTaskModal } from "./update-task-modal.tsx";

export function UpdateTaskButton({
  className,
  taskId,
  boards
}: {
  className?: string;
  taskId: string;
  boards: BoardPartial[];
}) {
  const canUpdate = useCanUpdateTask(taskId);
  const [open, setOpen] = useState(false);

  if (!canUpdate) return null;
  return (
    <>
      <button className={clsx(className)} onClick={() => setOpen(true)}>
        <UpdateIcon className="w-8 h-8 text-teal-600" />
      </button>
      {open && (
        <UpdateTaskModal taskId={taskId} boards={boards} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
