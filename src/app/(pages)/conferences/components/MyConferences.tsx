import { Section } from "@/app/components/Section"
import { getMyConferences } from "@/app/lib/conferences/get.my.conferences"
import { ConferenceList } from "./ConferenceList"

export const MyConferences = async () => {
    const { upcomingConferences, oldConferences } = await getMyConferences()

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
