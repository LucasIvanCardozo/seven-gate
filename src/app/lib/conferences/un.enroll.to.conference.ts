"use server"

import { z } from "zod"
import { DB } from "../db/db"
import { getServerUser } from "../users"
import { parse } from "@/app/utils/parse"

const schema = z.object({
    roles: z.array(z.string().min(1)).min(1),
})

export const unEnrollToConference = async ({
    id,
    data,
}: {
    id: number
    data: FormData
}) => {
    const { roles } = parse({ schema, data, arrayFields: ["roles"] })

    const { user } = await getServerUser()
    if (!user) throw new Error("Necesitas estar logueado")

    const profile = await DB.profile.findFirst({
        where: {
            user_id: +user.id,
            conference_id: id,
        },
    })
    if (!profile) throw new Error("No estas inscrito en la conferencia")

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

    return {
        profile_id,
    }
}
