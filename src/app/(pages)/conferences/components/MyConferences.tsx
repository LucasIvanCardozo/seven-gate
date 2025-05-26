import { Section } from "@/app/components/Section"
import { getMyConferences } from "@/app/lib/actions/conferences/get.my.conferences"
import { ConferenceList } from "./ConferenceList"

export const MyConferences = async () => {
    const { data } = await getMyConferences()

    if (!data) return null

    const { upcoming, old } = data

    return (
        <Section title="Mis congresos">
            <ConferenceList title="Próximos" conferences={upcoming} />
            <hr />
            <ConferenceList title="Pasados" conferences={old} />
        </Section>
    )
}
