import { UiButton } from "@/shared/ui/ui-button";
import clsx from "clsx";
import { useState } from "react";
import { CreateTaskModal } from "./create-task-modal";

export function CreateTaskButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <UiButton
        variant="primary"
        className={clsx(className)}
        onClick={() => setOpen(true)}
      >
        Новая задача
      </UiButton>
      {open && <CreateTaskModal onClose={() => setOpen(false)} />}
    </>
  );
}
