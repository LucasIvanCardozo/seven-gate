import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { presentations } from "@prisma/client"
import { EvaluatePresentationForm } from "./EvaluatePresentationForm"

export const EvaluatePresentationButton = ({
    id,
}: Pick<presentations, "id">) => {
    return (
        <Modal opener={<button className="text dark">Evaluar</button>}>
            <Section title="Evaluar presentación">
                <EvaluatePresentationForm id={id} />
            </Section>
        </Modal>
    )
}
