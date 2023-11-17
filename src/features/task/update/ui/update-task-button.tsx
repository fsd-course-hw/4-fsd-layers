import { UpdateIcon } from "@/shared/ui/ui-icons";
import clsx from "clsx";
import { useState } from "react";
import { UpdateTaskModal } from "./update-task-modal";

export function UpdateTaskButton({
  className,
  taskId,
}: {
  className?: string;
  taskId: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className={clsx(className)} onClick={() => setOpen(true)}>
        <UpdateIcon className="w-8 h-8 text-teal-600" />
      </button>
      {open && (
        <UpdateTaskModal taskId={taskId} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
