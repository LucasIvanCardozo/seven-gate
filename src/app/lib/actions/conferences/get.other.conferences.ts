import { DB } from "../../db/db"
import createAction from "../createActions"
import { getServerUser } from "../users"
import { Conference } from "./get.my.conferences"

export const getOtherConferences = createAction(null, async () => {
    const { user } = await getServerUser()

    const conferences = await DB.conferences.findMany({
        where: {
            NOT: {
                profile: {
                    some: {
                        user_id: user ? +user.id : undefined,
                    },
                },
            },
        },
       
    })

    const now = new Date()
    const [old, upcoming] = conferences.reduce(
        (acc, conference) => {
            if (conference.date < now) acc[0].push(conference)
            else acc[1].push(conference)
            return acc
        },
        [[], []] as [Conference[], Conference[]],
    )
    return {
        old,
        upcoming,
    }
})
