import { useSession } from "@/entities/session";

export function useCanCreateBoard() {
  const session = useSession((s) => s.currentSession);
  return !!session;
}
