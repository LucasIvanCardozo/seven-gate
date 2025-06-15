"use client"

import { Modal } from "@/app/components/Modal"
import { SubmitButton } from "@/app/components/SubmitButton"
import { useState } from "react"
import { State } from "@/app/lib/actions/presentations/get.presentations.for.evaluator"
import { Section } from "@/app/components/Section"
import { evaluatePresentation } from "@/app/lib/actions/presentations/evaluate.presentation"
import { useUI } from "@/app/contexts/UIContext"

export const EvaluatorForm = ({ id }: { id: number }) => {
    const { showToast } = useUI()
    const [state, setState] = useState<State | null>(null)

    return (
        <Modal opener={<button className="text dark">Evaluar</button>}>
            <Section title="Evaluar presentación">
                <form
                    action={async (formData) => {
                        const comments = formData.get("comments") || null

                        const { error } = await evaluatePresentation({
                            id,
                            state,
                            comments,
                        })

                        if (error) showToast.error(error)
                        else showToast.success("Evaluación enviada")
                    }}
                >
                    <select
                        required
                        value={state ?? ""}
                        onChange={({ target: { value } }) =>
                            setState(value as State)
                        }
                    >
                        <option hidden disabled value="">
                            Seleccione una opción
                        </option>
                        <option value="approved">Aprobar</option>
                        <option value="approved_with_comments">Rehacer</option>
                        <option value="rejected">Rechazar</option>
                    </select>

                    {state && state != "approved" && (
                        <textarea name="comments" />
                    )}

                    <SubmitButton className="blue">Enviar</SubmitButton>
                </form>
            </Section>
        </Modal>
    )
}
