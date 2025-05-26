import { conferences } from "@prisma/client"
import { DB } from "../../db/db"
import { getServerUser } from "../users"
import createAction from "../createActions"

export const getMyConferences = createAction(null, async () => {
    const { user } = await getServerUser()
    if (!user) return { old: [], upcoming: [] }

    const user_id = +user.id
    const profiles = await DB.profile.findMany({
        where: { user_id },
        select: {
            id: true,
            profile_roles: { include: { roles: true } },
            conferences: true,
        },
        orderBy: { conferences: { date: "asc" } },
    })

    const conferences = profiles.map(({ id: profileId, profile_roles, conferences }) => ({
        ...conferences,
        profileId,
        roles: profile_roles.map((item) => item.roles.role as Role),
    }))

    const now = new Date()
    const [old, upcoming] = conferences.reduce(
        (acc, conference) => {
            if (conference.date < now) acc[0].push(conference)
            else acc[1].push(conference)
            return acc
        },
        [[], []] as [Conference[], Conference[]],
    )
    return {
        old,
        upcoming,
    }
})

export const roles = ["admin", "oyente", "ponente", "evaluador"] as const
export type Role = (typeof roles)[number]

export type Conference = conferences & {
    profileId?: number | null
    roles?: Role[] | null
}
export interface GetMyConferences {
    oldConferences: Conference[]
    upcomingConferences: Conference[]
}
