"use client"

import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { createCircular } from "@/app/lib/actions/circulars/create.circular"
import { formToData } from "@/app/utils/formToData"

export const CircularForm = ({ id }: { id: number }) => {
    const { showToast } = useUI()

    return (
        <form action={async (formData) => {
            const data = formToData(formData)

            const { error } = await createCircular({
                ...data,
                conference_id: id
            })

            if (error)
                showToast.error(error)
            else 
                showToast.success("Circular creada correctamente")

        }}>
            <label>
                Título
                <input type="text" name="title" />
            </label>
            <label>
                Información
                <textarea name="info" />
            </label>
            <SubmitButton className="blue">Agregar</SubmitButton>
        </form>
    )
}
