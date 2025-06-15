import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { getAxis } from "@/app/lib/actions/axis/get.axis"
import { AxisDTO } from "@/app/lib/actions/axis/get.by.conference"
import { getProfile } from "@/app/lib/actions/profiles/get.profile"
import { AxisDeleteForm } from "./AxisDeleteForm"

export const AxisDeleteButton = async (props: Pick<AxisDTO, "id">) => {
    const { data: axis } = await getAxis(props)
    if (!axis) return null

    const { conference_id } = axis
    const { data: profile } = await getProfile({ conference_id })
    if (!profile) return null

    const { roles } = profile
    if (!roles.includes("admin")) return null

    return (
        <Modal opener={<button className="red">x</button>}>
            <Section title="¿Está seguro de eliminar el eje?">
                <AxisDeleteForm {...props} />
            </Section>
        </Modal>
    )
}
