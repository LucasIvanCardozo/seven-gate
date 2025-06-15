import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { DayJs } from "@/app/utils/DayJs"
import { AddPresentationForm } from "./AddPresentationForm"
import { getConference } from "@/app/lib/actions/conferences/get.conference"
import { AxisDTO } from "@/app/lib/actions/axis/get.by.conference"
import { getProfile } from "@/app/lib/actions/profiles/get.profile"
import { getAxis } from "@/app/lib/actions/axis/get.axis"

export const AddPresentation = async (props: { id: AxisDTO["id"] }) => {
    const { data: axis } = await getAxis(props)
    if (!axis) return null

    const { conference_id } = axis
    const { data: profile } = await getProfile({ conference_id })
    if (!profile) return null

    const { roles, conferences } = profile
    if (!conferences) return null

    const { presentation_limit_date } = conferences

    if (!roles.includes("ponente")) return null

    const now = DayJs()
    if (now.isAfter(DayJs(presentation_limit_date))) return null

    return (
        <Modal opener={<button className="blue">+</button>}>
            <Section title="Agregar ponencia">
                <AddPresentationForm axis_id={props.id} />
            </Section>
        </Modal>
    )
}
