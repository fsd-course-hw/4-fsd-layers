import {useSession} from "@/entities/session";
import {log} from "util";

export function useCanCreateTask() {
    const session = useSession((s) => s.currentSession);
    console.log("session", session);
    return !!session;
}