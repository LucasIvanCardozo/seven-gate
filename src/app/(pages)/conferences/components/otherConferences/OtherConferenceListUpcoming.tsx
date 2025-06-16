"use server"
import { getOtherConferencesUpcoming } from "@/app/lib/actions/conferences/get.other.conference.upcoming"
import { ConferenceList } from "../ConferenceList"

export const OtherConferenceListUpcoming = async () => {
    const { data } = await getOtherConferencesUpcoming()
    if (!data) return null

    return <ConferenceList title="Próximos" conferences={data} />
}
