"use server"

import { z } from "zod"
import { Role, roles } from "../conferences/get.my.conferences"
import createAction from "../createActions"
import { DB } from "../../db/db"

const { object, string, coerce, number } = z
const schema = object({
    conference_id: number().positive(),
    email: string().email(),
    role_id: coerce.number().positive(),
})

export const createProfile = createAction(
    schema,
    async ({ conference_id, email, role_id }) => {
        const user = await DB.users.findFirst({
            where: {
                email,
            },
        })
        if (!user) throw new Error("Usuario no encontrado")

        const user_id = user.id

        const profile = await DB.profile.upsert({
            where: {
                user_id_conference_id: {
                    user_id,
                    conference_id,
                },
            },
            create: {
                conference_id,
                user_id,
            },
            update: {},
            include: {
                profile_roles: {
                    select: { roles_id: true },
                },
            },
        })

        const roles_ids = profile.profile_roles.map(({ roles_id }) => roles_id)
        if (roles_ids.includes(role_id))
            throw new Error("Ese usuario ya posee ese rol")

        await DB.profile_roles.create({
            data: {
                profile_id: profile.id,
                roles_id: role_id,
            },
        })

        return profile
    },
)
