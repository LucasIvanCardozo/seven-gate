"use client"

import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { addEvaluatorToAxis } from "@/app/lib/actions/axis/add.evaluator.to.axis"
import { startTransition } from "react"
import { useRouter } from "next/navigation"
export const AxisEvaluatorForm = ({
    id,
    evaluatorsToAssign,
}: {
    id: number
    evaluatorsToAssign: { email: string; name: string; lastname: string }[]
}) => {
    const { showToast } = useUI()
    const router = useRouter()

    return (
        <form
            action={async (formData) => {
                const email = formData.get("email")

                const { error } = await addEvaluatorToAxis({
                    email,
                    axis_id: id,
                })

                if (error) showToast.error(error)
                else {
                    showToast.success("Evaluador agregado correctamente")
                    startTransition(router.refresh)
                }
            }}
        >
            <label>
                Evaluador:
                <input
                    type="text"
                    name="email"
                    list="user-email"
                    autoComplete="off"
                />
            </label>

            <datalist id="user-email">
                {evaluatorsToAssign.map((user) => (
                    <option key={user.email} value={user.email}>
                        {user.name} {user.lastname}
                    </option>
                ))}
            </datalist>
            <SubmitButton className="blue">Agregar</SubmitButton>
        </form>
    )
}
