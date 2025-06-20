"use server"
import { getMyConferencesOld } from "@/app/lib/actions/conferences/get.my.conference.old"
import { ConferenceList } from "../ConferenceList"

export const MyConferenceListOld = async () => {
    const { data } = await getMyConferencesOld()

    return <ConferenceList title="Pasados" conferences={data} />
}
