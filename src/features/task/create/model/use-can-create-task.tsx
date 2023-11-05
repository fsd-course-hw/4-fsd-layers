import { useSession } from "@/entities/session";

export function useCanCreateTask() {
  const session = useSession((s) => s.currentSession);
  return !!session;
}
