"use server"

import { useServerUser } from "@/app/hooks/useServerUser"
import { DB } from "../db/db"

export const enrollToConference = async ({
    id,
}: {
    id: number
    data: FormData
}) => {

    const { user } = await useServerUser()
    if (!user) throw new Error("No user found")

    const { id: roles_id } = await DB.roles.findFirstOrThrow({
        where: { role: "speaker" },
    })

    console.log({

        id: +user.id,
        conference_id: id,
        roles_id
    })

    const { id: profile_id } = await DB.profile.create({
        data: {
            user_id: +user.id,
            conference_id: id,
        },
    })

    await DB.profile_roles.create({
        data: {
            profile_id,
            roles_id
        },
    })
}
