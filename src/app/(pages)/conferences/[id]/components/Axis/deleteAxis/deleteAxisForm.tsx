"use client"
import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { deleteAxis } from "@/app/lib/actions/axis/delete.axis"
import { AxisDTO } from "@/app/lib/actions/axis/get.by.conference"

export const DeleteAxisForm = ({ id }: Pick<AxisDTO, "id">) => {
    const { showToast } = useUI()

    return (
        <form
            action={async () => {
                const { error } = await deleteAxis({ id })

                if (error) showToast.error(error)
                else showToast.success("Eje eliminado correctamente")
            }}
        >
            <SubmitButton className="red">Eliminar</SubmitButton>
        </form>
    )
}
