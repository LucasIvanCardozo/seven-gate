"use server"

import { z } from "zod"
import createAction from "../createActions"
import { getServerUser } from "../users"
import { DB } from "../../db/db"

const { object, number } = z
const schema = object({
    axis_id: number().positive(),
})

export const getApprovedPresentationsByAxis = createAction(
    schema,
    async ({ axis_id }) => {
        return await DB.presentations.findMany({
            where: {
                ax,
            },
            include: {
                axis: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        })
    },
)
