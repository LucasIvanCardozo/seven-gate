"use client"

import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { enrollToConference } from "@/app/lib/conferences/enroll.to.conference"

export const EnrollForm = ({ id }: { id: number }) => {
    const { showToast } = useUI()

    return (
        <form
            action={async (data) => {
                enrollToConference({ id, data })
                    .then(({ title }) => {
                        showToast.success(`Inscrito en: ${title}`)
                        window.location.reload()
                    })
                    .catch((error) => showToast.error(error.message))
            }}
        >
            <label className="inline right">
                Oyente
                <input required type="radio" name="role" value="oyente" />
            </label>
            <label className="inline right">
                Ponente
                <input required type="radio" name="role" value="ponente" />
            </label>
            <SubmitButton title="Inscribirme" />
        </form>
    )
}
