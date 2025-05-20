"use client"

import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"

export const EnrollForm = ({
    action,
}: {
    action: (data: FormData) => void
}) => {
    const { showToast } = useUI()

    return (
        <form action={action}>
            <label className="inline right">
                Oyente
                <input type="radio" name="role" value="listener" />
            </label>
            <label className="inline right">
                Ponente
                <input type="radio" name="role" value="speaker" />
            </label>
            <SubmitButton title="Inscribirme" />
        </form>
    )
}
