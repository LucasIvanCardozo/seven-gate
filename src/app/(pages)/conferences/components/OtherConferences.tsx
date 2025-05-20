import { Section } from "@/app/components/Section"
import { ConferenceList } from "./ConferenceList"
import { Conference } from "@/app/lib/conferences/get.my.conferences"

export const OtherConferences = () => {
    const conferences: Conference[] = [
        {
            id: 1,
            title: "Congreso 10",
            roles: [],
            date: new Date(),
        },
    ]

    return (
        <Section title="Otros congresos" className="hola">
            <ConferenceList title="Próximos" conferences={conferences} />
            <hr />
            <ConferenceList title="Pasados" conferences={conferences} />
        </Section>
    )
}
