import { z } from "zod"
import createAction from "../createActions"
import { DB } from "../../db/db"

const { object, number } = z

const schema = object({
    id: number().positive(),
})

export const getPresentationsVotes = createAction(schema, async ({ id }) => {
    const votes = await DB.votes.findMany({
        where: {
            presentations: {
                state: "approved",
                axis_id: id,
            },
        },
        include: {
            presentations: {
                select: {
                    id: true,
                    title: true,
                },
            },
        },
    })

    const votesCount = votes.reduce(
        (acc, vote) => {
            if (!acc[vote.presentations.id]) acc[vote.presentations.id] = 0
            acc[vote.presentations.id]++
            return acc
        },
        {} as Record<number, number>,
    )

    return Object.entries(votesCount).map(([id, count]) => {
        return {
            count,
            title: votes.find((item) => item.presentations.id === +id)
                ?.presentations.title,
        }
    })
})
