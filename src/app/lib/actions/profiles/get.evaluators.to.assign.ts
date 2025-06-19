"use server"

import { z } from "zod"
import createAction from "../createActions"
import { DB } from "../../db/db"
import { getAxis } from "../axis/get.axis"

const { object, number } = z
const schema = object({
    id: number().positive(),
})

export const getEvaluatorsToAssign = createAction(schema, async ({ id }) => {
    const { data: axis } = await getAxis({ id })

    const profiles = await DB.profile.findMany({
        where: {
            evaluator_axis_assignments: {
                every: {
                    axis: {
                        conference_id: axis?.conference_id,
                        NOT: {
                            id,
                        },
                    },
                },
            },
            profile_roles: {
                some: {
                    roles: {
                        role: "evaluador",
                    },
                },
            },
        },
        include: {
            users: {
                select: {
                    id: true,
                    name: true,
                    lastname: true,
                    email: true,
                },
            },
        },
    })

    return profiles.map(({ id, users }) => ({
        ...users,
        id,
    }))
})
