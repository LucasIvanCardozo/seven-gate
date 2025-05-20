import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { Conference } from "@/app/lib/conferences/get.my.conferences"

export const EnrollButton = ({
    id,
    title,
}: Pick<Conference, "id" | "title">) => (
    <Modal opener={<button>Inscribirme</button>}>
        <Section title={`Inscribirme en el congreso ${title}`}>
            <p>Hola</p>
        </Section>
    </Modal>
)
