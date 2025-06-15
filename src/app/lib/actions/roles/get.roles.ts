"use server"
import { DB } from "../../db/db"
import { Role } from "../conferences/get.my.conferences"
import createAction from "../createActions"

export const getRoles = createAction(null, async () => {
    const roles = await DB.roles.findMany()

    return roles as { id: number; role: Role }[]
})
