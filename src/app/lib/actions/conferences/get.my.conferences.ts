import { conferences } from "@prisma/client"
import { DB } from "../../db/db"
import { getServerUser } from "../users"
import createAction from "../createActions"

export const getMyConferences = createAction(null, async () => {
    const { user } = await getServerUser()
    if (!user) return { oldConferences: [], upcomingConferences: [] }

    const user_id = +user.id
    const profiles = await DB.profile.findMany({
        where: { user_id },
        select: {
            profile_roles: { include: { roles: true } },
            conferences: { select: { id: true, date: true, title: true } },
        },
        orderBy: { conferences: { date: "asc" } },
    })

    const conferences = profiles.map(({ profile_roles, conferences }) => ({
        ...conferences,
        roles: profile_roles.map((item) => item.roles.role as Role),
    }))

    const now = new Date()
    const [oldConferences, upcomingConferences] = conferences.reduce(
        (acc, conference) => {
            if (conference.date < now) acc[0].push(conference)
            else acc[1].push(conference)
            return acc
        },
        [[], []] as [Conference[], Conference[]],
    )
    return {
        oldConferences,
        upcomingConferences,
    }
})

export const roles = ["admin", "oyente", "ponente"] as const
export type Role = (typeof roles)[number]

export type Conference = Pick<conferences, "id" | "date" | "title"> & {
    roles?: Role[]
}
export interface GetMyConferences {
    oldConferences: Conference[]
    upcomingConferences: Conference[]
}
