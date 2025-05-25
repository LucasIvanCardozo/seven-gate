"use client"

import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { createPresentation } from "@/app/lib/actions/presentations/create.presentation"

export const AddPresentationForm = ({
    id,
    axisId,
}: {
    id: number
    axisId: number
}) => {
    const { showToast } = useUI()

    return (
        <form
            action={async (formData) => {
                const file = formData.get("file") as File

                const { error } = await createPresentation({
                    conference_id: id,
                    axis_id: axisId,
                    file,
                })

                if (error) showToast.error(error)
                else showToast.success("Ponencia subida correctamente")
            }}
        >
            <input type="file" name="file" />
            <SubmitButton className="blue">Subir</SubmitButton>
        </form>
    )
}
