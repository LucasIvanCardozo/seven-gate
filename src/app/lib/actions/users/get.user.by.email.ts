"use server"

import { DB } from "../../db/db"
import { z } from "zod"
import createAction from "../createActions"

const { object, string } = z

const schema = object({
    email: string().email()
})

export const getUserByEmail = createAction(schema, async ({ email }) =>
    DB.users.findFirst({
        where: {
            email,
        },
    }),
)