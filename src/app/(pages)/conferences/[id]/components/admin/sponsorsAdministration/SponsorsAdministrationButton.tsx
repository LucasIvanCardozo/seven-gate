"use client"

import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"

export const SponsorsAdministrationButton = ({ id }: {id: number}) => {
    const { showToast } = useUI()

    return (
        <Modal opener={<button className="blue">Auspiciantes</button>}>
            <Section title="Administrar auspiciantes">
                <form
                    onSubmit={(event) => {
                        event.preventDefault()
                        showToast.success("Auspiciante agregado correctamente")
                    }}
                >
                    <label>
                        Nombre:
                        <input type="text" />
                    </label>
                    <label>
                        Link del sitio:
                        <input type="url" />
                    </label>
                    <label>
                        Logo:
                        <input type="file" />
                    </label>
                    <SubmitButton className="blue">Agregar</SubmitButton>
                </form>
            </Section>
        </Modal>
    )
}
