"use server"

import { compare } from "@/app/utils/bcrypt"
import { DB } from "../../db/db"

export const login = async ({ email, password }: Credentials) => {
    const user = await DB.users.findUnique({
        where: { email },
    })

    if (!user) throw new Error("Credenciales incorrectas")

    const isValid = compare(password, user.password)
    if (!isValid) throw new Error("Credenciales incorrectas")

    const { id, password: _, ...rest } = user

    return {
        id: `${id}`,
        ...rest,
    }
}

export interface Credentials {
    email: string
    password: string
}
