"use server"

import { z } from "zod"
import { DB } from "../../db/db"
import createAction from "../createActions"

const { object, coerce } = z
const schema = object({
    id: coerce.number().positive(),
})

export const markAsReSent = createAction(schema, async ({ id }) =>
    DB.presentations.update({
        where: { id },
        data: { state: "re_sent" },
    }),
)
