import { Section } from "@/app/components/Section"
import { OtherConferenceListOld } from "./otherConferences/OtherConferenceListOld"
import { OtherConferenceListUpcoming } from "./otherConferences/OtherConferenceListUpcoming"

export const OtherConferences = async () => {
    return (
        <Section title="Otros congresos">
            <OtherConferenceListOld />
            <hr />
            <OtherConferenceListUpcoming />
        </Section>
    )
}
