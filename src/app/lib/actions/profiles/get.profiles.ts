"use server"

import { z } from "zod"
import createAction from "../createActions"
import { DB } from "../../db/db"

const { object, number } = z
const schema = object({
    conference_id: number().positive(),
})

export const getProfiles = createAction(schema, async ({ conference_id }) =>
    DB.profile.findMany({
        where: {
            conference_id,
        },
        include: {
            users: { select: { name: true, lastname: true, email: true } },
            profile_roles: { 
                include: { 
                    roles: true
                }
            },
        },
    }),
)

export type GetProfiles = NonNullable<Awaited<ReturnType<typeof getProfiles>>["data"]>
