"use server"
import { Section } from "@/app/components/Section"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { NewAxisButton } from "./newAxis/NewAxisButton"
import { RoleAdministrationButton } from "./roleAdministration/RoleAdministrationButton"
import { getConference } from "@/app/lib/actions/conferences/get.conference"

export const AdminSection = async ({ id }: Pick<Conference, "id">) => {
    const { data } = await getConference({ id })
    if (!data) return null

    const { roles } = data
    if (!roles?.includes("admin")) return null

    return (
        <Section title="Administración">
            <div className="flex">
                <NewAxisButton id={id} />
                <RoleAdministrationButton id={id} />
            </div>
        </Section>
    )
}
