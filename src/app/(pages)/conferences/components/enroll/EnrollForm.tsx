"use client"

import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { enrollToConference } from "@/app/lib/actions/conferences/enroll.to.conference"
import { Role } from "@/app/lib/actions/conferences/get.my.conferences"
import { capitalize } from "@/app/utils/capitalize"
import { formToData } from "@/app/utils/formToData"

export const EnrollForm = ({ id, roles }: { id: number; roles: Role[] }) => {
    const { showToast } = useUI()

    return (
        <form
            action={async (formData) => {
                const response = await enrollToConference({
                    id,
                    ...formToData(formData),
                })

                if (!response.success) showToast.error(response.error)
                else {
                    setTimeout(() => window.location.reload(), 1000)
                    showToast.success(`Inscripto en: ${response.data.title}`)
                }
            }}
        >
            {roles.map((role) => (
                <label key={role} className="inline right">
                    {capitalize(role)}
                    <input required type="radio" name="role" value={role} />
                </label>
            ))}

            <SubmitButton className="blue">Inscribirme</SubmitButton>
        </form>
    )
}
