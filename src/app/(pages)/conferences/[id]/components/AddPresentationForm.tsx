"use client"

import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { AxisDTO } from "@/app/lib/actions/axis/get.by.conference"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { createPresentation } from "@/app/lib/actions/presentations/create.presentation"

export const AddPresentationForm = (props: { axis_id: AxisDTO["id"] }) => {
    const { showToast } = useUI()

    return (
        <form
            action={async (formData) => {
                const file = formData.get("file") as File

                const { error } = await createPresentation({
                    ...props,
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
