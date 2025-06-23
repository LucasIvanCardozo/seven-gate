"use server"

import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { SponsorAdministrationForm } from "./SponsorAdministrationForm"

export const SponsorsAdministrationButton = async ({ id }: { id: number }) => {
    return (
        <Modal opener={<button className="blue">Auspiciantes</button>}>
            <Section title="Administrar auspiciantes">
                <SponsorAdministrationForm id={id} />
            </Section>
        </Modal>
    )
}
