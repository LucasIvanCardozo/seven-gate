import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { SubmitButton } from "@/app/components/SubmitButton"
import { ComunicationForm } from "./ComunicationForm"

export const ComunicationAdministrationButton = (props: { id: number }) => {
    return (
        <Modal opener={<button className="blue">Enviar mensaje</button>}>
            <Section title="Enviar mensaje">
                <ComunicationForm {...props} />
            </Section>
        </Modal>
    )
}
