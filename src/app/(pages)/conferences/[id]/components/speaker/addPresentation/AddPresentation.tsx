"use server"
import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { DayJs } from "@/app/utils/DayJs"
import { AddPresentationForm } from "./AddPresentationForm"
import { AxisDTO } from "@/app/lib/actions/axis/get.axis.by.conference"
import { getProfile } from "@/app/lib/actions/profiles/get.profile"
import { getAxis } from "@/app/lib/actions/axis/get.axis"
import { canUploadPresentation } from "@/app/lib/actions/presentations/can.upload.presentation"

export const AddPresentation = async ({ id }: Pick<AxisDTO, "id">) => {
    const { data: axis } = await getAxis({ id })
    if (!axis) return null

    const { conference_id } = axis
    const { data: canUpload } = await canUploadPresentation({ conference_id })
    const { data: profile } = await getProfile({ conference_id })
    if (!profile) return null

    const { roles, conferences } = profile
    if (!conferences) return null

    const { presentation_limit_date } = conferences

    if (!roles.includes("ponente")) return null

    const now = DayJs()
    if (now.isAfter(DayJs(presentation_limit_date))) return null

    return (
        <Modal
            opener={
                <button
                    className="blue"
                    title={
                        canUpload
                            ? "Subir ponencia"
                            : "Ya no puedes subir ponencias"
                    }
                    disabled={!canUpload}
                >
                    +
                </button>
            }
        >
            <Section title="Agregar ponencia">
                <AddPresentationForm id={id} />
            </Section>
        </Modal>
    )
}
