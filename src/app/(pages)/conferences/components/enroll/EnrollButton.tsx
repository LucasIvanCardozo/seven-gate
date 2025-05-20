import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { enrollToConference } from "@/app/lib/conferences/enroll.to.conference"
import { Conference } from "@/app/lib/conferences/get.my.conferences"
import { DayJs } from "@/app/utils/DayJs"
import { EnrollForm } from "./EnrollForm"

export const EnrollButton = ({
    id,
    date,
    title,
}: Pick<Conference, "id" | "title" | "date">) => {
    const now = DayJs()

    if (now.isAfter(DayJs(date))) return null

    return (
        <Modal opener={<button>Inscribirme</button>}>
            <Section title={`Inscribirme en: ${title}`}>
                <EnrollForm
                    action={async (data) => {
                        "use server"

                        enrollToConference({ id, data })
                    }}
                />
            </Section>
        </Modal>
    )
}
