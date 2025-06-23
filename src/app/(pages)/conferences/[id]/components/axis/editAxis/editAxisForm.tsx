"use client"
import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { AxisDTO } from "@/app/lib/actions/axis/get.axis.by.conference"
import { updateAxis } from "@/app/lib/actions/axis/update.axis"
import { startTransition } from "react"
import { useRouter } from "next/navigation"

export const EditAxisForm = ({ id, title }: Pick<AxisDTO, "id" | "title">) => {
    const { showToast } = useUI()
    const router = useRouter()

    return (
        <form
            action={async (formData) => {
                const title = formData.get("title") as string

                const { error } = await updateAxis({ id, title })

                if (error) showToast.error(error)
                else {
                    showToast.success("Eje actualizado correctamente")
                    startTransition(router.refresh)
                }
            }}
        >
            <label>
                Eje:
                <input type="text" name="title" defaultValue={title} />
            </label>
            <SubmitButton className="blue">Guardar</SubmitButton>
        </form>
    )
}
