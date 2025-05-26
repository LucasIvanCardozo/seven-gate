"use server"
import { z } from "zod"
import createAction from "../createActions"
import { DB } from "../../db/db"
import { presentations } from "@prisma/client"

const { object, number } = z
const schema = object({
    profileId: number().positive(),
})

export const getPresentationsForEvaluator = createAction(
    schema,
    async ({ profileId }) =>
        DB.presentations.findMany({
            where: {
                evaluator_profile_id: profileId,
                state: "pending",
            },
            include: {
                axis: {
                    select: {
                        title: true,
                    },
                },
            },
            orderBy: { axis: { title: "asc" } },
        }),
)

export type State = presentations["state"]