"use server"

import { z } from "zod"
import createAction from "../createActions"
import { getServerUser } from "../users"
import { DB } from "../../db/db"

const { object, number } = z
const schema = object({
    id: number().positive(),
})

export const getPresentations = createAction(schema, async ({ id }) => {
    const { user } = await getServerUser()
    if (!user) return []

    const profile = await DB.profile.findFirst({
        where: {
            user_id: +user.id,
            conference_id: id,
        },
    })
    if (!profile) return []

    return await DB.presentations.findMany({
        where: {
            presenter_profile_id: profile.id,
        },
        include: {
            axis: {
                select: {
                    id: true,
                    title: true,
                }
            }
        }
    })
})
