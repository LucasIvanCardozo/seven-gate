"use server"

import { getServerSession, User } from "next-auth"
import { authOptions } from "../lib/auth/authOptions"

export const useServerUser = async () =>
    getServerSession(authOptions).then((session) => ({
        user: session?.user ?? null,
    }))
