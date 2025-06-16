import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { NewAxisForm } from "./NewAxisForm"

export const NewAxisButton = ({ id }: Pick<Conference, "id">) => {
    return (
        <Modal opener={<button className="blue">Nuevo eje</button>}>
            <Section title="Agregar eje">
                <NewAxisForm id={id} />
            </Section>
        </Modal>
    )
}
