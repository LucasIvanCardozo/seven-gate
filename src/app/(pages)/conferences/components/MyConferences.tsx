import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { useServerUser } from "@/app/hooks/useServerUser"
import { getMyConferences } from "@/app/lib/conferences/get.my.conferences"
import { ConferenceList } from "./ConferenceList"

export const MyConferences = async () => {
    const { user } = await useServerUser()
    if (!user) return null

    const { upcomingConferences, oldConferences } = await getMyConferences(
        +user.id,
    )

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
