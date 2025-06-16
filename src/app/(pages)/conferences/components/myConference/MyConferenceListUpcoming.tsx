"use server"
import { getMyConferencesUpcoming } from "@/app/lib/actions/conferences/get.my.conferences.upcoming"
import { ConferenceList } from "../ConferenceList"

export const MyConferenceListUpcoming = async () => {
    const { data } = await getMyConferencesUpcoming()
    if (!data) return null

    return <ConferenceList title="Próximos" conferences={data} />
}
