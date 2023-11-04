import { useSession } from "@/entities/session";
import { User } from "@/entities/user";

export function useCheckSingIn() {
  const session = useSession((s) => s.currentSession);

  return {
    isSignIn: () => !!session,
    isUserSignIn: (user: User) => user.id === session?.userId,
  };
}
