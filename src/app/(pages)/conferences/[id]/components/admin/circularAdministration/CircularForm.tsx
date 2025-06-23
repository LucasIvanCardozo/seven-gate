"use client"

import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { createCircular } from "@/app/lib/actions/circulars/create.circular"
import { formToData } from "@/app/utils/formToData"
import { useRouter } from "next/navigation"
import { startTransition, useState } from "react"

export const CircularForm = ({ id }: { id: number }) => {
    const [format, setFormat] = useState<string>()
    const { showToast } = useUI()
    const router = useRouter()

    return (
        <form
            action={async (formData) => {
                const data = formToData(formData)

                const { error } = await createCircular({
                    ...data,
                    conference_id: id,
                })

                if (error) {
                    showToast.error(error)
                    setFormat("")
                } else {
                    showToast.success("Circular creada correctamente")
                    setFormat("")
                    startTransition(router.refresh)
                }
            }}
        >
            <label>
                Título
                <input type="text" name="title" />
            </label>
            <select
                required
                onChange={({ target }) => setFormat(target.value)}
                value={format}
            >
                <option value="" hidden>
                    Elegir formato
                </option>
                <option value="text">Texto</option>
                <option value="pdf">PDF</option>
            </select>
            {format === "pdf" && (
                <label>
                    Archivo:
                    <input type="file" accept="application/pdf" name="file" />
                </label>
            )}
            {format === "text" && (
                <label>
                    Información
                    <textarea name="info" />
                </label>
            )}

            <SubmitButton className="blue">Agregar</SubmitButton>
        </form>
    )
}
