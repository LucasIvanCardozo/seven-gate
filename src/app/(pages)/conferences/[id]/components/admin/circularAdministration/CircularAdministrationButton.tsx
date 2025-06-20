"use server"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { CircularForm } from "./CircularForm"

export const CircularAdministrationButton = async ({ id }: { id: number }) => {
    return (
        <Modal opener={<button className="blue">Circulares</button>}>
            <Section title="Administrar circulares">
                <CircularForm id={id} />
            </Section>
        </Modal>
    )
}
