"use client"
import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { deleteAxis } from "@/app/lib/actions/axis/delete.axis"
import { AxisDTO } from "@/app/lib/actions/axis/get.axis.by.conference"
import { startTransition } from "react"
import { useRouter } from "next/navigation"
export const DeleteAxisForm = ({ id }: Pick<AxisDTO, "id">) => {
    const { showToast } = useUI()
    const router = useRouter()

    return (
        <form
            action={async () => {
                const { error } = await deleteAxis({ id })

                if (error) showToast.error(error)
                else {
                    showToast.success("Eje eliminado correctamente")
                    startTransition(router.refresh)
                }
            }}
        >
            <SubmitButton className="red">Eliminar</SubmitButton>
        </form>
    )
}
