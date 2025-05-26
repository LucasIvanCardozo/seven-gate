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
    if (!user) return getBaseConference(id)

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

    if (!profile) return getBaseConference(id)

    const { id: profileId, conferences, profile_roles } = profile

    return {
        ...conferences,
        profileId,
        roles: profile_roles.map((item) => item.roles.role as Role),
    }
})

export const getBaseConference = async (id: number | string) => {
    const conference = await DB.conferences.findFirstOrThrow({
        where: { id: +id },
    })

    return {
        ...conference,
        profileId: null,
        roles: null
    }
}

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
