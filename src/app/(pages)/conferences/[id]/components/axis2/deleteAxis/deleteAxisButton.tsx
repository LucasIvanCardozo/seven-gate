"use server"
import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { getAxis } from "@/app/lib/actions/axis/get.axis"
import { AxisDTO } from "@/app/lib/actions/axis/get.axis.by.conference"
import { getProfile } from "@/app/lib/actions/profiles/get.profile"
import { DeleteAxisForm } from "./deleteAxisForm"

export const DeleteAxisButton = async ({ id }: Pick<AxisDTO, "id">) => {
    const { data: axis } = await getAxis({ id })
    if (!axis) return null

    const { conference_id } = axis
    const { data: profile } = await getProfile({ conference_id })
    if (!profile) return null

    const { roles } = profile
    if (!roles.includes("admin")) return null

    return (
        <Modal opener={<button className="red">x</button>}>
            <Section title="¿Está seguro de eliminar el eje?">
                <DeleteAxisForm id={id} />
            </Section>
        </Modal>
    )
}
