import { Section } from "@/app/components/Section"
import { ConferenceList } from "./ConferenceList"
import { Conference } from "@/app/lib/conferences/get.my.conferences"
import { DayJs } from "@/app/utils/DayJs"

export const OtherConferences = () => {
    const conferences: Conference[] = [
        {
            id: 1,
            title: "Congreso 10",
            roles: [],
            date: DayJs().add(1, "day").toDate(),
        },
    ]

    const conferences2: Conference[] = [
        {
            id: 1,
            title: "Congreso 11",
            roles: [],
            date: DayJs().subtract(1, "day").toDate(),
        },
    ]

    return (
        <Section title="Otros congresos" className="hola">
            <ConferenceList title="Próximos" conferences={conferences} />
            <hr />
            <ConferenceList title="Pasados" conferences={conferences2} />
        </Section>
    )
}
