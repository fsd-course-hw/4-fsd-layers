import {useCanUpdateTask} from "@/features/task/update/model/use-can-update-task";
import {useState} from "react";
import clsx from "clsx";
import {UpdateIcon} from "@/shared/ui/ui-icons";
import {UpdateTaskModal} from "@/features/task/update/ui/update-task-modal";

export function UpdateTaskButton({
  className,
  taskId,
}: {
  className?: string;
  taskId: string;
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
              <UpdateTaskModal taskId={taskId} onClose={() => setOpen(false)} />
          )}
      </>
  )
}