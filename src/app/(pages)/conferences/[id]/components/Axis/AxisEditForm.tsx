"use client"
import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { AxisDTO } from "@/app/lib/actions/axis/get.by.conference"
import { updateAxis } from "@/app/lib/actions/axis/update.axis"

export const AxisEditForm = ({ id, title }: Pick<AxisDTO, "id" | "title">) => {
    const { showToast } = useUI()

    return (
        <form
            action={async (formData) => {
                const title = formData.get("title") as string

                const { error } = await updateAxis({ id, title })

                if (error) showToast.error(error)
                else showToast.success("Eje actualizado correctamente")
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
