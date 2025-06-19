"use server"

import z from "zod"
import createAction from "../createActions"
import { DB } from "../../db/db"

const { object, string, coerce } = z

const schema = object({
    conference_id: coerce.number().positive(),
    title: string().min(1),
    info: string().min(1),
})

export const createCircular = createAction(schema, async (data) =>
    DB.circular.create({
        data,
    }),
)
