"use client"

import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { deleteEvaluator } from "@/app/lib/actions/profiles/delete.evaluator"

export const EvaluatorDeleteForm = (props: {
    evaluator_id: number
    axis_id: number
}) => {
    const { showToast } = useUI()

    return (
        <form
            action={async () => {
                const { error } = await deleteEvaluator(props)

                if (error) showToast.error(error)
                else showToast.success("Evaluador eliminado correctamente")
            }}
        >
            <SubmitButton className="red">SI</SubmitButton>
        </form>
    )
}
