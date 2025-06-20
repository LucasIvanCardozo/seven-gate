"use client"

import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { AxisDTO } from "@/app/lib/actions/axis/get.axis.by.conference"
import { createPresentation } from "@/app/lib/actions/presentations/create.presentation"

export const AddPresentationForm = ({ id }: Pick<AxisDTO, "id">) => {
    const { showToast } = useUI()

    return (
        <form
            action={async (formData) => {
                const title = formData.get("title") as string
                const file = formData.get("file") as File

                const { error } = await createPresentation({
                    axis_id: id,
                    file,
                    title,
                })

                if (error) showToast.error(error)
                else showToast.success("Ponencia subida correctamente")
            }}
        >
            <label>
                Título:
                <input required type="text" name="title" />
            </label>
            <input required type="file" name="file" />
            <SubmitButton className="blue">Subir</SubmitButton>
        </form>
    )
}
