import { DB } from "../../db/db"
import createAction from "../createActions"
import { getServerUser } from "../users"
import { Conference } from "./get.my.conferences"

export const getOtherConferencesUpcoming = createAction(null, async () => {
    const { user } = await getServerUser()

    const conferences = (await DB.conferences.findMany({
        where: {
            NOT: {
                profile: {
                    some: {
                        user_id: user ? +user.id : undefined,
                    },
                },
            },
            date: {
                gt: new Date(),
            },
        },
    })) as Conference[]
    return conferences
})
