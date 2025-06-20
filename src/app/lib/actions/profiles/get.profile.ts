"use server"

import { z } from "zod"
import { DB } from "../../db/db"
import { Role } from "../conferences/get.my.conferences"
import createAction from "../createActions"
import { getServerUser } from "../users"

const { object, coerce } = z

const schema = object({
    conference_id: coerce.number().min(1),
})

export const getProfile = createAction(schema, async ({ conference_id }) => {
    const { user } = await getServerUser()
    if (!user) return null

    const profile = await DB.profile.findFirst({
        where: {
            user_id: +user.id,
            conference_id,
        },
        include: {
            profile_roles: {
                include: {
                    roles: true,
                },
            },
            conferences: {
                select: {
                    id: true,
                    title: true,
                    presentation_limit_date: true,
                },
            },
        },
    })
    if (!profile) return null

    const { profile_roles, ...rest } = profile

    return {
        ...rest,
        roles: profile_roles.map((item) => item.roles.role as Role),
    }
})

export type ProfileDTO = NonNullable<Awaited<ReturnType<typeof getProfile>>["data"]>
