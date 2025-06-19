"use server"

import { DB } from "../../db/db"
import { z } from "zod"
import createAction from "../createActions"
import { circular } from "@prisma/client"

const { object, coerce } = z
const schema = object({
    id: coerce.number().positive(),
})

export const getCiruclarsByConference = createAction(schema, async ({ id }) =>
    DB.circular.findMany({
        where: {
            conference_id: id,
        },
    }),
)

export type CircularDTO = circular