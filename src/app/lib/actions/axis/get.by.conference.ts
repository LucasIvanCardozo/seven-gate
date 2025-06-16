"use server"
import z from "zod"
import { DB } from "../../db/db"
import createAction from "../createActions"
import { getConference } from "../conferences/get.conference"

const { object, number } = z
const schema = object({
    id: number().positive(),
})

export const getAxisByConference = createAction(schema, async ({ id }) => {
    const rawAxis = await DB.axis.findMany({
        where: { conference_id: id },
        include: {
            profile: {
                include: {
                    users: { select: { id: true, name: true, lastname: true } },
                },
            },
            evaluator_axis_assignments: true,
        },
    })

    // separate between has evaluators for that axis or not
    return rawAxis.reduce(
        (acc, axis) => {
            if (axis.evaluator_axis_assignments.length) {
                acc.hasEvaluators.push(axis)
            } else {
                acc.noEvaluators.push(axis)
            }
            return acc
        },
        {
            hasEvaluators: [] as typeof rawAxis,
            noEvaluators: [] as typeof rawAxis,
        },
    )
})

export type AxisDTO = NonNullable<
    Awaited<ReturnType<typeof getAxisByConference>>["data"]
>["hasEvaluators"][number]
