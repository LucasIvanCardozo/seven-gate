"use client"

import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { deleteEvaluator } from "@/app/lib/actions/profiles/delete.evaluator"
import { startTransition } from "react"
import { useRouter } from "next/navigation"

export const EvaluatorDeleteForm = (props: {
    evaluator_id: number
    axis_id: number
}) => {
    const { showToast } = useUI()
    const router = useRouter()

    return (
        <form
            action={async () => {
                const { error } = await deleteEvaluator(props)

                if (error) showToast.error(error)
                else {
                    showToast.success("Evaluador eliminado correctamente")
                    startTransition(router.refresh)
                }
            }}
        >
            <SubmitButton className="red">SI</SubmitButton>
        </form>
    )
}
