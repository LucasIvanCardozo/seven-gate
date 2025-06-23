"use client"

import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { enrollToConference } from "@/app/lib/actions/conferences/enroll.to.conference"
import { Role } from "@/app/lib/actions/conferences/get.my.conferences"
import { capitalize } from "@/app/utils/capitalize"
import { formToData } from "@/app/utils/formToData"
import { startTransition } from "react"
import { useRouter } from "next/navigation"

export const EnrollForm = ({ id, roles }: { id: number; roles: Role[] }) => {
    const { showToast } = useUI()

    const router = useRouter()
    return (
        <form
            action={async (formData) => {
                const response = await enrollToConference({
                    id,
                    ...formToData(formData),
                })

                if (!response.success) showToast.error(response.error)
                else {
                    showToast.success(`Inscripto en: ${response.data.title}`)
                    startTransition(router.refresh)
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
