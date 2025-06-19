"use server"

import z from "zod"
import { DB } from "../../db/db"
import createAction from "../createActions"

const { object, number } = z
const schema = object({
    id: number().positive(),
})

const profile = {
    include: {
        users: {
            select: { id: true, name: true, lastname: true, email: true },
        },
    },
}

export const getAxis = createAction(schema, async ({ id }) => {
    const axis = await DB.axis.findFirst({
        where: { id },
        include: {
            profile, // Organizador
            evaluator_axis_assignments: {
                include: {
                    profile, // Perfil de Evaluador
                },
            },
        },
    })
    if (!axis) return null

    const { profile: organizer, evaluator_axis_assignments, ...rest } = axis

    const evaluators = evaluator_axis_assignments.map(({ profile }) => ({
        ...profile.users,
        id: profile.id,
    }))

    return {
        ...rest,
        organizer,
        evaluators,
    }
})

export type GetAxis = NonNullable<Awaited<ReturnType<typeof getAxis>>["data"]>
export type Evaluator = GetAxis["evaluators"][number]
