"use server"

import { z } from "zod"
import createAction from "../createActions"
import { DB } from "../../db/db"
import { getRoles } from "./get.roles"

const { object, string, coerce, array } = z

const schema = object({
    email: string().email(),
    role_ids: array(coerce.number()).min(1),
})

export const deleteRoleFromProfile = createAction(
    schema,
    async ({ email, role_ids }) => {
        const profile = await DB.profile.findFirst({
            where: {
                users: {
                    email,
                },
            },
            include: {
                profile_roles: true,
            },
        })

        if (!profile) throw new Error("No se pudo encontrar el perfil")

        const profileId = profile.id

        const { count } = await DB.profile_roles.deleteMany({
            where: {
                profile_id: profileId,
                roles_id: {
                    in: role_ids,
                },
            },
        })

        const needToRemoveProfile = count === profile.profile_roles.length
        let profileDeleted = false

        if (needToRemoveProfile) {
            // delete profile if all roles where removed
            try {
                await DB.profile.delete({
                    where: {
                        id: profileId,
                    },
                })
                profileDeleted = true
            } catch (error) {
                console.error(`Could not removed profile: ${profileId}`)
            }
        }

        return {
            profileId,
            profileDeleted,
        }
    },
)
