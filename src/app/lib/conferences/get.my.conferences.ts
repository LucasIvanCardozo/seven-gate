import { conferences } from "@prisma/client"
import { DB } from "../db/db"

export const getMyConferences = async (
    user_id: number,
): Promise<GetMyConferences> => {
    // const now = new Date()
    // const profiles = await DB.profile.findMany({
    //     where: { user_id },
    //     select: {
    //         profile_roles: { include: { roles: true } },
    //         conferences: { select: { id: true, date: true, title: true } },
    //     },
    //     orderBy: { conferences: { date: "asc" } },
    // })

    // const conferences = profiles.map(({ profile_roles, conferences }) => ({
    //     ...conferences,
    //     roles: profile_roles.map((item) => item.roles.role),
    // }))

    // const [oldConferences, upcomingConferences] = conferences.reduce(
    //     (acc, conference) => {
    //         if (conference.date < now) acc[0].push(conference)
    //         else acc[1].push(conference)
    //         return acc
    //     },
    //     [[], []] as [Conference[], Conference[]],
    // )
    // return {
    //     oldConferences,
    //     upcomingConferences,
    // }

    return {
        oldConferences: [
            {
                id: 1,
                date: new Date(),
                title: "Congreso 1",
                roles: ["admin", "assistant"],
            },
        ],
        upcomingConferences: [
            {
                id: 1,
                date: new Date(),
                title: "Congreso 2",
                roles: ["admin", "assistant"],
            },
            {
                id: 2,
                date: new Date(),
                title: "Congreso 3",
                roles: ["admin", "ponnent"],
            },
            {
                id: 3,
                date: new Date(),
                title: "Congreso 4",
                roles: ["admin", "assistant"],
            },
            {
                id: 4,
                date: new Date(),
                title: "Congreso 5",
                roles: ["admin", "assistant"],
            },
        ],
    }
}

export type Conference = Pick<conferences, "id" | "date" | "title"> & {
    roles?: string[]
}
export interface GetMyConferences {
    oldConferences: Conference[]
    upcomingConferences: Conference[]
}
