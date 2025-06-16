"use server"
import { ConferenceList } from "../ConferenceList"
import { getOtherConferencesOld } from "@/app/lib/actions/conferences/get.other.conference.old"

export const OtherConferenceListOld = async () => {
    const { data } = await getOtherConferencesOld()
    if (!data) return null

    return <ConferenceList title="Pasados" conferences={data} />
}
