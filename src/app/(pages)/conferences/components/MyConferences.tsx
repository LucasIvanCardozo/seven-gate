import { Section } from "@/app/components/Section"
import { getMyConferences } from "@/app/lib/actions/conferences/get.my.conferences"
import { ConferenceList } from "./ConferenceList"

export const MyConferences = async () => {
    const response = await getMyConferences()

    if (!response.success)
        return null

    const { upcomingConferences, oldConferences } = response.data

    return (
        <Section title="Mis congresos">
            <ConferenceList
                title="Próximos"
                conferences={upcomingConferences}
            />
            <hr />
            <ConferenceList title="Pasados" conferences={oldConferences} />
        </Section>
    )
}
