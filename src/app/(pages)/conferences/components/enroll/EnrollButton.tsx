import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { DayJs } from "@/app/utils/DayJs"
import { EnrollForm } from "./EnrollForm"
import { getConference } from "@/app/lib/actions/conferences/get.conference"

export const EnrollButton = async ({ id }: Pick<Conference, "id">) => {
    const { data } = await getConference({ id })
    if (!data) return null

    const { date, title, roles } = data

    const now = DayJs()
    if (now.isAfter(DayJs(date))) return null

    if (!!roles?.length) return null

    return (
        <Modal opener={<button className="blue">Inscribirme</button>}>
            <Section title={`Inscribirme en: ${title}`}>
                <EnrollForm id={id} />
            </Section>
        </Modal>
    )
}
