import { Section } from "@/app/components/Section"
import { ConferenceList } from "./ConferenceList"
import { getOtherConferences } from "@/app/lib/actions/conferences/get.other.conferences"

export const OtherConferences = async () => {
    const response = await getOtherConferences()

    if (!response.success) return null

    const { upcomingConferences, oldConferences } = response.data

    return (
        <Section title="Otros congresos">
            <ConferenceList
                title="Próximos"
                conferences={upcomingConferences}
            />
            <hr />
            <ConferenceList title="Pasados" conferences={oldConferences} />
        </Section>
    )
}
