"use server"

import { z } from "zod"
import createAction from "../createActions"
import { getPresentations } from "./get.presentations"

const { object } = z
const schema = object({
    conference_id: z.number().positive(),
})

export const canUploadPresentation = createAction(
    schema,
    async ({ conference_id }) => {
        const { data: presentations } = await getPresentations({
            id: conference_id,
        })

        if (!presentations) return true

        return (
            presentations.every(({ state }) => state === "rejected") ||
            presentations.some(
                ({ state }) => state === "approved_with_comments",
            )
        )
    },
)
