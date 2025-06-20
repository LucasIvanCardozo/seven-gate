import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import {
    Conference,
    Role,
} from "@/app/lib/actions/conferences/get.my.conferences"
import { DayJs } from "@/app/utils/DayJs"
import { EnrollForm } from "./EnrollForm"
import { getConference } from "@/app/lib/actions/conferences/get.conference"

export const EnrollButton = async ({ id }: Pick<Conference, "id">) => {
    const { data } = await getConference({ id })
    if (!data) return null

    const { date, title, roles } = data

    const now = DayJs()
    if (now.isAfter(DayJs(date))) return null

    const rolesLength = roles?.length ?? 0

    const availableRoles: Role[] = []

    if (rolesLength == 0) availableRoles.push("oyente")
    if (!roles?.includes("ponente") && !roles?.includes("admin"))
        availableRoles.push("ponente")
    
    // roles?.includes("admin")
    //     ? []
    //     : rolesLength === 1 && roles?.at(0) === "oyente"
    //       ? ["ponente"]
    //       : roles?.includes("ponente")
    //         ? []
    //         : validRoles?.filter((role) => !roles?.includes(role))

    if (!availableRoles.length) return null

    return (
        <Modal opener={<button className="blue">Inscribirme</button>}>
            <Section title={`Inscribirme en: ${title}`}>
                <EnrollForm id={id} roles={availableRoles} />
            </Section>
        </Modal>
    )
}
