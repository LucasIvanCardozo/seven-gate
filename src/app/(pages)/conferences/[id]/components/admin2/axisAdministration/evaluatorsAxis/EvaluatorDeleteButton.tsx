"use server"

import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { EvaluatorDeleteForm } from "./EvaluatorDeleteForm"

export const EvaluatorDeleteButton = async (props: {
    axis_id: number
    evaluator_id: number
}) => {
    return (
        <Modal opener={<button className="red">X</button>}>
            <Section title="¿Está seguro de eliminar el evaluador?">
                <EvaluatorDeleteForm {...props} />
            </Section>
        </Modal>
    )
}
