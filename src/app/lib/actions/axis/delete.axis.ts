"use server"

import z from "zod"
import { DB } from "../../db/db"
import createAction from "../createActions"

const { object, number } = z
const schema = object({
    id: number().positive(),
})

export const deleteAxis = createAction(schema, async ({ id }) =>
    DB.axis.delete({
        where: { id },
    }),
)
