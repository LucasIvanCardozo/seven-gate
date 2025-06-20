"use client"

import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { evaluatePresentation } from "@/app/lib/actions/presentations/evaluate.presentation"
import { presentations, State } from "@prisma/client"
import { useState } from "react"

export const EvaluatePresentationForm = ({ id }: Pick<presentations, "id">) => {
    const { showToast } = useUI()
    const [state, setState] = useState<State | null>(null)
    return (
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
                onChange={({ target: { value } }) => setState(value as State)}
            >
                <option hidden disabled value="">
                    Seleccione una opción
                </option>
                <option value="approved">Aprobar</option>
                <option value="approved_with_comments">Rehacer</option>
                <option value="rejected">Rechazar</option>
            </select>

            {state && state != "approved" && <textarea name="comments" />}

            <SubmitButton className="blue">Enviar</SubmitButton>
        </form>
    )
}
