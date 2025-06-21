// MOCKED

import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { VotePresentationList } from "./VotePresentationList"
import { getAxis } from "@/app/lib/actions/axis/get.axis"
import { AxisDTO } from "@/app/lib/actions/axis/get.axis.by.conference"
import { getApprovedPresentationsByAxis } from "@/app/lib/actions/presentations/get.approved.presentation.by.axis"

export const VotePresentationButton = async ({ id }: Pick<AxisDTO, "id">) => {
    const { data } = await getAxis({ id })
    if (!data) return null

    const { is_voting, conference_id } = data
    if (!is_voting) return null

    const { data: presentations } = await getApprovedPresentationsByAxis({
        axis_id: id,
    })
    if (!presentations) return null

    return (
        <Modal opener={<button className="blue">Votar</button>}>
            <Section title="Votar">
                <VotePresentationList
                    conference_id={conference_id}
                    presentations={presentations}
                />
            </Section>
        </Modal>
    )
}
