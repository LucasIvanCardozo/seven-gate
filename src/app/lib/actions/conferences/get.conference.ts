import { redirect } from "next/navigation"
import { DB } from "../../db/db"
import { getServerUser } from "../users"
import { Conference, Role } from "./get.my.conferences"
import createAction from "../createActions"
import z from "zod"

const { object, number } = z

const schema = object({
    id: number().positive(),
})

export const getConference = createAction(schema, async ({ id }) => {
    const { user } = await getServerUser()
    if (!user) return await getBaseConference(id)

    const profile = await DB.profile.findFirst({
        where: {
            user_id: +user.id,
            conference_id: +id,
        },
        include: {
            profile_roles: {
                include: {
                    roles: true,
                },
            },
            conferences: true,
        },
    })

    if (!profile) return await getBaseConference(id)

    const { conferences, profile_roles } = profile

    return {
        ...conferences,
        roles: profile_roles.map((item) => item.roles.role as Role),
    }
})

export const getBaseConference = (id: number | string) =>
    DB.conferences.findFirstOrThrow({
        where: { id: +id },
    })

export const getConferenceAdmins = createAction(schema, ({ id }) =>
    DB.profile.findMany({
        where: {
            conference_id: +id,
            profile_roles: {
                some: {
                    roles: {
                        role: "admin",
                    },
                },
            },
        },
        include: {
            users: { select: { id: true, name: true, lastname: true } },
        },
    }),
)
