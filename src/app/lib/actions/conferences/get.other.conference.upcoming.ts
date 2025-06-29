import { DB } from "../../db/db"
import createAction from "../createActions"
import { getServerUser } from "../users"
import { Conference } from "./get.my.conferences"

export const getOtherConferencesUpcoming = createAction(null, async () => {
    const { user } = await getServerUser()

    const conferences = (await DB.conferences.findMany({
        where: {
            ...(user
                ? {
                      NOT: {
                          profile: {
                              some: {
                                  user_id: +user.id,
                              },
                          },
                      },
                  }
                : {}),
            date: {
                gt: new Date(),
            },
        },
    })) as Conference[]
    return conferences
})
