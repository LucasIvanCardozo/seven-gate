"use client"
import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { createAxis } from "@/app/lib/actions/axis/create.axis"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { startTransition } from "react"
import { useRouter } from "next/navigation"

export const NewAxisForm = ({ id }: Pick<Conference, "id">) => {
    const { showToast } = useUI()
    const router = useRouter()

    return (
        <form
            action={async (formData) => {
                const title = formData.get("title") as string

                const { error } = await createAxis({
                    title,
                    idConference: id,
                })

                if (error) showToast.error(error)
                else {
                    showToast.success(`Eje "${title}" creado correctamente`)
                    startTransition(router.refresh)
                }
            }}
        >
            <label>
                Eje:
                <input type="text" name="title" placeholder="Eje" />
            </label>
            <SubmitButton className="blue">Agregar</SubmitButton>
        </form>
    )
}
