"use server"

import { z } from "zod"
import { DB } from "../../db/db"
import createAction from "../createActions"

const { object, number, string } = z
const schema = object({
    id: number().positive(),
    title: string().min(1),
})

export const updateAxis = createAction(schema, async ({ id, title }) =>
    DB.axis.update({
        where: { id },
        data: { title },
    }),
)
