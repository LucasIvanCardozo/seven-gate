"use server"
import { Section } from "@/app/components/Section"
import { MyConferenceListOld } from "./myConference/MyConferenceListOld"
import { MyConferenceListUpcoming } from "./myConference/MyConferenceListUpcoming"

export const MyConferences = async () => {
    return (
        <Section title="Mis congresos">
            <MyConferenceListUpcoming />
            <MyConferenceListOld />
        </Section>
    )
}
