"use server"
import { Section } from "@/app/components/Section"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { NewRoleForm } from "./NewRoleForm"
import { getRoles } from "@/app/lib/actions/roles/get.roles"

export const NewRoleSection = async ({ id }: Pick<Conference, "id">) => {
    const { data } = await getRoles()
    if (!data) return null

    return (
        <Section title="Nuevo rol">
            <NewRoleForm id={id} roles={data} />
        </Section>
    )
}
