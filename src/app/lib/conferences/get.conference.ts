import { redirect } from "next/navigation"
import { DB } from "../db/db"
import { getServerUser } from "../users"
import { Conference, Role } from "./get.my.conferences"

export const getConference = async (
    id: number | string,
): Promise<Conference> => {
    try {
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
    } catch (error) {
        redirect("/conferences")
    }
}

export const getBaseConference = (id: number | string) =>
    DB.conferences.findFirstOrThrow({
        where: { id: +id },
    })
