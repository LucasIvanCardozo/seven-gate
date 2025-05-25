import z from "zod"
import { DB } from "../../db/db"
import createAction from "../createActions"

const { object, number } = z
const schema = object({
    id: number().positive(),
})

export const getAxisByConference = createAction(schema, ({ id }) =>
    DB.axis.findMany({
        where: { conference_id: id },
        include: {
            profile: {
                include: {
                    users: { select: { id: true, name: true, lastname: true } },
                },
            },
        },
    }),
)
