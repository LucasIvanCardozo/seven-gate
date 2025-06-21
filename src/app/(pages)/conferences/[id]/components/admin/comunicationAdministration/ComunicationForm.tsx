"use client"

import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { send } from "@/app/lib/actions/comunication/send"

export const ComunicationForm = ({ id }: { id: number }) => {
    const { showToast } = useUI()

    return (
        <form
            action={async (formData) => {
                const message = formData.get("message")

                const { error } = await send({
                    message,
                    conference_id: id,
                })

                if (error) showToast.error(error)
                else showToast.success("Mensaje enviado correctamente")
            }}
        >
            <textarea name="message" />
            <SubmitButton className="blue">Enviar</SubmitButton>
        </form>
    )
}
