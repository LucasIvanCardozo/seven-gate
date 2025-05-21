import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { Conference } from "@/app/lib/conferences/get.my.conferences"
import { DayJs } from "@/app/utils/DayJs"
import { EnrollForm } from "./EnrollForm"

export const EnrollButton = async ({
    id,
    title,
    date,
    roles,
}: Pick<Conference, "id" | "title" | "date" | "roles">) => {
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
