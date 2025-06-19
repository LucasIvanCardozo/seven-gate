"use server"

import z from "zod"
import { DB } from "../../db/db"
import createAction from "../createActions"

const { object, string, coerce } = z

const schema = object({
    axis_id: coerce.number().positive(),
    email: string().email(),
})

export const addEvaluatorToAxis = createAction(
    schema,
    async ({ email, axis_id }) => {
        const profile = await DB.profile.findFirst({
            where: {
                users: {
                    email,
                },
            },
        })
        if (!profile) throw new Error("No se pudo encontrar el usuario")

        return DB.evaluator_axis_assignments.create({
            data: {
                axis_id,
                profile_id: profile.id,
            },
        })
    },
)
