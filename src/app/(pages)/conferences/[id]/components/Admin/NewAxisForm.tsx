"use client"
import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { createAxis } from "@/app/lib/actions/axis/create.axis"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"

export const NewAxisForm = ({ id }: Pick<Conference, "id">) => {
    const { showToast } = useUI()

    return (
        <Modal opener={<button className="blue">Nuevo eje</button>}>
            <Section title="Agregar eje">
                <form
                    action={async (formData) => {
                        const title = formData.get("title") as string

                        const { error } = await createAxis({
                            title,
                            idConference: id,
                        })

                        if (error) showToast.error(error)
                        else
                            showToast.success(
                                `Eje "${title}" creado correctamente`,
                            )
                    }}
                >
                    <label>
                        Eje:
                        <input type="text" name="title" placeholder="Eje" />
                    </label>
                    <SubmitButton className="blue">Agregar</SubmitButton>
                </form>
            </Section>
        </Modal>
    )
}
