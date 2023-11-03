import { useSesson } from "@/entities/session";

export function useCanCreateTask() {
  const session = useSesson((s) => s.currentSesson);
  return !!session;
}
