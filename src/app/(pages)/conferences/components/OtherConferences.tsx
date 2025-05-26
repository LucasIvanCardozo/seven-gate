import { Section } from "@/app/components/Section"
import { ConferenceList } from "./ConferenceList"
import { getOtherConferences } from "@/app/lib/actions/conferences/get.other.conferences"

export const OtherConferences = async () => {
    const { data } = await getOtherConferences()

    if (!data) 
        return null

    const { upcoming, old } = data

    return (
        <Section title="Otros congresos">
            <ConferenceList
                title="Próximos"
                conferences={upcoming}
            />
            <hr />
            <ConferenceList title="Pasados" conferences={old} />
        </Section>
    )
}
