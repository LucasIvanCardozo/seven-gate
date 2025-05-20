import { getServerSession, User } from "next-auth"
import { authOptions } from "../lib/auth/authOptions"

export const useServerUser = () =>
    getServerSession(authOptions).then((session) => ({
        user: session?.user ?? null,
    }))
