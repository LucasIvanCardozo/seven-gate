"use server"

import { DB } from "../db/db"
import { getServerUser } from "../users"

export const enrollToConference = async ({
    id,
    data,
}: {
    id: number
    data: FormData
}) => {
    const { user } = await getServerUser()
    if (!user) throw new Error("Necesitas estar logueado")

    const role = data.get("role") as string | null
    if (!role) throw new Error("Debes seleccionar un rol 🤫​")

    const roleData = await DB.roles.findFirst({
        where: { role },
    })
    if (!roleData) throw new Error(`No se pudo encontrar el rol '${role}'`)
    const roles_id = roleData.id

    const exists = await DB.profile.findFirst({
        where: {
            user_id: +user.id,
            conference_id: id,
        },
        include: {
            profile_roles: {
                select: {
                    roles: true,
                },
            },
            conferences: {
                select: { title: true },
            },
        },
    })

    let profile_id: number | null = null
    let title: string | null = null

    await DB.$transaction(async (DB) => {
        if (exists) {
            title = exists.conferences.title
            profile_id = exists.id

            if (exists.profile_roles.some((item) => item.roles.id === roles_id))
                throw new Error(
                    `Ya estas inscripto como ${role} en el congreso '${title}'`,
                )
        } else {
            const response = await DB.profile.create({
                data: {
                    user_id: +user.id,
                    conference_id: id,
                },
                include: {
                    conferences: {
                        select: { title: true },
                    },
                },
            })

            profile_id = response.id
            title = response.conferences.title
        }

        if (!profile_id) throw new Error("No se pudo crear el perfil")

        await DB.profile_roles.create({
            data: {
                profile_id,
                roles_id,
            },
        })
    })

    return { title }
}
