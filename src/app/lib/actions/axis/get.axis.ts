"use server"

import z from "zod"
import { DB } from "../../db/db"
import createAction from "../createActions"

const { object, number } = z
const schema = object({
    id: number().positive(),
})

export const getAxis = createAction(schema, async ({ id }) => {
    const axis = await DB.axis.findFirst({
        where: { id },
        include: {
            profile: {
                // Organizador
                include: {
                    users: { select: { id: true, name: true, lastname: true } },
                },
            },
        },
    })
    if (!axis) return null

    const { profile: organizer, ...rest } = axis

    return {
        ...rest,
        organizer,
    }
})
