"use server"

import z from "zod"
import createAction from "../createActions"
import { getProfiles } from "../profiles/get.profiles"
import { DB } from "../../db/db"
import { Role } from "./get.my.conferences"

const { object, coerce } = z

const schema = object({
    id: coerce.number().positive(),
})

export default createAction(schema, async ({ id }) => {
    const { data: profiles } = await getProfiles({ conference_id: id })
    if (!profiles) return null

    const byRoles = profiles.reduce(
        (acc, profile) => {
            const { profile_roles } = profile
            profile_roles.forEach(({ roles }) => {
                const role = roles.role as Role
                if (!acc[role]) acc[role] = 0
                acc[role]++
            })
            return acc
        },
        {} as Record<Role, number>,
    )

    const presentations = await getConferencePresentations({ id })

    return {
        byRoles,
        presentations,
    }
})

export const getConferencePresentations = async ({ id }: { id: number }) =>
    DB.presentations.findMany({
        where: {
            axis: {
                conference_id: id,
            },
        },
    })
