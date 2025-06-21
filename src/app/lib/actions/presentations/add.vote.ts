"use server"
import { z } from "zod"
import createAction from "../createActions"
import { DB } from "../../db/db"
import { getProfile } from "../profiles/get.profile"

const { object, number } = z

const schema = object({
    presentation_id: number().positive(),
    conference_id: number().positive(),
})

export const addVote = createAction(
    schema,
    async ({ presentation_id, conference_id }) => {
        const { data: profile } = await getProfile({ conference_id })
        if (!profile) throw new Error("No se pudo encontrar el perfil")

        try {
            return await DB.votes.create({
                data: {
                    presentation_id: presentation_id,
                    giver_profile_id: profile.id,
                },
            })
        } catch (error) {
            throw new Error("Ya votaste")
        }
    },
)
