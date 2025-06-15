import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { AxisEditForm } from "./AxisEditForm"
import { AxisDTO } from "@/app/lib/actions/axis/get.by.conference"
import { getConference } from "@/app/lib/actions/conferences/get.conference"
import { getAxis } from "@/app/lib/actions/axis/get.axis"
import { getProfile } from "@/app/lib/actions/profiles/get.profile"

export const AxisEditButton = async (props: { id: AxisDTO["id"] }) => {
    const { data: axis } = await getAxis(props)
    if (!axis) return null

    const { conference_id } = axis
    const { data: profile } = await getProfile({ conference_id })
    if (!profile) return null

    const { roles } = profile
    if (!roles.includes("admin")) return null

    const { title } = axis

    return (
        <Modal opener={<button className="blue">Editar</button>}>
            <Section title={`Editar eje "${title}"`}>
                <AxisEditForm {...axis} />
            </Section>
        </Modal>
    )
}
