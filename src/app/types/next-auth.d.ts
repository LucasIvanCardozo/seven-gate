import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
import { users } from "@prisma/client/"

type UserWithoutPassword = Omit<users, "password">

declare module "next-auth" {
    interface Session {
        user: User
    }
    interface User extends UserWithoutPassword {}
}

declare module "next-auth/jwt" {
    interface JWT extends UserWithoutPassword {}
}
