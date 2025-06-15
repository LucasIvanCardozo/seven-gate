"use server"

import z from "zod"
import { DB } from "../../db/db"
import createAction from "../createActions"

const { object, string, coerce } = z
const schema = object({
    title: string().min(1),
    idConference: coerce.number().min(1),
})

export const createAxis = createAction(schema, async ({ title, idConference }) =>
    DB.axis.create({
        data: {
            title,
            conference_id: idConference,
        },
    }),
)
