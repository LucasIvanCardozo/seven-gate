"use server"
import { z } from "zod"
import createAction from "../createActions"
import { DB } from "../../db/db"

const { object, number } = z
const schema = object({
    id: number().positive(),
})

export const getEvaluatorsByAxis = createAction(schema, async ({ id }) =>
    DB.profile.findMany({
        where: {
            evaluator_axis_assignments: {
                some: {
                    axis_id: id,
                },
            },
        },
        include: {
            users: {
                select: { id: true, email: true },
            },
        },
    }),
)
