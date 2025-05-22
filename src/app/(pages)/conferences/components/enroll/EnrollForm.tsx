"use client"

import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { enrollToConference } from "@/app/lib/conferences/enroll.to.conference"
import { Role } from "@/app/lib/conferences/get.my.conferences"
import { capitalize } from "@/app/utils/capitalize"

export const EnrollForm = ({ id }: { id: number }) => {
    const { showToast } = useUI()

    const validRoles: Role[] = ["oyente", "ponente"]

    return (
        <form
            action={async (data) => {
                enrollToConference({ id, data })
                    .then(({ title }) => {
                        showToast.success(`Inscripto en: ${title}`)
                        setTimeout(() => window.location.reload(), 1000)
                    })
                    .catch((error) => showToast.error(error.message))
            }}
        >
            {validRoles.map((role) => (
                <label key={role} className="inline right">
                    {capitalize(role)}
                    <input required type="radio" name="role" value={role} />
                </label>
            ))}

            <SubmitButton className="blue">Inscribirme</SubmitButton>
        </form>
    )
}
