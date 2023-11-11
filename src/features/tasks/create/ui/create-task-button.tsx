import { UiButton } from "@/shared/ui/ui-button";
import clsx from "clsx";
import { CreateTaskModal } from "./create-task-modal";
import { useState } from "react";

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
