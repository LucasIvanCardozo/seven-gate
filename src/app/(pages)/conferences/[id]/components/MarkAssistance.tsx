import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { getProfile } from "@/app/lib/actions/profiles/get.profile"
import { MarkAssistanceScanner } from "./MarkAssistanceScanner"

export const MarkAssistance = async ({ id }: { id: number }) => {
    const { data: profile } = await getProfile({ conference_id: id })
    if (!profile) return null

    if (profile.roles?.includes("admin"))
        return null

    return (
        <Modal opener={<button className="blue">Marcar asistencia</button>}>
            <Section title="Marcar asistencia">
                <MarkAssistanceScanner {...profile} />
            </Section>
        </Modal>
    )
}
