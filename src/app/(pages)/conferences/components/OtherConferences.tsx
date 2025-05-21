import { Section } from "@/app/components/Section"
import { ConferenceList } from "./ConferenceList"
import { Conference } from "@/app/lib/conferences/get.my.conferences"
import { DayJs } from "@/app/utils/DayJs"
import { getOtherConferences } from "@/app/lib/conferences/get.other.conferences"

export const OtherConferences = async () => {
    
    const { upcomingConferences, oldConferences } = await getOtherConferences()

    return (
        <Section title="Otros congresos" className="hola">
            <ConferenceList title="Próximos" conferences={upcomingConferences} />
            <hr />
            <ConferenceList title="Pasados" conferences={oldConferences} />
        </Section>
    )
}
