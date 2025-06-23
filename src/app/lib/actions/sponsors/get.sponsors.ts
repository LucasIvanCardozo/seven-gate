import { z } from "zod"
import createAction from "../createActions"
import { DB } from "../../db/db"

const { object } = z
const schema = object({
    id: z.number().positive(),
})

export const getSponsors = createAction(schema, async ({ id }) =>
    DB.sponsors.findMany({
        where: {
            conference_id: id,
        },
    }),
)
