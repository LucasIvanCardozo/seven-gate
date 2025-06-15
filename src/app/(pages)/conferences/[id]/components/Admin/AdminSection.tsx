import { Section } from "@/app/components/Section"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { NewAxisForm } from "./NewAxisForm"
import { RoleAdministration } from "./RoleAdministration"
import { getConference } from "@/app/lib/actions/conferences/get.conference"

export const AdminSection = async ({ id }: Pick<Conference, "id">) => {
    const { data } = await getConference({ id })
    if (!data) return null

    const { roles } = data
    if (!roles?.includes("admin")) return null

    return (
        <Section title="Administración">
            <div className="flex">
                <NewAxisForm id={id} />
                <RoleAdministration id={id} />
            </div>
        </Section>
    )
}
