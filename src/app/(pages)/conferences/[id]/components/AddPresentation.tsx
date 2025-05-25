import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { DayJs } from "@/app/utils/DayJs"
import { AddPresentationForm } from "./AddPresentationForm"

export const AddPresentation = async (
    props: Pick<Conference, "id" | "presentation_limit_date" | "roles"> & {
        axisId: number
    },
) => {
    const { presentation_limit_date, roles } = props

    if (!roles?.includes("ponente")) return null

    const now = DayJs()
    if (now.isAfter(DayJs(presentation_limit_date))) return null

    return (
        <Modal opener={<button className="blue">+</button>}>
            <Section title="Agregar ponencia">
                <AddPresentationForm {...props} />
            </Section>
        </Modal>
    )
}
