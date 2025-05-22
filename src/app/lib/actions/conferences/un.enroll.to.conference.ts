"use server"

import { z } from "zod"
import { DB } from "../../db/db"
import { getServerUser } from "../users"
import createAction from "../createActions"

const { object, string, number, array } = z
const schema = object({
    id: number().positive(),
    roles: array(string().min(1)).min(1, {
        message: "Debe seleccionar al menos un rol",
    }),
})

export const unEnrollToConference = createAction(
    schema,
    async ({ id, roles }) => {
        const { user } = await getServerUser()
        if (!user) throw new Error("Necesitas estar logueado")

        const profile = await DB.profile.findFirst({
            where: {
                user_id: +user.id,
                conference_id: id,
            },
        })
        if (!profile) throw new Error("No estas inscripto en la conferencia")

        const profile_id = profile.id

        const profile_roles = await DB.profile_roles.findMany({
            where: {
                profile_id,
            },
        })

        await DB.$transaction(async (DB) => {
            const { count } = await DB.profile_roles.deleteMany({
                where: {
                    profile_id,
                    roles: { role: { in: roles } },
                },
            })

            if (count === profile_roles.length)
                await DB.profile.delete({ where: { id: profile_id } })
        })

        return { profile_id }
    },
)
