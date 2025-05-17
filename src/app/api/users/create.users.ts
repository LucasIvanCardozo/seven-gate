"use server"
import { hash } from "@/app/utils/bcrypt"
import { DB } from "../db/db"

export const createUser = async (data: CreateUserProps) => {
    const { email } = data

    const user = await DB.users.findFirst({ where: { email } })
    if (user) throw new Error(`El usuario ${email} ya existe`)

    data.password = hash(data.password)

    // TODO: Send email to user

    return DB.users.create({
        data,
    })
}

export type CreateUserProps = Parameters<typeof DB.users.create>[0]["data"]