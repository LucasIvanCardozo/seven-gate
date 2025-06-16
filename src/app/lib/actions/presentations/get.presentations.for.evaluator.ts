"use server"
import { z } from "zod"
import createAction from "../createActions"
import { DB } from "../../db/db"
import { presentations } from "@prisma/client"

const { object, number } = z
const schema = object({
    conferenceId: number().positive(),
    profileId: number().positive(),
})

export const getPresentationsForEvaluator = createAction(
    schema,
    async ({ conferenceId, profileId }) =>
        DB.presentations.findMany({
            where: {
                profile_presentations_evaluator_profile_idToprofile: {
                    conference_id: conferenceId,
                    id: profileId
                },
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