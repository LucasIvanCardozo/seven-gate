"use server"
import { DB } from "../../db/db"
import { getServerUser } from "../users"
import createAction from "../createActions"
import { Conference, Role } from "./get.my.conferences"

export const getMyConferencesOld = createAction(null, async () => {
    const { user } = await getServerUser()
    if (!user) return []

    const user_id = +user.id
    const profiles = await DB.profile.findMany({
        where: {
            user_id,
            conferences: {
                date: {
                    lt: new Date(),
                },
            },
        },
        select: {
            id: true,
            profile_roles: { include: { roles: true } },
            conferences: true,
        },
        orderBy: { conferences: { date: "asc" } },
    })

    return profiles.map(({ id: profileId, profile_roles, conferences }) => ({
        ...conferences,
        profileId,
        roles: profile_roles.map((item) => item.roles.role as Role),
    })) as Conference[]
})
