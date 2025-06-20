"use client"

import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { deleteAxis } from "@/app/lib/actions/axis/delete.axis"
import { AxisDTO } from "@/app/lib/actions/axis/get.axis.by.conference"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { useState } from "react"

export const DeleteAxisForm = ({ axis }: { axis: AxisDTO[] }) => {
    const { showToast } = useUI()
    const [sure, setSure] = useState(false)
    const [id, setId] = useState<number | null>(null)

    return (
        <form
            action={async (formData) => {
                if (!id) return

                const { error } = await deleteAxis({
                    id,
                })

                if (error) showToast.error(error)
                else showToast.success(`Eje eliminado correctamente`)
            }}
        >
            <select
                onChange={({ target: { value } }) => {
                    setId(+value)
                    setSure(false)
                }}
            >
                <option>Eliga un eje</option>
                {axis.map(({ id, title }) => (
                    <option key={id} value={id}>
                        {title}
                    </option>
                ))}
            </select>

            <label className="inline right">
                <input
                    type="checkbox"
                    id="checkbox"
                    onChange={({ target: { checked } }) => setSure(checked)}
                    checked={sure}
                />
                ¿Estás seguro/a de eliminar este eje?
            </label>

            <SubmitButton className="red" disabled={!sure || !id}>
                Eliminar
            </SubmitButton>
        </form>
    )
}
